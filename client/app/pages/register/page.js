"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "../../../styles/Register.scss";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/pages/qrcodehistory");  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/pages/qrcodehistory");  
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-2 -left-2 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
          <h1 className="relative text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="relative text-foreground/70 font-medium">Sign up to get started</p>
        </div>

        {/* Card */}
        <div className="border-2 border-primary/20 rounded-3xl p-8 bg-gradient-to-br from-content1 via-content1 to-primary/5 shadow-2xl backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 bg-danger/10 border-2 border-danger/30 rounded-2xl text-danger font-semibold text-sm">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
              isRequired
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!error}
              classNames={{
                base: "mb-4",
                label: "text-foreground font-semibold mb-2",
                input: [
                  "bg-content2",
                  "border-2",
                  "border-primary/20",
                  "rounded-xl",
                  "focus:border-primary",
                  "transition-all",
                  "duration-300",
                  "text-foreground",
                  "placeholder:text-foreground/40",
                ].join(" "),
                inputWrapper: [
                  "bg-content2",
                  "border-2",
                  "border-primary/20",
                  "rounded-xl",
                  "hover:border-primary/40",
                  "focus-within:border-primary",
                  "transition-all",
                  "duration-300",
                ].join(" "),
              }}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              isRequired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!error}
              classNames={{
                base: "mb-4",
                label: "text-foreground font-semibold mb-2",
                input: [
                  "bg-content2",
                  "border-2",
                  "border-primary/20",
                  "rounded-xl",
                  "focus:border-primary",
                  "transition-all",
                  "duration-300",
                  "text-foreground",
                  "placeholder:text-foreground/40",
                ].join(" "),
                inputWrapper: [
                  "bg-content2",
                  "border-2",
                  "border-primary/20",
                  "rounded-xl",
                  "hover:border-primary/40",
                  "focus-within:border-primary",
                  "transition-all",
                  "duration-300",
                ].join(" "),
              }}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              isRequired
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!error}
              classNames={{
                base: "mb-4",
                label: "text-foreground font-semibold mb-2",
                input: [
                  "bg-content2",
                  "border-2",
                  "border-primary/20",
                  "rounded-xl",
                  "focus:border-primary",
                  "transition-all",
                  "duration-300",
                  "text-foreground",
                  "placeholder:text-foreground/40",
                ].join(" "),
                inputWrapper: [
                  "bg-content2",
                  "border-2",
                  "border-primary/20",
                  "rounded-xl",
                  "hover:border-primary/40",
                  "focus-within:border-primary",
                  "transition-all",
                  "duration-300",
                ].join(" "),
              }}
            />
            <Button 
              className="w-full h-14 rounded-2xl font-bold bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 shadow-xl"
              color="primary" 
              variant="solid" 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-content1 text-foreground/60 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full px-6 py-4 border-2 border-primary/30 rounded-2xl bg-gradient-to-r from-content1 to-primary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 font-semibold text-foreground shadow-lg disabled:opacity-50"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>
            </div>

            <p className="text-center text-foreground/70 font-medium">
              Already have an account?{" "}
              <Link className="text-primary font-bold hover:underline bg-gradient-primary bg-clip-text text-transparent" href="/pages/login">
                Log In
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;