"use client"

import { AddWidgetButton } from "@/components/add-widget-button"
import { WidgetRenderer } from "@/components/widget-renderer"
import { getWidgetsAction } from "@/lib/actions"
import { useServerActionQuery } from "@/hooks/serverActionHook"

export function WidgetsList() {
  const { data: widgets, error, isLoading } = useServerActionQuery(
    getWidgetsAction,
    {},
    {}
  )

  if (error) {
    console.error(error)
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Loading widgets...</div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Widgets App</h1>
        <AddWidgetButton />
      </div>

      <div className="space-y-4">
        {widgets?.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No widgets yet. Click &quot;Add Widget&quot; to get started.
          </div>
        ) : (
          widgets?.map((widget) => (
            <WidgetRenderer
              key={widget.id}
              widget={widget}
            />
          ))
        )}
      </div>
    </>
  )
}