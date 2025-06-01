import { Stack } from "expo-router";
import { OrderProvider } from "../context/OrderContext";

export default function RootLayout() {
  return (
    <OrderProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </OrderProvider>
  );
}
