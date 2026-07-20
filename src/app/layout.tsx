import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "SabayFlix",
  description: "SabayFlix Clone Built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className="antialiased bg-black text-textPrimary flex justify-center min-h-screen" suppressHydrationWarning>
        <div className="w-full bg-background min-h-screen relative shadow-2xl pb-16 overflow-x-hidden">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
