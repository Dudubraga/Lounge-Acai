// src/LoungeAcai/app/(tabs)/adminPage.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native"; // Adicionado Alert e Platform
import AsyncStorage from "@react-native-async-storage/async-storage";
import { products, extraFruits, sideOptions } from "../../data/menu";
import { useRouter } from "expo-router";
import TopSection from "../components/topSection";
import { useIsFocused } from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer'; // Importar MailComposer
import * as FileSystem from 'expo-file-system'; // Importar FileSystem

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
  const isFocused = useIsFocused();

  const loadAndMergeAvailability = useCallback(async () => {
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
      setProductAvailability(Object.fromEntries(products.map((p) => [p.id, p.available])));
      setFruitAvailability(Object.fromEntries(extraFruits.map((f) => [f.id, f.available])));
      setSideAvailability(Object.fromEntries(sideOptions.map((s) => [s.id, s.available])));
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadAndMergeAvailability();
    }
  }, [isFocused, loadAndMergeAvailability]);

  useEffect(() => {
    if (Object.keys(productAvailability).length > 0) {
        AsyncStorage.setItem(STORAGE_KEYS.products, JSON.stringify(productAvailability)).catch(error =>
        console.error("Failed to save product availability", error)
      );
    }
  }, [productAvailability]);

  useEffect(() => {
    if (Object.keys(fruitAvailability).length > 0) {
        AsyncStorage.setItem(STORAGE_KEYS.fruits, JSON.stringify(fruitAvailability)).catch(error =>
        console.error("Failed to save fruit availability", error)
      );
    }
  }, [fruitAvailability]);

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
  console.log("handleSendReport: Iniciando envio do relatório...");

  const isMailAvailable = await MailComposer.isAvailableAsync();
  if (!isMailAvailable) {
    Alert.alert(
      "Email Indisponível",
      "Não há um aplicativo de email configurado neste dispositivo para enviar o relatório."
    );
    console.log("handleSendReport: MailComposer não disponível.");
    return;
  }
  console.log("handleSendReport: MailComposer está disponível.");

  try {
    const pedidosJson = await AsyncStorage.getItem(STORAGE_KEYS.orders);
    if (!pedidosJson || pedidosJson === "") {
      Alert.alert("Relatório Vazio", "Não há pedidos registrados para enviar.");
      console.log("handleSendReport: Nenhum pedido encontrado no AsyncStorage.");
      return;
    }
    console.log("handleSendReport: Pedidos carregados do AsyncStorage (primeiros 100 chars):", pedidosJson.substring(0, 100));

    const filename = "relatorio_pedidos_lounge_acai.json";
    
    if (!FileSystem.cacheDirectory) {
      Alert.alert("Erro de Sistema", "O diretório de cache do FileSystem não está disponível.");
      console.error("handleSendReport: FileSystem.cacheDirectory é nulo ou indefinido.");
      return;
    }
    const fileUri = FileSystem.cacheDirectory + filename;
    console.log("handleSendReport: URI do arquivo de relatório:", fileUri);

    await FileSystem.writeAsStringAsync(fileUri, pedidosJson, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log("handleSendReport: Arquivo de relatório escrito com sucesso.");

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      Alert.alert("Erro de Arquivo", "Falha ao verificar a existência do arquivo de relatório após a escrita.");
      console.error("handleSendReport: Arquivo de relatório não existe em:", fileUri, "Detalhes:", fileInfo);
      return;
    }
    console.log("handleSendReport: Arquivo de relatório confirmado. Existe:", fileInfo.exists, "Tamanho:", fileInfo.size);

    console.log("handleSendReport: Tentando compor o email COM anexo...");
    const result = await MailComposer.composeAsync({
      recipients: ["blablou32123@gmail.com"], // SUBSTITUIR PELO EMAIL REAL DE DESTINO
      subject: `Relatório de Pedidos - Lounge do Açaí - ${new Date().toLocaleDateString('pt-BR')}`,
      body: undefined,
      attachments: [fileUri], // URI do arquivo de relatório como um array
    });
    console.log("handleSendReport: Resultado do MailComposer.composeAsync (com anexo):", result);

    if (result.status === MailComposer.MailComposerStatus.SENT) {
      Alert.alert("Email Enviado", "O email foi preparado e enviado (ou está na caixa de saída).");
    } else if (result.status === MailComposer.MailComposerStatus.SAVED) {
      Alert.alert("Email Salvo", "O email foi salvo como rascunho.");
    } else if (result.status === MailComposer.MailComposerStatus.CANCELLED) {
      Alert.alert("Email Cancelado", "O envio do email foi cancelado.");
    } else {
      // MailComposer.MailComposerStatus.UNDETERMINED ou outro status
      console.log("handleSendReport: Status do email indeterminado ou não tratado:", result.status);
      Alert.alert("Status do Email", `Ocorreu um problema ou o status é desconhecido: ${result.status}`);
    }

  } catch (error: any) {
    console.error("handleSendReport: Erro ao enviar relatório por email:", error, error.stack);
    Alert.alert(
      "Erro ao Enviar",
      `Não foi possível preparar ou enviar o relatório. Detalhes: ${error.message}`
    );
  }
};
  
  const handleClearOrders = async () => {
    Alert.alert(
      "Confirmar Limpeza",
      "Tem certeza que deseja limpar TODOS os pedidos do relatório? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar Pedidos",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEYS.orders);
              Alert.alert("Sucesso!", "Relatório de pedidos limpo com sucesso.");
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
      "Confirmar Reset",
      "Tem certeza que deseja resetar TODAS as disponibilidades para os padrões originais? Itens voltarão à sua configuração inicial de disponibilidade.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar Disponibilidade",
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
              Alert.alert("Sucesso!", "Disponibilidade resetada para os padrões!");
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
              value={productAvailability[p.id] ?? p.available}
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
              value={fruitAvailability[f.id] ?? f.available}
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
              value={sideAvailability[s.id] ?? s.available}
              onValueChange={() => toggleSide(s.id)}
              trackColor={{ false: "#767577", true: "#8BC34A" }}
              thumbColor={ (sideAvailability[s.id] ?? s.available) ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Seus estilos permanecem os mesmos, apenas garanta que `destructiveButton` e `warningButton` estejam definidos
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    paddingBottom: 80, // Aumentado para dar mais espaço aos botões e listas
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12, // Aumentado
    color: "#350E4D",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14, // Aumentado
    borderBottomWidth: 1,
    borderColor: "#EAEAEA", // Mais suave
  },
  itemName: {
    fontSize: 18,
    color: "#333",
    flex: 1,
    marginRight: 10, // Aumentado
  },
  button: {
    backgroundColor: "#350E4D",
    paddingVertical: 16, // Aumentado
    paddingHorizontal: 20,
    borderRadius: 12, // Mais arredondado
    marginTop: 18, // Aumentado
    alignItems: "center",
    elevation: 3, // Sombra mais pronunciada
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17, // Ligeiramente menor para caber melhor
  },
  destructiveButton: {
    backgroundColor: "#D32F2F", // Vermelho mais padrão para destrutivo
  },
  warningButton: {
    backgroundColor: "#FFA000", // Laranja para aviso
  },
  warningButtonText: {
    color: "#000", // ou #fff dependendo do tom do amarelo/laranja
  }
});