import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { placeImages } from "../../data/images";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import type { PlaceType } from "../../context/orderContext"; // ajuste o caminho se necessário

const PLACES = [
  { type: "local", label: "Comer no local", imageKey: "local" },
  { type: "viagem", label: "Para viagem (+R$ 1,50)", imageKey: "viagem" },
];

export default function WhereToEat() {
  const router = useRouter();
  const { setPlace, draft } = useOrder();
  const [selected, setSelected] = useState<PlaceType | null>(null);
  const [total, setTotal] = useState(() => calculateOrderTotal(draft));
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (selected) {
      setTotal(
        calculateOrderTotal({
          ...draft,
          place: selected,
        })
      );
    } else {
      setTotal(calculateOrderTotal(draft));
    }
  }, [selected, draft]);

  // Responsivo: mesmo padrão dos outros cards
  const isPhone = width < 700;
  const cardWidth = isPhone ? 150 : 250;
  const cardHeight = isPhone ? 170 : 270;
  const imageSize = isPhone ? 100 : 200;

  type PlaceImageKey = keyof typeof placeImages;

  const handleContinue = () => {
    if (!selected) return;
    setPlace(selected as any);
    router.push("./summary");
  };

  return (
    <View style={styles.container}>
      <TopSection title="Onde vai comer?" />
      <View style={styles.optionsContainer}>
        {PLACES.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[
              styles.optionCard,
              { width: cardWidth, height: cardHeight },
              selected === item.type && styles.selectedOptionCard,
            ]}
            onPress={() => setSelected(item.type as PlaceType)}
            activeOpacity={0.8}
          >
            <Image
              source={placeImages[item.imageKey as PlaceImageKey]}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: 12,
                marginBottom: 10,
                resizeMode: "cover",
              }}
            />
            <Text style={styles.optionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  optionCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    margin: 40,
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
  optionLabel: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});