import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/settings")({
  component: SettingsRoute,
})

function SettingsRoute() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-sm text-muted-foreground">
        Configure your preferences and account options here.
      </p>
    </div>
  )
}
