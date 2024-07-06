import { useNavigate } from "@tanstack/react-router";
import { Card, Space, Tag, Typography } from "antd";

export default function () {
  const navigate = useNavigate();

  const employees = [
    {
      key: "1",
      name: "Employee A",
      role: "Full-time",
      availableSlots: 2,
      description: "Employee A is a full-time employee."
    },
    {
      key: "2",
      name: "Employee B",
      role: "Part-time",
      availableSlots: 0,
      description: "Employee B is a part-time employee."
    },
    {
      key: "3",
      name: "Employee C",
      role: "Part-time",
      availableSlots: 2,
      description: "Employee C is a part-time employee."
    },
    {
      key: "4",
      name: "Employee D",
      role: "Full-time",
      availableSlots: 1,
      description: "Employee D is a full-time employee."
    }
  ];

  return (
    <>
      <div className="bg-gray-100 h-screen bg-center bg-no-repeat bg-cover p-4">
        <Typography.Title level={2}>Openings</Typography.Title>
        <div className="grid grid-cols-2 gap-4">
          {employees.map((employee) => (
            <Card>
              <Card className="bg-gray-100">
                <div className="flex justify-between">
                  <Typography.Text>{employee.role}</Typography.Text>
                  <div className="flex gap-2">
                    <Typography.Text>
                      {employee.availableSlots} slot{employee.availableSlots > 1 ? "s" : ""} available
                    </Typography.Text>
                    <Tag color={employee.availableSlots > 0 ? "green" : "red"}>
                      {employee.availableSlots > 0 ? "Open" : "Closed"}
                    </Tag>
                  </div>
                </div>
                <Typography.Title level={4}>{employee.name}</Typography.Title>
              </Card>
              <Space className="mt-4">
                <Typography.Text>{employee.description}</Typography.Text>
              </Space>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
