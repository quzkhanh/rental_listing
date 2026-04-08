import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhòngTrọ - Tìm phòng trọ nhanh chóng",
  description: "Tìm phòng trọ, căn hộ mini, ký túc xá giá tốt. Tìm kiếm theo giá, khu vực — liên hệ nhanh qua Zalo.",
  keywords: "phòng trọ, thuê phòng, sinh viên, giá rẻ, căn hộ mini, Hà Nội",
  openGraph: {
    title: "PhòngTrọ - Tìm phòng trọ nhanh chóng",
    description: "Tìm phòng trọ giá tốt với bộ lọc thông minh. Liên hệ nhanh qua Zalo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">PhòngTrọ</span>
              </div>
              <p className="text-sm text-slate-500">
                © 2026 PhòngTrọ. Tìm phòng trọ nhanh chóng
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
