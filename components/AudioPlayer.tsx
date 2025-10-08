import { Ionicons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  source: string; 
  style?: object;
};

export default function AudioPlayer({ source }: Props) {
  const sound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    loadAudio();

    return () => {
      sound.current?.unloadAsync();
    };
  }, []);

  const loadAudio = async () => {
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: source },
      { shouldPlay: false, volume }
    );

    sound.current = playbackObject;

    // Récupérer la durée totale immédiatement
    const status = await playbackObject.getStatusAsync();
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
    }

    // Mettre à jour la position et lecture en temps réel
    playbackObject.setOnPlaybackStatusUpdate((status: any) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 1);
        setIsPlaying(status.isPlaying);
      }
    });
  };

  const togglePlayPause = async () => {
    if (!sound.current) return;

    const status = await sound.current.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await sound.current.pauseAsync();
      } else {
        await sound.current.playAsync();
      }
    }
  };

  const handleSeek = async (value: number) => {
    if (sound.current) {
      await sound.current.setPositionAsync(value);
    }
  };

  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    if (sound.current) {
      await sound.current.setVolumeAsync(value);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderRow}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#1d2052"
          maximumTrackTintColor="#ccc"
        />
      </View>

      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f6f8fa",
    borderRadius: 10,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  playButton: {
    backgroundColor: "#1d2052",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7, 
  },
  slider: {
    width: "80%",
    height: 40,
    alignSelf: "flex-end",
  },
  timeRow: {
    width: "80%",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 12,
    color: "#333",
  },
});
