"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {store} from "./store"
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';

// Amplify.configure(config);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-100 text-gray-900`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
