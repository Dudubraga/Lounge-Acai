import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { sweetenerImages } from "../../data/images";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import type { SweetenerType } from "../../context/orderContext"; // ajuste o caminho se necessário

const SWEETENERS = [
  { type: "xarope", label: "Xarope", imageKey: "xarope" },
  { type: "sem-acucar", label: "Sem Açúcar", imageKey: "sem-acucar" },
  { type: "xilitol", label: "Xilitol", imageKey: "xilitol" },
  { type: "demerara", label: "Demerara", imageKey: "demerara" },
  { type: "mascavo", label: "Mascavo", imageKey: "mascavo" },
  { type: "mel", label: "Mel", imageKey: "mel" },
];

export default function WaysToSweeten() {
  const router = useRouter();
  const { setSweetener, draft } = useOrder();
  const [selected, setSelected] = useState<SweetenerType | null>(null);
  const [total, setTotal] = useState(() => calculateOrderTotal(draft));

  useEffect(() => {
    if (selected) {
      setTotal(
        calculateOrderTotal({
          ...draft,
          sweetener: selected,
        })
      );
    } else {
      setTotal(calculateOrderTotal(draft));
    }
  }, [selected, draft]);

  const handleContinue = () => {
    if (!selected) return;
    setSweetener(selected);
    router.push("./chooseSize");
  };
  type SweetenerImageKey = keyof typeof sweetenerImages;
  return (
    <View style={styles.container}>
      <TopSection title="Escolha o adoçante" />
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        {SWEETENERS.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[
              styles.optionCard,
              selected === item.type && styles.selectedOptionCard,
            ]}
            onPress={() => setSelected(item.type as SweetenerType)}
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
});