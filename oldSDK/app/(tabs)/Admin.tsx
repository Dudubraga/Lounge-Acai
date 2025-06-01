import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import TopSection from "../components/topSection";

const Admin = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Administração" />
      {/* Options */}
      <View style={styles.optionsContainer}>  
        {/* Bluetooth */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bluetooth</Text>
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert(
            "Bluetooth", "Selecione o dispositivo Bluetooth")}>
            <Text style={styles.buttonText}>Select Bluetooth Device</Text>
          </TouchableOpacity>
        </View>

        {/* Relatório */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionContainer: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#350E4D",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#350E4D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default Admin;