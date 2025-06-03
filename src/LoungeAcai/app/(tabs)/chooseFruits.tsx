import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, useWindowDimensions } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { extraFruits } from "../../data/menu";
import { fruitImages } from "../../data/images";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";
import { getAvailability } from "../../utils/availability";

export default function ChooseFruits() {
  const router = useRouter();
  const { setFruits, draft } = useOrder();
  const [selected, setSelected] = useState<string[]>([]);
  const [total, setTotal] = useState(() => calculateOrderTotal(draft));
  const [fruitAvailability, setFruitAvailability] = useState<Record<string, boolean>>({});
  const { width } = useWindowDimensions();

  useEffect(() => {
    setTotal(
      calculateOrderTotal({
        ...draft,
        fruits: extraFruits.filter((f) => selected.includes(f.id)),
      })
    );
  }, [selected, draft]);

  useEffect(() => {
    getAvailability().then((data) => {
      if (Object.keys(data.fruits).length === 0) {
        setFruitAvailability(Object.fromEntries(extraFruits.map((f) => [f.id, true])));
      } else {
        setFruitAvailability(data.fruits);
      }
    });
  }, []);

  const isPhone = width < 700;
  const cardWidth = isPhone ? 150 : 250;
  const cardHeight = isPhone ? 170 : 270;
  const imageSize = isPhone ? 100 : 200;

  const toggleFruit = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const selectedFruits = extraFruits.filter((f) => selected.includes(f.id));
    setFruits(selectedFruits);
    router.push("./whereToEat");
  };

  type FruitImageKey = keyof typeof fruitImages;

  return (
    <View style={styles.container}>
      <TopSection title="Adicionar frutas?" />
      <ScrollView contentContainerStyle={styles.fruitsContainer}>
        {extraFruits.filter(f => fruitAvailability[f.id]).map((fruit) => (
          <TouchableOpacity
            key={fruit.id}
            style={[
              styles.fruitCard,
              { width: cardWidth, height: cardHeight },
              selected.includes(fruit.id) && styles.selectedFruitCard,
            ]}
            onPress={() => toggleFruit(fruit.id)}
            activeOpacity={0.8}
          >
            <Image
              source={fruitImages[fruit.id as FruitImageKey]}
              style={{ width: imageSize, height: imageSize, borderRadius: 12, marginBottom: 10, resizeMode: "cover" }}
            />
            <Text
              style={[
                styles.fruitName,
                selected.includes(fruit.id) && styles.selectedFruitName,
              ]}
            >
              {fruit.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selected.length > 0 && (
        <Text style={styles.warningText}>
          {selected.length} fruta(s) selecionada(s) (+R$ 4,00 cada)
        </Text>
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
  fruitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  fruitCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
  },
  selectedFruitCard: {
    borderColor: "#350E4D",
    elevation: 6,
  },
  fruitName: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedFruitName: {
    textDecorationLine: "underline",
  },
  warningText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
});