import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outpost | One newsroom. Zero noise.",
  description:
    "A Supabase-powered news publishing website for fast editorial teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
