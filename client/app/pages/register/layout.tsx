import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Create Free Account | CodeReader.app",
  description: "Create a free account on CodeReader.app to save and manage your QR codes and barcodes. Access your saved codes, view history, and sync across devices. Sign up with Google or email.",
  keywords: [
    "codereader sign up",
    "create account codereader",
    "register codereader",
    "qr code account",
    "barcode account",
    "free account",
    "sign up free",
  ],
  openGraph: {
    title: "Sign Up - Create Free Account | CodeReader.app",
    description: "Create a free account to save and manage your QR codes and barcodes. Sign up with Google or email.",
    type: "website",
    url: "https://codereader.app/pages/register",
  },
  twitter: {
    card: "summary",
    title: "Sign Up - Create Free Account",
    description: "Create a free account to save and manage your QR codes and barcodes. Sign up with Google or email.",
  },
  alternates: {
    canonical: "https://codereader.app/pages/register",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

