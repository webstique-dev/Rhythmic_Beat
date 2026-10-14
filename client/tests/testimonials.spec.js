import { chromium } from 'playwright';

async function runTestimonialsTest() {
  console.log('🚀 Starting Testimonials Section Tests...');
  const browser = await chromium.launch();

  try {
    // 1. Desktop Test (1440x900)
    console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    const testimonialsSection = page.locator('#testimonials');
    await testimonialsSection.waitFor({ state: 'visible' });
    console.log('✓ Found #testimonials section');

    // Scroll to testimonials
    await page.evaluate(() => {
      document.getElementById('testimonials').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(400);

    // Verify header badge & heading
    const badge = await testimonialsSection.getByText('06 / VOICES OF THE COURT').textContent();
    console.log(`✓ Header badge: "${badge?.trim()}"`);

    const heading = await testimonialsSection.getByRole('heading', { level: 2 }).textContent();
    console.log(`✓ Heading: "${heading?.trim()}"`);

    // Verify initial testimonial
    const initialName = await testimonialsSection.getByRole('heading', { level: 3 }).textContent();
    console.log(`✓ Initial featured client: "${initialName?.trim()}"`);

    const initialReview = await testimonialsSection.locator('blockquote').textContent();
    console.log(`✓ Initial review text: "${initialReview?.trim().slice(0, 50)}..."`);

    // Verify 4 thumbnail previews
    const thumbnails = testimonialsSection.locator('button[aria-pressed]');
    const thumbCount = await thumbnails.count();
    console.log(`✓ Total client thumbnail previews: ${thumbCount}`);
    if (thumbCount !== 4) throw new Error(`Expected 4 thumbnails, got ${thumbCount}`);

    // Test clicking Next arrow
    console.log('\n--- Testing Next Arrow Navigation ---');
    const nextBtn = testimonialsSection.locator('button[aria-label="Next testimonial"]');
    await nextBtn.click();
    await page.waitForTimeout(350);

    const secondName = await testimonialsSection.getByRole('heading', { level: 3 }).textContent();
    console.log(`✓ After Next arrow: "${secondName?.trim()}"`);
    if (secondName === initialName) throw new Error('Testimonial name did not change after Next click!');

    // Check active thumbnail indicator
    const secondThumbActive = await thumbnails.nth(1).getAttribute('aria-pressed');
    console.log(`✓ Second thumbnail active state: ${secondThumbActive}`);

    // Test clicking Previous arrow
    console.log('\n--- Testing Previous Arrow Navigation ---');
    const prevBtn = testimonialsSection.locator('button[aria-label="Previous testimonial"]');
    await prevBtn.click();
    await page.waitForTimeout(350);

    const backToFirstName = await testimonialsSection.getByRole('heading', { level: 3 }).textContent();
    console.log(`✓ After Prev arrow: "${backToFirstName?.trim()}"`);
    if (backToFirstName !== initialName) throw new Error('Did not return to first testimonial!');

    // Test clicking 4th thumbnail directly
    console.log('\n--- Testing Direct Thumbnail Selection ---');
    await thumbnails.nth(3).click();
    await page.waitForTimeout(350);

    const fourthName = await testimonialsSection.getByRole('heading', { level: 3 }).textContent();
    console.log(`✓ After clicking 4th thumbnail: "${fourthName?.trim()}"`);

    // Screenshot of desktop
    await page.screenshot({ path: 'tests/testimonials-desktop.png', fullPage: false });
    console.log('✓ Saved desktop screenshot: tests/testimonials-desktop.png');

    await context.close();

    // 2. Mobile Test (390x844)
    console.log('\n--- 2. Testing Mobile Viewport (390x844) ---');
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    const mobileTestimonials = mobilePage.locator('#testimonials');
    await mobileTestimonials.waitFor({ state: 'visible' });

    await mobilePage.evaluate(() => {
      document.getElementById('testimonials').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await mobilePage.waitForTimeout(400);

    // Verify mobile responsiveness & thumbnail click
    const mobileThumbnails = mobileTestimonials.locator('button[aria-pressed]');
    await mobileThumbnails.nth(1).click();
    await mobilePage.waitForTimeout(350);

    const mobileName = await mobileTestimonials.getByRole('heading', { level: 3 }).textContent();
    console.log(`✓ Mobile switched to: "${mobileName?.trim()}"`);

    await mobilePage.screenshot({ path: 'tests/testimonials-mobile.png', fullPage: false });
    console.log('✓ Saved mobile screenshot: tests/testimonials-mobile.png');

    await mobileContext.close();

    console.log('\n🎉 ALL TESTIMONIALS TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTestimonialsTest();
