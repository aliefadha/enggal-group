import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: DashboardLayout,
});
