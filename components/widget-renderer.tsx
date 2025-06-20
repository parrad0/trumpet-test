"use client"

import { useServerActionMutation } from "@/hooks/serverActionHook"
import { deleteWidgetAction, updateWidgetAction } from "@/lib/actions"
import { Widget, WidgetType } from '@/types/widget'
import { useRouter } from "next/navigation"
import TextWidget from './text-widget'

export function WidgetRenderer({ widget }: { widget: Widget }) {
  const router = useRouter()
  
  const updateMutation = useServerActionMutation(updateWidgetAction, {
    onSuccess: () => {
      router.refresh()
    }
  })
  
  const deleteMutation = useServerActionMutation(deleteWidgetAction, {
    onSuccess: () => {
      router.refresh()
    }
  })

  const handleUpdate = (updatedWidget: Widget) => {
    updateMutation.mutate({
      id: updatedWidget.id,
      type: updatedWidget.type,
      text: updatedWidget.text
    })
  }

  const handleRemove = () => {
    deleteMutation.mutate({ id: widget.id })
  }
  switch (widget.type) {
    case WidgetType.TEXT:
      return (
        <TextWidget
          id={widget.id}
          initialText={widget.text}
          onTextChange={(text) => handleUpdate({ ...widget, text })}
          onRemove={handleRemove}
        />
      )
    
    // Future widget types can be added here
    // case WidgetType.IMAGE:
    //   return <ImageWidget ... />
    // case WidgetType.CHART:
    //   return <ChartWidget ... />
    
    default:
      return (
        <TextWidget
          id={widget.id}
          initialText={widget.text}
          onTextChange={(text) => handleUpdate({ ...widget, text })}
          onRemove={handleRemove}
        />
      )
  }
}