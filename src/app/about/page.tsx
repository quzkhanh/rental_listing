import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Về chúng tôi | PhòngTrọ',
  description: 'Tìm hiểu về PhòngTrọ - Nền tảng kết nối người thuê và cho thuê phòng trọ uy tín, nhanh chóng.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-50 blur-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Về <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">chúng tôi</span>
            </h1>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Chào mừng bạn đến với <strong className="text-slate-900 font-semibold">PhòngTrọ</strong>, nền tảng hàng đầu chuyên cung cấp giải pháp tìm kiếm và cho thuê phòng trọ, căn hộ dịch vụ và nhà nguyên căn.
              </p>
              
              <p>
                Chúng tôi hiểu rằng việc tìm kiếm một không gian sống phù hợp, an ninh và tiện nghi với mức giá hợp lý luôn là một thách thức lớn. Vì vậy, PhòngTrọ ra đời với sứ mệnh kết nối trực tiếp những người có nhu cầu thuê phòng với các chủ nhà uy tín, loại bỏ những rào cản và rủi ro không đáng có.
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Sứ mệnh của chúng tôi</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cung cấp thông tin minh bạch, chính xác 100% từ hình ảnh đến giá cả.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hỗ trợ nhanh chóng, tận tâm 24/7.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tạo ra một cộng đồng cho thuê an toàn và văn minh.</span>
                  </li>
                </ul>
              </div>
              
              <p>
                Dù bạn là sinh viên đang tìm kiếm phòng trọ giá rẻ, hay người đi làm cần không gian sống tiện nghi, PhòngTrọ luôn sẵn sàng đồng hành cùng bạn.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Link href="/" className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-center">
                Tìm phòng ngay
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors text-center">
                Liên hệ hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
