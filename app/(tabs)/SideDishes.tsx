import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import sideDishes from "../../data/sideDishes";

const SideDishes = () => {
  const { order, setOrder } = useOrder();
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  const sizeLimits: { [key: string]: number} = {
    "200ml": 2,
    "300ml": 3,
    "400ml": 4,
    "500ml": 5,
    "750ml": 5,
  }
  const limit = sizeLimits[order.size] || 0;
  const totalSelected = Object.values(selectedDishes).reduce((total, quantity) => total + quantity, 0);
  const extraCharge = totalSelected > limit ? (totalSelected - limit) * 2 : 0;

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

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      extraCharge,
      total: prevOrder.total - prevOrder.extraCharge + extraCharge,
    }));
  }, [extraCharge, setOrder]);

  const handleContinue = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      sideDishes: selectedDishes,
    }));
    router.push("/Fruits");
  };

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Acompanhamentos" onBack={() => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          total: prevOrder.total - extraCharge,
          sideDishes: {},
          extraCharge: 0,
        }));
        setSelectedDishes({});
      }}/>

      {/* Order Details */}
      <View style={styles.orderDetails}>
        <Text style={styles.orderType}>
          {order.orderType} {order.size}
        </Text>
        <View style={ styles.accompanimentsContainer }>
          <Text style={styles.accompanimentsText}>
            Acompanhamentos {totalSelected}/{limit}
          </Text>
          {extraCharge > 0 && (
            <Text style={styles.extraCharge}>
              Valor extra: R$ {extraCharge.toFixed(2)}
            </Text>
          )}
        </View>
      </View>

      {/* Side Dishes List */}
      <ScrollView style={styles.dishesContainer} persistentScrollbar={true}>
        {sideDishes.map((dish) => (
          <View key={dish.id} style={styles.dishRow}>
            <Text style={styles.dishName}>{dish.id}</Text>
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
      </ScrollView>

      {/* Bottom Continue Section */}
      <BottomSection continueOrder={handleContinue}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  orderDetails: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  orderType: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#350E4D",
  },
  accompanimentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accompanimentsText: {
    fontSize: 16,
    color: "#350E4D",
  },
  extraCharge: {
    fontSize: 16,
    color: "red",
  },
  dishesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  dishRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dishName: {
    fontSize: 16,
    color: "#350E4D",
  },
  dishControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlButton: {
    padding: 5,
    marginHorizontal: 20,
  },
  controlButtonText: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
  },
  dishCount: {
    fontSize: 16,
    color: "#350E4D",
  },
});

export default SideDishes;