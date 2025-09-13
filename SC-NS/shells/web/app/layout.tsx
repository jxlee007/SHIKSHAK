import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shikshak AI",
  description: "Your personal AI tutor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex justify-between items-center p-4 border-b">
            <h1 className="text-xl font-bold">Shikshak AI</h1>
            <div>
              <SignedOut>
                <div className="flex gap-4">
                  <SignInButton mode="modal" />
                  <SignUpButton mode="modal" />
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link href="/chat" className="text-primary hover:underline">
                    Chat
                  </Link>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
