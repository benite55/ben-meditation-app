import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CreativeRecorder from "./reccording";


interface Props {
  onCreate: (
    title: string,
    description: string,
    date: string,
    verse: string,
    text: string,
    audioUrl: string,
    imageUrl: string,
    tags: string
  ) => void;
  error: any;
  success: string | null;
}

export default function CreateMeditationForm({ onCreate, error, success }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [verse, setVerse] = useState("");
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");

  // ------------------ SUBMIT FORM ------------------
  const handleSubmit = () => {
    console.log("Submitting meditation:", {
      title,
      description,
      date,
      verse,
      text,
      audioUrl,
      imageUrl,
      tags,
    });
    onCreate(title, description, date, verse, text, audioUrl, imageUrl, tags);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="pray" size={28} color="#1d2052" />
        <Text style={styles.headerText}>Create Meditation</Text>
      </View>

      {error && <Text style={styles.error}>{error.message}</Text>}
      {success && (
        <Text style={{ ...styles.success, color: "green" }}>{success}</Text>
      )}

      {/* Title */}
      <View style={styles.inputRow}>
        <Ionicons name="document-text-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Title"
          placeholderTextColor="#222"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      {/* Description */}
      <View style={styles.inputRow}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#222"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
      </View>

      {/* Date */}
      <View style={styles.inputRow}>
        <Ionicons name="calendar-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Date YYYY-MM-DD"
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
          placeholder="Verse"
          placeholderTextColor="#222"
          value={verse}
          onChangeText={setVerse}
          style={styles.input}
        />
      </View>

      {/* Text */}
      <View style={styles.textArea}>
        <Ionicons name="text-outline" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          placeholder="Text"
          placeholderTextColor="#222"
          value={text}
          onChangeText={setText}
          style={[styles.input, { height: 100 }]}
          multiline
        />
      </View>

        <View style={{ flex: 1 }}>
          <CreativeRecorder
            onUploaded={(url: string) => {
              console.log("Audio uploaded, got URL:", url);
              setAudioUrl(url);
            }}
          />
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

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    color: "#000"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    justifyContent: "center",
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#1d2052", marginLeft: 10 },
  error: { color: "#e74c3c", textAlign: "center", marginBottom: 8, fontWeight: "bold" },
  success: { textAlign: "center", marginBottom: 8, fontWeight: "bold", color: "green" },
  textArea: {
    flexDirection: "row",
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, paddingVertical: 10, backgroundColor: "transparent",
    color: "#000" },
  button: {
    backgroundColor: "#1d2052",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
});
