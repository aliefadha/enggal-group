import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/outlet')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/outlet"!</div>
}
