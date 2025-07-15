
import { Ionicons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  source: number; 
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
    const { sound: playbackObject } = await Audio.Sound.createAsync(source, {
      shouldPlay: false,
      volume,
    });

    sound.current = playbackObject;

    playbackObject.setOnPlaybackStatusUpdate((status: any) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 1);
        setIsPlaying(status.isPlaying);
      }
    });
  };
  const checkIfPlaying = async () => {
  const status = await sound.current?.getStatusAsync();

if (status?.isLoaded) {
  console.log("Joue-t-il ?", status.isPlaying);
} else {
    console.log("Le son n'est pas chargé !");
  }
};

 const togglePlayPause = async () => {
  if (!sound.current) return;

  const status = await (sound.current as Audio.Sound).getStatusAsync();
  if (status.isLoaded) {
    console.log("Durée totale :", status.durationMillis);
    console.log("Position actuelle :", status.positionMillis);

    if (status.isPlaying) {
      await (sound.current as Audio.Sound).pauseAsync();
    } else {
      await (sound.current as Audio.Sound).playAsync();
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
    marginTop: 40,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  sliderRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
},
  playButton: {
    backgroundColor: "#1d2052",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"baseline", 
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
