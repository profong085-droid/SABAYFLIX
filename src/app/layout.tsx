import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/Toast";
import type { Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL("https://sabayflix-4.vercel.app"), 
  title: {
    default: "PhumCine - មើលរឿងខ្មែរនិងបរទេសកម្រិតច្បាស់ 4K",
    template: "%s | PhumCine",
  },
  description: "PhumCine (ភូមិស៊ីនេ) គឺជាគេហទំព័រសម្រាប់ទស្សនាភាពយន្តខ្មែរ ថៃ ចិន កូរ៉េ និងបរទេស ដែលមានគុណភាពច្បាស់ (HD/4K) គ្មានពាណិជ្ជកម្មរំខាន និងលឿន។ មើលរឿងភាគ រឿងដុំថ្មីៗ ល្បីៗជារៀងរាល់ថ្ងៃ។",
  keywords: ["មើលរឿង", "រឿងខ្មែរ", "រឿងថៃ", "រឿងចិន", "រឿងកូរ៉េ", "ភាពយន្ត", "PhumCine", "មើលរឿងអនឡាញ", "Khmer Movie", "Khmer Dubbed", "Watch Movies Online Cambodia", "រឿងថ្មីៗ"],
  authors: [{ name: "PhumCine Team" }],
  creator: "PhumCine",
  publisher: "PhumCine",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PhumCine",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: "5rexrdgbpnsKJSydQmuKcOW5JgqOyKYP_DPirlC0hcs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "PhumCine - មើលរឿងខ្មែរនិងបរទេសកម្រិតច្បាស់ 4K",
    description: "មើលរឿងភាគ រឿងដុំថ្មីៗ ល្បីៗជារៀងរាល់ថ្ងៃ គ្មានពាណិជ្ជកម្មរំខាន ជាមួយ PhumCine។",
    url: "https://sabayflix-4.vercel.app",
    type: "website",
    siteName: "PhumCine",
    locale: "km_KH",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhumCine - មើលរឿងខ្មែរនិងបរទេសកម្រិតច្បាស់ 4K",
    description: "មើលរឿងភាគ រឿងដុំថ្មីៗ ល្បីៗជារៀងរាល់ថ្ងៃ គ្មានពាណិជ្ជកម្មរំខាន ជាមួយ PhumCine។",
  },
  icons: {
    icon: "/PHUMCINE.png",
    shortcut: "/PHUMCINE.png",
    apple: "/PHUMCINE.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://sabayflix-4.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@300;400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-black text-textPrimary flex justify-center min-h-screen font-sans" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <div className="w-full bg-background min-h-screen relative shadow-2xl pb-16 overflow-x-hidden">
              {children}
              <BottomNav />
            </div>
          </ToastProvider>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
