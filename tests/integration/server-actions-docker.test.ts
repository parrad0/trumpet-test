import mongoose, { Types } from 'mongoose'
import Widget from '@/models/Widget'
import { WidgetType } from '@/types/widget'

describe('Server Actions Integration Tests (Docker MongoDB)', () => {
  const MONGODB_URI = 'mongodb://widgets_user:widgets_password@localhost:27017/widgets_db?authSource=widgets_db'
  
  const generateWidget = (overrides: Partial<{ type: WidgetType; text: string }> = {}) => {
    const defaults = {
      type: WidgetType.TEXT,
      text: 'Test widget'
    }
    return { ...defaults, ...overrides }
  }

  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI)
  })

  afterAll(async () => {
    await Widget.deleteMany({
      $or: [
        { text: { $regex: /test/i } },
        { text: '' }
      ]
    })
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await Widget.deleteMany({
      $or: [
        { text: { $regex: /test/i } },
        { text: '' }
      ]
    })
  })

  describe('🔍 getWidgets Action Logic', () => {
    it('should return empty array when no test widgets exist', async () => {
      const widgets = await Widget.find({
        $or: [
          { text: { $regex: /test/i } },
          { text: '' }
        ]
      })
      
      const result = widgets.map(widget => ({
        id: (widget._id as Types.ObjectId).toString(),
        type: widget.type,
        text: widget.text || '',
        createdAt: widget.createdAt,
        updatedAt: widget.updatedAt
      }))
      
      expect(result).toEqual([])
    })

    it('should return all widgets with correct format', async () => {
      const widget1 = await Widget.create(generateWidget({
        text: 'First test widget'
      }))
      
      const widget2 = await Widget.create(generateWidget({
        text: 'Second test widget'
      }))

      const widgets = await Widget.find({
        _id: { $in: [widget1._id, widget2._id] }
      })
      
      const result = widgets.map(widget => ({
        id: (widget._id as Types.ObjectId).toString(),
        type: widget.type,
        text: widget.text || '',
        createdAt: widget.createdAt,
        updatedAt: widget.updatedAt
      }))

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: (widget1._id as Types.ObjectId).toString(),
        type: WidgetType.TEXT,
        text: 'First test widget',
        createdAt: widget1.createdAt,
        updatedAt: widget1.updatedAt,
      })
      expect(result[1]).toEqual({
        id: (widget2._id as Types.ObjectId).toString(),
        type: WidgetType.TEXT,
        text: 'Second test widget',
        createdAt: widget2.createdAt,
        updatedAt: widget2.updatedAt,
      })
    })

    it('should handle widgets with empty text', async () => {
      const widget = await Widget.create(generateWidget({
        text: ''
      }))

      const foundWidget = await Widget.findById(widget._id)
      
      const result = {
        id: (foundWidget?._id as Types.ObjectId).toString(),
        type: foundWidget?.type,
        text: foundWidget?.text || '',
        createdAt: foundWidget?.createdAt,
        updatedAt: foundWidget?.updatedAt
      }

      expect(result.text).toBe('')
    })
  })

  describe('➕ createWidget Action Logic', () => {
    it('should create widget with default type', async () => {
      const widget = await Widget.create(generateWidget({
        text: 'Created test widget'
      }))

      const result = {
        id: (widget._id as Types.ObjectId).toString(),
        type: widget.type,
        text: widget.text || '',
        createdAt: widget.createdAt,
        updatedAt: widget.updatedAt
      }

      expect(result).toEqual({
        id: expect.any(String),
        type: WidgetType.TEXT,
        text: 'Created test widget',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })

      const widgetInDb = await Widget.findById(result.id)
      expect(widgetInDb).toBeTruthy()
      expect(widgetInDb!.type).toBe(WidgetType.TEXT)
      expect(widgetInDb?.text).toBe('Created test widget')
    })

    it('should create widget with custom text', async () => {
      const customText = 'My custom test widget'
      const widget = await Widget.create(generateWidget({
        text: customText
      }))

      expect(widget.text).toBe(customText)
      
      const widgetInDb = await Widget.findById(widget._id)
      expect(widgetInDb?.text).toBe(customText)
    })
  })

  describe('✏️ updateWidget Action Logic', () => {
    it('should update widget text successfully', async () => {
      const createdWidget = await Widget.create(generateWidget({
        text: 'Original test text'
      }))

      const { id, ...updateData } = {
        id: (createdWidget._id as Types.ObjectId).toString(),
        text: 'Updated test text'
      }
      
      const widget = await Widget.findByIdAndUpdate(
        id,
        { 
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        },
        { new: true, runValidators: true }
      )

      expect(widget).toBeTruthy()
      expect(widget?.text).toBe('Updated test text')
      expect(widget?.updatedAt?.getTime()).toBeGreaterThanOrEqual(
        createdWidget.updatedAt.getTime()
      )

      const updatedWidget = await Widget.findById(createdWidget._id)
      expect(updatedWidget?.text).toBe('Updated test text')
    })

    it('should return null for non-existent widget', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString()

      const widget = await Widget.findByIdAndUpdate(
        fakeId,
        { $set: { text: 'Updated text' } },
        { new: true, runValidators: true }
      )

      expect(widget).toBeNull()
    })
  })

  describe('🗑️ deleteWidget Action Logic', () => {
    it('should delete widget successfully', async () => {
      const createdWidget = await Widget.create(generateWidget({
        text: 'To delete in test'
      }))

      const widget = await Widget.findByIdAndDelete(createdWidget._id as Types.ObjectId)

      expect(widget).toBeTruthy()

      const deletedWidget = await Widget.findById(createdWidget._id)
      expect(deletedWidget).toBeNull()
    })

    it('should return null for non-existent widget', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString()

      const widget = await Widget.findByIdAndDelete(fakeId)
      
      expect(widget).toBeNull()
    })
  })

  describe('🔄 Complete CRUD Flow', () => {
    it('should handle complete server actions flow', async () => {
      const createInput = { type: WidgetType.TEXT }
      const createdWidget = await Widget.create(generateWidget({
        type: createInput.type,
        text: 'Complete test flow'
      }))
      const createResult = {
        id: (createdWidget._id as Types.ObjectId).toString(),
        type: createdWidget.type,
        text: createdWidget.text || '',
        createdAt: createdWidget.createdAt,
        updatedAt: createdWidget.updatedAt
      }
      expect(createResult.id).toBeDefined()

      let widget = await Widget.findById(createResult.id)
      expect(widget).toBeTruthy()
      expect(widget?.text).toBe('Complete test flow')

      const updateInput = {
        id: createResult.id,
        text: 'Updated test content'
      }
      const { id, ...updateData } = updateInput
      const updatedWidget = await Widget.findByIdAndUpdate(
        id,
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true, runValidators: true }
      )
      expect(updatedWidget?.text).toBe('Updated test content')

      widget = await Widget.findById(createResult.id)
      expect(widget?.text).toBe('Updated test content')

      const deleteInput = { id: createResult.id }
      const deletedWidget = await Widget.findByIdAndDelete(deleteInput.id)
      expect(deletedWidget).toBeTruthy()

      widget = await Widget.findById(createResult.id)
      expect(widget).toBeNull()
    })
  })

  describe('✅ Input Validation', () => {
    it('should handle text length validation', async () => {
      const longText = 'test ' + 'x'.repeat(1001)

      await expect(
        Widget.create(generateWidget({
          text: longText
        }))
      ).rejects.toThrow()
    })

    it('should handle invalid widget type', async () => {
      await expect(
        Widget.create(generateWidget({
          type: 'invalid' as WidgetType,
          text: 'Some test text'
        }))
      ).rejects.toThrow()
    })

    it('should handle invalid ObjectId format', async () => {
      const invalidId = 'invalid-id'

      await expect(
        Widget.findByIdAndUpdate(invalidId, { text: 'Updated' })
      ).rejects.toThrow()
    })
  })

  describe('🏥 Connection Health', () => {
    it('should be connected to MongoDB', () => {
      expect(mongoose.connection.readyState).toBe(1)
    })

    it('should use correct database', () => {
      expect(mongoose.connection.name).toBe('widgets_db')
    })
  })
})