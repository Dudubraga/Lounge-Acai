import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import sweeteners from "../../data/sweeteners";

const WaysToSweeten = () => {
  const { order, setOrder } = useOrder();
  const [selectedSweetener, setSelectedSweetener] = useState<string | null>(null);
  const router = useRouter();
  
  const handleSweetenerSelect = (sweetenerId: string) => {
    setSelectedSweetener(sweetenerId);
    setOrder((prevOrder) => ({
      ...prevOrder,
      sweet: sweetenerId,
    }));
  };

  const handleContinue = () => {
    if (selectedSweetener) {
      router.push("/ChooseSize");
    } else {
      Alert.alert(
        "Nenhuma forma selecionada",
        "Por favor, selecione uma forma de adoçar para continuar"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Formas de Adoçar" />

      {/* Sweeteners Selection */}
      <View style={styles.sweetenersContainer}>
        {sweeteners.map((sweetener) => (
          <TouchableOpacity
            key={sweetener.id}
            style={[
              styles.sweetenerCard,
              selectedSweetener === sweetener.id && styles.selectedSweetenerCard,
            ]}
            onPress={() => handleSweetenerSelect(sweetener.id)}
          >
            <Image source={sweetener.image} style={styles.sweetenerImage} />
            <Text style={styles.sweetenerName}>{sweetener.id}</Text>
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
  sweetenersContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  sweetenerCard: {
    backgroundColor: "#F5F5F5",
    width: "40%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedSweetenerCard: {
    borderColor: "#350E4D",
  },
  sweetenerImage: {
    width: "70%",
    height: "70%",
    marginBottom: 10,
    resizeMode: "contain",
  },
  sweetenerName: {
    fontSize: 16,
    color: "#350E4D",
    textAlign: "center",
  },
});


export default WaysToSweeten;