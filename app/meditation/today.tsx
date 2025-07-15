import { meditations } from "../../data/meditations";

export function getTodayMeditation() {
  const today = new Date();
  today.setHours(4, 0, 0, 0); // 4h du matin

  return meditations.find((m) => {
    const showDate = new Date(m.date);
    return (
      showDate.getFullYear() === today.getFullYear() &&
      showDate.getMonth() === today.getMonth() &&
      showDate.getDate() === today.getDate()
    );
  });
}

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AudioPlayer from "../../components/AudioPlayer";

export default function TodayMeditation() {
  const meditation = getTodayMeditation();

  if (!meditation) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aucune méditation disponible aujourd’hui.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.verse}>{meditation.verse}</Text>
      <Text style={styles.text}>{meditation.text}</Text>
      <AudioPlayer source={meditation.audio} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fffbe6" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  verse: { fontStyle: "italic", marginBottom: 10, color: "#555" },
  text: { fontSize: 18, marginBottom: 20 },
});
