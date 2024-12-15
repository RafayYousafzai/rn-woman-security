import { Tabs } from "expo-router";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
