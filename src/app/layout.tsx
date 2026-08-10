import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import { PwaRuntime } from "@/features/pwa";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("title"),
    description: t("description"),
    applicationName: "Brevity",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "Brevity" },
    icons: { apple: [{ url: "/icons/brevity-512.png", sizes: "512x512", type: "image/png" }] },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <PwaRuntime>{children}</PwaRuntime>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
