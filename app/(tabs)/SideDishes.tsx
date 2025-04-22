import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import sideDishes from "../../data/sideDishes";
import styles from "../styles/SideDishes.styles";

const SideDishes = () => {
  const { order, setOrder } = useOrder();
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  const handleAddDish = (dishId: string) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const handleRemoveDish = (dishId: string) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [dishId]: Math.max((prev[dishId] || 0) - 1, 0),
    }));
  };

  const handleContinue = () => {
    const selectedDishIds = Object.keys(selectedDishes).filter((id) => selectedDishes[id] > 0);
    setOrder((prevOrder) => ({
      ...prevOrder,
      sideDishes: selectedDishIds,
    }));
    router.push("/Fruits");
  };

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

  return (
    <View style={styles.container}>
      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Acompanhamentos</Text>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetails}>
        <Text style={styles.orderType}>
          {order.orderType} {order.size}
        </Text>
        <Text style={styles.accompaniments}>
          Acompanhamentos{" "}
          {Object.keys(selectedDishes).filter((dishId) => selectedDishes[dishId] > 0).length}
          /{order.sideDishes.length}
        </Text>
      </View>

      {/* Side Dishes List */}
      <View style={styles.dishesContainer}>
        {sideDishes.map((dish) => (
          <View key={dish.id} style={styles.dishRow}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <View style={styles.dishControls}>
              <TouchableOpacity onPress={() => handleRemoveDish(dish.id)} style={styles.controlButton}>
                <Text style={styles.controlButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.dishCount}>{selectedDishes[dish.id] || 0}</Text>
              <TouchableOpacity onPress={() => handleAddDish(dish.id)} style={styles.controlButton}>
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
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

export default SideDishes;