import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LanguageSelector() {
  const [language, setLanguage] = useState("fr");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setLanguage("fr")}>
        <Text style={[styles.lang, language === "fr" && styles.selected]}>
          FR
        </Text>
      </TouchableOpacity>
      <Text style={styles.separator}>|</Text>
      <TouchableOpacity onPress={() => setLanguage("en")}>
        <Text style={[styles.lang, language === "en" && styles.selected]}>
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
    alignItems: "center",
    justifyContent: "center",
  },
  lang: {
    fontSize: 14,
    color: "#fff",
    marginHorizontal: 4,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
    paddingVertical: 2,
  },
  selected: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    textAlign: "center",
    lineHeight: 18,
  },
  separator: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 2,
    lineHeight: 18,
  },
});
