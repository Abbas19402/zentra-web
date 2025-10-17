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
          <div className="sticky top-0 left-0 z-10"><Header/></div>
          <div className="flex justify-center items-start">
            <div className="fixed top-0 left-0 mt-16 max-w-64 w-full z-10">
              <Sidebar />
            </div>
            <div className="ml-64 w-[calc(100vw-256px)] overflow-x-hidden scroll-smooth">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
