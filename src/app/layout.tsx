import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nayel",
  description: "Nayel's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col flex-1 px-4 pt-8 pb-32">{children}</main>
        <Navbar />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
