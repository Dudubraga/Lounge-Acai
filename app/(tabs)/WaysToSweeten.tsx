import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import sweeteners from "../../data/waysToSweeten";
import styles from "../styles/WaysToSweeten.styles"; 

const WaysToSweeten = () => {
  const { order, setOrder } = useOrder();
  const [selectedSweetener, setSelectedSweetener] = useState<string | null>(null);
  const router = useRouter();

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
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaysToSweeten;