"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Providers>
        <html lang="en">
          <body
            className={`${inter.className} min-h-screen bg-gray-100 text-gray-900`}
          >
            {children}
          </body>
        </html>
      </Providers>
  );
}
