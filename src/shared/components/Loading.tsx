import { Flex, Spin } from "antd";

export default function Loading() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Spin size="large" />
    </Flex>
  );
}