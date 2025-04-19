import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/_layout/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/_layout/(auth)/login"!</div>
}
