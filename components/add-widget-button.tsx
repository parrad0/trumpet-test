"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { createWidgetAction } from "@/lib/actions"
import { useServerActionMutation } from "@/hooks/serverActionHook"
import { useRouter } from "next/navigation"

export function AddWidgetButton() {
  const router = useRouter()
  const createMutation = useServerActionMutation(createWidgetAction, {
    onSuccess: () => {
      router.refresh()
    }
  })

  const handleAddWidget = () => {
    createMutation.mutate({})
  }

  return (
    <Button 
      onClick={handleAddWidget} 
      className="flex items-center gap-2" 
      data-testid="add-widget-button"
      disabled={createMutation.isPending}
    >
      <Plus className="w-4 h-4" />
      {createMutation.isPending ? 'Adding...' : 'Add Widget'}
    </Button>
  )
}