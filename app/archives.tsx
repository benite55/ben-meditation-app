import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { meditations } from "../data/meditations";

export default function ArchivesScreen() {
  const router = useRouter();
  const now = new Date();
  const today4am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4);

  const archivedMeditations = meditations.filter((m) => {
    const showDate = new Date(m.date);
    const expiry = new Date(showDate);
    expiry.setDate(expiry.getDate() + 30);
    return showDate < today4am && expiry >= now;
  });

  if (archivedMeditations.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#333" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Aucune archive disponible pour le moment.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#333" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Archives</Text>
      <FlatList
        data={archivedMeditations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`../meditation/${item.id}`)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>
                {new Date(item.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffbe6", padding: 30 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  card: { backgroundColor: "#fff", borderRadius: 8, padding: 15, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardDate: { fontSize: 12, color: '#999', marginBottom: 5 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 5, fontSize: 16, color: "#333" },
});
