import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#333" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>À propos de Dev-M</Text>

      <Text style={styles.paragraph}>
        Cette application a été créée pour t’aider à commencer chaque journée
        avec Dieu, à travers une méditation courte, un verset biblique et un moment d'écoute.
      </Text>

      <Text style={styles.paragraph}>
        Chaque semaine, de nouvelles méditations sont préparées avec amour et prière,
        pour t’encourager et nourrir ta foi du lundi au vendredi.
      </Text>

      <Text style={styles.paragraph}>
        Que Dieu nous fortifie !
      </Text>

      <Text style={styles.contact}>Contact :</Text>
      <Text style={styles.contact}>buyanabenite@gmail.com</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#fffbe6",
    flexGrow: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d2052",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
  contact: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});
