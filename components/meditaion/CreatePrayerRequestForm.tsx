import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  onCreate: (description: string) => Promise<void>;
  error: any;
  success: string | null;
  isDarkMode: boolean; // ← Nouvelle prop
}

export default function CreatePrayerRequestForm({ onCreate, error, success, isDarkMode }: Props) {
  const [description, setDescription] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);

  const themedStyles = styles(isDarkMode);

  const handleSubmit = async () => {
    if (!description.trim()) {
      setLocalError("Please enter your prayer request before submitting.");
      return;
    }
    setLocalError("");
    setLoading(true);
    try {
      await onCreate(description);
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={themedStyles.pageContainer}>
      {/* 🔹 Top Bar */}
      <View style={themedStyles.topBar}>
        <Text style={themedStyles.title}>Write Prayer Request</Text>
      </View>

      {(error || localError) && (
        <Text style={[themedStyles.error, { color: isDarkMode ? "#ff8080" : "#ff0000" }]}>
          {error?.message || localError}
        </Text>
      )}
      {success && <Text style={[themedStyles.success, { color: "green" }]}>{success}</Text>}

      <View style={themedStyles.textArea}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={20}
          color={isDarkMode ? "#FFD700" : "#007bff"}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Your prayer request *"
          placeholderTextColor={isDarkMode ? "#aaa" : "#222"}
          editable={!loading}
          value={description}
          onChangeText={setDescription}
          style={[
            themedStyles.input,
            { height: 100, marginBottom: 20, backgroundColor: isDarkMode ? "#1e1e1e" : "#fff", color: isDarkMode ? "#fff" : "#000" },
          ]}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[themedStyles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={themedStyles.buttonText}>Submit Prayer Request</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = (isDark: boolean) =>
  StyleSheet.create({
    pageContainer: {
      backgroundColor: isDark ? "#121212" : "#f9f9f9",
      padding: 20,
    },
    topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#1d2052",
    },
    error: {
      marginBottom: 10,
    },
    success: {
      marginBottom: 10,
      fontWeight: "bold",
    },
    textArea: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#ccc",
    },
    button: {
      backgroundColor: "#1d2052",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
