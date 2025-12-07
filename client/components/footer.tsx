"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Footer = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    features: [
      { label: "QR Scanner", href: "/pages/qrcode" },
      { label: "Barcode Scanner", href: "/pages/qrcode" },
      { label: "QR Generator", href: "/pages/createqrcode" },
      { label: "Barcode Generator", href: "/pages/createqrcode" },
    ],
    resources: [
      { label: "My Codes", href: "/pages/qrcodehistory", auth: true },
      { label: "Sign In", href: "/pages/login", hideWhenAuth: true },
      { label: "Create Account", href: "/pages/register", hideWhenAuth: true },
    ],
  };

  return (
    <footer className="w-full mt-auto">
      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-content1 via-content1 to-primary/5 border-t-2 border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="md:col-span-5">
              <Link 
                href="/" 
                className="flex items-center gap-3 mb-5 w-fit group transition-all duration-300 hover:scale-105"
              >
                <div className="p-1.5 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-glow-primary transition-all duration-300">
                  <Logo size={40} className="rounded-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                    CodeReader.app
                  </span>
                  <span className="text-xs text-foreground/60 font-medium">
                    QR & Barcode Scanner
                  </span>
                </div>
              </Link>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-sm mb-5">
                Free QR code and barcode scanner & generator. 
                Create codes for WiFi, URLs, contacts, and more. 
                No download required—works on any device.
              </p>
              
              {/* App Badges/Features */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-success/20 to-success/10 text-success text-xs font-semibold border border-success/20 transition-all duration-300 hover:shadow-glow-success hover:scale-105 cursor-default">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  100% Free
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs font-semibold border border-primary/20 transition-all duration-300 hover:shadow-glow-primary hover:scale-105 cursor-default">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Mobile Ready
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary text-xs font-semibold border border-secondary/20 transition-all duration-300 hover:shadow-glow-secondary hover:scale-105 cursor-default">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  No Signup
                </span>
              </div>
            </div>

            {/* Features Links */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider bg-gradient-primary bg-clip-text text-transparent">
                Features
              </h3>
              <ul className="space-y-3">
                {footerLinks.features.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group hover:translate-x-1"
                    >
                      <svg className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="group-hover:text-primary">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="md:col-span-2">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider bg-gradient-secondary bg-clip-text text-transparent">
                Account
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources
                  .filter(link => {
                    if (link.auth && !user) return false;
                    if (link.hideWhenAuth && user) return false;
                    return true;
                  })
                  .map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-foreground/70 hover:text-secondary transition-all duration-300 text-sm flex items-center gap-2 group hover:translate-x-1"
                    >
                      <svg className="w-4 h-4 text-secondary/50 group-hover:text-secondary transition-colors duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="group-hover:text-secondary">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="md:col-span-2">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider bg-gradient-success bg-clip-text text-transparent">
                Quick Start
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/pages/qrcode"
                  className="group relative inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-primary text-white font-bold text-sm shadow-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="none">
                    <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="relative z-10">Scan Now</span>
                </Link>
                <Link
                  href="/pages/createqrcode"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 text-primary font-bold text-sm hover:border-primary/50 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Create QR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-content2 via-content2 to-primary/10 border-t-2 border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-foreground/50 text-xs text-center sm:text-left">
              © {currentYear} <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">CodeReader.app</span> — All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-foreground/40 text-xs">
                Made with
              </span>
              <span className="text-danger animate-pulse">♥</span>
              <span className="text-foreground/40 text-xs">
                for everyone
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
