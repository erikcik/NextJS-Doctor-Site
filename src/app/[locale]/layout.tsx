import "~/styles/globals.css";

import { type Metadata } from "next";
import { generateMetadata } from './metadata'

export { generateMetadata }
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { SiteHeader } from "~/components/site-header";
import { Navigation } from "~/components/navigation";
import Footer from "~/components/footer";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";



export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the specific locale
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SiteHeader />
        <Navigation />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
