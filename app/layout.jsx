import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Adjust path based on your folder structure

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rangers Sale Shop - Premium Sports Jerseys",
  description: "Shop authentic Rangers jerseys and sports merchandise. Premium quality, fast shipping, great prices.",
  icons: {
    icon: "/appLogo.png", // Path to your favicon
    shortcut: "/appLogo.png", // Shortcut icon for browsers
    apple: "/appLogo.png", // Apple touch icon
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}