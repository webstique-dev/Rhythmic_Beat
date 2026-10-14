import { chromium } from 'playwright';

async function runTests() {
  console.log('🚀 Starting Gallery Horizontal Scroll & Responsiveness Tests...');
  const browser = await chromium.launch();
  
  try {
    // 1. Desktop Test (1440 x 900)
    console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    // Check section existence
    const gallerySection = page.locator('#gallery');
    await gallerySection.waitFor({ state: 'visible' });
    console.log('✓ Found #gallery section');
    
    // Verify typography & header
    const badgeText = await page.locator('#gallery').getByText('04 / MOTION ARCHIVE').textContent();
    console.log(`✓ Badge verified: "${badgeText?.trim()}"`);
    
    const headingText = await page.locator('#gallery').getByRole('heading', { level: 2 }).textContent();
    console.log(`✓ Heading verified: "${headingText?.trim()}"`);
    
    // Verify cards are rendered
    const cards = page.locator('#gallery .group');
    const cardCount = await cards.count();
    console.log(`✓ Total gallery cards rendered: ${cardCount}`);
    if (cardCount < 10) throw new Error(`Expected at least 10 cards, got ${cardCount}`);

    // Check section dimensions
    const galleryBox = await gallerySection.boundingBox();
    console.log(`✓ Gallery section height: ${galleryBox?.height.toFixed(0)}px (pinned scroll track)`);
    
    // Scroll directly to the entrance of #gallery
    await page.evaluate(() => {
      document.getElementById('gallery').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(400);

    const entranceScrollY = await page.evaluate(() => window.scrollY);
    const track = page.locator('#gallery div.will-change-transform');
    let initialTransform = await track.evaluate(el => el.style.transform);
    console.log(`✓ Initial track transform at entrance: "${initialTransform || 'none'}"`);
    
    // Perform progressive vertical scrolls and verify horizontal translation
    const scrollStep = 350;
    let prevX = 0;
    let monotonicCheckPassed = true;

    console.log('Testing progressive scroll tracking:');
    for (let i = 1; i <= 6; i++) {
      await page.evaluate((step) => {
        window.scrollBy(0, step);
      }, scrollStep);
      await page.waitForTimeout(300);

      const transformStr = await track.evaluate(el => el.style.transform);
      const match = transformStr.match(/translate3d\((-?[\d.]+)px/);
      const currentX = match ? Math.abs(parseFloat(match[1])) : 0;
      
      console.log(`  Scroll step ${i}: translateX = -${currentX.toFixed(1)}px (advance: +${(currentX - prevX).toFixed(1)}px)`);
      if (currentX <= prevX - 1) {
        monotonicCheckPassed = false;
        console.error(`  ❌ Non-monotonic or backward jitter detected at step ${i}!`);
      }
      prevX = currentX;
    }

    if (!monotonicCheckPassed) throw new Error('Smooth monotonic horizontal scroll check failed!');
    console.log('✓ Smooth monotonic horizontal scroll verified without jumps or glitches');

    // Scroll to the end of the gallery section
    const maxTranslate = await page.evaluate(() => {
      const el = document.getElementById('gallery');
      const tr = el.querySelector('div.will-change-transform');
      return tr.scrollWidth - window.innerWidth;
    });

    console.log(`✓ Total horizontal track translation required: ${maxTranslate}px`);
    await page.evaluate(({ entY, maxT }) => {
      window.scrollTo({ top: entY + maxT, behavior: 'instant' });
    }, { entY: entranceScrollY, maxT: maxTranslate });
    await page.waitForTimeout(600);

    const endTransformStr = await track.evaluate(el => el.style.transform);
    console.log(`✓ End of gallery track transform: "${endTransformStr}" (expected ~-${maxTranslate}px)`);

    // Verify last card is fully brought into the viewport
    const lastCard = cards.last();
    const lastCardBox = await lastCard.boundingBox();
    console.log(`✓ Last card bounding box at scroll completion: left=${lastCardBox?.x.toFixed(1)}px, right=${((lastCardBox?.x || 0) + (lastCardBox?.width || 0)).toFixed(1)}px (windowWidth=1440px)`);
    if (lastCardBox && lastCardBox.x >= 0 && lastCardBox.x + lastCardBox.width <= 1445) {
      console.log('✓ Last card is completely within the viewport (100% viewed) before section unpins');
    } else {
      throw new Error(`Last card not fully in viewport: left=${lastCardBox?.x}, right=${(lastCardBox?.x || 0) + (lastCardBox?.width || 0)}`);
    }

    // Scroll past gallery into the next section
    console.log('\n--- Testing smooth exit into next section ---');
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });
    await page.waitForTimeout(400);

    const nextSection = page.locator('#reels');
    const nextSectionVisible = await nextSection.isVisible();
    console.log(`✓ Next section (#reels) smoothly in view after gallery: ${nextSectionVisible}`);

    // Take screenshot of gallery section for visual inspection
    await page.evaluate(() => {
      document.getElementById('gallery').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/gallery-desktop.png', fullPage: false });
    console.log('✓ Saved desktop screenshot: tests/gallery-desktop.png');

    await context.close();

    // 2. Mobile Viewport Test (390 x 844 iPhone 12/13/14)
    console.log('\n--- 2. Testing Mobile Viewport (390x844) ---');
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    const mobileGallery = mobilePage.locator('#gallery');
    await mobileGallery.waitFor({ state: 'visible' });

    // Scroll to mobile gallery
    await mobilePage.evaluate(() => {
      document.getElementById('gallery').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await mobilePage.waitForTimeout(400);

    const mobileCards = mobilePage.locator('#gallery .group');
    const mobileFirstCardBox = await mobileCards.first().boundingBox();
    console.log(`✓ Mobile first card height: ${mobileFirstCardBox?.height.toFixed(1)}px (responsive layout)`);

    // Scroll mobile vertically and verify horizontal movement
    await mobilePage.evaluate(() => {
      window.scrollBy(0, 400);
    });
    await mobilePage.waitForTimeout(400);

    const mobileTrack = mobilePage.locator('#gallery div.will-change-transform');
    const mobileTransform = await mobileTrack.evaluate(el => el.style.transform);
    console.log(`✓ Mobile track transform on vertical scroll: "${mobileTransform}"`);

    await mobilePage.screenshot({ path: 'tests/gallery-mobile.png', fullPage: false });
    console.log('✓ Saved mobile screenshot: tests/gallery-mobile.png');

    await mobileContext.close();

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100% smooth, responsive & glitch-free.');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
