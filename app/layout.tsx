import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/Components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import React from "react";
import Player from "@/Components/Player";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotafake",
  description: "I LVOE MUSIC",
};
export const revalidate = 0;
export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ToasterProvider/>
      <SupabaseProvider  >
          <UserProvider>
              <ModalProvider/>
              <Sidebar songs ={userSongs}>
                  {children}
              </Sidebar>
              <Player/>
          </UserProvider>
      </SupabaseProvider>

      </body>
    </html>
  );
}
