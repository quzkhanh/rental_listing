'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import RoomForm from '@/components/RoomForm';
import { createRoom } from '@/lib/mutations';

export default function CreateRoomPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Small timeout to simulate network request
      await new Promise(res => setTimeout(res, 500));
      await createRoom(data);
      alert('Đăng phòng thành công!');
      router.push('/admin');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Quay lại danh sách
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Đăng phòng mới</h1>
          <p className="text-slate-500 text-sm mt-1">Điền đầy đủ thông tin để đăng phòng lên hệ thống</p>
        </div>
        
        <RoomForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminLayout>
  );
}
