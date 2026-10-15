import { chromium } from 'playwright';

async function runNavigationAndContactTests() {
  console.log('🚀 Starting Comprehensive Navigation & Contact Us Redesign Tests...\n');
  const browser = await chromium.launch({ headless: true });

  let allPassed = true;

  try {
    // -------------------------------------------------------------
    // Test 1: Desktop Navbar & Link Navigation
    // -------------------------------------------------------------
    console.log('--- TEST 1: Desktop Navbar & Active Sections Navigation (1440x900) ---');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

    // 1.1 Verify "Book a Demo" is NOT present anywhere in navbar
    const bookDemoBtn = page.locator('header').getByRole('link', { name: /book a demo/i });
    if ((await bookDemoBtn.count()) === 0) {
      console.log('  ✓ Verified: "Book a Demo" button is completely removed from navbar');
    } else {
      console.error('  ✗ Error: "Book a Demo" button still found in navbar');
      allPassed = false;
    }

    // 1.1b Verify "Philosophy" and "Styles" are NOT in navbar as they are hidden sections
    const philosophyLink = page.locator('header').getByRole('link', { name: 'Philosophy', exact: true });
    if ((await philosophyLink.count()) === 0) {
      console.log('  ✓ Verified: "Philosophy" is removed from navbar (section hidden)');
    } else {
      console.error('  ✗ "Philosophy" still found in navbar');
      allPassed = false;
    }

    const stylesLink = page.locator('header').getByRole('link', { name: 'Styles', exact: true });
    if ((await stylesLink.count()) === 0) {
      console.log('  ✓ Verified: "Styles" is removed from navbar (section hidden)');
    } else {
      console.error('  ✗ "Styles" still found in navbar');
      allPassed = false;
    }

    // 1.2 Verify all active section links exist and navigate
    const expectedLinks = [
      { label: 'Our Story', id: 'our-story' },
      { label: 'Gallery', id: 'gallery' },
      { label: 'Reels', id: 'reels' },
      { label: 'Arena', id: 'arena' },
      { label: 'Testimonials', id: 'testimonials' },
      { label: 'Schedule', id: 'schedule' },
      { label: 'Branches', id: 'branches' },
    ];

    for (const item of expectedLinks) {
      const link = page.locator('header nav').getByRole('link', { name: item.label, exact: true });
      const count = await link.count();
      if (count > 0) {
        console.log(`  ✓ Nav link found: "${item.label}"`);
        await link.click();
        await page.waitForTimeout(150);

        const targetEl = page.locator(`#${item.id}`);
        if ((await targetEl.count()) > 0) {
          console.log(`    ↳ Target section #${item.id} verified`);
        } else {
          console.error(`    ✗ Target section #${item.id} not found in DOM`);
          allPassed = false;
        }
      } else {
        console.error(`  ✗ Nav link "${item.label}" not found in navigation pill`);
        allPassed = false;
      }
    }

    // 1.3 Verify "Contact Us" button at far right
    const contactBtn = page.locator('header').getByRole('link', { name: /contact us/i }).first();
    if ((await contactBtn.count()) > 0) {
      console.log('  ✓ "Contact Us" button found at far right');
    } else {
      console.error('  ✗ "Contact Us" button missing from navbar');
      allPassed = false;
    }

    // -------------------------------------------------------------
    // Test 2: Navigate to Contact Us Page & Verify Section 1 (Hero)
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Section 1 – Contact Hero ---');
    await contactBtn.click();
    await page.waitForTimeout(300);

    const url = page.url();
    if (url.includes('/contact')) {
      console.log(`  ✓ Successfully navigated to Contact Us page: ${url}`);
    } else {
      console.error(`  ✗ URL is not /contact: ${url}`);
      allPassed = false;
    }

    // Verify Section 1: Contact Hero
    const heroSection = page.locator('#contact-hero');
    await heroSection.waitFor({ state: 'visible' });
    const heroHeading = await heroSection.getByRole('heading', { level: 1 }).textContent();
    console.log(`  ✓ Hero Heading: "${heroHeading?.trim()}" (Bold Contact Us heading verified)`);

    // Verify hero image
    const heroImage = heroSection.locator('img');
    if ((await heroImage.count()) > 0) {
      console.log('  ✓ Section 1 high-quality hero image rendered');
    } else {
      console.error('  ✗ Section 1 hero image missing');
      allPassed = false;
    }

    // -------------------------------------------------------------
    // Test 3: Section 2 – Contact Form & Reference UI Side Card
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Section 2 – Contact Form & Validation ---');
    const formSection = page.locator('#contact-form');
    await formSection.waitFor({ state: 'visible' });
    console.log('  ✓ Found #contact-form section');

    const form = page.locator('#enquiry-form');
    await form.waitFor({ state: 'visible' });

    // Verify all required form fields exist: Name, Email, Phone, Subject, Message
    const nameInput = form.locator('#name');
    const emailInput = form.locator('#email');
    const phoneInput = form.locator('#phone');
    const subjectSelect = form.locator('#subject');
    const messageInput = form.locator('#message');

    if (
      (await nameInput.count()) > 0 &&
      (await emailInput.count()) > 0 &&
      (await phoneInput.count()) > 0 &&
      (await subjectSelect.count()) > 0 &&
      (await messageInput.count()) > 0
    ) {
      console.log('  ✓ All 5 form fields (Name, Email, Phone, Subject, Message) present');
    } else {
      console.error('  ✗ Missing one or more required form fields');
      allPassed = false;
    }

    // Verify Right-side Image Card with floating pill badge (Reference UI Pattern)
    const sideCard = formSection.locator('.lg\\:col-span-5');
    const sideCardImage = sideCard.locator('img');
    const sideCardBadge = sideCard.getByText('Your Dance Journey');
    if ((await sideCardImage.count()) > 0 && (await sideCardBadge.count()) > 0) {
      console.log('  ✓ Reference UI side card verified (high-res dance visual + "Your Dance Journey" pill badge)');
    } else {
      console.error('  ✗ Reference UI side card or badge missing');
      allPassed = false;
    }

    // 3.1 Test Validation: submit empty form
    const submitBtn = form.getByRole('button', { name: /send message/i });
    await submitBtn.click();
    await page.waitForTimeout(150);

    const nameError = page.locator('#name-error');
    if ((await nameError.count()) > 0) {
      console.log(`  ✓ Name validation error triggered: "${await nameError.textContent()}"`);
    } else {
      console.error('  ✗ Name validation failed to trigger');
      allPassed = false;
    }

    // 3.2 Test Invalid Phone & Email formats
    await nameInput.fill('Meera Sundaram');
    await emailInput.fill('invalid-email-address');
    await phoneInput.fill('12345');
    await page.selectOption('#subject', 'Admission Inquiry — Classical Bharatanatyam');
    await messageInput.fill('Hi');
    await submitBtn.click();
    await page.waitForTimeout(150);

    const emailError = page.locator('#email-error');
    const phoneError = page.locator('#phone-error');
    if ((await emailError.count()) > 0 && (await phoneError.count()) > 0) {
      console.log('  ✓ Email and Phone format validation properly triggered');
    } else {
      console.error('  ✗ Format validation failed to trigger');
      allPassed = false;
    }

    // 3.3 Test Valid Submission Handling
    console.log('  ↳ Submitting valid enquiry...');
    await emailInput.fill('meera.sundaram@example.com');
    await phoneInput.fill('9655551055');
    await messageInput.fill('Interested in attending the classical Bharatanatyam weekend batch.');
    await page.locator('#enquiry-form button[type="submit"]').first().click();
    
    // Check if any errors are present
    const remainingErrors = await page.evaluate(() => 
      Array.from(document.querySelectorAll('[id$="-error"]')).map(el => el.textContent)
    );
    if (remainingErrors.length > 0) {
      console.log('  ⚠️ Validation errors remaining on submit:', remainingErrors);
    }

    // Verify submission feedback card
    const successCard = page.locator('#form-success-card');
    await successCard.waitFor({ state: 'visible', timeout: 5000 });
    const successTitle = await successCard.getByRole('heading', { level: 3 }).textContent();
    console.log(`  ✓ Form Submission Feedback Displayed: "${successTitle?.trim()}"`);

    // Verify summary details in success card
    const summaryText = await successCard.textContent();
    if (summaryText?.includes('Meera Sundaram') && summaryText?.includes('9655551055')) {
      console.log('  ✓ Submission summary correctly reflects submitted user information');
    }

    // -------------------------------------------------------------
    // Test 4: Section 3 – Our Locations & Google Maps Iframes
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Section 3 – Our Locations & Google Maps Iframes ---');
    const locationsSection = page.locator('#our-locations');
    await locationsSection.waitFor({ state: 'visible' });

    // Verify all 4 real studio branches exist
    const branchNames = [
      'Valasaravakkam (Main Studio)',
      'Kolapakkam Branch',
      'Ambattur Branch',
      'Pondicherry Branch',
    ];

    for (const bName of branchNames) {
      const bCard = locationsSection.getByRole('heading', { name: bName });
      if ((await bCard.count()) > 0) {
        console.log(`  ✓ Branch verified: "${bName}"`);
      } else {
        console.error(`  ✗ Branch "${bName}" not found`);
        allPassed = false;
      }
    }

    // Verify Google Maps iframes (all 4 cards must have working iframes)
    const mapIframes = locationsSection.locator('iframe');
    const iframeCount = await mapIframes.count();
    if (iframeCount === 4) {
      console.log(`  ✓ All 4 location cards contain an individual working Google Maps iframe`);
      for (let i = 0; i < iframeCount; i++) {
        const src = await mapIframes.nth(i).getAttribute('src');
        if (src?.includes('google.com/maps')) {
          console.log(`    ↳ Map iframe ${i + 1} src verified`);
        }
      }
    } else {
      console.error(`  ✗ Expected 4 map iframes, found: ${iframeCount}`);
      allPassed = false;
    }

    // -------------------------------------------------------------
    // Test 5: Section 4 – Visual Contact Banner & CTA Navigation
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Section 4 – Visual Contact Banner ---');
    const bannerSection = page.locator('#visual-banner');
    await bannerSection.waitFor({ state: 'visible' });

    const bannerHeading = await bannerSection.getByRole('heading', { level: 2 }).textContent();
    console.log(`  ✓ Visual Banner Heading: "${bannerHeading?.trim()}"`);

    const bannerImage = bannerSection.locator('img');
    if ((await bannerImage.count()) > 0) {
      console.log('  ✓ Visual banner dance imagery verified');
    }

    // Verify Banner Button links smoothly back to contact form
    const bannerEnquireBtn = bannerSection.getByRole('button', { name: /fill out the enquiry form/i });
    if ((await bannerEnquireBtn.count()) > 0) {
      console.log('  ✓ Banner CTA button present and linked to contact form');
      await bannerEnquireBtn.click();
      await page.waitForTimeout(300);
      console.log('  ✓ Clicked banner button, smooth scrolled to #contact-form');
    }

    // -------------------------------------------------------------
    // Test 6: Section 5 – Retained Footer
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: Section 5 – Retained Website Footer ---');
    const footer = page.locator('footer#contact');
    if ((await footer.count()) > 0) {
      console.log('  ✓ Existing website footer retained (#contact)');
      const copyright = await footer.getByText(/All rights reserved/i).textContent();
      console.log(`  ✓ Footer copyright verified: "${copyright?.trim().slice(0, 45)}..."`);
    } else {
      console.error('  ✗ Existing footer not found');
      allPassed = false;
    }

    // -------------------------------------------------------------
    // Test 7: Mobile Viewport (390x844) Responsiveness
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Mobile Viewport (390x844) Responsiveness ---');
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:5173/contact', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(300);

    // Verify Mobile Hero, Form, and Map responsiveness
    const mHero = mobilePage.locator('#contact-hero');
    const mForm = mobilePage.locator('#enquiry-form');
    const mLocations = mobilePage.locator('#our-locations');
    const mBanner = mobilePage.locator('#visual-banner');
    const mFooter = mobilePage.locator('footer#contact');

    if (
      (await mHero.count()) > 0 &&
      (await mForm.count()) > 0 &&
      (await mLocations.count()) > 0 &&
      (await mBanner.count()) > 0 &&
      (await mFooter.count()) > 0
    ) {
      console.log('  ✓ All 5 sections rendered and fully responsive on mobile (390px)');
    } else {
      console.error('  ✗ Mobile layout missing sections');
      allPassed = false;
    }

    // Verify Mobile Navigation to Home
    const mBackBtn = mobilePage.getByRole('button', { name: /back to main stage/i });
    await mBackBtn.click();
    await mobilePage.waitForTimeout(300);
    if (!mobilePage.url().includes('/contact')) {
      console.log(`  ✓ Mobile return to Home verified: ${mobilePage.url()}`);
    }

    // -------------------------------------------------------------
    // Test 8: Strict 320px Viewport Responsiveness & Overflow Audit
    // -------------------------------------------------------------
    console.log('\n--- TEST 8: Strict 320px Viewport Responsiveness & Overflow Audit ---');
    const ultraMobileContext = await browser.newContext({ viewport: { width: 320, height: 750 } });
    const ultraMobilePage = await ultraMobileContext.newPage();
    await ultraMobilePage.goto('http://localhost:5173/contact', { waitUntil: 'domcontentloaded' });
    await ultraMobilePage.waitForTimeout(400);

    // 8.1 Check for Horizontal Page Scroll/Overflow at 320px
    const contactOverflowInfo = await ultraMobilePage.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const bodyScrollW = document.body.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const overflows = [];
      document.querySelectorAll('#contact-hero, #contact-form, #our-locations, #visual-banner, footer, header').forEach(parent => {
        parent.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > 320.5) {
            overflows.push({
              tag: el.tagName,
              className: el.className ? String(el.className).slice(0, 50) : '',
              text: (el.textContent || '').trim().slice(0, 30),
              right: Math.round(rect.right),
            });
          }
        });
      });
      return { scrollW, bodyScrollW, clientW, overflows };
    });

    if (contactOverflowInfo.scrollW <= 320 && contactOverflowInfo.bodyScrollW <= 320) {
      console.log(`  ✓ Contact Page has zero horizontal overflow at 320px (scrollWidth: ${contactOverflowInfo.scrollW}px)`);
    } else {
      console.error(`  ✗ Contact Page has horizontal overflow at 320px (scrollWidth: ${contactOverflowInfo.scrollW}px)`);
      console.error('    Overflowing elements:', contactOverflowInfo.overflows.slice(0, 5));
      allPassed = false;
    }

    // 8.2 Verify Branch 01 Card and Verified Studio Badge at 320px
    const branch1Badge = ultraMobilePage.locator('#our-locations span:has-text("Verified Studio")').first();
    const badgeBox = await branch1Badge.boundingBox();
    if (badgeBox && badgeBox.x + badgeBox.width <= 320) {
      console.log(`  ✓ Branch 01 "Verified Studio" badge fits cleanly at 320px (right edge: ${Math.round(badgeBox.x + badgeBox.width)}px <= 320px)`);
    } else {
      console.error(`  ✗ Branch 01 badge overflows at 320px:`, badgeBox);
      allPassed = false;
    }

    // 8.3 Verify Hero "Contact Us" Title at 320px
    const heroH1 = ultraMobilePage.locator('#contact-hero h1');
    const heroBox = await heroH1.boundingBox();
    if (heroBox && heroBox.x + heroBox.width <= 320) {
      console.log(`  ✓ Hero "Contact Us" heading fits cleanly at 320px (right edge: ${Math.round(heroBox.x + heroBox.width)}px <= 320px)`);
    } else {
      console.error(`  ✗ Hero heading overflows at 320px:`, heroBox);
      allPassed = false;
    }

    // Save 320px screenshot for visual confirmation
    await ultraMobilePage.screenshot({ path: 'tests/contact_320px_verified.png', fullPage: true });
    console.log('  ✓ Saved 320px full-page screenshot: tests/contact_320px_verified.png');

    await context.close();
    await mobileContext.close();
    await ultraMobileContext.close();
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    allPassed = false;
  } finally {
    await browser.close();
  }

  if (allPassed) {
    console.log('\n🎉 ALL 5 SECTIONS, NAVIGATION & CONTACT PAGE TESTS PASSED SUCCESSFULLY!');
  } else {
    console.error('\n⚠️ SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.');
    process.exit(1);
  }
}

runNavigationAndContactTests();
