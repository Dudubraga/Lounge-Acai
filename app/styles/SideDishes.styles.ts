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
  orderDetails: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  orderType: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#350E4D",
  },
  accompaniments: {
    fontSize: 16,
    color: "#350E4D",
    marginTop: 5,
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