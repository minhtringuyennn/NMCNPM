import UserLayout from "@/components/layout/user";
import LandingPage from "@/pages/user/landing-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//")({
  component: Index
});

function Index() {
  return (
    <UserLayout>
      <LandingPage />
    </UserLayout>
  );
}
