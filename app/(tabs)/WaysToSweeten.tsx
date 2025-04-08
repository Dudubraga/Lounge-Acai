import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import sweeteners from "../../data/WaysToSweeten"; // Import the sweeteners data
import styles from "../styles/WaysToSweeten.styles"; // Import the styles

const WaysToSweeten = () => {
  const { order, setOrder } = useOrder();
  const [selectedSweetener, setSelectedSweetener] = useState<string | null>(null);

  // Format the total as "R$ 00.00"
  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);
  
  const handleSweetenerSelect = (sweetenerId: string) => {
    setSelectedSweetener(sweetenerId);
    setOrder((prevOrder) => ({
      ...prevOrder,
      sweet: sweetenerId,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Escolha a forma de adoçar</Text>
      </View>

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
            <Text style={styles.sweetenerName}>{sweetener.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Purple Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.totalText}>Total: {formattedTotal}</Text>
        <Link href="./SideDishes" style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </Link>
      </View>
    </View>
  );
};

export default WaysToSweeten;