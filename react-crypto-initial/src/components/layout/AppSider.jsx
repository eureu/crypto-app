import { Card, Layout, List, Spin, Statistic, Typography, Tag } from "antd";
import { useContext } from "react";
import { percentDifference, capitalize } from "../../../utils.js";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { CryptoContext } from "../../context/crypto-context.jsx";

const siderStyle = {
  padding: "1rem"
};

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires."
];

export default function AppSider() {
  const { loading, assets } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => {
        return (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.grow ? "#3f8600" : "#cf1322"
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              dataSource={[
                {
                  title: "Total profit",
                  value: asset.totalProfit.toFixed(2),
                  withTag: true
                },
                { title: "Asset amount", value: asset.amount, isPlain: true }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        );
      })}
    </Layout.Sider>
  );
}
