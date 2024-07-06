import { Line } from "@ant-design/charts";
import { Button, Card, Space, Table, Tag, Typography } from "antd";

const { Column } = Table;

export default function Orders() {
  const ordersData = [
    { date: "2024-07-01", value: 20 },
    { date: "2024-07-02", value: 22 },
    { date: "2024-07-03", value: 19 },
    { date: "2024-07-04", value: 24 },
    { date: "2024-07-05", value: 23 },
    { date: "2024-07-06", value: 21 },
    { date: "2024-07-07", value: 26 }
  ];

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

  const recentOrdersData = [
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
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Orders</Typography.Title>
        <Space>
          <Button type="primary">Add Order</Button>
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
    </div>
  );
}
