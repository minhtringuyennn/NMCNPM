import OwnerLayout from "@/components/layout/owner";
import Dashboard from "@/pages/owner/dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/owner/")({
  component: Index
});

function Index() {
  return (
    <OwnerLayout>
      <Dashboard />
    </OwnerLayout>
  );
}
