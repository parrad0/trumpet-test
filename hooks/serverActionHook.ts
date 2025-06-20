import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import {
  createServerActionsKeyFactory,
  setupServerActionHooks,
} from "zsa-react-query"

export const QueryKeyFactory = createServerActionsKeyFactory({ 
  getWidgets: () => ["getWidgets"],  
  getWidget: (id: string) => ["getWidget", id],  
  createWidget: () => ["createWidget"],  
  updateWidget: (id: string) => ["updateWidget", id],  
  deleteWidget: (id: string) => ["deleteWidget", id],  
})  

const {
  useServerActionQuery,
  useServerActionMutation,
  useServerActionInfiniteQuery,
} = setupServerActionHooks({
  hooks: {
    useQuery: useQuery,
    useMutation: useMutation,
    useInfiniteQuery: useInfiniteQuery,
  },
  queryKeyFactory: QueryKeyFactory, 
})

export {
  useServerActionInfiniteQuery,
  useServerActionMutation,
  useServerActionQuery,
}