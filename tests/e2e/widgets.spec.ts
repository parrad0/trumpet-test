import { test, expect } from '@playwright/test'
import dbConnect from '@/lib/mongodb'
import Widget from '@/models/Widget'

test.describe.serial('Widgets E2E', () => {
  test.beforeEach(async () => {
    // Connect to database and clean up before each test
    await dbConnect()
    await Widget.deleteMany({})
    // Wait a bit to ensure cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 500))
  })

  test.afterEach(async () => {
    // Clean up after each test
    await Widget.deleteMany({})
  })

  test('should add a widget when clicking add button and verify in database', async ({ page }) => {
    // Navigate to the app
    await page.goto('/')
    
    // Wait for the page to load
    await expect(page.getByText('Widgets App')).toBeVisible()
    
    // Get initial widget count from database
    const initialCount = await Widget.countDocuments()
    
    // Click the add widget button
    const addButton = page.getByTestId('add-widget-button')
    await expect(addButton).toBeVisible()
    await addButton.click()
    
    // Wait for the widget to be added and page to refresh
    await page.waitForTimeout(3000) // Give time for the mutation and refresh
    
    // Verify in database that a widget was actually created
    const finalCount = await Widget.countDocuments()
    expect(finalCount).toBe(initialCount + 1)
    
    // Get the created widget and verify its properties
    const allWidgets = await Widget.find()
    expect(allWidgets.length).toBeGreaterThan(0)
    
    // Check if widget appears in UI
    const widgetElements = page.locator('[data-testid^="text-widget-"]')
    const widgetCount = await widgetElements.count()
    expect(widgetCount).toBeGreaterThan(0)
  })

  test('should add multiple widgets and verify all in database', async ({ page }) => {
    await page.goto('/')
    
    // Add first widget
    await page.getByTestId('add-widget-button').click()
    await page.waitForTimeout(1000)
    
    // Add second widget
    await page.getByTestId('add-widget-button').click()
    await page.waitForTimeout(1000)
    
    // Add third widget
    await page.getByTestId('add-widget-button').click()
    await page.waitForTimeout(2000)
    
    // Verify 3 widgets appear in UI
    const widgets = page.locator('[data-testid^="text-widget-"]')
    await expect(widgets).toHaveCount(3)
    
    // Verify 3 widgets exist in database
    const dbCount = await Widget.countDocuments()
    expect(dbCount).toBe(3)
    
    // Verify all widgets have correct type
    const allWidgets = await Widget.find()
    allWidgets.forEach(widget => {
      expect(widget.type).toBe('text')
      expect(widget.text).toBe('')
    })
  })

  test('should handle widget text changes and save to database', async ({ page }) => {
    await page.goto('/')
    
    // Add a widget
    await page.getByTestId('add-widget-button').click()
    await page.waitForTimeout(2000)
    
    // Find the first textarea and type text
    const textarea = page.getByTestId('widget-textarea').first()
    await expect(textarea).toBeVisible()
    await textarea.fill('Hello from E2E test!')
    
    // Wait for debounced save
    await page.waitForTimeout(3000)
    
    // Verify in database that content was saved
    const widget = await Widget.findOne()
    expect(widget?.text).toBe('Hello from E2E test!')
  })
})