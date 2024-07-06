import { api } from "@/config";
import { Button, Card, Form, Input, InputNumber, Modal, Select, Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

const { Column } = Table;
const { Option } = Select;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api.baseUrl}/products/all`);
      const data = await response.json();
      setProducts(data.docs);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    form.setFieldsValue(product);
    setVisible(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`${api.baseUrl}/products/${id}`, {
        method: "DELETE"
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = async (values) => {
    try {
      const method = currentProduct ? "PUT" : "POST";
      const url = currentProduct ? ` ${api.baseUrl}/products/${currentProduct._id}` : `${api.baseUrl}/products/`;
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      fetchProducts();
      setVisible(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Products</Typography.Title>
        <Space>
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Space>
      </div>
      <Card className="drop-shadow-sm">
        <Table dataSource={products} loading={loading} rowKey="_id">
          <Column
            title="Thumbnail"
            dataIndex="thumbnail"
            key="thumbnail"
            render={(text) => <img src={text} alt="thumbnail" style={{ width: 50 }} />}
          />
          <Column title="Product Name" dataIndex="productName" key="productName" />
          <Column title="Category" dataIndex="category" key="category" />
          <Column title="Stock" dataIndex="stock" key="stock" />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => <Tag color={status === "Published" ? "green" : "volcano"}>{status}</Tag>}
          />
          <Column title="Base Price" dataIndex="basePrice" key="basePrice" />
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <Space size="middle">
                <Button onClick={() => handleEditProduct(record)}>Edit</Button>
                <Button type="danger" onClick={() => handleDeleteProduct(record._id)}>
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>

      <Modal
        title={currentProduct ? "Edit Product" : "Add Product"}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveProduct}>
          <Form.Item name="thumbnail" label="Thumbnail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Published">Published</Option>
              <Option value="Draft">Draft</Option>
            </Select>
          </Form.Item>
          <Form.Item name="basePrice" label="Base Price" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="cost" label="Cost" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="upscaleFee" label="Upscale Fee" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="sizeS" label="Size S" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="sizeM" label="Size M" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="sizeL" label="Size L" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentProduct ? "Update" : "Add"} Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
