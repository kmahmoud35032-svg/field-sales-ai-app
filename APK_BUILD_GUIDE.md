# How to Build Android APK

Since this project uses Expo, you can generate an APK (or AAB for Play Store) using **EAS Build**.

## Prerequisites
1.  Install EAS CLI: `npm install -g eas-cli`
2.  Login to Expo: `eas login`

## Configuration
I have created a basic `eas.json` configuration for you.

## Steps to Build APK

1.  **Navigate to mobile app directory**:
    ```bash
    cd mobile-app
    ```

2.  **Configure Project**:
    If this is the first time, run:
    ```bash
    eas build:configure
    ```
    Select `Android`.

3.  **Build for Emulator/Device (APK)**:
    Run the following command to generate an installable APK file:
    ```bash
    eas build -p android --profile preview
    ```

4.  **Download**:
    Once the build finishes, Expo will provide a link to download the `.apk` file.

## Steps to Build for Play Store (AAB)

1.  Run:
    ```bash
    eas build -p android --profile production
    ```

## Troubleshooting
- If you see errors about "credentials", follow the interactive prompts to let EAS handle keystore generation.
- Ensure your `app.json` has a unique `package` name in the `android` section (e.g., `com.yourname.fieldsurvey`).
