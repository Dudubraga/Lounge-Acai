import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useOrder } from "../../context/OrderContext";
import { useRouter } from "expo-router";

export default function Index() {
  const { setOrder } = useOrder();
  const router = useRouter();

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
    router.push("/SelectOrder");
  };

  const goToAdmin = () => {
    router.push("/Admin");
  };

  return (
    <View style={styles.container}>
      {/* Admin Button */}
      <TouchableOpacity style={styles.devButton} onPress={goToAdmin}>
        <Text style={styles.devButtonText}>⚙</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/images/lounge_logo.png")}
        style={styles.logo}
      />

      {/* Start Order Button */}
      <TouchableOpacity style={styles.button} onPress={initializeOrder}>
        <Text style={styles.buttonText}>Realizar Pedido</Text>
      </TouchableOpacity>
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
  devButton: {
    position: "absolute",
    top: 30,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  devButtonText: {
    fontSize: 24,
    color: "#350E4D",
    fontWeight: "bold",
  },
  logo: {
    maxWidth: 524,
    maxHeight: 522,
    marginBottom: 20,
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
