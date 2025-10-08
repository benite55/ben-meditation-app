import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
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
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [verse, setVerse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [localError, setLocalError] = useState("");

  // ------------------ SUBMIT FORM ------------------
  const handleSubmit = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !date ||
      isNaN(date.getTime()) ||
      !verse.trim() ||
      !audioUrl.trim()
    ) {
      setLocalError("Please fill in all required fields and upload audio.");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    setLocalError("");
    onCreate(title, description, formattedDate, verse, audioUrl);
  };

  // Pour afficher la date correctement
  const displayDate =
    date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "Select Date *";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome5 name="pray" size={28} color="#1d2052" />
        <Text style={styles.headerText}>Create Meditation</Text>
      </View>

      {/* Error / Success */}
      {(error || localError) && (
        <Text style={styles.error}>{error?.message || localError}</Text>
      )}
      {success && <Text style={{ ...styles.success, color: "green" }}>{success}</Text>}

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

      {/* Date Picker */}
      <View style={styles.inputRow}>
        <Ionicons name="calendar-outline" size={20} color="#007bff" style={styles.icon} />

        {Platform.OS === "web" ? (
          <input
            type="date"
            value={date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              if (!isNaN(newDate.getTime())) setDate(newDate);
            }}
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 8,
              borderColor: "#ccc",
              borderWidth: 1,
            }}
          />
        ) : (
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ flex: 1 }}>
            <Text style={[styles.input, { paddingVertical: 12 }]}>{displayDate}</Text>
          </TouchableOpacity>
        )}
      </View>

      {showDatePicker && Platform.OS !== "web" && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          textColor={Platform.OS === "ios" ? "#000" : undefined}
          themeVariant={Platform.OS === "android" ? "light" : undefined}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            if (selectedDate && !isNaN(selectedDate.getTime())) setDate(selectedDate);
          }}
        />
      )}

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

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Meditation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
