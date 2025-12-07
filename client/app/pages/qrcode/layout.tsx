import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code & Barcode Scanner - Scan Any Code Instantly | CodeReader.app",
  description: "Free QR code scanner and barcode scanner. Scan any QR code or barcode instantly with your camera. Works on mobile and desktop. No download, no signup required. Save scanned codes to your account.",
  keywords: [
    "qr code scanner",
    "barcode scanner",
    "free qr code scanner",
    "free barcode scanner",
    "qr code reader",
    "barcode reader",
    "scan qr code",
    "scan barcode",
    "mobile qr scanner",
    "web qr scanner",
    "online qr scanner",
    "online barcode scanner",
    "qr code scanner app",
    "barcode scanner app",
  ],
  openGraph: {
    title: "Free QR Code & Barcode Scanner - Scan Any Code Instantly",
    description: "Scan any QR code or barcode instantly with your camera. Free, no download required. Works on mobile and desktop.",
    type: "website",
    url: "https://codereader.app/pages/qrcode",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code & Barcode Scanner",
    description: "Scan any QR code or barcode instantly with your camera. Free, no download required.",
  },
  alternates: {
    canonical: "https://codereader.app/pages/qrcode",
  },
};

export default function QRCodeScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
