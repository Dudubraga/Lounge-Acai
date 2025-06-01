import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import TopSection from "../components/topSection";
import { useRouter } from "expo-router";

// Exemplo: simula pedidos salvos localmente
type Pedido = {
  id: string;
  produto: string;
  tamanho: string;
  acompanhamentos: string[];
  frutas: string[];
  local: string;
  total: number;
  data: string;
};

export default function RelatorioPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Simulação: buscar pedidos do AsyncStorage ou backend
  useEffect(() => {
    // Aqui você buscaria do AsyncStorage ou API
    // Exemplo mock:
    setPedidos([
      {
        id: "1",
        produto: "Açaí Puro com Xarope",
        tamanho: "300ml",
        acompanhamentos: ["Granola", "Leite em pó"],
        frutas: ["Banana"],
        local: "Local",
        total: 18.5,
        data: "2024-06-01 15:30",
      },
      {
        id: "2",
        produto: "Cupuaçu",
        tamanho: "400ml",
        acompanhamentos: [],
        frutas: [],
        local: "Viagem",
        total: 22.5,
        data: "2024-06-01 16:10",
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <TopSection title="Relatório de Pedidos" showBackArrow={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {pedidos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum pedido registrado.</Text>
        ) : (
          pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.pedidoBox}>
              <Text style={styles.pedidoTitle}>{pedido.produto}</Text>
              <Text style={styles.pedidoInfo}>Tamanho: {pedido.tamanho}</Text>
              {pedido.acompanhamentos.length > 0 && (
                <Text style={styles.pedidoInfo}>
                  Acompanhamentos: {pedido.acompanhamentos.join(", ")}
                </Text>
              )}
              {pedido.frutas.length > 0 && (
                <Text style={styles.pedidoInfo}>
                  Frutas: {pedido.frutas.join(", ")}
                </Text>
              )}
              <Text style={styles.pedidoInfo}>Local: {pedido.local}</Text>
              <Text style={styles.pedidoInfo}>
                Total: R$ {pedido.total.toFixed(2).replace(".", ",")}
              </Text>
              <Text style={styles.pedidoData}>{pedido.data}</Text>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
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
  },
  pedidoTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#350E4D",
    marginBottom: 4,
  },
  pedidoInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  pedidoData: {
    fontSize: 14,
    color: "#888",
    marginTop: 6,
    textAlign: "right",
  },
});