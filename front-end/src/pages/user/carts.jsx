import { Typography } from "antd";
import { Frown } from "lucide-react";

export default function () {
  return (
    <div className="flex flex-col h-screen p-8 bg-[#F3841D]">
      <div className="h-full w-full bg-white rounded-2xl p-8 shadow-lg">
        <Typography.Title level={2}>Carts</Typography.Title>
        <div className="h-full w-full flex flex-col justify-center items-center opacity-50">
          <Frown size={48} className="mb-8" />
          <Typography.Title level={4}>Oops, looks like you haven't ordered anything yet.</Typography.Title>
          <Typography.Text>
            If this is an error, pelase contact us via our number or email for more information.
          </Typography.Text>
        </div>
      </div>
    </div>
  );
}
