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
      <body>
        <Header />
        {children}
        <Navbar />
      </body>
    </html>
  );
}
