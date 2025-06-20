import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Polyfills for Node.js environment
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Next.js cache functions
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

// Mock environment variables for tests
process.env.MONGODB_URI = 'mongodb://widgets_user:widgets_password@localhost:27017/widgets_db?authSource=widgets_db'