import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - CodeReader.app | Free QR Code & Barcode Scanner",
  description: "Sign in to CodeReader.app to save and manage your QR codes and barcodes. Access your saved codes, view history, and sync across devices. Free account with Google or email.",
  keywords: [
    "codereader login",
    "sign in codereader",
    "qr code account",
    "barcode account",
    "save qr codes account",
    "manage qr codes",
    "qr code history",
    "free account",
  ],
  openGraph: {
    title: "Sign In - CodeReader.app",
    description: "Sign in to save and manage your QR codes and barcodes. Free account with Google or email.",
    type: "website",
    url: "https://codereader.app/pages/login",
  },
  twitter: {
    card: "summary",
    title: "Sign In - CodeReader.app",
    description: "Sign in to save and manage your QR codes and barcodes. Free account with Google or email.",
  },
  alternates: {
    canonical: "https://codereader.app/pages/login",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

