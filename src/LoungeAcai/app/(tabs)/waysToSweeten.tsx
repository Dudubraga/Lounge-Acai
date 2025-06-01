import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { sweetenerImages } from "../../data/images";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import type { SweetenerType } from "../../context/orderContext";
import { getAvailability } from "../../utils/availability"; // Importar getAvailability
import { products as allProducts, Product } from "../../data/menu"; // Importar todos os produtos e o tipo Product

// Mantém a definição original dos adoçantes como base
const BASE_SWEETENERS = [
  { type: "xarope" as SweetenerType, label: "Xarope", imageKey: "xarope" },
  { type: "sem-acucar" as SweetenerType, label: "Sem Açúcar", imageKey: "sem-acucar" },
  { type: "xilitol" as SweetenerType, label: "Xilitol", imageKey: "xilitol" },
  { type: "demerara" as SweetenerType, label: "Demerara", imageKey: "demerara" },
  { type: "mascavo" as SweetenerType, label: "Mascavo", imageKey: "mascavo" },
  { type: "mel" as SweetenerType, label: "Mel", imageKey: "mel" },
];

export default function WaysToSweeten() {
  const router = useRouter();
  const { setSweetener, draft } = useOrder();
  const [selected, setSelected] = useState<SweetenerType | null>(null);
  const [total, setTotal] = useState(() => calculateOrderTotal(draft));
  const [showWarning, setShowWarning] = useState(false);
  const [availableSweeteners, setAvailableSweeteners] = useState(BASE_SWEETENERS); // Estado para adoçantes disponíveis

  useEffect(() => {
    // Função para carregar e filtrar adoçantes
    const loadAndFilterSweeteners = async () => {
      const availabilityData = await getAvailability();
      const productAvailability = availabilityData.products || {};

      // Filtra os adoçantes baseados na disponibilidade dos produtos de açaí correspondentes
      const filtered = BASE_SWEETENERS.filter(sweetenerOption => {
        // Encontra o produto de açaí que usa este adoçante
        const acaiProductWithThisSweetener = allProducts.find(
          (p: Product) => p.type === "acai" && p.sweetener === sweetenerOption.type
        );

        if (acaiProductWithThisSweetener) {
          // Se o produto existir, verifica sua disponibilidade
          // Se productAvailability[id] for undefined, usa o default de menu.ts (acaiProductWithThisSweetener.available)
          return productAvailability[acaiProductWithThisSweetener.id] ?? acaiProductWithThisSweetener.available;
        }
        // Se não houver um produto de açaí específico para este adoçante no menu.ts, não o mostre
        // (Isso pode acontecer se menu.ts e BASE_SWEETENERS estiverem dessincronizados)
        return false;
      });
      setAvailableSweeteners(filtered);
    };

    loadAndFilterSweeteners();
  }, [draft.type]); // Recarregar se o tipo de produto mudar (embora esta tela seja para açaí)

  useEffect(() => {
    if (selected) {
      setTotal(
        calculateOrderTotal({
          ...draft,
          sweetener: selected,
        })
      );
    } else {
      // Se nenhum adoçante estiver selecionado, mas o rascunho já tiver um tipo (açaí),
      // o total deve ser calculado sem o adoçante ainda (ou com um default se aplicável)
      setTotal(calculateOrderTotal({ ...draft, sweetener: undefined }));
    }
  }, [selected, draft]);

  const handleContinue = () => {
    if (!selected) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setSweetener(selected);
    router.push("./chooseSize");
  };

  type SweetenerImageKey = keyof typeof sweetenerImages;

  return (
    <View style={styles.container}>
      <TopSection title="Escolha como adoçar seu Açaí" />
      {availableSweeteners.length > 0 ? (
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {availableSweeteners.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.optionCard,
                selected === item.type && styles.selectedOptionCard,
              ]}
              onPress={() => setSelected(item.type)}
              activeOpacity={0.8}
            >
              <Image
                source={sweetenerImages[item.imageKey as SweetenerImageKey]}
                style={styles.optionImage}
              />
              <Text style={styles.optionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noOptionsContainer}>
          <Text style={styles.noOptionsText}>
            Nenhuma opção de adoçante disponível para Açaí no momento.
          </Text>
          <Text style={styles.noOptionsSubText}>
            Por favor, verifique as configurações na página de administração.
          </Text>
        </View>
      )}
      {showWarning && (
        <Text style={styles.warningText}>Selecione uma opção</Text>
      )}
      <BottomSection total={total} continueOrder={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    justifyContent: "space-between" 
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingVertical: 50,
    paddingHorizontal: 40,
  },
  optionCard: {
    width: 250,
    height: 270,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
  },
  selectedOptionCard: {
    borderColor: "#350E4D",
    elevation: 6,
  },
  optionImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
  },
  optionLabel: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  warningText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  noOptionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noOptionsText: {
    fontSize: 18,
    color: "#350E4D",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  noOptionsSubText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});