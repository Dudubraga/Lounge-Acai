import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import places from "../../data/places";

const WhereToEat = () => {
  const { order, setOrder } = useOrder();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const handleOptionSelect = (option: { id: string; price: number }) => {
    setSelectedOption(option.id);
    setOrder((prevOrder) => ({
      ...prevOrder,
      local: option.id,
      total: prevOrder.total + (option.id === "Viagem" ? 1.5 : 0) - (prevOrder.local === "Viagem" ? 1.5 : 0),
    }));
  };

  const handleContinue = () => {
    if (selectedOption) {
      router.push("/OrderSummary");
    } else {
      Alert.alert(
        "Nenhuma opção selecionada",
        "Por favor, selecione uma opção para continuar"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Onde Consumir?" onBack={() => {
        if (selectedOption) {
            setOrder((prevOrder) => ({
                ...prevOrder,
                total: prevOrder.total - (selectedOption === "Viagem" ? 1.5 : 0),
                local: "",
            }));
            setSelectedOption(null);
        }
      }}/>

      {/* Options Selection */}
      <View style={styles.optionsContainer}>
        {places.map((place) => (
          <TouchableOpacity
            key={place.id}
            style={[
              styles.optionCard,
              selectedOption === place.id && styles.selectedOptionCard,
            ]}
            onPress={() => handleOptionSelect(place)}
          >
            <Image source={place.image} style={styles.optionImage} />
            <Text style={styles.optionText}>
              {place.id}
              {place.price > 0 && (
                <Text style={styles.extraPriceText}>{` + R$ ${place.price.toFixed(2)}`}</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Continue Section */}
      <BottomSection continueOrder={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  optionCard: {
    backgroundColor: "#F5F5F5",
    width: "50%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOptionCard: {
    borderColor: "#350E4D",
  },
  optionImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#350E4D",
    fontWeight: "bold",
  },
  extraPriceText: {
    fontSize: 14,
    color: "red",
    fontWeight: "normal",
  },
});

export default WhereToEat;