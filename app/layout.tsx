"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import Navbar from "./components/Navbar";
import NextTopLoader from "nextjs-toploader";
import MobileNavigation from "./components/MobileNavigation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "700", "1000"], // Add the weights you need
  style: ["normal", "italic"], // Add styles you need
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} mb-16 ${nunito.className} antialiased`}>
        <NextTopLoader color="#29D" />
        <Navbar />
        <Provider store={store}>{children}</Provider>
      </body>
      <div className="fixed bottom-0 z-50  w-full md:hidden">
        <MobileNavigation />
      </div>
    </html>
  );
}
