import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useOrder } from "../context/orderContext";
import { calculateOrderTotal } from "../utils/calculateOrderTotal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const { clearDraft } = useOrder(); // <-- use clearDraft
  const { draft } = useOrder();
  const total = calculateOrderTotal(draft);

  // Estado para admin
  const [adminClicks, setAdminClicks] = useState(0);

  // Tamanhos da logo
  const logoWidth = 350;
  const logoHeight = 350;

  // Função para iniciar pedido
  const initializeOrder = () => {
    clearDraft(); // Limpa o pedido anterior
    router.push("./(tabs)/chooseProduct");
  };

  // Função para admin (5 cliques)
  const handleAdminClick = () => {
    setAdminClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        // Rode isso uma vez para limpar tudo
        AsyncStorage.clear();
        router.push("./(tabs)/adminPage");
        return 0; // reseta o contador após acessar
      }
      return next;
    });
  };

  return (
    <View style={styles.container}>

      {/* Botão Admin */}
      <TouchableOpacity
        style={styles.devButton}
        onPress={handleAdminClick}
        activeOpacity={0.7}
        accessibilityLabel="Acessar área administrativa"
      >
        <Text style={styles.devButtonText}>⚙</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../assets/images/lounge_logo.png")}
        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
        resizeMode="contain"
      />

      {/* Botão de iniciar pedido */}
      <TouchableOpacity style={styles.button} onPress={initializeOrder}>
        <Text style={styles.buttonText}>Realizar Pedido</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#350E4D",
    alignItems: "center",
    justifyContent: "space-evenly",
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
    zIndex: 1,
    elevation: 5,
  },
  devButtonText: {
    fontSize: 24,
    color: "#350E4D",
    fontWeight: "bold",
  },
  passwordContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    top: 20,
    left: 80,
    right: 20,
    padding: 20,
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#000",
  },
  passwordButton: {
    backgroundColor: "#350E4D",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  passwordButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
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

