import { Flex, Tag, Typography, Divider } from "antd";

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <Flex>
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        ></img>
        <Typography.Title level={2} style={{ margin: 0 }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>
          price change in 1 hour: {coin.priceChange1h}
          price change in 1 week: {coin.priceChange1w}
          price change in 1 month: {coin.priceChange1m}
        </Typography.Text>
      </Typography.Paragraph>
    </>
  );
}
