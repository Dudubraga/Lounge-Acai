import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import sizes from "../../data/sizes"; // Import the sizes data
import styles from "../styles/ChooseSize.styles"; // Import the styles

const ChooseSize = () => {
  const { order, setOrder } = useOrder();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Format the total as "R$ 00.00"
  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    const selectedSize = sizes.find((size) => size.id === sizeId);
    if (selectedSize) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        size: sizeId,
        total: selectedSize.price, // Update the total with the selected size price
      }));
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
        <Link href="./WaysToSweeten" style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </Link>
      </View>
    </View>
  );
};

export default ChooseSize;