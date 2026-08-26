import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "하루빛 — 나의 스케줄러",
  description: "iOS 감성의 개인용 캘린더 & 할 일 스케줄러",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F2F2F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sf bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
