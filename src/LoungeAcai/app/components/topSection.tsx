import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import React, { ReactNode } from "react";
import { useRouter } from "expo-router";

interface TopSectionProps {
  title: string;
  onBack?: () => void;
  showBackArrow?: boolean;
  children?: ReactNode;
}

const TopSection = ({
  title,
  onBack,
  showBackArrow = true,
  children,
}: TopSectionProps) => {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const fontSize = screenWidth > 600 ? 35 : 25;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.purpleSection}>
      {showBackArrow && (
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backArrowContainer}
          accessibilityLabel="Voltar"
          accessible
        >
          <Image
            source={require("../../assets/images/back-arrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { fontSize }]}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  purpleSection: {
    backgroundColor: "#350E4D",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  backArrowContainer: {
    position: "absolute",
    left: 30,
  },
  backArrow: {
    width: 30,
    height: 30,
  },
});

export default TopSection;