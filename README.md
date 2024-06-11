![Eventio Logo](/assets/images/white-logo.png "Eventio Logo")

# Eventio.

Eventio, a mobile app that allows registered users to sign up for and create events.

## Get started

### Bun

This app is using [![Bun Logo!](/assets/images/bun_logo.png "Bun Logo") _Bun_](https://bun.sh/)!

Make sure you are using `v.1.1.12`!

For instructions how to install Bun follow their [website](https://bun.sh/)!

1. Install dependencies

   ```bash
   bun install
   ```

2. Add API key

- Copy API key from email or project documentation to `.env.development` file

  ```
  EXPO_PUBLIC_API_KEY=abc123456-789-9bce87-654cde
  ```

  _In production, the CI will have production API key saved in its configuration files._

  _In case of production errors, check if the key is setup correctly._

## Starting the app

### Default start

```bash
 bun expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### Direct platform start

**IOS**

```
bun run ios
```

**ANDROID**

```
bun run android
```

## Resources

### Project Documentation

- [Google Docs](https://docs.google.com/document/d/167XfckICXbD52TVxN2a83VxcZPCxmIKJ2HfOBR3vaG4/)

- [Eventio API](https://eventio-testproject-api.vercel.app/)

### Bun

[Using Expo with Bun](https://docs.expo.dev/guides/using-bun/)

### Expo

This project uses [Expo file-based routing](https://docs.expo.dev/router/introduction).

### TanStack Query (previously React Query)

[Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
