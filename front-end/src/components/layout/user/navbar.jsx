import useUserStore from "@/stores/user";
import { useNavigate } from "@tanstack/react-router";
import { Layout, Menu } from "antd";
import { ChevronDown, House, ShoppingBag, Truck, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const { Header } = Layout;

const UserNavbar = () => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();
  const [currentKey, setCurrentKey] = useState("home");
  const isOwnerAndEmployee = user?.role === "owner" || user?.role === "employee";

  const items_left = [
    { key: "home", label: "Home", onClick: () => navigate({ to: "/" }) },
    { key: "about", label: "About", onClick: () => navigate({ to: "/about" }) },
    {
      key: "products",
      label: "Products",
      children: [
        { key: "beverage", label: "Beverage", onClick: () => navigate({ to: "/products/beverage" }) },
        { key: "coffee", label: "Coffee", onClick: () => navigate({ to: "/products/coffee" }) }
      ]
    },
    { key: "recruitment", label: "Recruitment", onClick: () => navigate({ to: "/recruitment" }) }
  ];

  const user_nav = !isOwnerAndEmployee
    ? [
        {
          key: "tracking",
          icon: (
            <div style={{ verticalAlign: "middle" }}>
              <Truck />
            </div>
          ),
          label: "Tracking orders",
          onClick: () => navigate({ to: "/tracking" })
        },
        {
          key: "cart",
          icon: (
            <div style={{ verticalAlign: "middle" }}>
              <ShoppingBag />
            </div>
          ),
          label: "Cart",
          onClick: () => navigate({ to: "/cart" })
        }
      ]
    : [];

  const items_right = [
    ...user_nav,
    {
      key: "account",
      icon: (
        <div style={{ verticalAlign: "middle" }}>
          <User />
        </div>
      ),
      label: "Account",
      onClick: () => navigate({ to: "/account" })
    }
  ];

  const allItems = items_left.concat(items_right);

  const findCurrentKey = (items, path) => {
    for (let item of items) {
      if (item.children) {
        const found = findCurrentKey(item.children, path);
        if (found) return found;
      }
      if (path.includes(item.key)) return item.key;
    }
    return null;
  };

  useEffect(() => {
    const path = window.location.pathname;
    const key = findCurrentKey(allItems, path) || "home";
    setCurrentKey(key);
  }, [allItems]);

  items_left.forEach((item) => {
    if (item.children) {
      item.label = (
        <div className="flex items-center">
          {item.label}
          <ChevronDown size={16} className="ml-1" />
        </div>
      );
    }
  });

  return (
    <Header className="bg-[#F3841D]">
      <div className="flex items-center justify-between">
        <div
          className="flex text-white text-xl font-bold mr-8 items-center cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        >
          <House size={24} />
          <span className="ml-2">Nhà</span>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentKey]}
          className="bg-transparent border-none w-full"
          items={items_left}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentKey]}
          className="bg-transparent border-none w-full justify-end"
          items={items_right}
        />
      </div>
    </Header>
  );
};

export default UserNavbar;
