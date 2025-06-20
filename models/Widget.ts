import mongoose, { Schema, Document, Model } from 'mongoose'
import { WidgetType } from '@/types/widget'

export interface IWidget extends Document {
  type: WidgetType
  text?: string
  createdAt: Date
  updatedAt: Date
}

const WidgetSchema = new Schema<IWidget>(
  {
    type: {
      type: String,
      enum: Object.values(WidgetType),
      required: true,
      default: WidgetType.TEXT
    },
    text: {
      type: String,
      default: '',
      maxlength: 1000
    }
  },
  {
    timestamps: true
  }
)

const Widget: Model<IWidget> = mongoose.models.Widget || mongoose.model<IWidget>('Widget', WidgetSchema)

export default Widget