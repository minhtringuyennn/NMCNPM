import UserLayout from "@/components/layout/user";
import Recruitment from "@/pages/user/recruitment";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//recruitment")({
  component: Index
});

function Index() {
  return (
    <UserLayout>
      <Recruitment />
    </UserLayout>
  );
}
