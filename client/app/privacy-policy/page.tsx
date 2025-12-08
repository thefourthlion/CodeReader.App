"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        <p className="text-foreground/60 mb-8">Last updated: December 8, 2024</p>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p>
              CodeReader ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application and website (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground mb-2">Camera Access</h3>
            <p>
              Our app requests access to your device's camera solely for the purpose of scanning QR codes and barcodes. We do not store, transmit, or share any images or video captured by your camera. All scanning is processed locally on your device.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Account Information</h3>
            <p>
              If you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address</li>
              <li>Display name (if provided)</li>
              <li>Authentication data through Firebase Authentication</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">QR Code History</h3>
            <p>
              If you're logged in, we store your scanned QR codes and generated QR codes to provide history functionality. This data is associated with your account and stored securely.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide QR code scanning and generation functionality</li>
              <li>To save your QR code history (if logged in)</li>
              <li>To authenticate your account</li>
              <li>To improve our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Firebase Authentication</strong> - For secure user authentication</li>
              <li><strong>Google Sign-In</strong> - For optional social login</li>
            </ul>
            <p className="mt-4">
              These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Storage & Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption. We do not sell, trade, or otherwise transfer your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p>
              We retain your account data and QR code history for as long as your account is active. You can delete your account and associated data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of data collection by not creating an account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@codereader.app
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10">
          <a 
            href="/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

