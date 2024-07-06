import { Line } from "@ant-design/charts";
import { Button, Card, DatePicker, Form, Input, Modal, Space, Table, Tag, Typography } from "antd";
import { useState } from "react";

const { Column } = Table;

export default function Orders() {
  const [ordersData, setOrdersData] = useState([
    { date: "2024-07-01", value: 20 },
    { date: "2024-07-02", value: 22 },
    { date: "2024-07-03", value: 19 },
    { date: "2024-07-04", value: 24 },
    { date: "2024-07-05", value: 23 },
    { date: "2024-07-06", value: 21 },
    { date: "2024-07-07", value: 26 }
  ]);

  const configOrders = {
    data: ordersData,
    height: 400,
    xField: "date",
    yField: "value",
    point: { size: 5, shape: "diamond" },
    tooltip: { showMarkers: false },
    label: {
      style: { fill: "#aaa" }
    }
  };

  const [recentOrdersData, setRecentOrdersData] = useState([
    {
      key: "1",
      firstName: "John",
      lastName: "Brown",
      age: 32,
      tags: ["nice", "developer"],
      status: "Completed",
      amount: "$150"
    },
    {
      key: "2",
      firstName: "Jim",
      lastName: "Green",
      age: 42,
      tags: ["loser"],
      status: "Pending",
      amount: "$200"
    },
    {
      key: "3",
      firstName: "Joe",
      lastName: "Black",
      age: 32,
      tags: ["cool", "teacher"],
      status: "Completed",
      amount: "$100"
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddOrder = (values) => {
    const newOrder = {
      key: (recentOrdersData.length + 1).toString(),
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      tags: values.tags.split(",")
    };
    setRecentOrdersData([...recentOrdersData, newOrder]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Orders</Typography.Title>
        <Space>
          <Button type="primary" onClick={showModal}>
            Add Order
          </Button>
        </Space>
      </div>
      <Card className="drop-shadow-sm">
        <Typography.Title level={4}>Today's Stats</Typography.Title>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <Typography.Title level={5}>Total Orders</Typography.Title>
            <Typography.Text>75</Typography.Text>
          </Card>
          <Card>
            <Typography.Title level={5}>Pending Orders</Typography.Title>
            <Typography.Text>10</Typography.Text>
          </Card>
          <Card>
            <Typography.Title level={5}>Completed Orders</Typography.Title>
            <Typography.Text>65</Typography.Text>
          </Card>
          <Card>
            <Typography.Title level={5}>Total Revenue</Typography.Title>
            <Typography.Text>$3,000</Typography.Text>
          </Card>
        </div>
      </Card>
      <Card className="drop-shadow-sm">
        <Typography.Title level={4}>Order Trends</Typography.Title>
        <Line {...configOrders} />
      </Card>
      <Card className="drop-shadow-sm">
        <Typography.Title level={4}>Recent Orders</Typography.Title>
        <Table dataSource={recentOrdersData}>
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Amount" dataIndex="amount" key="amount" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 5 ? "geekblue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            )}
          />
        </Table>
      </Card>
      <Modal title="Add Order" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddOrder}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true, message: "Please enter the age" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Please enter the amount" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please enter the status" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags" rules={[{ required: true, message: "Please enter the tags" }]}>
            <Input placeholder="Enter tags separated by commas" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
