import { Button, Space, Popconfirm } from "antd";

export const USER_COLUMNS = ({ selectUser, setDetailOpen, setEditUser, setFormOpen, deleteUser }) => [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Tuổi", dataIndex: "age", key: "age" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
        title: "Hành động",
        key: "actions",
        render: (_, record) => (
            <Space>
                <Button onClick={() => { selectUser(record); setDetailOpen(true); }}>Xem</Button>
                <Button type="primary" onClick={() => { setEditUser(record); setFormOpen(true); }}>Sửa</Button>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => deleteUser.mutate(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button danger>Xóa</Button>
                </Popconfirm>
            </Space>
        )
    }
];
