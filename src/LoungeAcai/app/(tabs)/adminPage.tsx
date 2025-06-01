// src/LoungeAcai/app/(tabs)/adminPage.tsx
import React, { useState, useEffect, useCallback } from "react"; // Adicionado useCallback
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native"; // Adicionado Alert
import AsyncStorage from "@react-native-async-storage/async-storage";
import { products, extraFruits, sideOptions } from "../../data/menu";
import { useRouter } from "expo-router";
import TopSection from "../components/topSection";
import { useIsFocused } from '@react-navigation/native'; // Importar hook

// Para funcionalidade de email (opcional, requer expo-file-system e expo-mail-composer)
// import * as MailComposer from 'expo-mail-composer';
// import * as FileSystem from 'expo-file-system';

const STORAGE_KEYS = {
  products: "availability_products",
  fruits: "availability_fruits",
  sides: "availability_sides",
  orders: "pedidos",
};

export default function AdminPage() {
  const [productAvailability, setProductAvailability] = useState<Record<string, boolean>>({});
  const [fruitAvailability, setFruitAvailability] = useState<Record<string, boolean>>({});
  const [sideAvailability, setSideAvailability] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const isFocused = useIsFocused(); // Hook para verificar se a tela está em foco

  // Função para carregar e mesclar disponibilidade
  const loadAndMergeAvailability = useCallback(async () => {
    // console.log("AdminPage: loadAndMergeAvailability called");
    try {
      const initialProductAvailability = Object.fromEntries(products.map(p => [p.id, p.available]));
      const initialFruitAvailability = Object.fromEntries(extraFruits.map(f => [f.id, f.available]));
      const initialSideAvailability = Object.fromEntries(sideOptions.map(s => [s.id, s.available]));

      const storedProdJson = await AsyncStorage.getItem(STORAGE_KEYS.products);
      const storedFruitJson = await AsyncStorage.getItem(STORAGE_KEYS.fruits);
      const storedSideJson = await AsyncStorage.getItem(STORAGE_KEYS.sides);

      const storedProd = storedProdJson ? JSON.parse(storedProdJson) : {};
      const storedFruit = storedFruitJson ? JSON.parse(storedFruitJson) : {};
      const storedSide = storedSideJson ? JSON.parse(storedSideJson) : {};

      setProductAvailability({ ...initialProductAvailability, ...storedProd });
      setFruitAvailability({ ...initialFruitAvailability, ...storedFruit });
      setSideAvailability({ ...initialSideAvailability, ...storedSide });
    } catch (error) {
      console.error("AdminPage: Failed to load availability from AsyncStorage", error);
      // Fallback para os padrões do menu.ts
      setProductAvailability(Object.fromEntries(products.map((p) => [p.id, p.available])));
      setFruitAvailability(Object.fromEntries(extraFruits.map((f) => [f.id, f.available])));
      setSideAvailability(Object.fromEntries(sideOptions.map((s) => [s.id, s.available])));
    }
  }, []); // useCallback para evitar recriações desnecessárias

  // Carrega na montagem inicial e quando a tela ganha foco
  useEffect(() => {
    if (isFocused) {
      loadAndMergeAvailability();
    }
  }, [isFocused, loadAndMergeAvailability]);

  // Salva a disponibilidade do produto quando ela muda
  useEffect(() => {
    // Não salvar se o objeto estiver vazio (estado inicial antes do primeiro load)
    if (Object.keys(productAvailability).length > 0) {
        AsyncStorage.setItem(STORAGE_KEYS.products, JSON.stringify(productAvailability)).catch(error =>
        console.error("Failed to save product availability", error)
      );
    }
  }, [productAvailability]);

  // Salva a disponibilidade de frutas quando ela muda
  useEffect(() => {
    if (Object.keys(fruitAvailability).length > 0) {
        AsyncStorage.setItem(STORAGE_KEYS.fruits, JSON.stringify(fruitAvailability)).catch(error =>
        console.error("Failed to save fruit availability", error)
      );
    }
  }, [fruitAvailability]);

  // Salva a disponibilidade de acompanhamentos quando ela muda
  useEffect(() => {
    if (Object.keys(sideAvailability).length > 0) {
        AsyncStorage.setItem(STORAGE_KEYS.sides, JSON.stringify(sideAvailability)).catch(error =>
        console.error("Failed to save side availability", error)
      );
    }
  }, [sideAvailability]);

  const toggleProduct = (id: string) =>
    setProductAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleFruit = (id: string) =>
    setFruitAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSide = (id: string) =>
    setSideAvailability((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleViewReport = () => router.push("./relatorioPage");

  const handleSendReport = async () => {
    Alert.alert("Implementação Futura", "Funcionalidade de enviar relatório por email ainda será implementada.");
    // Conceito:
    // const isMailAvailable = await MailComposer.isAvailableAsync();
    // if (!isMailAvailable) {
    //   Alert.alert("Erro", "Serviço de email não disponível neste dispositivo.");
    //   return;
    // }
    // try {
    //   const pedidosJson = await AsyncStorage.getItem(STORAGE_KEYS.orders);
    //   if (!pedidosJson || pedidosJson === "[]") {
    //     Alert.alert("Info", "Nenhum pedido registrado para enviar.");
    //     return;
    //   }
    //   const filePath = `${FileSystem.cacheDirectory}relatorio_pedidos.json`;
    //   await FileSystem.writeAsStringAsync(filePath, pedidosJson, { encoding: FileSystem.EncodingType.UTF8 });
    //   await MailComposer.composeAsync({
    //     recipients: ["emaildogilberto@example.com"], // Substituir pelo email real
    //     subject: "Relatório de Pedidos - Lounge do Açaí",
    //     body: "Segue em anexo o relatório de pedidos.",
    //     attachments: [filePath],
    //   });
    // } catch (error) {
    //   console.error("Erro ao enviar relatório por email:", error);
    //   Alert.alert("Erro", "Não foi possível preparar ou enviar o relatório por email.");
    // }
  };
  
  const handleClearOrders = async () => {
    Alert.alert(
      "Confirmar",
      "Tem certeza que deseja limpar TODOS os pedidos do relatório? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEYS.orders);
              Alert.alert("Sucesso", "Relatório de pedidos limpo!");
            } catch (error) {
              console.error("Failed to clear orders", error);
              Alert.alert("Erro", "Não foi possível limpar o relatório de pedidos.");
            }
          },
        },
      ]
    );
  };
  
  const handleResetAvailability = async () => {
    Alert.alert(
      "Confirmar",
      "Tem certeza que deseja resetar TODAS as disponibilidades para os padrões de fábrica? Os itens voltarão à sua disponibilidade original.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar",
          style: "destructive",
          onPress: async () => {
            try {
              const defaultProd = Object.fromEntries(products.map(p => [p.id, p.available]));
              const defaultFruit = Object.fromEntries(extraFruits.map(f => [f.id, f.available]));
              const defaultSide = Object.fromEntries(sideOptions.map(s => [s.id, s.available]));

              await AsyncStorage.setItem(STORAGE_KEYS.products, JSON.stringify(defaultProd));
              await AsyncStorage.setItem(STORAGE_KEYS.fruits, JSON.stringify(defaultFruit));
              await AsyncStorage.setItem(STORAGE_KEYS.sides, JSON.stringify(defaultSide));
              
              setProductAvailability(defaultProd);
              setFruitAvailability(defaultFruit);
              setSideAvailability(defaultSide);
              Alert.alert("Sucesso", "Disponibilidade resetada para os padrões!");
            } catch (error) {
              console.error("Failed to reset availability", error);
              Alert.alert("Erro", "Não foi possível resetar a disponibilidade.");
            }
          },
        },
      ]
    );
  };

  const handleSelectBluetooth = () => Alert.alert("Implementação Futura", "Funcionalidade de selecionar impressora Bluetooth ainda será implementada.");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopSection title="Administração" showBackArrow />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleViewReport}>
          <Text style={styles.buttonText}>Ver Relatório de Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSendReport}>
          <Text style={styles.buttonText}>Enviar Relatório por Email</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.button, styles.destructiveButton]} onPress={handleClearOrders}>
          <Text style={styles.buttonText}>Limpar Relatório de Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSelectBluetooth}>
          <Text style={styles.buttonText}>Selecionar Impressora Bluetooth</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={handleResetAvailability}>
          <Text style={styles.buttonText}>Resetar Disponibilidade</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Produtos</Text>
        {products.map((p) => (
          <View key={p.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{p.name}</Text>
            <Switch
              value={productAvailability[p.id] ?? p.available} // Usa o valor do estado ou o padrão do menu
              onValueChange={() => toggleProduct(p.id)}
              trackColor={{ false: "#767577", true: "#8BC34A" }}
              thumbColor={ (productAvailability[p.id] ?? p.available) ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Frutas</Text>
        {extraFruits.map((f) => (
          <View key={f.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{f.name}</Text>
            <Switch
              value={fruitAvailability[f.id] ?? f.available} // Usa o valor do estado ou o padrão do menu
              onValueChange={() => toggleFruit(f.id)}
              trackColor={{ false: "#767577", true: "#8BC34A" }}
              thumbColor={ (fruitAvailability[f.id] ?? f.available) ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Acompanhamentos</Text>
        {sideOptions.map((s) => (
          <View key={s.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{s.name}</Text>
            <Switch
              value={sideAvailability[s.id] ?? s.available} // Usa o valor do estado ou o padrão do menu
              onValueChange={() => toggleSide(s.id)}
              trackColor={{ false: "#767577", true: "#8BC34A" }} // Verde quando ativo
              thumbColor={ (sideAvailability[s.id] ?? s.available) ? "#f4f3f4" : "#f4f3f4"} // Cor do "botão" do switch
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  itemName: {
    fontSize: 18,
    color: "#333",
    flex: 1,
    marginRight: 8, // Adiciona espaço entre o nome e o switch
  },
  button: {
    backgroundColor: "#350E4D",
    padding: 16,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
   destructiveButton: {
    backgroundColor: "#C70039",
  },
  warningButton: {
    backgroundColor: "#C70039",
     color: "#000", // Texto escuro para melhor contraste em botão amarelo
  },
});