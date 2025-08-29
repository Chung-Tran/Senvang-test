import { Table, Card, Input, Button, Form, Select, Row, Col, message } from "antd";
import { useState } from "react";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "../hooks/useUsers";
import UserFormModal from "../components/user/UserFormModal";
import UserDetailModal from "../components/user/UserDetailModal";
import { USER_COLUMNS } from "../components/user/constants/userColumns";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UserManagerPage() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [detailUser, setDetailUser] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: users, isLoading } = useUsers({ ...filters, page, pageSize });
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleSubmit = (values) => {
        const onSuccess = () => {
            setFormOpen(false);
            toast.success(editUser ? "Cập nhật thành công" : "Tạo mới thành công");
            setEditUser(null); // reset edit state
        };
        const onError = (error) => {
            const message = error?.response?.data?.error || "Có lỗi xảy ra";
            toast.error(message);
        };

        if (editUser) {
            updateUser.mutate({ id: editUser.id, values }, { onSuccess, onError });
        } else {
            createUser.mutate(values, { onSuccess, onError });
        }
    };
    const handleSearch = () => {
        setPage(1);
        queryClient.invalidateQueries(["users"]);
    }
    return (
        <div>
            <h2>Quản lý người dùng</h2>

            <Card style={{ marginBottom: 16 }}>
                <Form layout="vertical" onFinish={(values) => setFilters(values)}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="name" label="Tên">
                                <Input placeholder="Nhập tên" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="email" label="Email">
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="username" label="Tên đăng nhập">
                                <Input placeholder="Nhập tên đăng nhập" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="gender" label="Giới tính">
                                <Select allowClear placeholder="Chọn giới tính">
                                    <Select.Option value="male">Nam</Select.Option>
                                    <Select.Option value="female">Nữ</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Nút nằm dưới filter */}
                    <Row gutter={16} justify="start" style={{ marginTop: 8 }}>
                        <Col>
                            <Button type="primary" onClick={handleSearch}>
                                Tìm kiếm
                            </Button>
                        </Col>
                        <Col>
                            <Button type="default" onClick={() => setFormOpen(true)}>
                                Thêm mới
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>


            <Table
                rowKey="id"
                dataSource={users?.data || []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: users?.total || 0,
                    showSizeChanger: true
                }}
                onChange={handleTableChange}
                columns={USER_COLUMNS({ setDetailUser, setDetailOpen, setEditUser, setFormOpen, deleteUser })}
            />

            <UserFormModal
                open={formOpen}
                initialValues={editUser}
                onCancel={() => setFormOpen(false)}
                onSubmit={handleSubmit}
            />

            <UserDetailModal
                open={detailOpen}
                user={detailUser}
                onCancel={() => setDetailOpen(false)}
            />
        </div>
    );
}
