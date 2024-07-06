import OwnerLayout from "@/components/layout/owner";
import Promotions from "@/pages/owner/promotions";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/owner/promotions")({
  component: () => (
    <OwnerLayout>
      <Promotions />
    </OwnerLayout>
  )
});
