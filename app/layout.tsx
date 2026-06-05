import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AuthStatus } from "@/components/auth-status";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baseball Pros",
  description: "tracking all your important stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border-soft bg-surface">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
            <Link href="/" aria-label="Baseball Pros home">
              <Image
                src="/Baseball_Pros_Logo.png"
                alt="Baseball Pros logo"
                width={180}
                height={71}
                priority
              />
            </Link>
            <AuthStatus />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
