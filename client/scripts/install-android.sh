#!/bin/bash
# Install and run the Android APK on connected device/emulator

set -e
cd "$(dirname "$0")/.."

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
TMP_APK="/tmp/codereader-android-build/android/app/build/outputs/apk/debug/app-debug.apk"
PACKAGE_NAME="com.example.app"
MAIN_ACTIVITY="com.example.app.MainActivity"

# Find the APK
if [ -f "$APK_PATH" ]; then
    INSTALL_APK="$APK_PATH"
elif [ -f "$TMP_APK" ]; then
    INSTALL_APK="$TMP_APK"
else
    echo "❌ APK not found. Run 'pnpm cap:build:android' first."
    exit 1
fi

echo "📱 Installing APK: $INSTALL_APK"

# Check for connected devices
ADB="${ANDROID_HOME:-$HOME/Library/Android/sdk}/platform-tools/adb"

if [ ! -f "$ADB" ]; then
    # Try to find adb in PATH
    ADB=$(which adb 2>/dev/null || echo "")
fi

if [ -z "$ADB" ] || [ ! -f "$ADB" ]; then
    echo "❌ ADB not found. Please install Android SDK or set ANDROID_HOME."
    exit 1
fi

# List devices
DEVICES=$("$ADB" devices | grep -v "List" | grep -v "^$" | wc -l)

if [ "$DEVICES" -eq 0 ]; then
    echo "❌ No devices/emulators connected."
    echo ""
    echo "Start an emulator or connect a device, then try again."
    echo "To start an emulator: $ANDROID_HOME/emulator/emulator -avd <avd_name>"
    exit 1
fi

echo "📲 Found $DEVICES device(s)"

# Install the APK
echo "⬇️  Installing app..."
"$ADB" install -r "$INSTALL_APK"

# Launch the app
echo "🚀 Launching app..."
"$ADB" shell am start -n "$PACKAGE_NAME/$MAIN_ACTIVITY"

echo ""
echo "✅ Done! App should be running on your device."

