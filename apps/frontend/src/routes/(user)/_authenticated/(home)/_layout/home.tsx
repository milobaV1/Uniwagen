import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(user)/_authenticated/(home)/_layout/home',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/_authenticated/(home)/_layout/home"!</div>
}
