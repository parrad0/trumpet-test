import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './tests/e2e/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: './tests/e2e/playwright-report' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    env: {
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb://widgets_user:widgets_password@localhost:27017/widgets_db?authSource=widgets_db'
    }
  },
})