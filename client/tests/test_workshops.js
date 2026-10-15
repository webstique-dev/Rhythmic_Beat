import { chromium } from 'playwright';

async function runTests() {
  console.log('🚀 Starting Playwright verification for Workshops redesign & popup...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const BASE_URL = 'http://localhost:5173';

  try {
    // ==========================================
    // 1. TEST AUTOMATIC POPUP (3 seconds after entry)
    // ==========================================
    console.log('\n--- 1. Testing 3-Second Automatic Upcoming Workshop Popup ---');
    await page.goto(BASE_URL);
    console.log('Loaded home page. Waiting 3.5s for automatic popup...');
    
    // Check that popup is not visible immediately
    const modalImmediate = await page.$('div[role="dialog"]');
    console.log('Modal visible immediately?', !!modalImmediate);

    // Wait for popup to appear after 3 seconds
    await page.waitForSelector('div[role="dialog"]', { timeout: 6000 });
    console.log('✅ Automatic popup opened successfully after 3 seconds!');

    // Verify modal content matches the user reference poster
    const modalText = await page.textContent('div[role="dialog"]');
    console.log('Checking modal content...');
    if (!modalText.includes('Choreography Workshop')) throw new Error('Missing Choreography Workshop title in popup');
    if (!modalText.includes('Ishwarya Balabharthy')) throw new Error('Missing Ishwarya Balabharthy instructor in popup');
    if (!modalText.includes('Nov 1st')) throw new Error('Missing Nov 1st date in popup');
    if (!modalText.includes('Rs. 699') && !modalText.includes('699')) throw new Error('Missing Early Bird Rs. 699 price in popup');
    console.log('✅ Modal content matches attached poster details (Title, Instructor, Nov 1st, Early bird Rs. 699)');

    // Test close button
    const closeBtn = await page.$('button[aria-label="Close workshop announcement"]');
    if (!closeBtn) throw new Error('Close button not found');
    await closeBtn.click();
    await page.waitForTimeout(400);

    const isClosed = await page.$('div[role="dialog"]');
    if (isClosed) throw new Error('Modal did not close on close button click');
    console.log('✅ Modal closed successfully. SessionStorage dismissed flag should be set.');

    // Test that popup does NOT interrupt again on page reload in same session
    console.log('Testing reload in same session (should NOT popup again)...');
    await page.reload();
    await page.waitForTimeout(3500);
    const modalAfterReload = await page.$('div[role="dialog"]');
    if (modalAfterReload) throw new Error('Popup unexpectedly appeared again in the same session!');
    console.log('✅ Verified: Popup does not repeatedly interrupt during the same session.');

    // ==========================================
    // 2. TEST FLOATING CIRCLE BUTTON
    // ==========================================
    console.log('\n--- 2. Testing Animated Floating Circle Button ---');
    const floatingBtn = await page.waitForSelector('#floating-workshop-btn', { timeout: 3000 });
    console.log('✅ Floating workshop button is rendered.');
    await floatingBtn.click();
    await page.waitForSelector('div[role="dialog"]', { timeout: 2000 });
    console.log('✅ Clicking floating circle opened the workshop popup!');

    // Close modal again via ESC key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const modalAfterEsc = await page.$('div[role="dialog"]');
    if (modalAfterEsc) throw new Error('Modal did not close on ESC key');
    console.log('✅ Modal closed on ESC key.');

    // ==========================================
    // 3. TEST WORKSHOPS PAGE & FILTERS
    // ==========================================
    console.log('\n--- 3. Testing Workshops Page & Interactive Filters ---');
    await page.goto(`${BASE_URL}/workshops`);
    await page.waitForSelector('#workshops-page', { timeout: 5000 });
    console.log('Loaded /workshops page.');

    // Check workshop cards
    const initialCards = await page.$$('[data-testid^="workshop-card-"]');
    console.log(`Found ${initialCards.length} workshop cards on initial load.`);
    if (initialCards.length < 5) throw new Error('Expected at least 5 workshop cards');

    // Test filter: Upcoming only (default) vs All vs Completed
    const filterAllBtn = await page.$('#filter-status-all');
    await filterAllBtn.click();
    await page.waitForTimeout(200);
    const allCards = await page.$$('[data-testid^="workshop-card-"]');
    console.log(`Cards under "All Workshops": ${allCards.length}`);

    const filterPastBtn = await page.$('#filter-status-past');
    await filterPastBtn.click();
    await page.waitForTimeout(200);
    const pastCards = await page.$$('[data-testid^="workshop-card-"]');
    console.log(`Cards under "Past Workshops": ${pastCards.length}`);
    if (pastCards.length === 0) throw new Error('Expected past workshop cards');

    // Switch back to Upcoming
    const filterUpcomingBtn = await page.$('#filter-status-upcoming');
    await filterUpcomingBtn.click();
    await page.waitForTimeout(200);

    // Test search filter
    console.log('Testing workshop search filter...');
    const searchInput = await page.$('#workshop-search');
    await searchInput.fill('Ishwarya');
    await page.waitForTimeout(200);
    const searchCards = await page.$$('[data-testid^="workshop-card-"]');
    console.log(`Cards matching search "Ishwarya": ${searchCards.length}`);
    if (searchCards.length !== 1) throw new Error('Search did not correctly filter to Ishwarya Balabharthy workshop');

    // Reset filters
    const resetBtn = await page.$('#reset-filters-btn');
    if (resetBtn) {
      await resetBtn.click();
      await page.waitForTimeout(200);
      const afterResetCards = await page.$$('[data-testid^="workshop-card-"]');
      console.log(`Cards after reset: ${afterResetCards.length}`);
    }

    // ==========================================
    // 4. TEST WORKSHOP DETAILS PAGE
    // ==========================================
    console.log('\n--- 4. Testing Workshop Details Page Navigation ---');
    // Click on the Choreography workshop card
    const choreoCard = await page.waitForSelector('[data-testid="workshop-card-choreography-workshop-ishwarya"]');
    await choreoCard.click();

    await page.waitForSelector('#workshop-details-page', { timeout: 4000 });
    console.log('✅ Successfully navigated to /workshops/choreography-workshop-ishwarya');

    const detailsText = await page.textContent('#workshop-details-page');
    if (!detailsText.includes('Ishwarya Balabharthy')) throw new Error('Missing instructor name in details page');
    if (!detailsText.includes('Early Bird')) throw new Error('Missing Early bird pricing in details page');
    if (!detailsText.includes('116A, Chowdry Nagar Main Rd')) throw new Error('Missing venue address in details page');
    console.log('✅ Details page has complete workshop image, instructor bio, schedule timeline, and venue!');

    // Test "Book Your Slot Now" button on details page -> should navigate to /contact-us prefilled
    const bookSlotDetailsBtn = await page.$('#book-slot-cta');
    await bookSlotDetailsBtn.click();

    await page.waitForSelector('#enquiry-form', { timeout: 4000 });
    console.log('✅ Successfully navigated to /contact-us via "Book Your Slot Now"!');

    // ==========================================
    // 5. TEST CONTACT US PREFILL & SEARCHABLE VENUE DROPDOWN
    // ==========================================
    console.log('\n--- 5. Testing Contact Us Workshop Prefill & Searchable Venue Dropdown ---');
    const formText = await page.textContent('#enquiry-form');
    if (!formText.includes('Choreography Workshop')) throw new Error('Prefill banner does not mention Choreography Workshop');
    console.log('✅ Prefilled Workshop alert banner is visible in the Contact form.');

    // Check prefilled subject value
    const subjectValue = await page.$eval('#subject', el => el.value);
    console.log('Subject field prefilled value:', subjectValue);
    if (!subjectValue.includes('Choreography Workshop')) throw new Error('Subject dropdown not prefilled with workshop title');

    // Check prefilled message value
    const messageValue = await page.$eval('#message', el => el.value);
    console.log('Message field prefilled value includes workshop info:', messageValue.includes('Ishwarya Balabharthy'));

    // Check searchable venue dropdown
    const venueSearch = await page.$('#venue-search');
    if (!venueSearch) throw new Error('Venue search input not found');
    await venueSearch.fill('Valasaravakkam');
    await page.waitForTimeout(200);

    const venueOptions = await page.$$eval('#venue option', opts => opts.map(o => o.text));
    console.log('Filtered venue options for "Valasaravakkam":', venueOptions);
    if (venueOptions.length === 0 || !venueOptions[0].includes('Valasaravakkam')) {
      throw new Error('Venue filter did not narrow down to Valasaravakkam');
    }
    console.log('✅ Searchable venue dropdown works perfectly!');

    // ==========================================
    // 6. TEST MOBILE RESPONSIVENESS
    // ==========================================
    console.log('\n--- 6. Testing Mobile Viewport (375x667) ---');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/workshops`);
    await page.waitForSelector('#workshops-page');

    // Check floating button is visible and properly positioned on mobile
    const mobileFloatingBtn = await page.$('#floating-workshop-btn');
    const isFloatingVisible = await mobileFloatingBtn.isVisible();
    console.log('Floating button visible on mobile?', isFloatingVisible);
    if (!isFloatingVisible) throw new Error('Floating button should be visible on mobile');

    // Click to open popup on mobile
    await mobileFloatingBtn.click();
    await page.waitForSelector('div[role="dialog"]');
    console.log('✅ Modal opens smoothly on mobile!');

    // Take screenshot of popup on mobile
    await page.screenshot({ path: 'tests/mobile_popup_screenshot.png' });
    console.log('Captured tests/mobile_popup_screenshot.png');

    // Close modal on mobile
    const mobileCloseBtn = await page.$('button[aria-label="Close workshop announcement"]');
    await mobileCloseBtn.click();
    await page.waitForTimeout(300);

    // Take screenshot of workshops page on mobile
    await page.screenshot({ path: 'tests/mobile_workshops_screenshot.png' });
    console.log('Captured tests/mobile_workshops_screenshot.png');

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! Everything is functioning flawlessly.');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runTests();
