import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { productTypeImages } from "../../data/images";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import { products } from "../../data/menu";
import { getAvailability } from "../../utils/availability";

const PRODUCT_TYPES = [
  { type: "acai", label: "Açaí", imageKey: "acai" },
  { type: "cupuaçu", label: "Cupuaçu", imageKey: "cupuacu" },
  { type: "meio-a-meio", label: "Meio a Meio", imageKey: "meio-a-meio" },
  { type: "suco", label: "Suco", imageKey: "suco" },
  { type: "vitamina", label: "Vitamina", imageKey: "vitamina" },
];

export default function ChooseProduct() {
  const router = useRouter();
  const { setType, draft } = useOrder();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [total, setTotal] = useState(() => calculateOrderTotal(draft));
  const [showWarning, setShowWarning] = useState(false);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});

  // Atualiza o draft localmente para simular a seleção antes de avançar
  useEffect(() => {
    if (selectedType) {
      setTotal(
        calculateOrderTotal({
          ...draft,
          type: selectedType as any,
          sweetener: undefined,
          size: undefined,
          sideDishes: [],
          fruits: [],
          place: undefined,
        })
      );
    } else {
      setTotal(calculateOrderTotal(draft));
    }
  }, [selectedType, draft]);

  useEffect(() => {
    getAvailability().then((data) => {
      console.log("Disponibilidade produtos:", data.products);
      console.log("Disponibilidade frutas:", data.fruits);
      console.log("Disponibilidade acompanhamentos:", data.sides);
      // Se não houver nada salvo, usa todos como true
      if (Object.keys(data.products).length === 0) {
        setAvailability(Object.fromEntries(products.map((p) => [p.id, true])));
      } else {
        setAvailability(data.products);
      }
    });
  }, []);

  const handleContinue = () => {
    if (!selectedType) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setType(selectedType as any);

    if (selectedType === "acai") {
      router.push("./waysToSweeten");
    } else if (selectedType === "cupuaçu" || selectedType === "meio-a-meio") {
      router.push("./chooseSize");
    } else if (selectedType === "suco" || selectedType === "vitamina") {
      router.push("./whereToEat");
    }
  };

  type ProductTypeImageKey = keyof typeof productTypeImages;

  // Filtra os tipos de produto que têm pelo menos um produto disponível
  const availableProductTypes = PRODUCT_TYPES.filter((typeObj) =>
    products.some(
      (p) => p.type === typeObj.type && availability[p.id]
    )
  );

  return (
    <View style={styles.container}>
      <TopSection title="Escolha seu produto" />
      <ScrollView contentContainerStyle={styles.productsContainer}>
        {availableProductTypes.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[
              styles.productCard,
              selectedType === item.type && styles.selectedProductCard,
            ]}
            onPress={() => setSelectedType(item.type)}
            activeOpacity={0.8}
          >
            <Image
              source={productTypeImages[item.imageKey as ProductTypeImageKey]}
              style={styles.productImage}
            />
            <Text
              style={[
                styles.productName,
                selectedType === item.type && styles.selectedProductName,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingVertical: 100,
    paddingHorizontal: 30,
  },
  productCard: {
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
  selectedProductCard: {
    borderColor: "#350E4D",
    elevation: 6,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
  },
  productName: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedProductName: {
    textDecorationLine: "underline",
  },
  warningText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
});
