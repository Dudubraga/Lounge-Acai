import React, { useState, useEffect } from "react";
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { products, extraFruits, sideOptions } from "../../data/menu";
import { useRouter } from "expo-router";
import TopSection from "../components/topSection";

const STORAGE_KEYS = {
  products: "availability_products",
  fruits: "availability_fruits",
  sides: "availability_sides",
};

export default function AdminPage() {
  const [productAvailability, setProductAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((p) => [p.id, p.available]))
  );
  const [fruitAvailability, setFruitAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(extraFruits.map((f) => [f.id, f.available]))
  );
  const [sideAvailability, setSideAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(sideOptions.map((s) => [s.id, s.available]))
  );
  const router = useRouter();

  // Carrega disponibilidade salva ao abrir a página
  useEffect(() => {
    (async () => {
      const prod = await AsyncStorage.getItem(STORAGE_KEYS.products);
      const fruits = await AsyncStorage.getItem(STORAGE_KEYS.fruits);
      const sides = await AsyncStorage.getItem(STORAGE_KEYS.sides);

      if (prod !== null) setProductAvailability(JSON.parse(prod));
      else setProductAvailability(Object.fromEntries(products.map((p) => [p.id, p.available])));

      if (fruits !== null) setFruitAvailability(JSON.parse(fruits));
      else setFruitAvailability(Object.fromEntries(extraFruits.map((f) => [f.id, f.available])));

      if (sides !== null) setSideAvailability(JSON.parse(sides));
      else setSideAvailability(Object.fromEntries(sideOptions.map((s) => [s.id, s.available])));
    })();
  }, []);

  // Salva sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.products, JSON.stringify(productAvailability));
  }, [productAvailability]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.fruits, JSON.stringify(fruitAvailability));
  }, [fruitAvailability]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.sides, JSON.stringify(sideAvailability));
  }, [sideAvailability]);

  // Handlers
  const toggleProduct = (id: string) =>
    setProductAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleFruit = (id: string) =>
    setFruitAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSide = (id: string) =>
    setSideAvailability((prev) => ({ ...prev, [id]: !prev[id] }));

  // Botões de ação (placeholders)
  const handleViewReport = () => {
    router.push("./relatorioPage");
  };
  const handleSendReport = () => {
    alert("Enviar relatório por email (implementar)");
  };
  const handleSelectBluetooth = () => {
    alert("Selecionar dispositivo Bluetooth (implementar)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopSection title="Administração" showBackArrow />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleViewReport}>
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSendReport}>
          <Text style={styles.buttonText}>Enviar Relatório por Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSelectBluetooth}>
          <Text style={styles.buttonText}>Selecionar Impressora Bluetooth</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Produtos</Text>
        {products.map((p) => (
          <View key={p.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{p.name}</Text>
            <Switch
              value={productAvailability[p.id] === undefined ? true : productAvailability[p.id]}
              onValueChange={() => toggleProduct(p.id)}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Frutas</Text>
        {fruitAvailability && extraFruits.map((f) => (
          <View key={f.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{f.name}</Text>
            <Switch
              value={fruitAvailability[f.id] === undefined ? true : fruitAvailability[f.id]}
              onValueChange={() => toggleFruit(f.id)}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Acompanhamentos</Text>
        {sideOptions.map((s) => (
          <View key={s.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{s.name}</Text>
            <Switch
              value={sideAvailability[s.id] === undefined ? true : sideAvailability[s.id]}
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
