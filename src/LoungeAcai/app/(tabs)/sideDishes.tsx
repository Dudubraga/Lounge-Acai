import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import { useRouter } from "expo-router";
import { sideOptions } from "../../data/menu";
import { useOrder } from "../../context/orderContext";
import { calculateOrderTotal } from "../../utils/calculateOrderTotal";

export default function SideDishes() {
  const router = useRouter();
  const { setSideDishes, draft } = useOrder();
  const [selected, setSelected] = useState<string[]>([]);
  const [total, setTotal] = useState(() => calculateOrderTotal(draft));

  useEffect(() => {
    setTotal(
      calculateOrderTotal({
        ...draft,
        sideDishes: sideOptions.filter((s) => selected.includes(s.id)),
      })
    );
  }, [selected, draft]);

  // Limite grátis de acompanhamentos
  const size = draft.size || 200;
  const freeLimit = size === 200 ? 2 : size === 300 ? 3 : size === 400 ? 4 : 5;

  const toggleSide = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const selectedSides = sideOptions.filter((s) => selected.includes(s.id));
    setSideDishes(selectedSides);
    router.push("./chooseFruits");
  };

  return (
    <View style={styles.container}>
      <TopSection title="Acompanhamentos" />
      <Text style={styles.infoText}>
        {selected.length}/{freeLimit} acompanhamentos grátis
      </Text>
      <FlatList
        data={sideOptions}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.sideCard, isSelected && styles.selectedSideCard]}
              onPress={() => toggleSide(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.sideCardContent}>
                <Text style={styles.sideName}>{item.name}</Text>
                <View style={[styles.circle, isSelected && styles.selectedCircle]}>
                  {isSelected && <Text style={styles.checkMark}></Text>}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {selected.length > freeLimit && (
        <Text style={styles.warningText}>
          Você selecionou {selected.length - freeLimit} acompanhamentos extra (+R$ 2,00 cada)
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
  infoText: {
    fontSize: 22,
    color: "#350E4D",
    fontWeight: "bold",
    marginTop: 30,
    alignSelf: 'center',
  },
  flatListContent: {
    padding: 30,
  },
  sideCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    marginVertical: 8,
    marginHorizontal: 4,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
  },
  selectedSideCard: {
    borderColor: '#350E4D',
    backgroundColor: '#E1D5F6',
    elevation: 6,
  },
  sideCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#B39DDB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 12,
  },
  selectedCircle: {
    borderColor: '#350E4D',
    backgroundColor: '#350E4D',
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sideName: {
    fontSize: 18,
    color: "#350E4D",
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});