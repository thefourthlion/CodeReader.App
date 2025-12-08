"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { Capacitor } from "@capacitor/core";
import Link from "next/link";

const Register = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isNative = Capacitor.isNativePlatform();

  // Handle redirect result on page load (for mobile)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          router.push("/pages/qrcodehistory");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    handleRedirectResult();
  }, [auth, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/pages/qrcodehistory");  
    } catch (err) {
      // Friendly error messages
      if (err.code === 'auth/email-already-in-use') {
        setError("An account with this email already exists");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Use at least 6 characters");
      } else {
      setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      
      if (isNative) {
        await signInWithRedirect(auth, provider);
      } else {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/pages/qrcodehistory");  
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-secondary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-glow-primary transition-all duration-300">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M3 9V3H9V9H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3H21V9H15V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 15H9V21H3V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15H21V21H15V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CodeReader.app
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Create account
          </h1>
          <p className="text-foreground/60">
            Start saving your QR codes for free
          </p>
        </div>

        {/* Card */}
        <div className="bg-content1/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-2xl">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="text-danger text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
                required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-content2/50 border border-primary/10 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                id="password"
              type="password"
                placeholder="Create a password"
              autoComplete="new-password"
                required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-content2/50 border border-primary/10 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
                required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-content2/50 border border-primary/10 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            </div>

            {/* Register Button */}
            <button
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-content1/80 text-foreground/50 text-sm font-medium">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign Up Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
              className="w-full py-4 bg-content2/50 border border-primary/10 rounded-xl font-semibold text-foreground hover:bg-content2 hover:border-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              Continue with Google
              </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-foreground/60">
              Already have an account?{" "}
            <Link 
              href="/pages/login" 
              className="text-primary font-semibold hover:underline transition-colors"
            >
              Sign in
              </Link>
            </p>
        </div>

        {/* Back to Home */}
        <p className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-foreground/50 hover:text-foreground text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
