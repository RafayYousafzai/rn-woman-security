import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
