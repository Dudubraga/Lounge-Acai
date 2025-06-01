import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { sizeImages } from "../../data/images";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import { products } from "../../data/menu";

const SIZES = [
  { size: 200, label: "200ml", sides: 2 },
  { size: 300, label: "300ml", sides: 3 },
  { size: 400, label: "400ml", sides: 4 },
  { size: 500, label: "500ml", sides: 5 },
  { size: 750, label: "750ml", sides: 5 },
];

export default function ChooseSize() {
  const router = useRouter();
  const { setSize, draft } = useOrder();
  const [selected, setSelected] = useState<number | null>(null);
  const total = calculateOrderTotal(draft);
  const [showWarning, setShowWarning] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const isTablet = screenWidth >= 700;
  const imageSize = isTablet ? 140 : 90;
  const imageMargin = isTablet ? 40 : 18;

  // Busca preço base do produto selecionado
  const getBasePrice = (size: number) => {
    const product = products.find(
      (p) =>
        p.type === draft.type &&
        (!draft.sweetener || p.sweetener === draft.sweetener)
    );
    return (
      product?.prices.find((p) => p.size === size)?.price ?? 0
    );
  };

  const handleContinue = () => {
    if (!selected) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setSize(selected as any);
    router.push("./sideDishes");
  };
  type SizeImageKey = keyof typeof sizeImages;
  return (
    <View style={styles.container}>
      <TopSection title="Escolha o tamanho" />
      <View style={styles.optionsContainer}>
        {SIZES.map((item) => (
          <TouchableOpacity
            key={item.size}
            style={[
              styles.optionCard,
              selected === item.size && styles.selectedOptionCard,
            ]}
            onPress={() => setSelected(item.size)}
            activeOpacity={0.8}
          >
            <Image
              source={sizeImages[item.size as SizeImageKey]}
              style={[styles.optionImage, { width: imageSize, height: imageSize, marginRight: imageMargin }]}
            />
            <View>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.sidesText}>
                {item.sides} acompanhamentos grátis
              </Text>
              <Text style={styles.priceText}>
                A partir de R$ {getBasePrice(item.size).toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-evenly",
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
    padding: 10,
    marginHorizontal: 20,
  },
  selectedOptionCard: {
    borderColor: "#350E4D",
    elevation: 6,
  },
  optionImage: {
    resizeMode: "contain",
  },
  optionLabel: {
    color: "#350E4D",
    fontSize: 22,
    fontWeight: "bold",
  },
  sidesText: {
    color: "#6B3FA0",
    fontSize: 16,
    marginTop: 2,
  },
  priceText: {
    color: "#8BC34A",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  warningText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
});