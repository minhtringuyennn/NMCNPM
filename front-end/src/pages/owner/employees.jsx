import { Button, Card, Form, Input, InputNumber, Modal, Select, Space, Table, Tag, Typography } from "antd";
import { useState } from "react";

const { Column } = Table;
const { Option } = Select;

export default function Employees() {
  const [employeesData, setEmployeesData] = useState([
    {
      key: "1",
      firstName: "John",
      lastName: "Doe",
      sale: 32,
      position: "Bakery",
      tags: ["part-time"]
    },
    {
      key: "2",
      firstName: "Jane",
      lastName: "Smith",
      sale: 28,
      position: "Bar",
      tags: ["full-time"]
    },
    {
      key: "3",
      firstName: "Bob",
      lastName: "Johnson",
      sale: 45,
      position: "Bar",
      tags: ["part-time"]
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

  const handleAddEmployee = (values) => {
    const newEmployee = {
      key: (employeesData.length + 1).toString(),
      ...values,
      tags: [values.tags]
    };
    setEmployeesData([...employeesData, newEmployee]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Employees</Typography.Title>
        <Space>
          <Button type="primary" onClick={showModal}>
            Add Employee
          </Button>
        </Space>
      </div>
      <Card className="drop-shadow-sm">
        <Typography.Title level={4}>Employee List</Typography.Title>
        <Table dataSource={employeesData}>
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
          <Column title="Sale" dataIndex="sale" key="sale" />
          <Column title="Position" dataIndex="position" key="position" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 8 ? "geekblue" : "green";
                  if (tag === "part-time") {
                    color = "gold";
                  } else if (tag === "full-time") {
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
      <Modal title="Add Employee" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
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
          <Form.Item name="sale" label="Sale" rules={[{ required: true, message: "Please enter the sale amount" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please enter the position" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags" rules={[{ required: true, message: "Please select a tag" }]}>
            <Select>
              <Option value="full-time">Full-time</Option>
              <Option value="part-time">Part-time</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
