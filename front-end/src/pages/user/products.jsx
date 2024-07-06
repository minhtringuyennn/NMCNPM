import { useNavigate } from "@tanstack/react-router";
import { Image, Menu, Typography } from "antd";
import { useEffect, useState } from "react";

const productsData = [
  {
    key: "1",
    name: "Product A",
    description: "Description of Product A",
    imageUrl: "https://via.placeholder.com/200",
    type: "tea"
  },
  {
    key: "2",
    name: "Product B",
    description: "Description of Product B",
    imageUrl: "https://via.placeholder.com/200",
    type: "tea"
  },
  {
    key: "3",
    name: "Product C",
    description: "Description of Product C",
    imageUrl: "https://via.placeholder.com/200",
    type: "coffee"
  },
  {
    key: "4",
    name: "Product D",
    description: "Description of Product D",
    imageUrl: "https://via.placeholder.com/200",
    type: "coffee"
  }
];

export default function Products({ productType: initialProductType }) {
  const [productType, setProductType] = useState(initialProductType);
  const filteredProducts = productType ? productsData.filter((product) => product.type === productType) : productsData;
  const navigate = useNavigate();

  useEffect(() => {
    setProductType(initialProductType);
  }, [initialProductType]);

  const handleMenuClick = (e) => {
    if (e.key === "all") {
      setProductType(null);
      navigate({ to: "/products" });
    } else {
      setProductType(e.key);
      navigate({ to: `/products/${e.key}` });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-100 bg-white border-r-2 border-gray-100">
        <Menu
          mode="inline"
          selectedKeys={[productType || "all"]}
          style={{ border: "none" }}
          onClick={handleMenuClick}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.SubMenu key="sub1" title="Beverages">
            <Menu.Item key="all">All Products</Menu.Item>
            <Menu.Item key="coffee">Coffee</Menu.Item>
            <Menu.Item key="tea">Tea</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      <div className="flex flex-col gap-8 p-4 h-full w-full">
        <Typography.Title level={2}>
          {productType ? productType.charAt(0).toUpperCase() + productType.slice(1) : "All Products"}
        </Typography.Title>

        <div className="grid grid-cols-4 gap-16">
          {filteredProducts.map((product) => (
            <div key={product.key}>
              <Image width={200} src={product.imageUrl} preview={{ src: product.imageUrl }} className="rounded-xl" />
              <Typography.Title level={4}>{product.name}</Typography.Title>
              <Typography.Text>{product.description}</Typography.Text>
            </div>
          ))}
        </div>

        <Typography.Title level={2}>New products</Typography.Title>

        <div className="grid grid-cols-4 gap-16">
          {productsData.map((product) => (
            <div key={product.key}>
              <Image width={200} src={product.imageUrl} preview={{ src: product.imageUrl }} className="rounded-xl" />
              <Typography.Title level={4}>{product.name}</Typography.Title>
              <Typography.Text>{product.description}</Typography.Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
