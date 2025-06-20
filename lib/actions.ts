'use server'

import { createServerAction } from 'zsa'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Types } from 'mongoose'
import dbConnect from '@/lib/mongodb'
import Widget from '@/models/Widget'
import { WidgetType } from '@/types/widget'

const WidgetTypeSchema = z.nativeEnum(WidgetType)

export const getWidgetsAction = createServerAction()
  .handler(async () => {
    await dbConnect()
    const widgets = await Widget.find()
    console.log(widgets)
    revalidatePath('/')
    return widgets.map(widget => ({
      id: (widget._id as Types.ObjectId).toString(),
      type: widget.type,
      text: widget.text || '',
      createdAt: widget.createdAt,
      updatedAt: widget.updatedAt
    }))
  })

export const createWidgetAction = createServerAction()
  .input(z.object({
    type: WidgetTypeSchema.optional().default(WidgetType.TEXT)
  }))
  .handler(async ({ input }) => {
    await dbConnect()
    
    const widget = await Widget.create({
      type: input.type,
      text: ''
    })
    
    revalidatePath('/')
    
    return {
      id: (widget._id as Types.ObjectId).toString(),
      type: widget.type,
      text: widget.text || '',
      createdAt: widget.createdAt,
      updatedAt: widget.updatedAt
    }
  })

export const updateWidgetAction = createServerAction()
  .input(z.object({
    id: z.string().min(1, 'Widget ID is required'),
    type: WidgetTypeSchema.optional(),
    text: z.string().optional()
  }))
  .handler(async ({ input }) => {
    await dbConnect()
    
    const { id, ...updateData } = input
    
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
    
    if (!widget) {
      throw new Error('Widget not found')
    }
    
    revalidatePath('/')
    
    return {
      id: (widget._id as Types.ObjectId).toString(),
      type: widget.type,
      text: widget.text || '',
      createdAt: widget.createdAt,
      updatedAt: widget.updatedAt
    }
  })

export const deleteWidgetAction = createServerAction()
  .input(z.object({
    id: z.string().min(1, 'Widget ID is required')
  }))
  .handler(async ({ input }) => {
    await dbConnect()
    
    const widget = await Widget.findByIdAndDelete(input.id)
    
    if (!widget) {
      throw new Error('Widget not found')
    }
    
    revalidatePath('/')
    return { success: true }
  })