import { useState, useRef } from "react";
import {
  Select,
  Space,
  Typography,
  Divider,
  Flex,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result
} from "antd";
import { useCrypto } from "../../context/crypto-context";
import CoinInfo from "./CoinInfo.jsx";

export default function AddAssetForm({ onClose }) {
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="Successfully added new asset"
        subTitle={`Added ${assetRef.current.amount} ${coin.name} buyed by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    console.log(values);
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date()
    };
    setSubmitted(true);
    assetRef.current = newAsset;
    addAsset(newAsset);
  }

  const validateMessages = {
    required: "'${name}' is required!"
    // ...
  };

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2)
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2)
    });
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      initialValues={{
        price: +coin.price.toFixed(2)
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      style={{
        width: "100%"
      }}
    >
      <CoinInfo coin={coin} withSymbol={false} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        placeholder="Enter coin amount"
        rules={[{ required: true, min: 0, type: "number" }]}
      >
        <InputNumber style={{ width: "100%" }} onChange={handleAmountChange} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber style={{ width: "100%" }} onChange={handlePriceChange} />
      </Form.Item>
      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item type="primary">
        <Button htmlType="submit">Add Asset</Button>
      </Form.Item>
    </Form>
  );
}
