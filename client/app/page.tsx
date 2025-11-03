import { Metadata } from "next";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export const metadata: Metadata = {
  title: "CodeReader.app - Free QR Code & Barcode Scanner & Generator",
  description: "Free QR code scanner, barcode scanner, and generator. Generate QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more. Save and manage your codes. 100% free, no signup required.",
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
    "save qr codes",
    "qr code history",
    "scan qr code",
    "mobile qr scanner",
    "web qr scanner",
    "qr code app",
    "barcode app",
  ],
  openGraph: {
    title: "CodeReader.app - Free QR Code & Barcode Scanner & Generator",
    description: "Free QR code scanner, barcode scanner, and generator. Generate QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more.",
    type: "website",
    url: "https://codereader.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeReader.app - Free QR Code & Barcode Scanner & Generator",
    description: "Free QR code scanner, barcode scanner, and generator. Generate QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more.",
  },
  alternates: {
    canonical: "https://codereader.app",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "CodeReader.app",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web, iOS, Android",
            description: "Free QR code scanner, barcode scanner, and generator. Generate QR codes for WiFi, URL, contact, email, SMS, location, calendar, and more.",
            url: "https://codereader.app",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "QR Code Scanner",
              "Barcode Scanner",
              "QR Code Generator",
              "Barcode Generator",
              "Generate WiFi QR Codes",
              "Generate URL QR Codes",
              "Generate Contact QR Codes",
              "Generate Email QR Codes",
              "Generate SMS QR Codes",
              "Generate Location QR Codes",
              "Generate Calendar QR Codes",
              "Save QR Codes",
              "Manage QR Code History",
              "Free to use",
              "No download required",
              "Works on mobile and desktop",
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 px-4">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary opacity-10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Scan & Generate<br />QR Codes & Barcodes
              </h1>
              <p className="text-xl sm:text-2xl text-foreground/80 font-medium mb-8 max-w-3xl mx-auto">
                Free QR code and barcode scanner & generator. No download, no signup required. Works on any device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/pages/qrcode"
                  className="px-8 py-4 text-lg font-bold bg-gradient-primary text-primary-foreground rounded-2xl hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 13H21V16H18V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 18H16V21H13V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 18H21V21H18V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Start Scanning
                </Link>
                <Link
                  href="/pages/createqrcode"
                  className="px-8 py-4 text-lg font-bold border-2 border-primary/40 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-2xl hover:from-primary/20 hover:to-secondary/20 hover:border-primary/60 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Generate QR Code
                </Link>
              </div>
            </div>

            {/* Hero Image/Demo */}
            <div className="mt-12 flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-success/10 rounded-3xl p-8 border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
                  <QRCodeSVG 
                    value="https://codereader.app"
                    size={256}
                    level="H"
                    includeMargin={true}
                    className="w-48 h-48 sm:w-64 sm:h-64"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center shadow-glow-success animate-bounce">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-content1 via-content1 to-primary/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1: Scanner */}
              <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 13H21V16H18V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 18H16V21H13V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 18H21V21H18V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">QR Code Scanner</h3>
                <p className="text-foreground/70 mb-4">Scan any QR code instantly with your camera. Works on mobile and desktop. No app download required.</p>
                <Link href="/pages/qrcode" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Start Scanning <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Feature 2: Barcode Scanner */}
              <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7M3 7H21M3 7L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Barcode Scanner</h3>
                <p className="text-foreground/70 mb-4">Scan barcodes in various formats including EAN-13, EAN-8, UPC, CODE128, and CODE39.</p>
                <Link href="/pages/qrcode" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Scan Barcodes <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Feature 3: QR Code Generator */}
              <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">QR Code Generator</h3>
                <p className="text-foreground/70 mb-4">Create QR codes for WiFi, URLs, contacts, emails, SMS, locations, calendar events, and more.</p>
                <Link href="/pages/createqrcode" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Generate Now <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Feature 4: Barcode Generator */}
              <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7M3 7H21M3 7L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Barcode Generator</h3>
                <p className="text-foreground/70 mb-4">Generate barcodes in multiple formats: EAN-13, EAN-8, UPC, CODE128, CODE39, and ITF-14.</p>
                <Link href="/pages/createqrcode" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Create Barcode <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Feature 5: Save & Manage */}
              <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Save & Manage</h3>
                <p className="text-foreground/70 mb-4">Save all your scanned and generated codes. Search, filter, and organize your QR code collection.</p>
                <Link href="/pages/qrcodehistory" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  View History <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Feature 6: 100% Free */}
              <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-content1 via-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-glow-primary transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">100% Free</h3>
                <p className="text-foreground/70 mb-4">No hidden fees, no premium plans. All features are completely free forever. No signup required to start.</p>
                <span className="text-primary font-semibold flex items-center gap-2">
                  Always Free <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Types Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Generate QR Codes For
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">Everything you need, all in one place</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: "📶", name: "WiFi", desc: "Share WiFi passwords" },
                { icon: "🔗", name: "URL", desc: "Website links" },
                { icon: "👤", name: "Contact", desc: "vCard & MeCard" },
                { icon: "📧", name: "Email", desc: "Email messages" },
                { icon: "💬", name: "SMS", desc: "Text messages" },
                { icon: "📍", name: "Location", desc: "GPS coordinates" },
                { icon: "📅", name: "Calendar", desc: "Events" },
                { icon: "📞", name: "Phone", desc: "Phone numbers" },
                { icon: "📊", name: "Barcode", desc: "EAN, UPC, CODE128" },
                { icon: "💳", name: "Payment", desc: "Crypto addresses" },
                { icon: "🎟️", name: "Coupon", desc: "Discount codes" },
                { icon: "🛍️", name: "Product", desc: "SKU codes" },
              ].map((type, idx) => (
                <div key={idx} className="border-2 border-primary/20 rounded-2xl p-4 bg-gradient-to-br from-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300 text-center transform hover:scale-105">
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <div className="font-bold text-foreground mb-1">{type.name}</div>
                  <div className="text-xs text-foreground/60">{type.desc}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/pages/createqrcode"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold bg-gradient-primary text-primary-foreground rounded-xl hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Generate QR Code
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-success/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-foreground/80 mb-8 font-medium">
              Scan QR codes, generate barcodes, and manage your codes—all for free. No signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pages/qrcode"
                className="px-8 py-4 text-lg font-bold bg-gradient-primary text-primary-foreground rounded-2xl hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start Scanning Now
              </Link>
              <Link
                href="/pages/createqrcode"
                className="px-8 py-4 text-lg font-bold border-2 border-primary/40 bg-white/80 dark:bg-content1 text-primary rounded-2xl hover:border-primary/60 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Create QR Code
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
