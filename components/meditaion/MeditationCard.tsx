import { Meditation } from "@/lib/types";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AudioPlayer from "../AudioPlayer";

interface Props {
  meditation: Meditation;
  onLike: () => void;
  onUnlike: () => void;
}

export default function MeditationCard({ meditation, onLike, onUnlike }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playAudio = async () => {
    if (!meditation.audio_url) return;
    setLoadingAudio(true);
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setPlaying(false);
        return;
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: meditation.audio_url });
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setPlaying(false);
          setSound(null);
        }
      });
      await newSound.playAsync();
      setPlaying(true);
    } catch (err) {
      setPlaying(false);
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.date}>{meditation.date}</Text>
      <Text style={styles.verse}>{meditation.verse}</Text>
      <Text numberOfLines={2} style={styles.text}>{meditation.description}</Text>

      {/* Audio Reader */}
      {meditation.audio_url ? (
       <AudioPlayer source={meditation.audio_url} />
      ) : null}

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
  audioBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    marginTop: 2,
  },
  audioText: {
    marginLeft: 8,
    color: "#1DB954",
    fontWeight: "bold",
  },
});
