import EmployeeLayout from "@/components/layout/employee";
import Products from "@/pages/employee/products";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/employee/")({
  component: Index
});

function Index() {
  return (
    <EmployeeLayout>
      <Products />
    </EmployeeLayout>
  );
}
