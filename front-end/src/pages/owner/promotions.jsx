import { Line } from "@ant-design/charts";
import { Button, Card, Space, Table, Tag, Typography } from "antd";

const { Column } = Table;

export default function Promotions() {
  const promotionsData = [
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
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography.Title level={2}>Promotions</Typography.Title>
        <Space>
          <Button type="primary">Add Promotion</Button>
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
    </div>
  );
}
