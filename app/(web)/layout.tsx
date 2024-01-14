// import React from "react";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ThemeProvider from "../components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "../components/AuthProvider/AuthProvider";
import Toast from "../components/Toast/Toast";

// Setting up font for the complete global website
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

// Metadata for application
export const metadata: Metadata = {
  title: "Harmony Initiatives",
  description:
    "Harmony Initiatives is dedicated to bridging corporates with impactful CSR opportunities. Our platform fosters sustainable partnerships to drive positive change in communities, environment, and economies worldwide. Join us in our commitment to create a harmonious future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeProvider>
            <Toast />
            <main className="font-normal">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
