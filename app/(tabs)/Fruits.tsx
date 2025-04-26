import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection"; 
import fruits from "../../data/fruits";

const Fruits = () => {
  const { order, setOrder } = useOrder();
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const router = useRouter();

  const handleFruitSelect = (fruitId: string) => {
    setSelectedFruit(fruitId);
    setOrder((prevOrder) => ({
      ...prevOrder,
      fruit: fruitId,
    }));
  };

  const handleContinue = () => {
    if (selectedFruit) {
      router.push("/WhereToEat");
    } else {
      Alert.alert("Nenhuma fruta selecionada", "Por favor, selecione uma fruta para continuar");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Frutas"/>

      {/* Total Calculation */}

      {/* Fruits Selection */}
      <View style={styles.fruitsContainer}>
        {fruits.map((fruit) => (
          <TouchableOpacity
            key={fruit.id}
            style={[
              styles.fruitCard,
              selectedFruit === fruit.id && styles.selectedFruitCard,
            ]}
            onPress={() => handleFruitSelect(fruit.id)}
          >
            <Image source={fruit.image} style={styles.fruitImage} />
            <Text style={styles.fruitName}>{fruit.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Continue Section */}
      <BottomSection continueOrder={handleContinue}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  fruitsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  fruitCard: {
    backgroundColor: "#F5F5F5",
    width: "40%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginVertical: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedFruitCard: {
    borderColor: "#350E4D",
  },
  fruitImage: {
    width: "70%",
    height: "70%",
    marginBottom: 10,
    resizeMode: "contain",
  },
  fruitName: {
    fontSize: 16,
    color: "#350E4D",
    textAlign: "center",
  },
});


export default Fruits;