import { Text, View, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useOrder } from "../../context/OrderContext";

export default function Index() {
  const { order, setOrder } = useOrder();

  // Initialize the order object with default values
  const initializeOrder = () => {
    setOrder({
      total: 0.0,
      orderType: "",
      size: "",
      sweet: "",
      sideDishes: [],
      fruit: "",
      local: "",
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/lounge_logo.png")}
        style={{ width: 524, height: 522, marginBottom: 20 }}
      />
      <Link href="./SelectOrder" style={styles.button} onPress={initializeOrder}>
        <Text style={styles.buttonText}>Realizar Pedido</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#350E4D",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#350E4D",
    fontSize: 40,
    fontWeight: "bold",
  },
});
