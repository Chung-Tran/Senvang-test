// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user.service";

const { Title } = Typography;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await login(values);
            localStorage.setItem("token", response.data.token);
            message.success("Đăng nhập thành công!");
            navigate("/");
        } catch (err) {
            message.error(err.response?.data?.error || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
            }}
        >
            <Card
                style={{ width: 400, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            >
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <Title level={3} style={{ margin: 0, color: "#333" }}>
                        Admin Login
                    </Title>
                </div>

                <Form
                    name="login"
                    layout="vertical"
                    initialValues={{ username: "", password: "" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Vui lòng nhập username!" }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="admin"
                            size="large"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Vui lòng nhập password!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="123456"
                            size="large"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            style={{ borderRadius: 6, background: "#667eea", borderColor: "#667eea" }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
