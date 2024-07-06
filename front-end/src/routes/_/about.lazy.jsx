import UserLayout from "@/components/layout/user";
import About from "@/pages/user/about";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//about")({
  component: () => (
    <UserLayout>
      <About />
    </UserLayout>
  )
});
