import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import styles from "../styles/WhereToEat.styles";

const WhereToEat = () => {
  const { order, setOrder } = useOrder();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setOrder((prevOrder) => ({
      ...prevOrder,
      local: option,
    }));
  };

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

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
      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Local de Consumo</Text>
      </View>

      {/* Options Selection */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedOption === "Local" && styles.selectedOptionCard,
          ]}
          onPress={() => handleOptionSelect("Local")}
        >
          <Image
            source={require("../../assets/images/local.png")}
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Local</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedOption === "Viagem" && styles.selectedOptionCard,
          ]}
          onPress={() => handleOptionSelect("Viagem")}
        >
          <Image
            source={require("../../assets/images/viagem.png")}
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Viagem</Text>
        </TouchableOpacity>
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

export default WhereToEat;