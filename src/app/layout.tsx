import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontBody = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
});

const fontHeadline = Nunito({ 
  subsets: ["latin"],
  variable: '--font-headline',
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: "HerCycle",
  description: "Your personal cycle tracking companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-body", fontBody.variable, fontHeadline.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
