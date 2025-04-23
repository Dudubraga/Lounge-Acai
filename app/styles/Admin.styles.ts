import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButtonText: {
    fontSize: 24,
    color: "#350E4D",
    fontWeight: "bold",
  },
  topSection: {
    backgroundColor: "#350E4D",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: 40,
    alignItems: "center",
    marginBottom: 130,
  },
  topSectionTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  sectionContainer: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#350E4D",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#350E4D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  // styles pra tala da senha
  passwordContainer: {
    flex: 1,
    backgroundColor: "#350E4D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  passwordTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 20,
  },
  passwordInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordButton: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  passwordButtonText: {
    color: "#350E4D",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;