import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native";
import { supabase } from "../../lib/supabaseClient"; // <-- adapte bien le chemin

interface Meditation {
  id: number;
  title: string;
  description: string;
  verse: string;
  audio_url: string;
  date: string;
}

export default function TodayMeditation() {
  const [meditation, setMeditation] = useState<Meditation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Charger la méditation du jour
  useEffect(() => {
    const fetchTodayMeditation = async () => {
      setLoading(true);

      const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

      const { data, error } = await supabase
        .from("meditations")
        .select("*")
        .eq("date", today)
        .single();

      if (error) {
        console.log("Erreur:", error.message);
        setMeditation(null);
      } else {
        setMeditation(data as Meditation);
      }
      setLoading(false);
    };

    fetchTodayMeditation();
  }, []);

  // Jouer l'audio
  const playSound = async () => {
    if (meditation?.audio_url) {
      const { sound } = await Audio.Sound.createAsync({ uri: meditation.audio_url });
      setSound(sound);
      await sound.playAsync();
    }
  };

  // Stop audio quand on quitte
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1d2052" />
        <Text>loarding today&apos;s meditation</Text>
      </View>
    );
  }

  if (!meditation) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>no meditation today.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {meditation.title}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>{meditation.description}</Text>
      <Text style={{ fontSize: 16, fontStyle: "italic", marginBottom: 20 }}>
        📖 {meditation.verse}
      </Text>
      <Button title="▶️ Écouter l'audio" onPress={playSound} />
    </ScrollView>
  );
}
