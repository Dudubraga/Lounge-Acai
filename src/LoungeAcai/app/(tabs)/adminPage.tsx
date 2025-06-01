import React, { useState, useEffect } from "react";
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { products, extraFruits, sideOptions } from "../../data/menu"; // Ensure correct path
import { useRouter } from "expo-router";
import TopSection from "../components/topSection"; // Ensure correct path

const STORAGE_KEYS = {
  products: "availability_products",
  fruits: "availability_fruits",
  sides: "availability_sides",
};

export default function AdminPage() {
  // Initialize state directly with defaults from menu.ts
  const [productAvailability, setProductAvailability] = useState<Record<string, boolean>>(
    () => Object.fromEntries(products.map((p) => [p.id, p.available]))
  );
  const [fruitAvailability, setFruitAvailability] = useState<Record<string, boolean>>(
    () => Object.fromEntries(extraFruits.map((f) => [f.id, f.available]))
  );
  const [sideAvailability, setSideAvailability] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sideOptions.map((s) => [s.id, s.available]))
  );
  const router = useRouter();

  // Load and merge stored availability on mount
  useEffect(() => {
    const loadAvailability = async () => {
      try {
        // Products
        const storedProdJson = await AsyncStorage.getItem(STORAGE_KEYS.products);
        let currentProdDefaults = Object.fromEntries(products.map(p => [p.id, p.available]));
        if (storedProdJson !== null) {
          const storedProd = JSON.parse(storedProdJson);
          // Merge stored values, ensuring all current products are present
          setProductAvailability(prev => ({ ...currentProdDefaults, ...prev, ...storedProd }));
        } else {
          // If nothing in storage, ensure it's set to defaults (already done by useState, but explicit here for clarity)
          setProductAvailability(currentProdDefaults);
        }

        // Fruits
        const storedFruitsJson = await AsyncStorage.getItem(STORAGE_KEYS.fruits);
        let currentFruitDefaults = Object.fromEntries(extraFruits.map(f => [f.id, f.available]));
        if (storedFruitsJson !== null) {
          const storedFruits = JSON.parse(storedFruitsJson);
          setFruitAvailability(prev => ({ ...currentFruitDefaults, ...prev, ...storedFruits }));
        } else {
          setFruitAvailability(currentFruitDefaults);
        }

        // Sides
        const storedSidesJson = await AsyncStorage.getItem(STORAGE_KEYS.sides);
        let currentSideDefaults = Object.fromEntries(sideOptions.map(s => [s.id, s.available]));
        if (storedSidesJson !== null) {
          const storedSides = JSON.parse(storedSidesJson);
          setSideAvailability(prev => ({ ...currentSideDefaults, ...prev, ...storedSides }));
        } else {
          setSideAvailability(currentSideDefaults);
        }

      } catch (error) {
        console.error("Failed to load availability from AsyncStorage", error);
        // Fallback to defaults from menu.ts if parsing fails
        setProductAvailability(Object.fromEntries(products.map((p) => [p.id, p.available])));
        setFruitAvailability(Object.fromEntries(extraFruits.map((f) => [f.id, f.available])));
        setSideAvailability(Object.fromEntries(sideOptions.map((s) => [s.id, s.available])));
      }
    };

    loadAvailability();
  }, []); // Empty dependency array, so this runs once on mount

  // Save product availability when it changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.products, JSON.stringify(productAvailability)).catch(error => 
      console.error("Failed to save product availability", error)
    );
  }, [productAvailability]);

  // Save fruit availability when it changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.fruits, JSON.stringify(fruitAvailability)).catch(error => 
      console.error("Failed to save fruit availability", error)
    );
  }, [fruitAvailability]);

  // Save side availability when it changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.sides, JSON.stringify(sideAvailability)).catch(error =>
      console.error("Failed to save side availability", error)
    );
  }, [sideAvailability]);
  
  const toggleProduct = (id: string) =>
    setProductAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleFruit = (id: string) =>
    setFruitAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSide = (id: string) =>
    setSideAvailability((prev) => ({ ...prev, [id]: !prev[id] }));

  // Botões de ação
  const handleViewReport = () => router.push("./relatorioPage");
  const handleSendReport = () => alert("Enviar relatório por email (implementar)");
  const handleSelectBluetooth = () => alert("Selecionar dispositivo Bluetooth (implementar)");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopSection title="Administração" showBackArrow />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Action Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleViewReport}>
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSendReport}>
          <Text style={styles.buttonText}>Enviar Relatório por Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSelectBluetooth}>
          <Text style={styles.buttonText}>Selecionar Impressora Bluetooth</Text>
        </TouchableOpacity>

        {/* Products Section */}
        <Text style={styles.sectionTitle}>Produtos</Text>
        {products.map((p) => (
          <View key={p.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{p.name}</Text>
            <Switch
              value={productAvailability[p.id]} // Directly use the boolean value
              onValueChange={() => toggleProduct(p.id)}
            />
          </View>
        ))}

        {/* Fruits Section */}
        <Text style={styles.sectionTitle}>Frutas</Text>
        {extraFruits.map((f) => (
          <View key={f.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{f.name}</Text>
            <Switch
              value={fruitAvailability[f.id]} // Directly use the boolean value
              onValueChange={() => toggleFruit(f.id)}
            />
          </View>
        ))}

        {/* Sides Section */}
        <Text style={styles.sectionTitle}>Acompanhamentos</Text>
        {sideOptions.map((s) => (
          <View key={s.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{s.name}</Text>
            <Switch
              value={sideAvailability[s.id]} // Directly use the boolean value
              onValueChange={() => toggleSide(s.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
    color: "#350E4D",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  itemName: {
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  button: {
    backgroundColor: "#350E4D",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});