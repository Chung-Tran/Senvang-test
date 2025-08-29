import { Modal, Form, Input, InputNumber, Select, message, Col, Row } from "antd";
import toast from "react-hot-toast";
import { GENDER_OPTIONS } from "../../common/Constant";
import { formatDateTime } from "../../common/MethodCommon";

export default function UserFormModal({ open, onCancel, onSubmit, initialValues }) {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await onSubmit(values);
        } catch (error) {
            if (error?.errorFields) {
                toast.error("Vui lòng kiểm tra lại các trường!");
            } else {
                toast.error(error.message || "Đã xảy ra lỗi!");
            }
        }
    };

    return (
        <Modal
            open={open}
            title={initialValues ? "Cập nhật người dùng" : "Thêm mới người dùng"}
            okText={initialValues ? "Lưu" : "Tạo mới"}
            onCancel={() => { form.resetFields(); onCancel(); }}
            onOk={handleOk}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues || {}}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Tên"
                            rules={[{ required: true, message: "Tên không được bỏ trống!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[{ required: true, message: "Tên đăng nhập không được bỏ trống!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ type: "email", required: true, message: "Email không hợp lệ!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label="Số điện thoại"
                            rules={[{ required: true, message: "Số điện thoại không được bỏ trống!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[{ required: !initialValues, message: "Mật khẩu không được bỏ trống!" }]}
                        >
                            <Input.Password placeholder={initialValues ? "Để trống nếu không đổi" : ""} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="age" label="Tuổi">
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="gender" label="Giới tính">
                            <Select options={GENDER_OPTIONS} allowClear />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="address" label="Địa chỉ">
                    <Input />
                </Form.Item>

                <Form.Item name="role" label="Vai trò">
                    <Select defaultValue="user">
                        <Select.Option value="user">User</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                    </Select>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="createdBy"
                            label="Người tạo"
                        >
                            <Input disabled placeholder="" value="Admin" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="createdAt"
                            label="Ngày tạo"
                        >
                            <Input disabled placeholder="" value={formatDateTime(new Date())} />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Modal>
    );
}