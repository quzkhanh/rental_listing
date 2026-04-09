import React from 'react';
import Link from 'next/link';
import { CALL_PHONE, ZALO_PHONE } from '@/lib/constants';

export const metadata = {
  title: 'Liên hệ | PhòngTrọ',
  description: 'Liên hệ với PhòngTrọ để được hỗ trợ tìm thuê và cho thuê phòng nhanh chóng nhất.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Contact Info Col */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">Liên hệ với chúng tôi</h1>
                <p className="text-blue-100 mb-8 max-w-sm">
                  Bạn cần hỗ trợ tìm phòng, đăng tin hay có bất kỳ thắc mắc nào? Đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây.
                </p>
                
                <div className="space-y-6 flex-grow">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Gọi trực tiếp</p>
                      <a href={`tel:${CALL_PHONE}`} className="text-xl font-semibold hover:text-white transition-colors">{CALL_PHONE}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Zalo hỗ trợ</p>
                      <a href={`https://zalo.me/${ZALO_PHONE}`} target="_blank" rel="noreferrer" className="text-xl font-semibold hover:text-white transition-colors">{ZALO_PHONE}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Email</p>
                      <a href="mailto:hotro@phongtro.com" className="text-lg font-medium hover:text-white transition-colors">hotro@phongtro.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Form or Quick Links */}
            <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Bạn cần hỗ trợ ngay?</h2>
              <p className="text-slate-600 mb-8">
                Đội ngũ của chúng tôi luôn túc trực 24/7 để giải quyết các vấn đề của bạn trong thời gian sớm nhất có thể. Xin vui lòng liên hệ qua Zalo hoặc Hotline để có phản hồi lập tức.
              </p>
              
              <div className="space-y-4">
                <a 
                  href={`https://zalo.me/${ZALO_PHONE}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                  Chat nhanh qua Zalo
                </a>
                
                <a 
                  href={`tel:${CALL_PHONE}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Gọi Hotline: {CALL_PHONE}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
