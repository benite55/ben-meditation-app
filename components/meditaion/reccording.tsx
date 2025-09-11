// components/WhatsAppRecorder.tsx
import { supabase } from "@/lib/supabase";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  onUploaded: (url: string) => void;
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
  const bars = Array.from({ length: 20 }).map(() => useRef(new Animated.Value(10)).current);

  const startWaveform = () => {
    bars.forEach((bar, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: Math.random() * 80 + 20,
            duration: 180 + i * 20,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(bar, {
            toValue: 10,
            duration: 180 + i * 20,
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
      const { status } = await Audio.Recording.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }
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
        .from("audios")
        .upload(fileName, blob, {
          contentType: "audio/m4a",
        });

      if (error) throw error;

      const publicUrl = supabase.storage
        .from("audios")
        .getPublicUrl(fileName).data.publicUrl;

      onUploaded(publicUrl);
      alert("Upload successful ✅");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.creativeContainer}>
      {/* Creative header */}
      <View style={styles.creativeHeader}>
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          style={styles.creativeCover}
        />
        <View style={styles.creativeAvatarWrap}>
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={styles.creativeAvatar}
          />
          <Text style={styles.creativeTitle}>Record Meditation Audio</Text>
        </View>
      </View>

      <View style={styles.creativeCard}>
        {!recordingUri ? (
          <TouchableOpacity
            style={styles.creativeRecordButton}
            onPressIn={startRecording}
            onPressOut={stopRecording}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={48} color="#fff" />
            <Text style={styles.creativeHoldText}>Hold to Record</Text>
            <FontAwesome5 name="wave-square" size={32} color="#fff" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        ) : (
          <View style={styles.creativePreviewContainer}>
            <TouchableOpacity onPress={playRecording} style={styles.creativePlayBtn}>
              <Ionicons name={playing ? "pause" : "play"} size={32} color="white" />
            </TouchableOpacity>

            <Slider
              style={{ flex: 1, marginHorizontal: 10 }}
              minimumValue={0}
              maximumValue={recordingDuration / 1000}
              minimumTrackTintColor="#1DB954"
              maximumTrackTintColor="#ccc"
            />

            <TouchableOpacity onPress={uploadRecording} style={styles.creativeUploadBtn}>
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Ionicons name="cloud-upload" size={28} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setRecordingUri(null);
                setSound(null);
              }}
              style={styles.creativeDeleteBtn}
            >
              <Ionicons name="trash" size={28} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {recording && (
          <View style={styles.creativeWaveformContainer}>
            {bars.map((bar, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.creativeBar,
                  {
                    height: bar,
                    backgroundColor:
                      i % 4 === 0
                        ? "#1DB954"
                        : i % 4 === 1
                        ? "#34D399"
                        : i % 4 === 2
                        ? "#007AFF"
                        : "#FBBF24",
                  },
                ]}
              />
            ))}
          </View>
        )}

        {recording && (
          <Text style={styles.creativeDuration}>
            {Math.floor(recordingDuration / 1000)}s
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  creativeContainer: {
    flex: 1,
    backgroundColor: "#f6f8fa",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    
  },
  creativeHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  creativeCover: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  creativeAvatarWrap: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  creativeAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#e0e0e0",
  },
  creativeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1d2052",
    marginTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  creativeCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    marginTop: 60,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    width: "95%",
    alignItems: "center",
  },
  creativeRecordButton: {
    backgroundColor: "#1db954d8",
    borderRadius: 60,
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    marginBottom: 12,
    shadowColor: "#1DB954",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  creativeHoldText: {
    color: "#fff",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  creativePreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    borderRadius: 18,
    width: "100%",
    marginBottom: 12,
  },
  creativePlayBtn: {
    backgroundColor: "#1DB954",
    borderRadius: 28,
    padding: 12,
  },
  creativeUploadBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 28,
    padding: 12,
    marginLeft: 12,
  },
  creativeDeleteBtn: {
    backgroundColor: "#F87171",
    borderRadius: 28,
    padding: 12,
    marginLeft: 12,
  },
  creativeWaveformContainer: {
    flexDirection: "row",
    marginTop: 24,
    height: 90,
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  creativeBar: {
    width: 7,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  creativeDuration: {
    color: "#1d2052",
    marginTop: 14,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1,
  },
});
