import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import TopNav from "@/components/layout/TopNav";

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
    <html lang="km">
      <body className="antialiased bg-black text-textPrimary flex justify-center min-h-screen">
        <div className="w-full max-w-md bg-background min-h-screen relative shadow-2xl border-x border-gray-900 pb-16 overflow-x-hidden">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
