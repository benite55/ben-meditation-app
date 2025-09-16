import { StyleSheet } from "react-native";

export const meditationFormStyleSheet = StyleSheet.create({
  container: {
    padding: 18,
    paddingVertical: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 5,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    color: "#000"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#1d2052", marginLeft: 10 },
  error: { color: "#e74c3c", textAlign: "center", marginBottom: 8, fontWeight: "bold" },
  success: { textAlign: "center", marginBottom: 8, fontWeight: "bold", color: "green" },
  textArea: {
    flexDirection: "row",
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, paddingVertical: 10, backgroundColor: "transparent",
    color: "#000" },
  button: {
    backgroundColor: "#1d2052",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
});