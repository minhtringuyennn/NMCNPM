import { api } from "@/config";
import { useNavigate } from "@tanstack/react-router";
import { Image, Menu, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Products({ productType: initialProductType }) {
  const [productType, setProductType] = useState(initialProductType || "all");
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setProductType(initialProductType);
    fetchProducts();
  }, [initialProductType]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api.baseUrl}/products/all`);
      const data = await response.json();
      setProductsData(data.docs);
      const uniqueCategories = [...new Set(data.docs.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (e) => {
    if (e.key === "all") {
      setProductType(null);
      navigate({ to: "/products" });
    } else {
      setProductType(e.key);
      navigate({ to: `/products/${e.key}` });
    }
  };

  const filteredProducts = productType
    ? productsData.filter((product) => product.category.toLowerCase() === productType.toLowerCase())
    : productsData;

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
          <Menu.Item key="all">All Products</Menu.Item>
          {categories.map((category) => (
            <Menu.Item key={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="flex flex-col gap-8 p-4 h-full w-full">
        <Typography.Title level={2}>
          {productType ? productType.charAt(0).toUpperCase() + productType.slice(1) : "All Products"}
        </Typography.Title>

        {loading ? (
          <Typography.Text>Loading...</Typography.Text>
        ) : (
          <div className="grid grid-cols-4 gap-16">
            {filteredProducts.map((product) => (
              <div key={product._id}>
                <Image
                  width={200}
                  src={product.thumbnail}
                  preview={{ src: product.thumbnail }}
                  className="rounded-xl"
                />
                <Typography.Title level={4}>{product.productName}</Typography.Title>
                <Typography.Text>{product.description}</Typography.Text>
              </div>
            ))}
          </div>
        )}

        <Typography.Title level={2}>New Products</Typography.Title>

        {loading ? (
          <Typography.Text>Loading...</Typography.Text>
        ) : (
          <div className="grid grid-cols-4 gap-16">
            {productsData.map((product) => (
              <div key={product._id}>
                <Image
                  width={200}
                  src={product.thumbnail}
                  preview={{ src: product.thumbnail }}
                  className="rounded-xl"
                />
                <Typography.Title level={4}>{product.productName}</Typography.Title>
                <Typography.Text>{product.description}</Typography.Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
