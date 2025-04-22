import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet, } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/Admin.styles";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const verifyPassword = () => {
    if (password === "Gilberto") {
      setAuthenticated(true);
    } else {
      Alert.alert("Acesso negado", "Senha incorreta");
    }
  };

  if (!authenticated) {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.title}>Senha do Administrador</Text>
        <TextInput
          style={localStyles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
        />
        <TouchableOpacity style={localStyles.button} onPress={verifyPassword}>
          <Text style={localStyles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={styles.backButtonText}>←←</Text>
      </TouchableOpacity>

      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.topSectionTitle}>Página de ADM</Text>
      </View>

      {/* Bluetooth Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Bluetooth</Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert(
          "Bluetooth", "Selecione o dispositivo Bluetooth")}>
          <Text style={styles.buttonText}>Select Bluetooth Device</Text>
        </TouchableOpacity>
      </View>

      {/* Relatório Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Relatório</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
            console.log("Gerando relatório...");
            Alert.alert("Relatório", "Lista de despesas");
          }}>
          <Text style={styles.buttonText}>Get List of Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
            console.log("Limpando despesas...");
            Alert.alert("Relatório", "Despesas limpas");
          }}>
          <Text style={styles.buttonText}>Clear Expenses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// Styles para tela da senha
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#350E4D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#350E4D",
    fontSize: 18,
    fontWeight: "bold",
  },
});
