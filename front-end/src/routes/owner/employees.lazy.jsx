import OwnerLayout from "@/components/layout/owner";
import Employees from "@/pages/owner/employees";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/owner/employees")({
  component: () => (
    <OwnerLayout>
      <Employees />
    </OwnerLayout>
  )
});
