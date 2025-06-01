import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import TopSection from "../components/topSection";
import { useRouter } from "expo-router";
import { useOrder, OrderDraft } from "../../context/orderContext"; // Import OrderDraft
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import { products } from "../../data/menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ORDERS_STORAGE_KEY = "pedidos";

// Define StoredPedido interface here or import if defined elsewhere
export interface StoredPedido extends OrderDraft {
  id: string;
  total: number;
  data: string;
  productName: string;
}

export default function Summary() {
  const router = useRouter();
  const { draft, clearDraft } = useOrder();
  const total = calculateOrderTotal(draft);

  const productName =
    products.find(
      (p) =>
        p.type === draft.type &&
        (draft.sweetener ? p.sweetener === draft.sweetener : true)
    )?.name || (draft.type ? draft.type.charAt(0).toUpperCase() + draft.type.slice(1) : "Produto");


  const handleFinish = async () => {
    try {
      const currentOrdersJson = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      const currentOrders: StoredPedido[] = currentOrdersJson ? JSON.parse(currentOrdersJson) : [];

      const newOrder: StoredPedido = {
        ...draft,
        id: `${new Date().toISOString()}-${Math.random().toString(36).substr(2, 9)}`, // Simple unique ID
        total,
        data: new Date().toISOString(),
        productName: productName, // Use the resolved product name
      };

      currentOrders.push(newOrder);
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(currentOrders));
      
      clearDraft();
      Alert.alert("Pedido finalizado!", "Seu pedido foi registrado com sucesso.");
      router.push("/"); // Navigate to home or a thank you page
    } catch (error) {
      console.error("Failed to save order to AsyncStorage", error);
      Alert.alert("Erro ao Finalizar", "Não foi possível registrar o pedido. Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TopSection title="Resumo do Pedido" />
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLine}>
          <Text style={styles.summaryTitle}>Pedido: </Text>
          <Text style={styles.summaryValue}>{productName}</Text>
        </Text>
        <Text style={styles.summaryLine}>
          <Text style={styles.summaryTitle}>Tamanho: </Text>
          <Text style={styles.summaryValue}>
            {draft.size ? `${draft.size}ml` : "-"}
          </Text>
        </Text>
        {draft.sideDishes && draft.sideDishes.length > 0 && (
          <>
            <Text style={styles.summaryTitle}>Acompanhamentos:</Text>
            {draft.sideDishes.map((s) => (
              <Text key={s.id} style={styles.summaryValueItem}> {/* Changed style for items */}
                {"\t\t"}• {s.name}
              </Text>
            ))}
          </>
        )}
        {draft.fruits && draft.fruits.length > 0 && (
         <>
            <Text style={styles.summaryTitle}>Frutas:</Text>
            {draft.fruits.map((f) => (
              <Text key={f.id} style={styles.summaryValueItem}> {/* Changed style for items */}
                 {"\t\t"}• {f.name}
              </Text>
            ))}
          </>
        )}
        {draft.place && (
          <Text style={styles.summaryLine}>
            <Text style={styles.summaryTitle}>Local: </Text>
            <Text style={styles.summaryValue}>
              {draft.place.charAt(0).toUpperCase() + draft.place.slice(1)}
            </Text>
          </Text>
        )}
        <View style={styles.totalContainer}>
            <Text style={styles.summaryTitle}>Total: </Text>
            <Text style={styles.totalValue}> {/* Distinct style for total value */}
                R$ {total.toFixed(2).replace(".", ",")}
            </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
    justifyContent: 'space-between', // Pushes button to bottom if content is short
  },
  summaryBox: {
    backgroundColor: "#F9F9F9", // Slightly off-white for better contrast
    borderRadius: 16,
    padding: 25, // Increased padding
    marginVertical: 40, // Adjusted vertical margin
    marginHorizontal: 20, // Adjusted horizontal margin
    elevation: 3, // Subtle shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryLine: {
    fontSize: 22, // Base font size for lines
    marginBottom: 10, // Spacing between lines
    color: "#350E4D", // Theme color
    lineHeight: 30, // Improve readability
  },
  summaryTitle: {
    fontWeight: "bold",
    color: "#350E4D", // Theme color
    fontSize: 20, // Slightly smaller for titles within lines if needed, or keep same
    marginBottom: 5, // Space below title if it's a block
  },
  summaryValue: {
    color: "#555", // Dark gray for values, for contrast
    fontSize: 20,
    fontWeight: "normal",
  },
  summaryValueItem: { // Style for list items like fruits/sides
    color: "#555",
    fontSize: 18,
    marginLeft: 10, // Indent items
    marginBottom: 5,
    lineHeight: 26,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    paddingTop: 15,
  },
  totalValue: {
    color: "#2E7D32", // Green for total, or use theme accent
    fontSize: 26, // Larger for emphasis
    fontWeight: "bold",
  },
  finishButton: {
    backgroundColor: "#350E4D",
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 20, // Consistent margin
    marginBottom: 30, // Space from bottom
    alignItems: "center",
    elevation: 3,
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});