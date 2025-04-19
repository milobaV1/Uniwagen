import { createFileRoute } from '@tanstack/react-router'
import Home from '../../pages/home'

export const Route = createFileRoute('/(user)/_layout')({
  component: Home,
})

function RouteComponent() {
  return <div>Hello "/(user)/_layout"!</div>
}
