import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "PhumCine - មើលរឿងខ្មែរនិងបរទេស",
  description: "PhumCine គឺជាគេហទំព័រសម្រាប់ទស្សនាភាពយន្តខ្មែរ និងបរទេសដែលមានគុណភាពខ្ពស់។",
  openGraph: {
    title: "PhumCine - មើលរឿងខ្មែរនិងបរទេស",
    description: "PhumCine គឺជាគេហទំព័រសម្រាប់ទស្សនាភាពយន្តខ្មែរ និងបរទេសដែលមានគុណភាពខ្ពស់។",
    type: "website",
    siteName: "PhumCine",
  },
  icons: {
    icon: "/PHUMCINE.png",
    shortcut: "/PHUMCINE.png",
    apple: "/PHUMCINE.png",
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className="antialiased bg-black text-textPrimary flex justify-center min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          <div className="w-full bg-background min-h-screen relative shadow-2xl pb-16 overflow-x-hidden">
            {children}
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
