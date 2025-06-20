import { WidgetsList } from '@/components/widgets-list'
import { Suspense } from 'react'
import Loading from './loading'

export default async function Home() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<Loading />}>
          <WidgetsList />
        </Suspense>
      </div>
    </div>
  )
}