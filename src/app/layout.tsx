import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Header from "@/shared/components/Header";
import Sidebar from "@/shared/components/Sidebar";

export const metadata: Metadata = {
  title: "Zentra",
  description: "Created by Abbas Ali Dalal and Raj Bohara",
};

const font = Roboto({
  style: 'normal',
  subsets: ['latin'],
  weight: '400'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>
          <Header/>
          <div className="flex justify-center items-start">
            <Sidebar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
