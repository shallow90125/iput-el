import Header from "@/components/Header";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alarm App",
  description: "Alarm App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" dark">
      <body className={font.className}>
        <Providers>
          <div className=" flex min-h-[100dvh] flex-col bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-default to-black">
            <Header />
            <main className=" grid flex-grow place-items-center p-4">
              {children}
            </main>
            <footer className=" grid h-16 flex-none place-items-center border-t border-divider">
              <div className=" bg-gradient-to-b from-primary from-75% to-white bg-clip-text font-bold text-transparent">
                &copy; 2023 iput-el
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
