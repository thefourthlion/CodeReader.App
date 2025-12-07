import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code History - Save & Manage Your Scanned & Generated Codes",
  description: "View and manage all your saved QR codes and barcodes. Access your scanned codes and generated codes in one place. Organize, search, filter, and manage your QR code collection. Free account required.",
  keywords: [
    "qr code history",
    "save qr codes",
    "manage qr codes",
    "qr code collection",
    "saved qr codes",
    "scanned qr codes",
    "generated qr codes",
    "qr code library",
    "barcode history",
    "save barcodes",
    "manage barcodes",
    "qr code organizer",
    "qr code storage",
    "my qr codes",
    "qr code account",
  ],
  openGraph: {
    title: "QR Code History - Save & Manage Your Codes",
    description: "View and manage all your saved QR codes and barcodes. Organize, search, filter, and manage your QR code collection.",
    type: "website",
    url: "https://codereader.app/pages/qrcodehistory",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code History - Save & Manage Your Codes",
    description: "View and manage all your saved QR codes and barcodes. Organize, search, filter, and manage your QR code collection.",
  },
  alternates: {
    canonical: "https://codereader.app/pages/qrcodehistory",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function QRCodeHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "QR Code History",
            description: "View and manage all your saved QR codes and barcodes",
            url: "https://codereader.app/pages/qrcodehistory",
          }),
        }}
      />
      {children}
    </>
  );
}

