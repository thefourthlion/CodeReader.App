#!/bin/bash
# Build script for Android that handles macOS AppleDouble (._) files on external drives
# Works around the issue by copying the entire Android project to /tmp

set -e
cd "$(dirname "$0")/.."

PROJECT_ROOT=$(pwd)
TMP_PROJECT="/tmp/codereader-android-build"

echo "🧹 Cleaning up..."
rm -rf "$TMP_PROJECT" 2>/dev/null || true
rm -rf android/app/build android/build android/capacitor-cordova-android-plugins/build android/.gradle 2>/dev/null || true
find . -name '._*' -delete 2>/dev/null || true

echo "📦 Syncing Capacitor..."
pnpm cap sync android

echo "📂 Copying Android project to /tmp (to avoid ._ files)..."
mkdir -p "$TMP_PROJECT"
# Copy android folder
cp -R android "$TMP_PROJECT/"
# Copy node_modules/@capacitor (needed for the build)
mkdir -p "$TMP_PROJECT/node_modules/@capacitor"
cp -R node_modules/@capacitor/* "$TMP_PROJECT/node_modules/@capacitor/" 2>/dev/null || true
# Also copy pnpm structure if it exists
if [ -d "node_modules/.pnpm" ]; then
    mkdir -p "$TMP_PROJECT/node_modules/.pnpm"
    cp -R node_modules/.pnpm/@capacitor* "$TMP_PROJECT/node_modules/.pnpm/" 2>/dev/null || true
fi

# Fix the paths in settings.gradle to use absolute paths
cd "$TMP_PROJECT/android"

echo "🔨 Building Android in /tmp..."
if ./gradlew assembleDebug -Dorg.gradle.project.capacitorNodeModulesPath="$TMP_PROJECT/node_modules"; then
    BUILD_SUCCESS=true
else
    BUILD_SUCCESS=false
fi

cd "$PROJECT_ROOT"

if [ "$BUILD_SUCCESS" = true ]; then
    # Copy back the APK
    mkdir -p android/app/build/outputs/apk/debug
    cp "$TMP_PROJECT/android/app/build/outputs/apk/debug/"*.apk android/app/build/outputs/apk/debug/ 2>/dev/null || true
    
    echo ""
    echo "✅ Build complete!"
    echo "📱 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "To install on device/emulator:"
    echo "  adb install android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "Or run:"
    echo "  adb install $TMP_PROJECT/android/app/build/outputs/apk/debug/app-debug.apk"
else
    echo ""
    echo "❌ Build failed. Try these alternatives:"
    echo ""
    echo "1. Open in Android Studio: pnpm cap:open:android"
    echo "   Then build from there (Build > Make Project)"
    echo ""
    echo "2. Move project to internal drive (not external)"
    echo "   The ._ files issue is caused by macOS AppleDouble format on external drives"
    exit 1
fi
