import { Layout } from "antd";
import AppHeader from "./AppHeader.jsx";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
export default function AppLayout() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
