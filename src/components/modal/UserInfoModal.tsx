import { Modal } from 'antd';
import { useState } from 'react';

interface UserInfoModalProps {
  open: boolean;
  onConfirm: (name: string, avatar?: string) => void;
  onCancel: () => void;
}

export default function UserInfoModal({ open, onConfirm, onCancel }: UserInfoModalProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm(name.trim(), avatar.trim() || undefined);
      setName('');
      setAvatar('');
    }
  };

  return (
    <Modal
      cancelText="Hủy"
      centered
      okButtonProps={{ disabled: !name.trim() }}
      okText="Xác nhận"
      onCancel={onCancel}
      onOk={handleSubmit}
      open={open}
      title={
        <div className="text-center">
          <h3 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">Chào mừng bạn đến dự tiệc!</h3>
          <p className="mt-1 text-sm font-normal text-gray-500">Vui lòng cho chúng tôi biết tên của bạn</p>
        </div>
      }
    >
      <div className="space-y-4 py-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="name">
            Tên của bạn <span className="text-red-500">*</span>
          </label>
          <input
            autoFocus
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            id="name"
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && name.trim()) {
                handleSubmit();
              }
            }}
            placeholder="Ví dụ: Nguyễn Văn A"
            type="text"
            value={name}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="avatar">
            Avatar URL <span className="text-gray-400">(tùy chọn)</span>
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            id="avatar"
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            type="url"
            value={avatar}
          />
          {avatar && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-500">Xem trước:</span>
              <img alt="Preview" className="size-10 rounded-full object-cover" onError={() => setAvatar('')} src={avatar} />
            </div>
          )}
        </div>

        <div className="rounded-lg bg-pink-50 p-3 text-sm text-gray-600">Thông tin này sẽ được sử dụng để hiển thị tên và avatar của bạn khi gửi lời chúc và tham gia vào buổi tiệc.</div>
      </div>
    </Modal>
  );
}
