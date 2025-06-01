import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  products: "availability_products",
  fruits: "availability_fruits",
  sides: "availability_sides",
};

export async function getAvailability() {
  const [prod, fruits, sides] = await Promise.all([
    AsyncStorage.getItem(STORAGE_KEYS.products),
    AsyncStorage.getItem(STORAGE_KEYS.fruits),
    AsyncStorage.getItem(STORAGE_KEYS.sides),
  ]);
  return {
    products: prod ? JSON.parse(prod) : {},
    fruits: fruits ? JSON.parse(fruits) : {},
    sides: sides ? JSON.parse(sides) : {},
  };
}