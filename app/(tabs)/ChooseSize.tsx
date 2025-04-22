import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import sizes from "../../data/sizes"; 
import styles from "../styles/ChooseSize.styles"; 

const ChooseSize = () => {
  const { order, setOrder } = useOrder();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

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
      router.push("/WaysToSweeten");
    } else {
      Alert.alert(
        "Nenhum tamanho selecionado",
        "Por favor, selecione um tamanho para continuar"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Escolha o Tamanho</Text>
      </View>

      {/* Sizes Selection */}
      <View style={styles.sizesContainer}>
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
              <Text style={styles.sizeVolume}>{size.volume}</Text>
              <Text style={styles.sizeAccompaniments}>
                {size.accompaniments} acompanhamentos
              </Text>
              <Text style={styles.sizePrice}>
                A partir de R$ {size.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Purple Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.totalText}>Total: {formattedTotal}</Text>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseSize;