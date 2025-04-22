import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useOrder } from "../../context/OrderContext";
import products from "../../data/products";
import styles from "../styles/SelectOrder.styles";

const SelectOrder = () => {
  const { order, setOrder } = useOrder();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const router = useRouter();

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total);

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    setOrder((prevOrder) => ({
      ...prevOrder,
      orderType: productId,
    }));
  };

  const handleContinue = () => {
    if (selectedProduct) {
      router.push("/ChooseSize");
    } else {
      Alert.alert("Nenhum produto selecionado", "Por favor, selecione um produto para continuar");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Purple Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Escolha seu produto</Text>
      </View>

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
            <Text style={styles.productName}>{product.name}</Text>
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

export default SelectOrder;
