import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code & Barcode Generator - Create QR Codes for WiFi, URL, Contact & More",
  description: "Free QR code generator and barcode generator. Create QR codes for WiFi passwords, URLs, contact cards, email, SMS, location, calendar events, and more. Generate barcodes (EAN-13, EAN-8, UPC, CODE128, CODE39). Download or save your codes. 100% free.",
  keywords: [
    "qr code generator",
    "barcode generator",
    "free qr code generator",
    "free barcode generator",
    "generate qr code",
    "create qr code",
    "qr code for wifi",
    "qr code for url",
    "qr code for contact",
    "qr code for email",
    "qr code for sms",
    "qr code for location",
    "qr code for calendar",
    "wifi qr code generator",
    "url qr code generator",
    "contact qr code generator",
    "email qr code generator",
    "sms qr code generator",
    "location qr code generator",
    "generate barcode",
    "create barcode",
    "ean13 generator",
    "ean8 generator",
    "upc generator",
    "code128 generator",
    "code39 generator",
    "qr code generator online",
    "barcode generator online",
    "download qr code",
    "save qr code",
  ],
  openGraph: {
    title: "Free QR Code & Barcode Generator - Create QR Codes Online",
    description: "Generate QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more. Create barcodes (EAN-13, EAN-8, UPC, CODE128, CODE39). Free, no signup required.",
    type: "website",
    url: "https://codereader.app/pages/createqrcode",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code & Barcode Generator",
    description: "Generate QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more. Free, no signup required.",
  },
  alternates: {
    canonical: "https://codereader.app/pages/createqrcode",
  },
};

export default function CreateQRCodeLayout({
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
            "@type": "WebApplication",
            name: "CodeReader.app QR Code & Barcode Generator",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web, iOS, Android",
            description: "Free QR code and barcode generator. Create QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more.",
            url: "https://codereader.app/pages/createqrcode",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "QR Code Generator",
              "Barcode Generator",
              "Generate WiFi QR Codes",
              "Generate URL QR Codes",
              "Generate Contact QR Codes",
              "Generate Email QR Codes",
              "Generate SMS QR Codes",
              "Generate Location QR Codes",
              "Generate Calendar QR Codes",
              "EAN-13, EAN-8, UPC Barcode Generation",
              "CODE128, CODE39 Barcode Generation",
              "Download QR Codes",
              "Save QR Codes",
              "Free to use",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

