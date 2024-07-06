import { Button, Card, Space, Table, Tag, Typography } from "antd";

const { Column } = Table;

export default function Employees() {
  const employeesData = [
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
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Employees</Typography.Title>
        <Space>
          <Button type="primary">Add Employee</Button>
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
    </div>
  );
}
