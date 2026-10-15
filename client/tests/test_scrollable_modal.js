import { chromium } from 'playwright';

async function testScrollableModal() {
  console.log('🚀 Testing Scrollable Upcoming Workshop Modal...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173');
    await page.evaluate(() => {
      sessionStorage.setItem('rbdc_workshop_popup_dismissed', 'true');
    });
    await page.reload();

    // Click the floating button to open the modal
    const button = await page.waitForSelector('#floating-workshop-btn', { timeout: 4000 });
    await button.click();

    await page.waitForSelector('div[role="dialog"]', { timeout: 3000 });
    console.log('✅ Modal opened on click.');

    // Check that the scrollable body container is present
    const scrollBody = await page.waitForSelector('#upcoming-workshop-scroll-body');
    if (!scrollBody) throw new Error('Scrollable body container not found');

    // Verify sections inside the modal
    const modalText = await page.textContent('div[role="dialog"]');
    if (!modalText.includes('Session Schedule & Timeline')) throw new Error('Missing Session Schedule & Timeline in scrollable modal');
    if (!modalText.includes("What's Included & Workshop Takeaways")) throw new Error("Missing What's Included & Workshop Takeaways in scrollable modal");
    if (!modalText.includes('Venue & Coordinates')) throw new Error('Missing Venue & Coordinates in scrollable modal');
    if (!modalText.includes('Registration Slots & Pricing')) throw new Error('Missing Registration Slots & Pricing in scrollable modal');
    console.log('✅ All rich detail sections (Schedule, Takeaways, Venue, Pricing) are rendered inside the modal!');

    // Test scrolling inside the modal
    console.log('Testing scrolling down inside the modal...');
    const initialScrollTop = await scrollBody.evaluate(el => el.scrollTop);
    await scrollBody.evaluate(el => el.scrollTop = 400);
    await page.waitForTimeout(300);
    const newScrollTop = await scrollBody.evaluate(el => el.scrollTop);
    console.log(`ScrollTop changed from ${initialScrollTop} to ${newScrollTop}`);
    if (newScrollTop === 0) throw new Error('Modal body did not scroll');
    console.log('✅ Modal body is smoothly scrollable!');

    // Take screenshot of the scrolled modal on desktop
    await page.screenshot({ path: 'tests/modal_scrolled_desktop.png' });
    console.log('Captured tests/modal_scrolled_desktop.png');

    // Test workshop switcher tab (e.g. switch to Semiclassical Masterclass)
    const semiClassTab = await page.$('button:has-text("Semiclassical Masterclass")');
    if (semiClassTab) {
      await semiClassTab.click();
      await page.waitForTimeout(300);
      const switchedText = await page.textContent('div[role="dialog"]');
      if (!switchedText.includes('Semiclassical Masterclass')) throw new Error('Failed to switch to Semiclassical Masterclass');
      console.log('✅ Successfully switched to Semiclassical Masterclass tab inside modal!');
    }

    // Switch back to Choreography Workshop
    const choreoTab = await page.$('button:has-text("Choreography Workshop")');
    if (choreoTab) {
      await choreoTab.click();
      await page.waitForTimeout(300);
    }

    // Test "Book Your Slot" from inside the modal
    const bookSlotBtn = await page.waitForSelector('#modal-book-slot-btn');
    await bookSlotBtn.click();
    await page.waitForSelector('#enquiry-form', { timeout: 4000 });
    console.log('✅ Clicking "Book Your Slot" in modal redirected directly to Contact Us with prefilled workshop!');

    const formText = await page.textContent('#enquiry-form');
    if (!formText.includes('Choreography Workshop')) throw new Error('Prefill not found in Contact Us form');
    console.log('✅ Contact form correctly contains prefilled Choreography Workshop data.');

    // Now test on Mobile Viewport (375x667)
    console.log('\nTesting on Mobile Viewport (375x667)...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173');
    const mobileBtn = await page.waitForSelector('#floating-workshop-btn');
    await mobileBtn.click();
    await page.waitForSelector('div[role="dialog"]');

    const mobileScrollBody = await page.waitForSelector('#upcoming-workshop-scroll-body');
    await mobileScrollBody.evaluate(el => el.scrollTop = 350);
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/modal_scrolled_mobile.png' });
    console.log('Captured tests/modal_scrolled_mobile.png');

    console.log('\n🎉 ALL SCROLLABLE MODAL TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

testScrollableModal();
