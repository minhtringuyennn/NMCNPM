import UserLayout from "@/components/layout/user";
import AccountInformation from "@/pages/user/account-info";
import AccountSigIn from "@/pages/user/account-signin";
import useUserStore from "@/stores/user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//account")({
  component: Index
});

function Index() {
  const { user } = useUserStore();

  return <UserLayout>{user ? <AccountInformation /> : <AccountSigIn />}</UserLayout>;
}
