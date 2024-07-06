import UserLayout from "@/components/layout/user";
import AccountSigUp from "@/pages/user/account-signup";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//signup")({
  component: Index
});

function Index() {
  return (
    <UserLayout>
      <AccountSigUp />
    </UserLayout>
  );
}
