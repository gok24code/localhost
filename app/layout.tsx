import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; // Import Navbar
import { createSupabaseServerClient } from "./lib/supabase/server"; // Import server client
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "TheLocalHost",
  description: "Welcome to TheLocalHost Forums",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${orbitron.variable} antialiased`}>
        <Navbar user={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
