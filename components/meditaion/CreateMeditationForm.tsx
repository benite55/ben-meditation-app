import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CreativeRecorder from "./reccording";
import { meditationFormStyleSheet as styles } from "./style";


interface Props {
  onCreate: (
    title: string,
    description: string,
    date: string,
    verse: string,
    audioUrl: string
  ) => void;
  error: any;
  success: string | null;
}

export default function CreateMeditationForm({ onCreate, error, success }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [verse, setVerse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [localError, setLocalError] = useState("");

  // ------------------ SUBMIT FORM ------------------
  const handleSubmit = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !date.trim() ||
      !verse.trim() ||
      !audioUrl.trim()
    ) {
      setLocalError("Please fill in all required fields and upload audio.");
      return;
    }
    setLocalError("");
    onCreate(title, description, date, verse, audioUrl);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="pray" size={28} color="#1d2052" />
        <Text style={styles.headerText}>Create Meditation</Text>
      </View>

      {(error || localError) && (
        <Text style={styles.error}>{error?.message || localError}</Text>
      )}
      {success && (
        <Text style={{ ...styles.success, color: "green" }}>{success}</Text>
      )}

      {/* Title */}
      <View style={styles.inputRow}>
        <Ionicons name="document-text-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Title *"
          placeholderTextColor="#222"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      {/* Description */}
      <View style={styles.textArea}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Description *"
          placeholderTextColor="#222"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
          multiline
        />
      </View>

      {/* Date */}
      <View style={styles.inputRow}>
        <Ionicons name="calendar-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Date YYYY-MM-DD *"
          placeholderTextColor="#222"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
      </View>

      {/* Verse */}
      <View style={styles.inputRow}>
        <Ionicons name="book-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Verse *"
          placeholderTextColor="#222"
          value={verse}
          onChangeText={setVerse}
          style={styles.input}
        />
      </View>

      {/* Audio Recorder */}
      <View style={{ flex: 1, marginVertical: 25 }}>
        <CreativeRecorder
          onUploaded={(url: string) => {
            setAudioUrl(url);
          }}
        />
        {!audioUrl && (
          <Text style={{ color: "#e74c3c", marginTop: 4, textAlign: "center" }}>
            Audio is required *
          </Text>
        )}
        {audioUrl ? (
          <Text style={{ color: "#007bff", marginTop: 4 }}>✅ Audio ready</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Meditation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


