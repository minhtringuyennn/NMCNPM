import { useNavigate } from "@tanstack/react-router";
import { Menu } from "antd";
import { House, Percent, PieChart, ShoppingBag, ShoppingCart, UsersRound } from "lucide-react";
import React from "react";

const OwnerNavbar = () => {
  const navigate = useNavigate();
  const prefix = "/owner";

  const items = [
    {
      key: "1",
      icon: (
        <div style={{ verticalAlign: "middle" }}>
          <PieChart />
        </div>
      ),
      label: "Dashboard",
      onClick: () => navigate({ to: `${prefix}/dashboard` })
    },
    {
      key: "2",
      icon: (
        <div style={{ verticalAlign: "middle" }}>
          <ShoppingBag />
        </div>
      ),
      label: "Products",
      onClick: () => navigate({ to: `${prefix}/products` })
    },
    {
      key: "3",
      icon: (
        <div style={{ verticalAlign: "middle" }}>
          <ShoppingCart />
        </div>
      ),
      label: "Orders",
      onClick: () => navigate({ to: `${prefix}/orders` })
    },
    {
      key: "4",
      icon: (
        <div style={{ verticalAlign: "middle" }}>
          <Percent />
        </div>
      ),
      label: "Promotions",
      onClick: () => navigate({ to: `${prefix}/promotions` })
    },
    {
      key: "5",
      icon: (
        <div style={{ verticalAlign: "middle" }}>
          <UsersRound />
        </div>
      ),
      label: "Employees",
      onClick: () => navigate({ to: `${prefix}/employees` })
    }
  ];

  const currentKey = items.find((item) => window.location.pathname.includes(item.label.toLowerCase()))?.key || "1";

  return (
    <div className="min-w-48 bg-[#F3841D]">
      <div
        className="text-white text-xl font-bold cursor-pointer flex items-center p-5"
        onClick={() => navigate({ to: "/" })}
      >
        <House size={24} />
        <span className="ml-2">Nhà</span>
      </div>
      <Menu defaultSelectedKeys={[currentKey]} mode="vertical" theme="dark" items={items} style={{ flex: "auto" }} />
    </div>
  );
};

export default OwnerNavbar;
