import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Header from "@/shared/components/Header";
import Sidebar from "@/shared/components/Sidebar";
import Footnavbar from "@/shared/components/Footnavbar"; 

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
          <div className="sticky top-0 left-0 z-50"><Header /></div>
          <div className="flex items-start min-h-screen bg-white relative overflow-hidden text-gray-100">
            
            <div className="relative z-10 flex">
              <div className="fixed top-0 left-0 mt-16 w-full z-10 hidden md:block md:max-w-52 lg:max-w-72">
                <Sidebar />
              </div>
              <div className=" w-[calc(100vw-0rem)] md:w-[calc(100vw-14rem)] lg:w-[calc(100vw-19rem)] md:ml-52 lg:ml-72 overflow-x-hidden scroll-smooth px-4 py-2">
                {children}
              </div>
            </div>
          </div>
           <div className="md:hidden sticky bottom-0 left-0 z-50">
              <Footnavbar/>
            </div>
        </Providers>
      </body>
    </html>
  );
}
