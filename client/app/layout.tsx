import "@/styles/globals.scss";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Footer from "@/components/footer";
import { Providers } from "./providers";
import AuthRouter from "./authRouter";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | CodeReader.app`,
  },
  description: siteConfig.description,
  keywords: [
    "qr code scanner",
    "barcode scanner",
    "qr code generator",
    "barcode generator",
    "free qr code scanner",
    "free barcode scanner",
    "qr code reader",
    "barcode reader",
    "generate qr code",
    "create qr code",
    "qr code for wifi",
    "qr code for url",
    "qr code for contact",
    "qr code for email",
    "qr code for sms",
    "qr code for location",
    "qr code scanner online",
    "barcode scanner online",
    "qr code generator online",
    "save qr codes",
    "qr code history",
    "scan qr code",
    "mobile qr scanner",
    "web qr scanner",
    "qr code app",
    "barcode app",
  ],
  authors: [{ name: "CodeReader.app" }],
  creator: "CodeReader.app",
  publisher: "CodeReader.app",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "CodeReader.app",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "CodeReader.app - Free QR Code & Barcode Scanner & Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@codereaderapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <AuthRouter>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </AuthRouter>
        </Providers>
      </body>
    </html>
  );
}