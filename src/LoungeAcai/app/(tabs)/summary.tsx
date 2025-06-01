import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import TopSection from "../components/topSection";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import { products } from "../../data/menu";

export default function Summary() {
  const router = useRouter();
  const { draft, clearDraft } = useOrder();
  const total = calculateOrderTotal(draft);

  // Busca o nome do produto selecionado
  const productName =
    products.find(
      (p) =>
        p.type === draft.type &&
        (draft.sweetener ? p.sweetener === draft.sweetener : true)
    )?.name || "-";

  const handleFinish = async () => {
    // Salvar pedido no AsyncStorage (exemplo)
    // let pedidos = JSON.parse(await AsyncStorage.getItem("pedidos") || "[]");
    // pedidos.push({ ...draft, total, date: new Date().toISOString() });
    // await AsyncStorage.setItem("pedidos", JSON.stringify(pedidos));
    clearDraft();
    Alert.alert("Pedido finalizado!", "Seu pedido foi registrado.");
    router.push("/");
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
        {/* Só mostra acompanhamentos se houver algum */}
        {draft.sideDishes.length > 0 && (
          <>
            <Text style={styles.summaryTitle}>Acompanhamentos:</Text>
            {draft.sideDishes.map((s) => (
              <Text key={s.name} style={styles.summaryValue}>
                {"\t\t"}• {s.name}
              </Text>
            ))}
          </>
        )}
        {/* Só mostra frutas se houver alguma */}
        {draft.fruits.length > 0 && (
          <Text style={styles.summaryLine}>
            <Text style={styles.summaryTitle}>Frutas: </Text>
            <Text style={styles.summaryValue}>
              {draft.fruits.map((f) => f.name).join(", ")}
            </Text>
          </Text>
        )}
        {/* Só mostra local se houver */}
        {draft.place && (
          <Text style={styles.summaryLine}>
            <Text style={styles.summaryTitle}>Local: </Text>
            <Text style={styles.summaryValue}>
              {draft.place.charAt(0).toUpperCase() + draft.place.slice(1)}
            </Text>
          </Text>
        )}
        <Text style={styles.summaryLine}>
          <Text style={styles.summaryTitle}>Total: </Text>
          <Text style={styles.summaryValue}>
            R$ {total.toFixed(2).replace(".", ",")}
          </Text>
        </Text>
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
  },
  summaryBox: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 20,
    marginVertical: 70,
    marginHorizontal: 30,
  },
  summaryLine: {
    fontSize: 25,
    marginBottom: 8,
    color: "#350E4D",
  },
  summaryTitle: {
    fontWeight: "bold",
    color: "#350E4D",
    fontSize: 25,
  },
  summaryValue: {
    color: "#350E4D",
    fontSize: 25,
    fontWeight: "normal",
  },
  finishButton: {
    backgroundColor: "#350E4D",
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 30,
    alignItems: "center",
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});