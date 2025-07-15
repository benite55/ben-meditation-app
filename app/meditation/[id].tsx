import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AudioPlayer from "../../components/AudioPlayer";
import { meditations } from "../../data/meditations";

export default function MeditationDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const meditation = meditations.find((m) => m.id === Number(Array.isArray(id) ? id[0] : id));

  if (!meditation) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#333" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Text style={styles.notFoundText}>Méditation non trouvée.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() =>router.push('/archives')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#333" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.cardDate}>
        {new Date(meditation.date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>

      <Text style={styles.verse}>{meditation.verse}</Text>
      <Text style={styles.text}>{meditation.text}</Text>
      <AudioPlayer source={meditation.audio} />
    </ScrollView>
  );
}

export const navigationOptions = {
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null, 
};


const styles = StyleSheet.create({
  container: { padding: 30, backgroundColor: "#fffbe6", flexGrow: 1 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1d2052" },
  verse: { fontStyle: "italic", marginVertical: 10, color: "#555" },
  text: { fontSize: 16, marginBottom: 20, color: "#333", lineHeight: 22 },
  cardDate: { fontSize: 12, color: '#999', marginBottom: 5 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backText: { marginLeft: 5, fontSize: 16, color: "#333" },
  notFoundText: { textAlign: 'center', marginTop: 20 }
});
