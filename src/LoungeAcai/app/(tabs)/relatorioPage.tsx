import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"; // Added ActivityIndicator
import TopSection from "../components/topSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Assuming StoredPedido is exported from where it's defined (e.g., summary.tsx or a types file)
import { StoredPedido } from "./summary"; // Adjust path if it's moved

const ORDERS_STORAGE_KEY = "pedidos";

export default function RelatorioPage() {
  const [pedidos, setPedidos] = useState<StoredPedido[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchPedidos = async () => {
    setIsLoading(true);
    try {
      const pedidosJson = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      if (pedidosJson !== null) {
        const parsedPedidos = JSON.parse(pedidosJson);
        // Sort pedidos by date, newest first
        parsedPedidos.sort((a: StoredPedido, b: StoredPedido) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setPedidos(parsedPedidos);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error("Failed to load orders from AsyncStorage", error);
      setPedidos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#350E4D" />
        <Text>Carregando relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopSection title="Relatório de Pedidos" showBackArrow={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {pedidos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum pedido registrado.</Text>
        ) : (
          pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.pedidoBox}>
              <Text style={styles.pedidoTitle}>{pedido.productName}</Text>
              {/* <Text style={styles.pedidoInfo}>ID do Pedido: {pedido.id.substring(0, 10)}...</Text> Shorten ID for display */}
              <Text style={styles.pedidoInfo}>Data: {new Date(pedido.data).toLocaleString('pt-BR')}</Text>
              {pedido.size && <Text style={styles.pedidoInfo}>Tamanho: {pedido.size}ml</Text>}
              
              {pedido.sideDishes && pedido.sideDishes.length > 0 && (
                <Text style={styles.pedidoInfo}>
                  Acompanhamentos: {pedido.sideDishes.map(s => s.name).join(", ")}
                </Text>
              )}
              {pedido.fruits && pedido.fruits.length > 0 && (
                <Text style={styles.pedidoInfo}>
                  Frutas: {pedido.fruits.map(f => f.name).join(", ")}
                </Text>
              )}
              {pedido.place && <Text style={styles.pedidoInfo}>Local: {pedido.place === 'local' ? 'Comer no Local' : 'Para Viagem'}</Text>}
              <Text style={styles.pedidoTotal}>
                Total: R$ {pedido.total.toFixed(2).replace(".", ",")}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: { // For loading indicator
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Ensure space for last item
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 18,
    marginTop: 40,
  },
  pedidoBox: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  pedidoTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#350E4D",
    marginBottom: 8, // Increased space
  },
  pedidoInfo: {
    fontSize: 16,
    color: "#444", // Slightly darker for better readability
    marginBottom: 4, // Spacing between info lines
  },
  pedidoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#2E7D32", // Green for total
    marginTop: 8,
    textAlign: "right",
  },
});