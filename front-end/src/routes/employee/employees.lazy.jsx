import EmployeesLayout from "@/components/layout/employee";
import Employees from "@/pages/employee/employees";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/employee/employees")({
  component: () => (
    <EmployeesLayout>
      <Employees />
    </EmployeesLayout>
  )
});
