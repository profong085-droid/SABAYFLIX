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
  metadataBase: new URL("https://phumcine.com"), // Placeholder domain, swap later
  title: {
    default: "PhumCine - មើលរឿងខ្មែរនិងបរទេសកម្រិតច្បាស់ 4K",
    template: "%s | PhumCine",
  },
  description: "PhumCine (ភូមិស៊ីនេ) គឺជាគេហទំព័រសម្រាប់ទស្សនាភាពយន្តខ្មែរ ថៃ ចិន កូរ៉េ និងបរទេស ដែលមានគុណភាពច្បាស់ (HD/4K) គ្មានពាណិជ្ជកម្មរំខាន និងលឿន។ មើលរឿងភាគ រឿងដុំថ្មីៗ ល្បីៗជារៀងរាល់ថ្ងៃ។",
  keywords: ["មើលរឿង", "រឿងខ្មែរ", "រឿងថៃ", "រឿងចិន", "រឿងកូរ៉េ", "ភាពយន្ត", "PhumCine", "មើលរឿងអនឡាញ", "Khmer Movie", "Khmer Dubbed", "Watch Movies Online Cambodia", "រឿងថ្មីៗ"],
  authors: [{ name: "PhumCine Team" }],
  creator: "PhumCine",
  publisher: "PhumCine",
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
    url: "https://phumcine.com",
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
    canonical: "https://phumcine.com",
  },
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
