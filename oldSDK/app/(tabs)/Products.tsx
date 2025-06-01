import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import TopSection from "../components/topSection";
import BottomSection from "../components/bottomSection";
import products from "../../data/products";

const Products = () => {
  const { order, setOrder } = useOrder();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const router = useRouter();

  const handleProductSelect = (productId: string) => {
    const selectedProductData = products.find((product) => product.id === productId);
    const productPrice = selectedProductData?.price || 0;
    setOrder((prevOrder) => {
      const previousProductData = products.find((product) => product.id === prevOrder.orderType);
      const previousProductPrice = previousProductData?.price || 0;
      return {
        ...prevOrder,
        orderType: productId,
        size: selectedProductData?.size || "000ml",
        total: prevOrder.total - previousProductPrice + productPrice,
      };
    });
    setSelectedProduct(productId);
  };

  const handleContinue = () => {
    if (selectedProduct) {
      if (selectedProduct === "Suco de Açaí" || selectedProduct === "Vitamina de Açaí") {
        router.push("/WhereToEat");
      } else {
        router.push("/WaysToSweeten");
      }
    } else {
      Alert.alert("Nenhum produto selecionado", "Por favor, selecione um produto para continuar");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Title Section */}
      <TopSection title="Selecione o produto"/>

      {/* Product Selection */}
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productCard,
              selectedProduct === product.id && styles.selectedProductCard,
            ]}
            onPress={() => handleProductSelect(product.id)}
          >
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Continue Section */}
      <BottomSection continueOrder={handleContinue}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  productsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  productCard: {
    backgroundColor: "#F5F5F5",
    width: "40%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedProductCard: {
    borderColor: "#350E4D",
  },
  productImage: {
    width: "70%",
    height: "70%",
    marginBottom: 10,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    color: "#350E4D",
    textAlign: "center",
  },
});

export default Products;
