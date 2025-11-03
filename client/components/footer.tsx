"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/Footer.scss";

const Footer = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  return (
    <footer className="Footer bg-gradient-to-r from-content2 via-content2 to-primary/5 border-t-2 border-primary/20 backdrop-blur-sm">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="brand-logo">
            <div className="bg-gradient-primary p-2 rounded-xl shadow-glow-primary inline-block">
              <Logo size={32} />
            </div>
            <span className="brand-text bg-gradient-primary bg-clip-text text-transparent font-bold">CodeReader.app</span>
          </div>
          <p className="company-slogan text-foreground/70 font-medium">Free QR Code & Barcode Scanner & Generator</p>
        </div>
        <div className="footer-navigation">
          <Link className="nav-link hover:text-primary transition-colors duration-300 font-semibold" href="/pages/qrcode">Scan</Link>
          <Link className="nav-link hover:text-primary transition-colors duration-300 font-semibold" href="/pages/createqrcode">Generator</Link>
          {user && <Link className="nav-link hover:text-primary transition-colors duration-300 font-semibold" href="/pages/qrcodehistory">My Codes</Link>}
          <Link className="nav-link hover:text-primary transition-colors duration-300 font-semibold" href="/pages/login">Sign In</Link>
        </div>
      </div>
      <hr className="footer-divider border-primary/20" />
      <div className="footer-bottom">
        <p className="copyright">©Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;