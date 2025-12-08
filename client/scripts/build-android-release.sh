#!/bin/bash
# Build script for Android Release (Play Store)
# This creates a signed AAB (Android App Bundle) for Play Store upload

set -e
cd "$(dirname "$0")/.."

PROJECT_ROOT=$(pwd)
TMP_PROJECT="/tmp/codereader-android-build"
KEYSTORE_PATH="$PROJECT_ROOT/android/keystore/release.keystore"

echo "🏗️  Building CodeReader for Play Store..."
echo ""

# Check if keystore exists
if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "⚠️  No keystore found. Creating one..."
    echo ""
    echo "You'll need to provide:"
    echo "  - Keystore password (remember this!)"
    echo "  - Key alias (e.g., 'codereader')"
    echo "  - Key password (can be same as keystore password)"
    echo "  - Your name, organization, etc."
    echo ""
    
    mkdir -p "$PROJECT_ROOT/android/keystore"
    
    keytool -genkey -v \
        -keystore "$KEYSTORE_PATH" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -alias codereader
    
    echo ""
    echo "✅ Keystore created at: $KEYSTORE_PATH"
    echo ""
    echo "⚠️  IMPORTANT: Back up your keystore file and passwords!"
    echo "   You'll need them for all future updates to your app."
    echo ""
fi

echo "🧹 Cleaning up..."
rm -rf "$TMP_PROJECT" 2>/dev/null || true
rm -rf android/app/build android/build android/.gradle 2>/dev/null || true
find . -name '._*' -delete 2>/dev/null || true

echo "📦 Building Next.js..."
pnpm build

echo "📦 Syncing Capacitor..."
pnpm cap sync android

echo "📂 Copying Android project to /tmp..."
mkdir -p "$TMP_PROJECT"
cp -R android "$TMP_PROJECT/"
mkdir -p "$TMP_PROJECT/node_modules/.pnpm"
cp -R node_modules/.pnpm/@capacitor* "$TMP_PROJECT/node_modules/.pnpm/"
mkdir -p "$TMP_PROJECT/node_modules/@capacitor"
cp -R node_modules/@capacitor/* "$TMP_PROJECT/node_modules/@capacitor/" 2>/dev/null || true

cd "$TMP_PROJECT/android"

echo "🔨 Building Release AAB..."
./gradlew bundleRelease \
    -Dorg.gradle.project.capacitorNodeModulesPath="$TMP_PROJECT/node_modules"

cd "$PROJECT_ROOT"

# Copy back the AAB
mkdir -p android/app/build/outputs/bundle/release
cp "$TMP_PROJECT/android/app/build/outputs/bundle/release/"*.aab android/app/build/outputs/bundle/release/ 2>/dev/null || true

echo ""
echo "✅ Build complete!"
echo ""
echo "📦 AAB location: android/app/build/outputs/bundle/release/app-release.aab"
echo ""
echo "Next steps:"
echo "1. Go to https://play.google.com/console"
echo "2. Create a developer account (\$25 one-time fee)"
echo "3. Create a new app"
echo "4. Upload the AAB file"
echo "5. Fill in store listing, content rating, pricing"
echo "6. Submit for review"
echo ""


