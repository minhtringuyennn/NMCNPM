import { Button, Card, DatePicker, Form, Input, Modal, Space, Table, Tag, Typography } from "antd";
import { useState } from "react";

const { Column } = Table;

export default function Promotions() {
  const [promotionsData, setPromotionsData] = useState([
    {
      key: "1",
      promotionName: "Summer Sale",
      description: "50% off on all items",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      status: "Active",
      tags: ["summer", "sale"]
    },
    {
      key: "2",
      promotionName: "New Year Bonanza",
      description: "Buy 1 Get 1 Free",
      startDate: "2024-12-25",
      endDate: "2025-01-05",
      status: "Upcoming",
      tags: ["new year", "special"]
    },
    {
      key: "3",
      promotionName: "Clearance Sale",
      description: "Up to 70% off on selected items",
      startDate: "2024-07-01",
      endDate: "2024-07-15",
      status: "Active",
      tags: ["clearance", "discount"]
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

  const handleAddPromotion = (values) => {
    const newPromotion = {
      key: (promotionsData.length + 1).toString(),
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
      tags: values.tags.split(",")
    };
    setPromotionsData([...promotionsData, newPromotion]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Promotions</Typography.Title>
        <Space>
          <Button type="primary" onClick={showModal}>
            Add Promotion
          </Button>
        </Space>
      </div>
      <Card className="drop-shadow-sm">
        <Typography.Title level={4}>Today's Promotions</Typography.Title>
        <Table dataSource={promotionsData}>
          <Column title="Promotion Name" dataIndex="promotionName" key="promotionName" />
          <Column title="Description" dataIndex="description" key="description" />
          <Column title="Start Date" dataIndex="startDate" key="startDate" />
          <Column title="End Date" dataIndex="endDate" key="endDate" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 5 ? "geekblue" : "green";
                  if (tag === "special") {
                    color = "gold";
                  } else if (tag === "discount") {
                    color = "purple";
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
      <Modal title="Add Promotion" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddPromotion}>
          <Form.Item
            name="promotionName"
            label="Promotion Name"
            rules={[{ required: true, message: "Please enter the promotion name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Please select the start date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please select the end date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags" rules={[{ required: true, message: "Please enter the tags" }]}>
            <Input placeholder="Enter tags separated by commas" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Promotion
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
