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

      <div className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  <span className="text-sm font-medium text-foreground/80">100% Free • No Signup Required</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <span className="block text-foreground">Scan & Create</span>
                  <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                    QR Codes Instantly
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The fastest way to scan barcodes and generate QR codes. 
                  Works on any device, no app download needed. 
                  <span className="text-primary font-medium"> Start in seconds.</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/pages/qrcode"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-primary text-white rounded-2xl overflow-hidden shadow-xl shadow-primary/25 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <svg className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none">
                      <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 17H21V21H17V17Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 13H17V17H13V13Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="relative z-10">Start Scanning</span>
                    <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  
                  <Link
                    href="/pages/createqrcode"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold border-2 border-primary/30 text-primary rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 transition-all duration-300 hover:border-primary/60 hover:from-primary/10 hover:to-secondary/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    <span>Create QR Code</span>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                  {[
                    { icon: "⚡", text: "Instant Results" },
                    { icon: "🔒", text: "Privacy First" },
                    { icon: "🌍", text: "Works Offline" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-foreground/60">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Interactive Demo */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-success/30 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-content1/80 to-content2/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 border-2 border-primary/20 shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:scale-[1.02]">
                    {/* QR Code */}
                    <div className="relative">
                      <QRCodeSVG 
                        value="https://codereader.app"
                        size={280}
                        level="H"
                        includeMargin={false}
                        className="w-56 h-56 sm:w-72 sm:h-72 rounded-xl"
                        bgColor="transparent"
                        fgColor="currentColor"
                      />
                      
                      {/* Scan Animation Overlay */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute -top-4 -right-4 flex items-center gap-2 px-4 py-2 bg-gradient-success text-white rounded-full shadow-lg shadow-success/30 font-bold text-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Try it now
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -bottom-6 -left-6 p-4 bg-content1/90 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60">Scans today</p>
                        <p className="font-bold text-foreground">12,847</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: "1M+", label: "Scans Completed", icon: "📊" },
                { value: "500K+", label: "QR Codes Generated", icon: "✨" },
                { value: "99.9%", label: "Uptime", icon: "🚀" },
                { value: "0", label: "Cost Forever", icon: "💰" },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-content1 to-content2/50 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Powerful Features
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Everything You Need,</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">All in One Place</span>
              </h2>
              <p className="text-lg text-foreground/60 leading-relaxed">
                From lightning-fast scanning to professional QR code generation, 
                we&apos;ve built the complete toolkit for modern code management.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9V3H9V9H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9H15V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 15H9V21H3V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 15H21V21H15V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "QR Code Scanner",
                  description: "Scan any QR code in milliseconds using your device camera. Supports all standard formats with instant recognition.",
                  gradient: "from-primary to-primary/70",
                  link: "/pages/qrcode",
                  linkText: "Start Scanning",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 8V16M10 10V14M13 8V16M16 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "Barcode Scanner",
                  description: "Read EAN-13, EAN-8, UPC, CODE128, CODE39 and more. Perfect for inventory, retail, and product lookup.",
                  gradient: "from-secondary to-secondary/70",
                  link: "/pages/qrcode",
                  linkText: "Scan Barcodes",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "QR Generator",
                  description: "Create custom QR codes for URLs, WiFi, contacts, events, and more. Download in high resolution for any use.",
                  gradient: "from-success to-success/70",
                  link: "/pages/createqrcode",
                  linkText: "Generate Now",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Save & Organize",
                  description: "Keep a history of all scanned and generated codes. Search, filter, and manage your collection effortlessly.",
                  gradient: "from-warning to-warning/70",
                  link: "/pages/qrcodehistory",
                  linkText: "View History",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Privacy First",
                  description: "All processing happens locally in your browser. Your data never leaves your device. No tracking, no ads.",
                  gradient: "from-primary to-secondary",
                  link: "#",
                  linkText: "Learn More",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "Works Everywhere",
                  description: "No app download required. Works on iPhone, Android, tablets, and desktops. Fully responsive design.",
                  gradient: "from-secondary to-primary",
                  link: "#",
                  linkText: "Try Now",
                },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-content1 to-content2/50 border-2 border-transparent hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Link */}
                  <Link 
                    href={feature.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold group/link"
                  >
                    <span>{feature.linkText}</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QR Code Types Section */}
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-content2/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Create QR Codes for</span>
                <br />
                <span className="bg-gradient-secondary bg-clip-text text-transparent">Any Purpose</span>
              </h2>
              <p className="text-lg text-foreground/60">
                Generate professional QR codes for websites, WiFi networks, contact cards, 
                events, payments, and much more.
              </p>
            </div>

            {/* Types Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {[
                { icon: "🔗", name: "Website URL", desc: "Links & URLs" },
                { icon: "📶", name: "WiFi", desc: "Network Access" },
                { icon: "👤", name: "Contact", desc: "vCard & MeCard" },
                { icon: "📧", name: "Email", desc: "Quick Compose" },
                { icon: "💬", name: "SMS", desc: "Text Message" },
                { icon: "📞", name: "Phone", desc: "Quick Dial" },
                { icon: "📍", name: "Location", desc: "GPS Coords" },
                { icon: "📅", name: "Calendar", desc: "Events & Dates" },
                { icon: "📊", name: "Barcode", desc: "EAN, UPC, etc" },
                { icon: "💳", name: "Payment", desc: "Crypto & More" },
                { icon: "🎟️", name: "Coupon", desc: "Discount Codes" },
                { icon: "📝", name: "Plain Text", desc: "Any Message" },
              ].map((type, idx) => (
                <Link
                  key={idx}
                  href="/pages/createqrcode"
                  className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-content1 to-content2/30 border border-primary/10 text-center transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 hover:-translate-y-1"
                >
                  <div className="text-3xl sm:text-4xl mb-3 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {type.icon}
                  </div>
                  <div className="font-bold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">
                    {type.name}
                  </div>
                  <div className="text-xs text-foreground/50">{type.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-semibold mb-6">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                How It Works
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Three Simple Steps to</span>
                <br />
                <span className="bg-gradient-success bg-clip-text text-transparent">Get Started</span>
              </h2>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              {[
                {
                  step: "01",
                  title: "Open the Scanner",
                  description: "Click 'Start Scanning' and grant camera access. Works instantly in your browser.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "Point & Scan",
                  description: "Aim your camera at any QR code or barcode. Detection happens in real-time.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9V3H9M15 3H21V9M21 15V21H15M9 21H3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Get Results",
                  description: "Instantly view, copy, or take action on the decoded content. Save for later if needed.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Connector Line */}
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-16 left-[calc(50%+4rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
                  )}
                  
                  <div className="text-center">
                    {/* Icon Circle */}
                    <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-content1 to-content2 border-2 border-primary/20 mb-8 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500">
                      <div className="text-primary transition-transform duration-500 group-hover:scale-110">
                        {item.icon}
                      </div>
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-primary text-white font-bold text-sm flex items-center justify-center shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 max-w-xs mx-auto">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial/Social Proof */}
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-success/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              {/* Quote Icon */}
              <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-primary/20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 7H7a4 4 0 00-4 4v5h5a4 4 0 004-4V7zm10 0h-4a4 4 0 00-4 4v5h5a4 4 0 004-4V7z"/>
              </svg>
              
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-relaxed mb-8">
                &ldquo;The fastest, most reliable QR scanner I&apos;ve ever used. 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> No ads, no fuss, just works.</span>&rdquo;
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground">Alex Chen</div>
                  <div className="text-sm text-foreground/60">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-secondary/20 to-success/20 rounded-full blur-[150px]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="text-foreground">Ready to</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Start Scanning?</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of users who trust CodeReader.app for their daily scanning needs. 
              Free forever, no signup required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pages/qrcode"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold bg-gradient-primary text-white rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 transition-all duration-500 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill="none">
                  <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="relative z-10">Launch Scanner</span>
              </Link>
              
              <Link
                href="/pages/createqrcode"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold border-2 border-primary/30 text-primary rounded-2xl bg-content1/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span>Create QR Code</span>
              </Link>
            </div>

            {/* Final Trust Badge */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-foreground/50 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                No signup required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Works on all devices
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                100% free forever
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
