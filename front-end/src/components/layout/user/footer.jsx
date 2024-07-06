import { Layout } from "antd";
import { House, Locate, Mail, Phone } from "lucide-react";

const { Footer } = Layout;

export default () => {
  return (
    <Footer className="flex justify-between bg-[#F3841D] text-white p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <House size={24} className="mr-1" />
          <span className="text-lg">Nhà</span>
        </div>
        <div className="flex items-center">
          <Locate size={16} className="mr-1" />
          <span>123 đường số 45, Khu phố 6, Quận Bình Thạnh, TP.HCM</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <Phone size={16} className="mr-1" />
            <span>0123456789</span>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="mr-1" />
            <span>contact@nha.com</span>
          </div>
        </div>
      </div>
      <span className="flex items-center justify-center">© 2024. All Rights Reserved Nhà's team.</span>
    </Footer>
  );
};
