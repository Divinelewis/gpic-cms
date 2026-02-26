import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";

export const metadata: Metadata = {
  title: "GPIC - Greater Purpose International Church",
  description:
    "GPIC is not just a space, it is an experience. A series of impactful and transformational encounters that bring change to the lives of people.",
  keywords:
    "church, GPIC, Greater Purpose, spiritual growth, transformation, worship",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
