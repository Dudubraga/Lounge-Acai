import { Text, View, Image, TouchableOpacity } from "react-native";
import { useOrder } from "../../context/OrderContext";
import { Link } from "expo-router";
import styles from "../styles/OrderSummary.styles"; // Import the styles

const OrderSummary = () => {
  const { order } = useOrder();

  // Format the total as "R$ 00.00"
  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

  return (
    <View style={styles.container}>
      {/* Top Section with Logo */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/lounge_logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Order Summary Section */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumo do pedido</Text>
        <View style={styles.summaryDetails}>
          <Text style={styles.detailText}>Tipo: {order.orderType || "N/A"}</Text>
          <Text style={styles.detailText}>Tamanho: {order.size || "N/A"}</Text>
          <Text style={styles.detailText}>Adoçante: {order.sweet || "N/A"}</Text>
          <Text style={styles.detailText}>
            Fruta: {order.fruit !== "none" ? order.fruit : "Nenhuma"}
          </Text>
          <Text style={styles.detailText}>
            Acompanhamentos:
            {order.sideDishes.length > 0
              ? order.sideDishes.map((dish, index) => ` ${dish}${index < order.sideDishes.length - 1 ? "," : ""}`)
              : " Nenhum"}
          </Text>
          <Text style={styles.detailText}>
            Local de Consumo: {order.local || "N/A"}
          </Text>
        </View>
        <Text style={styles.totalText}>Total: {formattedTotal}</Text>
      </View>

      {/* Finalize Order Button */}
      <Link href="./" style={styles.finalizeButton}> {/* Link to the main page */}
        <Text style={styles.finalizeButtonText}>Realizar Pedido</Text>
      </Link>
    </View>
  );
};

export default OrderSummary;