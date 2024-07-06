import { Line } from "@ant-design/charts";
import { Card, Space, Table, Tag, Typography } from "antd";

const { Column } = Table;

export default function Dashboard() {
  const salesData = [
    { year: "2021", value: 3000 },
    { year: "2022", value: 4500 },
    { year: "2023", value: 4700 },
    { year: "2024", value: 5600 }
  ];

  const dailyGoalData = [
    { date: "2024-07-01", value: 200 },
    { date: "2024-07-02", value: 250 },
    { date: "2024-07-03", value: 300 },
    { date: "2024-07-04", value: 400 },
    { date: "2024-07-05", value: 380 },
    { date: "2024-07-06", value: 420 },
    { date: "2024-07-07", value: 460 }
  ];

  const forecastData = [
    { month: "2024-01", value: 3500 },
    { month: "2024-02", value: 4000 },
    { month: "2024-03", value: 4500 },
    { month: "2024-04", value: 4700 },
    { month: "2024-05", value: 5000 },
    { month: "2024-06", value: 5200 },
    { month: "2024-07", value: 5400 },
    { month: "2024-08", value: 5600 },
    { month: "2024-09", value: 5800 },
    { month: "2024-10", value: 6000 },
    { month: "2024-11", value: 6200 },
    { month: "2024-12", value: 6400 }
  ];

  const configSales = {
    data: salesData,
    height: 400,
    xField: "year",
    yField: "value",
    point: { size: 5, shape: "diamond" },
    tooltip: { showMarkers: false },
    label: {
      style: { fill: "#aaa" }
    }
  };

  const configDailyGoal = {
    data: dailyGoalData,
    height: 400,
    xField: "date",
    yField: "value",
    point: { size: 5, shape: "circle" },
    tooltip: { showMarkers: false },
    label: {
      style: { fill: "#aaa" }
    }
  };

  const configForecast = {
    data: forecastData,
    height: 400,
    xField: "month",
    yField: "value",
    point: { size: 5, shape: "diamond" },
    tooltip: { showMarkers: false },
    label: {
      style: { fill: "#aaa" }
    }
  };

  const bestSellersData = [
    {
      key: "1",
      product: "Product A",
      category: "Category 1",
      sales: 150
    },
    {
      key: "2",
      product: "Product B",
      category: "Category 2",
      sales: 120
    },
    {
      key: "3",
      product: "Product C",
      category: "Category 3",
      sales: 100
    }
  ];

  const recentOrdersData = [
    {
      key: "1",
      orderId: "12345",
      customer: "John Doe",
      status: "Completed",
      amount: "$150"
    },
    {
      key: "2",
      orderId: "12346",
      customer: "Jane Smith",
      status: "Pending",
      amount: "$200"
    },
    {
      key: "3",
      orderId: "12347",
      customer: "Bob Johnson",
      status: "Completed",
      amount: "$100"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="drop-shadow-sm">
        <Typography.Title level={4}>Today's Stats</Typography.Title>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <Typography.Title level={5}>Total Sales</Typography.Title>
            <Typography.Text>$2,817k</Typography.Text>
          </Card>
          <Card>
            <Typography.Title level={5}>Profit</Typography.Title>
            <Typography.Text>$1,820k</Typography.Text>
          </Card>
          <Card>
            <Typography.Title level={5}>Rating</Typography.Title>
            <Typography.Text>4.6/5</Typography.Text>
          </Card>
          <Card>
            <Typography.Title level={5}>Orders</Typography.Title>
            <Typography.Text>92</Typography.Text>
          </Card>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <Card className="drop-shadow-sm">
          <Typography.Title level={4}>This week's statistics</Typography.Title>
          <Line {...configSales} />
        </Card>
        <Card className="drop-shadow-sm">
          <Typography.Title level={4}>Daily's Goal</Typography.Title>
          <Line {...configDailyGoal} />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <Card className="drop-shadow-sm">
          <Typography.Title level={4}>Best Sellers</Typography.Title>
          <Table dataSource={bestSellersData}>
            <Column title="Product" dataIndex="product" key="product" />
            <Column title="Category" dataIndex="category" key="category" />
            <Column title="Sales" dataIndex="sales" key="sales" />
          </Table>
        </Card>
        <Card className="drop-shadow-sm">
          <Typography.Title level={4}>Recent Orders</Typography.Title>
          <Table dataSource={recentOrdersData}>
            <Column title="Order ID" dataIndex="orderId" key="orderId" />
            <Column title="Customer" dataIndex="customer" key="customer" />
            <Column title="Status" dataIndex="status" key="status" />
            <Column title="Amount" dataIndex="amount" key="amount" />
          </Table>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Card className="drop-shadow-sm">
          <Typography.Title level={4}>This month's sales forecast</Typography.Title>
          <Line {...configForecast} />
        </Card>
        <Card className="drop-shadow-sm">
          <Typography.Title level={4}>Overview</Typography.Title>
          <Line {...configSales} />
        </Card>
      </div>
    </div>
  );
}
