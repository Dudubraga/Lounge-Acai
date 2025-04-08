import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    backgroundColor: "#350E4D",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: 40,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  sizesContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  sizeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    marginBottom: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedSizeCard: {
    borderColor: "#350E4D",
  },
  sizeImage: {
    width: 120,
    height: 120,
    marginRight: 15,
    resizeMode: "contain",
  },
  sizeDetails: {
    flex: 1,
  },
  sizeVolume: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#350E4D",
  },
  sizeAccompaniments: {
    fontSize: 14,
    color: "#350E4D",
    marginTop: 5,
  },
  sizePrice: {
    fontSize: 14,
    color: "#4CAF50", 
    marginTop: 5,
  },
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
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  continueButtonText: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;