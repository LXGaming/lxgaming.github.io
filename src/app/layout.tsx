import "@/app/globals.css";
import type { Metadata } from "next";
import { type ReactNode } from "react";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "lxgaming.me",
    template: "%s | lxgaming.me"
  },
  description: "Welcome to LX_Gaming's GitHub page.",
  authors: {
    name: "Alex Thomson"
  },
  robots: {
    follow: false,
    index: true
  }
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto p-3">
          <Providers>{props.children}</Providers>
        </div>
      </body>
    </html>
  );
}

export interface RootLayoutProps {
  children: ReactNode;
}