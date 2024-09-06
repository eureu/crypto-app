import { Flex, Tag, Typography } from "antd";

export default function CoinInfoModal({ coin }) {
  return (
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
  );
}
