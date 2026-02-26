import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Removed Material_Symbols_Outlined
import { Providers } from "@/components/Providers";
import "./globals.css";
import "material-symbols/outlined.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OT-Muse - AI World Building",
  description: "The infinite canvas for narrative intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
