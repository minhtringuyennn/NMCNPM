import Footer from "@/components/layout/user/footer";
import Navbar from "@/components/layout/user/navbar";
import { Layout } from "antd";

export default function ({ children, invert = false }) {
  return (
    <Layout>
      <Navbar invert={invert} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Layout>
  );
}
