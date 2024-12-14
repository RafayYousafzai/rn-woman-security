import { tokenCache } from "@/lib/cache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
 
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </PaperProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
