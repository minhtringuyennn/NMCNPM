import UserLayout from "@/components/layout/user";
import Carts from "@/pages/user/carts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("//cart")({
  component: Index
});

function Index() {
  return (
    <UserLayout>
      <Carts />
    </UserLayout>
  );
}
