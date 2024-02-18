import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { Viewport } from "next";
import { cookies } from "next/headers";
import { AxiomWebVitals } from "next-axiom";
import { ToastContainer, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./styles/layout.scss";
import { Toaster } from "@/components/ui/sonner";
import { Aside } from "@/features/aside";
import { AuthModalTrigger } from "@/features/auth";
import { MobilePostButton } from "@/features/create-post";
import { MobileNavbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { NextAuthProvider } from "@/utils/next-auth-provider";
import { ReactQueryProvider } from "@/utils/react-query-provider";

import { Hamburger } from "./hamburger";
import { JoinMention } from "./join-mention";
import styles from "./styles/toast.module.scss";
import "./styles/layout.scss";

export const metadata: Metadata = {
  title: {
    default: "Mention",
    template: "%s | Mention",
    absolute: "Mention",
  },
  description:
    "We believe in the potential of people when they can come together.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["socialnetwork", "socialmedia", "social", "people"],
  authors: [
    { name: "Albert Isern Alvarez" },
    {
      name: "Peable",
      url: "https://peable.co/",
    },
  ],
  creator: "Albert Isern Alvarez",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme");
  const color = nextCookies.get("color");
  const fontSize = nextCookies.get("font-size");

  return (
    <html
      className={`${theme?.value ?? ""} ${color?.value ?? ""} ${
        fontSize?.value ?? ""
      }`}
      lang="en"
    >
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <div className="layout">
              <MobileNavbar />
              <MobilePostButton />

              <Sidebar />

              <main>{children}</main>

              <Aside />

              <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={true}
                transition={Slide}
                closeButton={false}
                closeOnClick={true}
                className={styles.container}
                toastClassName={styles.toast}
                role="alert"
              />
              <Toaster />

              <AuthModalTrigger />
              <JoinMention />
              <Hamburger />
            </div>
          </ReactQueryProvider>
        </NextAuthProvider>
        <Analytics />
        <AxiomWebVitals />
      </body>
    </html>
  );
}
