import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import fruits from "../../data/fruits"; 
import styles from "../styles/Fruits.styles"; 

const Fruits = () => {
  const { order, setOrder } = useOrder();
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const router = useRouter();

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

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
      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Escolha a fruta</Text>
      </View>

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
            <Text style={styles.fruitName}>{fruit.name}</Text>
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

export default Fruits;