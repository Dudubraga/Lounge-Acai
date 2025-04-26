import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import sizes from "../../data/sizes";

const ChooseSize = () => {
  const { order, setOrder } = useOrder();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    const selectedSizeData = sizes.find((size) => size.id === sizeId);
    if (selectedSizeData) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        size: sizeId,
        total: selectedSizeData.price,
      }));
    }
  };

  const handleContinue = () => {
    if (selectedSize) {
      router.push("/SideDishes");
    } else {
      Alert.alert(
        "Nenhum tamanho selecionado",
        "Por favor, selecione um tamanho para continuar"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Tamanhos"  onBack={() => {
        if (selectedSize) {
          setOrder((prevOrder) => ({
            ...prevOrder,
            total: prevOrder.total - (sizes.find((size) => size.id === selectedSize)?.price ?? 0),
            size: "",
          }));
          setSelectedSize(null);
        }
      }}/>

      {/* Sizes Selection */}
      <ScrollView style={styles.sizesContainer} persistentScrollbar={true}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size.id}
            style={[
              styles.sizeCard,
              selectedSize === size.id && styles.selectedSizeCard,
            ]}
            onPress={() => handleSizeSelect(size.id)}
          >
            <Image source={size.image} style={styles.sizeImage} />
            <View style={styles.sizeDetails}>
              <Text style={styles.sizeVolume}>{size.id}</Text>
              <Text style={styles.sizeAccompaniments}>
                {size.accompaniments} acompanhamentos
              </Text>
              <Text style={styles.sizePrice}>
                A partir de R$ {size.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  topSection: {
    backgroundColor: "#350E4D",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: 40,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  sizesContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  sizeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    marginBottom: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedSizeCard: {
    borderColor: "#350E4D",
  },
  sizeImage: {
    width: 120,
    height: 120,
    marginRight: 15,
    resizeMode: "contain",
  },
  sizeDetails: {
    flex: 1,
  },
  sizeVolume: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#350E4D",
  },
  sizeAccompaniments: {
    fontSize: 14,
    color: "#350E4D",
    marginTop: 5,
  },
  sizePrice: {
    fontSize: 14,
    color: "#4CAF50", 
    marginTop: 5,
  },
  bottomSection: {
    backgroundColor: "#350E4D",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  continueButtonText: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChooseSize;