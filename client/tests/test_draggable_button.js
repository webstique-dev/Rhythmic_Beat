import { chromium } from 'playwright';

async function testDraggable() {
  console.log('🚀 Testing Draggable Floating Workshop Button...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173');
    // Dismiss the auto popup if open or set sessionStorage before
    await page.evaluate(() => {
      sessionStorage.setItem('rbdc_workshop_popup_dismissed', 'true');
    });
    await page.reload();

    const button = await page.waitForSelector('#floating-workshop-btn', { timeout: 4000 });
    const initialBox = await button.boundingBox();
    console.log('Initial button bounding box:', initialBox);

    // 1. Drag the button to a new location (e.g., towards the center-left: x=200, y=300)
    console.log('Dragging button from bottom-right to x=200, y=300...');
    await page.mouse.move(initialBox.x + initialBox.width / 2, initialBox.y + initialBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(200, 300, { steps: 15 });
    await page.mouse.up();
    await page.waitForTimeout(300);

    const draggedBox = await button.boundingBox();
    console.log('New button bounding box after drag:', draggedBox);

    // Verify button actually moved
    if (Math.abs(draggedBox.x - initialBox.x) < 50 || Math.abs(draggedBox.y - initialBox.y) < 50) {
      throw new Error(`Button did not move significantly. From (${initialBox.x}, ${initialBox.y}) to (${draggedBox.x}, ${draggedBox.y})`);
    }
    console.log('✅ Button successfully dragged to new coordinates!');

    // Verify modal did NOT open during drag
    const modalDuringDrag = await page.$('div[role="dialog"]');
    if (modalDuringDrag) {
      throw new Error('Modal unexpectedly opened after drag!');
    }
    console.log('✅ Verified: Dragging does not trigger modal popup.');

    // 2. Click without dragging on the new location -> Should open the modal!
    console.log('Clicking button at its new location without dragging...');
    await button.click();
    await page.waitForSelector('div[role="dialog"]', { timeout: 3000 });
    console.log('✅ Modal opened on click at the new location!');

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // 3. Test dragging again to a top position (e.g. x=600, y=100)
    const currentBox = await button.boundingBox();
    await page.mouse.move(currentBox.x + currentBox.width / 2, currentBox.y + currentBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(600, 100, { steps: 15 });
    await page.mouse.up();
    await page.waitForTimeout(300);

    const finalBox = await button.boundingBox();
    console.log('Final button bounding box:', finalBox);
    if (Math.abs(finalBox.x - 600) > 80 || Math.abs(finalBox.y - 100) > 80) {
      throw new Error('Button did not move to target top position');
    }
    console.log('✅ Second drag to top area succeeded!');

    // Take screenshot of draggable button in action
    await page.screenshot({ path: 'tests/dragged_button_screenshot.png' });
    console.log('Captured tests/dragged_button_screenshot.png');

    console.log('\n🎉 ALL DRAG & DROP TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Drag test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

testDraggable();
