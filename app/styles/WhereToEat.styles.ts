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
  optionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  optionCard: {
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    padding: 10,
  },
  selectedOptionCard: {
    borderColor: "#350E4D",
  },
  optionImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#350E4D",
    fontWeight: "bold",
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  continueButtonText: {
    color: "#350E4D",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;