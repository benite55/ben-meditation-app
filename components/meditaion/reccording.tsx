// components/WhatsAppRecorder.tsx
import { supabase } from "@/lib/supabase"; // ✅ adapte le chemin si besoin
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AudioPlayer from "../AudioPlayer";

interface Props {
  onUploaded: (url: string) => void; // ✅ renvoie l’URL publique à ton formulaire
}

export default function CreativeRecorder({ onUploaded }: Props) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [uploading, setUploading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // waveform bars
  const bars = Array.from({ length: 10 }).map(() => useRef(new Animated.Value(10)).current);

  const startWaveform = () => {
    bars.forEach((bar, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: Math.random() * 60 + 20,
            duration: 200 + i * 30,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(bar, {
            toValue: 10,
            duration: 200 + i * 30,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  };

  const stopWaveform = () => {
    bars.forEach((bar) => bar.stopAnimation());
  };

  // 🎙️ Start recording
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setRecordingUri(null);
      setRecordingDuration(0);

      // Timer
      timerRef.current = setInterval(async () => {
        if (recording) {
          const status = await recording.getStatusAsync();
          if (status.isRecording) {
            setRecordingDuration(status.durationMillis || 0);
          }
        }
      }, 200);

      startWaveform();
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // ⏹️ Stop recording
  const stopRecording = async () => {
    try {
      if (!recording) return;
      clearInterval(timerRef.current as NodeJS.Timeout);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri || null);
      setRecording(null);
      stopWaveform();
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  // ▶️ Play preview
  const playRecording = async () => {
    if (!recordingUri) return;

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setPlaying(false);
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri });
    setSound(newSound);

    newSound.setOnPlaybackStatusUpdate((status: any) => {
      if (status.didJustFinish) {
        setPlaying(false);
      }
    });

    await newSound.playAsync();
    setPlaying(true);
  };

  // ☁️ Upload to Supabase
  const uploadRecording = async () => {
    if (!recordingUri) return;
    try {
      setUploading(true);
      const fileName = `recordings/${Date.now()}.m4a`;

      const response = await fetch(recordingUri);
      const blob = await response.blob();

      const { error } = await supabase.storage
        .from("meditation")
        .upload(fileName, blob, {
          contentType: "audio/m4a",
        });

      if (error) throw error;

      const publicUrl = supabase.storage
        .from("meditation")
        .getPublicUrl(fileName).data.publicUrl;

      onUploaded(publicUrl); // ✅ renvoie l’URL vers le parent
      alert("Upload successful ✅");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!recordingUri ? (
        <TouchableOpacity
          style={styles.recordButton}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Ionicons name="mic" size={40} color="#fff" />
          <Text style={styles.holdText}>Hold to Record</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.previewContainer}>
          <AudioPlayer source={recordingUri} />
          

          <TouchableOpacity onPress={uploadRecording} style={styles.uploadBtn}>
            {uploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="send" size={15} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setRecordingUri(null);
              setSound(null);
            }}
            style={styles.deleteBtn}
          >
            <Ionicons name="trash" size={15} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {recording && (
        <View style={styles.waveformContainer}>
          {bars.map((bar, i) => (
            <Animated.View
              key={i}
              style={[
                styles.bar,
                { height: bar, backgroundColor: i % 2 === 0 ? "#1DB954" : "#34D399" },
              ]}
            />
          ))}
        </View>
      )}

      {recording && (
        <Text style={{ color: "white", marginTop: 10 }}>
          {Math.floor(recordingDuration / 1000)}s
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    backgroundColor: "#1DB954",
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  holdText: {
    color: "#fff",
    marginTop: 5,
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    padding: 5,
    borderRadius: 15,
    width: "100%",
  },
  playBtn: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    padding: 10,
  },
  uploadBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    padding: 10,
    marginLeft: 5,
  },
  deleteBtn: {
    backgroundColor: "red",
    borderRadius: 25,
    padding: 10,
    marginLeft: 5,
  },
  waveformContainer: {
    flexDirection: "row",
    marginTop: 20,
    height: 80,
    alignItems: "flex-end",
  },
  bar: {
    width: 6,
    marginHorizontal: 2,
    borderRadius: 3,
  },
});
