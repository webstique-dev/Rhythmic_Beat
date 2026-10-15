import { chromium } from 'playwright';

async function verifyAllPages() {
  console.log('🚀 Starting Full Navigation Menu & 8 Pages Verification...\n');
  const browser = await chromium.launch({ headless: true });

  const pagesToTest = [
    { name: 'Home', href: '/', expectedHeading: /rhythmic/i, selector: '#portal-hero' },
    { name: 'About Us', href: '/about-us', expectedHeading: /about us/i, selector: '#about-hero h1' },
    { name: 'Courses', href: '/courses', expectedHeading: /courses/i, selector: '#courses-hero h1' },
    { name: 'Workshops', href: '/workshops', expectedHeading: /workshops/i, selector: '#workshops-hero h1' },
    { name: 'Our Facilities', href: '/our-facilities', expectedHeading: /our facilities/i, selector: '#facilities-hero h1' },
    { name: 'Franchise', href: '/franchise', expectedHeading: /franchise/i, selector: '#franchise-hero h1' },
    { name: 'Gallery', href: '/gallery', expectedHeading: /gallery/i, selector: '#gallery-hero h1' },
    { name: 'Contact Us', href: '/contact-us', expectedHeading: /contact us/i, selector: '#contact-hero h1' },
  ];

  let allPassed = true;

  try {
    // -------------------------------------------------------------
    // Test 1: Desktop Navigation Pill & Links (1440x900)
    // -------------------------------------------------------------
    console.log('--- TEST 1: Desktop (1440x900) Header Navigation Links ---');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

    for (const item of pagesToTest) {
      const link = page.locator('header nav').getByRole('link', { name: item.name, exact: true });
      const count = await link.count();
      if (count === 1) {
        console.log(`  ✓ Nav item found in pill: "${item.name}"`);
      } else {
        console.error(`  ✗ Expected exactly 1 "${item.name}" link in desktop nav, found: ${count}`);
        allPassed = false;
      }
    }

    // -------------------------------------------------------------
    // Test 2: Navigation to Each Page & Content Verification
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Clicking Each Desktop Link & Verifying Page Render ---');
    for (const item of pagesToTest) {
      console.log(`\nTesting navigation to "${item.name}"...`);
      const link = page.locator('header nav').getByRole('link', { name: item.name, exact: true });
      await link.click();
      await page.waitForTimeout(300);

      const currentUrl = page.url();
      console.log(`  ↳ URL: ${currentUrl}`);

      const heading = page.locator(item.selector);
      await heading.waitFor({ state: 'visible', timeout: 3000 });
      const text = await heading.textContent();
      if (item.expectedHeading.test(text)) {
        console.log(`  ✓ Heading matched: "${text.trim()}"`);
      } else {
        console.error(`  ✗ Heading mismatch for ${item.name}: "${text.trim()}"`);
        allPassed = false;
      }

      // Verify footer exists on each page
      const footer = page.locator('footer#contact');
      if (await footer.isVisible()) {
        console.log(`  ✓ Footer present on "${item.name}" page`);
      } else {
        console.error(`  ✗ Footer missing on "${item.name}" page`);
        allPassed = false;
      }

      // Save screenshot for each page
      const filename = `tests/page_${item.name.toLowerCase().replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: filename });
      console.log(`  ✓ Saved screenshot: ${filename}`);
    }

    // -------------------------------------------------------------
    // Test 3: Mobile Viewport (390x844) Hamburger & Navigation
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Mobile Viewport (390x844) Navigation ---');
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

    // Open mobile menu
    const menuBtn = mobilePage.getByRole('button', { name: /toggle navigation menu/i });
    await menuBtn.click();
    await mobilePage.waitForTimeout(300);

    for (const item of pagesToTest) {
      const mobileLink = mobilePage.locator('header').getByRole('link', { name: item.name, exact: true });
      const count = await mobileLink.count();
      if (count >= 1) {
        console.log(`  ✓ Mobile menu link found: "${item.name}"`);
      } else {
        console.error(`  ✗ Mobile menu link missing: "${item.name}"`);
        allPassed = false;
      }
    }

    // Click "Courses" from mobile menu
    const coursesMobile = mobilePage.locator('header').getByRole('link', { name: 'Courses', exact: true });
    await coursesMobile.click();
    await mobilePage.waitForTimeout(300);

    const mobileUrl = mobilePage.url();
    if (mobileUrl.includes('/courses')) {
      console.log(`  ✓ Mobile navigation to /courses successful: ${mobileUrl}`);
    } else {
      console.error(`  ✗ Mobile navigation to /courses failed: ${mobileUrl}`);
      allPassed = false;
    }

    // -------------------------------------------------------------
    // Test 4: Strict 320px Responsiveness & Horizontal Overflow Audit
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Strict 320px Responsiveness Audit Across All Pages ---');
    const ultraMobileContext = await browser.newContext({ viewport: { width: 320, height: 600 } });
    const ultraMobilePage = await ultraMobileContext.newPage();

    for (const item of pagesToTest) {
      await ultraMobilePage.goto(`http://localhost:5173${item.href}`, { waitUntil: 'domcontentloaded' });
      await ultraMobilePage.waitForTimeout(200);

      const overflow = await ultraMobilePage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      const scrollWidth = await ultraMobilePage.evaluate(() => document.documentElement.scrollWidth);
      if (!overflow) {
        console.log(`  ✓ No horizontal overflow on "${item.name}" at 320px (width: ${scrollWidth}px)`);
      } else {
        console.error(`  ✗ Horizontal overflow detected on "${item.name}" at 320px (scrollWidth: ${scrollWidth}px)`);
        allPassed = false;
      }
    }

    await context.close();
    await mobileContext.close();
    await ultraMobileContext.close();
  } catch (err) {
    console.error('❌ Verification failed with error:', err);
    allPassed = false;
  } finally {
    await browser.close();
  }

  if (allPassed) {
    console.log('\n🎉 ALL 8 PAGES & NAVIGATION VERIFICATIONS PASSED WITH ZERO ERRORS!');
  } else {
    console.error('\n⚠️ VERIFICATION DETECTED ISSUES. SEE LOGS ABOVE.');
    process.exit(1);
  }
}

verifyAllPages();
