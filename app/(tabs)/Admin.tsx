import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/DevTools.styles";

export default function Admin() {
  const router = useRouter();

  // Handler for Bluetooth device selection
  const handleSelectBluetooth = () => {
    Alert.alert("Bluetooth", "Select Bluetooth Device pressed");
  };

  // Handlers for Relatório section
  const handleGetExpenses = () => {
    console.log("Fetching list of expenses...");
    Alert.alert("Relatório", "List of expenses fetched");
  };

  const handleClearExpenses = () => {
    console.log("Clearing expenses...");
    Alert.alert("Relatório", "Expenses cleared");
  };

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
        <TouchableOpacity style={styles.button} onPress={handleSelectBluetooth}>
          <Text style={styles.buttonText}>Select Bluetooth Device</Text>
        </TouchableOpacity>
      </View>

      {/* Relatório Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Relatório</Text>
        <TouchableOpacity style={styles.button} onPress={handleGetExpenses}>
          <Text style={styles.buttonText}>Get List of Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClearExpenses}>
          <Text style={styles.buttonText}>Clear Expenses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

