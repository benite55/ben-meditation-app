import { Meditation } from "@/lib/types";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface Props {
  meditation: Meditation;
  onLike: () => void;
  onUnlike: () => void;
}

export default function MeditationCard({ meditation, onLike, onUnlike }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.date}>{meditation.date}</Text>
      <Text style={styles.verse}>{meditation.verse}</Text>
      <Text numberOfLines={2} style={styles.text}>{meditation.text}</Text>

      <View style={styles.actions}>
        <Button title={`Like (${meditation.likes_count || 0})`} onPress={onLike} />
        <Button title="Unlike" onPress={onUnlike} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  date: { fontSize: 12, color: "#555", marginBottom: 4 },
  verse: { fontStyle: "italic", color: "#444", marginBottom: 6 },
  text: { color: "#333", marginBottom: 6 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
});
