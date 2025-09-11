import { PrayerRequest } from "@/lib/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PrayerCard({ prayer }: { prayer: PrayerRequest }) {
  return (
    <View style={styles.card}>
      <Text>{prayer.request}</Text>
      <Text style={styles.date}>{prayer.created_at}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  date: { fontSize: 10, color: "#666", marginTop: 4 },
});
