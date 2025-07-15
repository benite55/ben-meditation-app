import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function PrayerScreen() {
  const router = useRouter();
  const [request, setRequest] = useState("");

  const handleSubmit = () => {
    if (!request.trim()) {
      Alert.alert("Erreur", "La requête de prière ne peut pas être vide.");
      return;
    }
    Alert.alert("Merci", "Ta requête a été envoyée.");
    setRequest("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#333" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Requête de prière</Text>

        <Text style={styles.label}>Ta requête</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Écris ta prière ici..."
          multiline
          numberOfLines={5}
          value={request}
          onChangeText={setRequest}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
flex: 1, backgroundColor: "#fffbe6" },
  scroll: { padding: 30 },
    backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#1d2052",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    marginTop: 15,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textarea: {
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
  },
  button: {
marginTop: 30,
    backgroundColor: '#1d2052',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 90,

  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

