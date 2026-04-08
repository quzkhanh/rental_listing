'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { Room } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { getRooms } from '@/lib/queries';
import { deleteRoom } from '@/lib/mutations';

export default function AdminDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const data = await getRooms();
      setRooms(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      try {
        await deleteRoom(id);
        const updated = rooms.filter((r) => r.id !== id);
        setRooms(updated);
        alert('Đã xóa thành công!');
      } catch (err) {
        alert('Lỗi khi xóa phòng.');
        console.error(err);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý phòng</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý đăng tải, chỉnh sửa, gỡ bài</p>
        </div>
        <Link
          href="/admin/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Đăng phòng mới
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="px-6 py-4">Tên phòng & Địa chỉ</th>
                <th className="px-6 py-4">Giá thuê</th>
                <th className="px-6 py-4">Khu vực</th>
                <th className="px-6 py-4">Ngày đăng</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Đang tải...</td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chưa có phòng nào. Hãy đăng phòng đầu tiên.</td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                          {room.images?.[0] && (
                            <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 line-clamp-1">{room.title}</div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-1">{room.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-orange-600">
                      {formatPrice(room.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                        {room.district}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(room.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/edit/${room.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
