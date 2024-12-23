'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import Navbar from "./components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '400', '700', '1000'], // Add the weights you need
  style: ['normal', 'italic'], // Add styles you need
  display: 'swap',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${nunito.className} antialiased`}>
        <Navbar/>
        <Provider store={store}>{children}</Provider>
        </body>
    </html>
  );
}