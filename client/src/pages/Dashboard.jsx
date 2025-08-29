import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Title, Text } = Typography;

export default function Dashboard() {
  return (
    <div style={{ padding: 24, justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Title level={2}>Dashboard</Title>
      <Text type="secondary">
        Welcome to the admin dashboard. Here’s a quick overview.
      </Text>


    </div>
  );
}
