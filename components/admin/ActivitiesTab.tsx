import React from "react";
import { Text, View } from "react-native";
import { mainStyleSheet as styles } from "./style";

const activities = [
  { id: 1, activity: "Meditation created", date: "2025-09-16" },
  { id: 2, activity: "Prayer request added", date: "2025-09-15" },
];

export default function ActivitiesTab() {
  return (
    <View>
      <Text style={styles.section}>Activities</Text>
      <View style={styles.feed}>
        {activities.map((a) => (
          <View key={a.id} style={styles.card}>
            <Text>{a.activity}</Text>
            <Text style={{ color: "#888" }}>{a.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
