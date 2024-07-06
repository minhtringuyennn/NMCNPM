import Navbar from "@/components/layout/employee/navbar";
import useUserStore from "@/stores/user";
import { useNavigate } from "@tanstack/react-router";

export default function ({ children }) {
  const navigate = useNavigate();
  const { user } = useUserStore();

  if (!user || user.role !== "employee") {
    navigate({ to: "/" }).then(() => window.location.reload());
  }

  return (
    <div className="flex bg-[#F2F4F4]">
      <Navbar />
      <div className="p-4 h-screen overflow-y-auto w-full">{children}</div>
    </div>
  );
}
