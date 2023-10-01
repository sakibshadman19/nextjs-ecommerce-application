
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderMain from "@/components/HeaderMain";


import MobNavbar from "@/components/MobNavbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
     
        <HeaderMain />
        <MobNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}