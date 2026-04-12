import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
      viewportFit: "cover",
      themeColor: "#060407",
};

export const metadata: Metadata = {
      title: "Sverige TV — 20 000+ kanaler, 4K, Sport & Film",
      description: "Sveriges #1 TV-tjänst. 20 000+ live-kanaler, 4K/UHD, sport, filmer och serier.",
      manifest: "/manifest.json",
      appleWebApp: {
              capable: true,
              statusBarStyle: "black-translucent",
              title: "Sverige TV",
      },
      formatDetection: { telephone: false },
      icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
      children,
}: Readonly<{ children: React.ReactNode }>) {
      return (
              <html lang="sv" suppressHydrationWarning>
                    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                                {children}
                            </ThemeProvider>ThemeProvider>
                    </body>body>
              </html>html>
            );
}</html>
