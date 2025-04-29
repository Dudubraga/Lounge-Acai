import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useOrder } from "../../context/OrderContext";
import { useRouter } from "expo-router";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { SaveOrderDetails, ClearOrderDetails } from "../../Util/storage";

const OrderSummary = () => {
  const { order } = useOrder();
  const router = useRouter();

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

  const handleFinalizeOrder = async () => {
    try {
      await SaveOrderDetails(order); // Salva o pedido no AsyncStorage
      Alert.alert(
        "Pedido Realizado",
        "Seu pedido foi realizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              ClearOrderDetails(); // Limpa os dados após finalizar
              router.push("/");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
    }
  };


  return (
    <View style={styles.container}>
      {/* Top Section with Logo */}
      <TopSection title="Resumo do Pedido" />
      
      {/* Order Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryDetails}>
          <Text style={styles.detailText}>Pedido: {order.orderType || "N/A"}</Text>
          {order.sweet && (
            <Text style={styles.detailText}>Adoçante: {order.sweet}</Text>
          )}
          <Text style={styles.detailText}>Tamanho: {order.size || "N/A"}</Text>
          {order.fruit && (
            <Text style={styles.detailText}>Fruta: {order.fruit}</Text>
          )}
          {Object.keys(order.sideDishes).length > 0 && (
            <Text style={styles.detailText}>
              Acompanhamentos:
              {Object.entries(order.sideDishes)
                .filter(([_, quantity]) => quantity > 0)
                .map(([dishId, quantity]) => `\n\t\t\t${quantity}x ${dishId}`)}
            </Text>
          )}
          <Text style={styles.detailText}>
            Local de Consumo: {order.local || "N/A"}
          </Text>
        </View>
        <Text style={styles.totalText}>Total: {formattedTotal}</Text>
      </View>

      {/* Finalize Order Button */}
      <TouchableOpacity style={styles.finalizeButton} onPress={handleFinalizeOrder}>
        <Text style={styles.finalizeButtonText}>Realizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  summaryContainer: {
    backgroundColor: "#350E4D",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  summaryDetails: {
    alignSelf: "stretch",
    marginBottom: 10,
  },
  detailText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  finalizeButton: {
    backgroundColor: "#350E4D",
    alignSelf: "center",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  finalizeButtonText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default OrderSummary;