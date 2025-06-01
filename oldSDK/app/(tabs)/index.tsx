import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";

export default function Index() {
  const { setOrder } = useOrder();
  const router = useRouter();
  
  const screenWidth = Dimensions.get("window").width;
  const teste = screenWidth > 600 ? 524 : 362;
  const teste2 = screenWidth > 600 ? 522 : 361;

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleAdminAccess = () => {
    if (password === "123") {
      setPassword("");
      router.push("/Admin");
    } else {
      Alert.alert("Senha incorreta", "Por favor, tente novamente.");
      setPassword("");
    }
  };

  const initializeOrder = () => {
    setOrder({
      total: 0.0,
      orderType: "",
      size: "",
      sweet: "",
      sideDishes: {},
      fruit: "",
      local: "",
      extraCharge: 0,
    });
    router.push("/Products");
  };

  return (
    <View style={styles.container}>
      {/* Admin Button */}
      <TouchableOpacity
        style={styles.devButton}
        onPress={() => setShowPasswordInput(!showPasswordInput)}
      >
        <Text style={styles.devButtonText}>⚙</Text>
      </TouchableOpacity>
      
      {/* Password Input */}
      {showPasswordInput && (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite a senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.passwordButton} onPress={handleAdminAccess}>
            <Text style={styles.passwordButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Logo */}
      <Image
        source={require("../../assets/images/lounge_logo.png")}
        style={[styles.logo, { width: teste, height: teste2 }]}
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
