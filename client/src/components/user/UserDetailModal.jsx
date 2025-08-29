import { Modal, Descriptions } from "antd";

export default function UserDetailModal({ open, onCancel, user }) {
    return (
        <Modal
            open={open}
            footer={null}
            title="Chi tiết User"
            onCancel={onCancel}
            width={1000}
        >
            <div style={{ padding: '20px 15px' }}>
                {user && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Tên">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Tuổi">{user.age}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{user.address}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{user.gender}</Descriptions.Item>
                    </Descriptions>
                )}
            </div>

        </Modal>
    );
}
