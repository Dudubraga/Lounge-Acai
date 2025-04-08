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
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  summaryContainer: {
    backgroundColor: "#350E4D",
    marginHorizontal: 20,
    marginTop: 90,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryDetails: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  detailText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  finalizeButton: {
    backgroundColor: "#350E4D",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 90,
  },
  finalizeButtonText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default styles;