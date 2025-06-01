import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { OrderProvider } from "../context/orderContext";

export default function RootLayout() {
  return (
    <OrderProvider>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
    </OrderProvider>
  );
}
