import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useOrder } from "../../context/OrderContext";

const BottomSection = ({ continueOrder } : { continueOrder: () => void}) => {
    const { order } = useOrder();

    const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(order.total);

    return (
        <View style={styles.bottomSection}>
            <Text style={styles.totalText}>Total: {formattedTotal}</Text>
            <TouchableOpacity style={styles.continueButton} onPress={continueOrder}>
                <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomSection: {
      backgroundColor: "#350E4D",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingVertical: 20,
      paddingHorizontal: 30,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    totalText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    continueButton: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    continueButtonText: {
      color: "#350E4D",
      fontSize: 16,
      fontWeight: "bold",
    },
});

export default BottomSection;