import { useNavigate } from "@tanstack/react-router";
import { Button, Typography } from "antd";

export default function () {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[url('/user/about-page-1.png')] h-screen bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center h-full w-full md:w-1/3 md:mr-auto p-16">
          <Typography.Title>Nhà</Typography.Title>
          <Typography.Paragraph>
            "nhà" is a cozy little café inspired by the desire to create a welcoming space where everyone feels at home.
          </Typography.Paragraph>
        </div>
      </div>
      <div className="bg-[url('/user/about-page-2.png')] h-screen bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center h-full w-full md:w-1/3 md:ml-auto p-16 text-right">
          <Typography.Title>Nhà</Typography.Title>
          <Typography.Paragraph>
            Whether you're here to study, work, or gossip with friends, we hope you'll find comfort and warmth.
          </Typography.Paragraph>
          <Typography.Paragraph>Have a nice day!</Typography.Paragraph>
          <Button type="primary" className="ml-auto w-fit" onClick={() => navigate({ to: "/" })}>
            Browse menu
          </Button>
        </div>
      </div>
    </>
  );
}
