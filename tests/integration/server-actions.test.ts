import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import mongoose from 'mongoose'
import { WidgetType } from '@/types/widget'
import Widget from '@/models/Widget'
import {
  getWidgetsAction,
  createWidgetAction,
  updateWidgetAction,
  deleteWidgetAction
} from '@/lib/actions'

describe('Server Actions Integration Tests', () => {
  const MONGODB_URI = 'mongodb://widgets_user:widgets_password@localhost:27017/widgets_db?authSource=widgets_db'

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI)
    }
  })

  afterAll(async () => {
    // Only clean up test data, don't disconnect if other tests might be running
    await Widget.deleteMany({})
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
    }
  })

  beforeEach(async () => {
    // Clean database before each test for isolation
    await Widget.deleteMany({})
  })

  describe('🔍 getWidgetsAction', () => {
    it('should return empty array when no widgets exist', async () => {
      const [data, error] = await getWidgetsAction()

      expect(error).toBeNull()
      expect(data).toEqual([])
    })

    it('should return created widgets', async () => {
      // Create widgets via server action
      const [widget1] = await createWidgetAction({ type: WidgetType.TEXT })
      const [widget2] = await createWidgetAction({ type: WidgetType.TEXT })
      
      await updateWidgetAction({
        id: widget1!.id,
        text: 'First widget'
      })
      
      await updateWidgetAction({
        id: widget2!.id,
        text: 'Second widget'
      })

      // Verify via server action
      const [data] = await getWidgetsAction()
      
      expect(data).toHaveLength(2)
      
      // Verify data exists in database directly
      const dbWidgets = await Widget.find({})
      expect(dbWidgets).toHaveLength(2)
      expect(dbWidgets[0].text).toBe('First widget')
      expect(dbWidgets[1].text).toBe('Second widget')
    })
  })

  describe('➕ createWidgetAction', () => {
    it('should create widget successfully', async () => {
      const [data, error] = await createWidgetAction({ type: WidgetType.TEXT })

      expect(error).toBeNull()
      expect(data).toEqual({
        id: expect.any(String),
        type: WidgetType.TEXT,
        text: '',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })

      // Verify in database directly
      const dbWidget = await Widget.findById(data!.id)
      expect(dbWidget).toBeTruthy()
      expect(dbWidget!.type).toBe(WidgetType.TEXT)
      expect(dbWidget!.text).toBe('')
    })

    it('should handle validation errors', async () => {
      const [data, error] = await createWidgetAction({ type: 'INVALID' as WidgetType })

      expect(data).toBeNull()
      expect(error).toBeDefined()
      expect(error?.code).toBe('INPUT_PARSE_ERROR')

      // Verify nothing was created in database
      const dbWidgets = await Widget.find({})
      expect(dbWidgets).toHaveLength(0)
    })
  })

  describe('✏️ updateWidgetAction', () => {
    it('should update widget text', async () => {
      const [created] = await createWidgetAction({ type: WidgetType.TEXT })
      
      const [updated, error] = await updateWidgetAction({
        id: created!.id,
        text: 'Updated text'
      })

      expect(error).toBeNull()
      expect(updated!.text).toBe('Updated text')

      // Verify in database directly
      const dbWidget = await Widget.findById(created!.id)
      expect(dbWidget!.text).toBe('Updated text')
      expect(dbWidget!.updatedAt.getTime()).toBeGreaterThan(dbWidget!.createdAt.getTime())
    })

    it('should handle non-existent widget', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString()

      const [data, error] = await updateWidgetAction({
        id: fakeId,
        text: 'Updated text'
      })

      expect(data).toBeNull()
      expect(error).toBeDefined()
      expect(error?.message).toContain('Widget not found')
    })

    it('should validate required fields', async () => {
      const [data, error] = await updateWidgetAction({
        id: '',
        text: 'Some text'
      })

      expect(data).toBeNull()
      expect(error).toBeDefined()
      expect(error?.code).toBe('INPUT_PARSE_ERROR')
    })
  })

  describe('🗑️ deleteWidgetAction', () => {
    it('should delete widget', async () => {
      const [created] = await createWidgetAction({ type: WidgetType.TEXT })

      const [result, error] = await deleteWidgetAction({ id: created!.id })

      expect(error).toBeNull()
      expect(result!.success).toBe(true)

      // Verify deletion in database directly
      const dbWidget = await Widget.findById(created!.id)
      expect(dbWidget).toBeNull()
    })

    it('should handle non-existent widget', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString()

      const [data, error] = await deleteWidgetAction({ id: fakeId })

      expect(data).toBeNull()
      expect(error).toBeDefined()
      expect(error?.message).toContain('Widget not found')
    })
  })

  describe('🔄 Complete CRUD Flow', () => {
    it('should handle full CRUD operations', async () => {
      // CREATE
      const [created] = await createWidgetAction({ type: WidgetType.TEXT })
      expect(created!.id).toBeDefined()

      // Verify CREATE in database
      let dbWidget = await Widget.findById(created!.id)
      expect(dbWidget).toBeTruthy()

      // UPDATE
      const [updated] = await updateWidgetAction({
        id: created!.id,
        text: 'Updated content'
      })
      expect(updated!.text).toBe('Updated content')

      // Verify UPDATE in database
      dbWidget = await Widget.findById(created!.id)
      expect(dbWidget!.text).toBe('Updated content')

      // DELETE
      const [deleted] = await deleteWidgetAction({ id: created!.id })
      expect(deleted!.success).toBe(true)

      // Verify DELETE in database
      dbWidget = await Widget.findById(created!.id)
      expect(dbWidget).toBeNull()
    })
  })

  describe('✅ Input Validation', () => {
    it('should handle text length validation', async () => {
      const [created] = await createWidgetAction({ type: WidgetType.TEXT })
      
      const longText = 'x'.repeat(1001) // Exceeds maxlength of 1000
      
      const [data, error] = await updateWidgetAction({
        id: created!.id,
        text: longText
      })

      expect(data).toBeNull()
      expect(error).toBeDefined()

      // Verify original widget unchanged in database
      const dbWidget = await Widget.findById(created!.id)
      expect(dbWidget!.text).toBe('')
    })

    it('should handle invalid ObjectId format', async () => {
      const [data1, error1] = await updateWidgetAction({
        id: 'invalid-id',
        text: 'Updated'
      })

      expect(data1).toBeNull()
      expect(error1).toBeDefined()

      const [data2, error2] = await deleteWidgetAction({ id: 'invalid-id' })

      expect(data2).toBeNull()
      expect(error2).toBeDefined()
    })
  })
})