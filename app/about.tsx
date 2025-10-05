import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  // 🌗 Detect system theme
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const themedStyles = styles(isDarkMode);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#121212" : "#f6f8fa" }}>
      {/* 🔹 Top Bar FIXE */}
      <View style={themedStyles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={themedStyles.backButton}>
          <Ionicons name="arrow-back" size={20} color={isDarkMode ? "#fff" : "#333"} />
          <Text style={themedStyles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Dark/Light mode button */}
        <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={isDarkMode ? "moon" : "sunny"} size={22} color={isDarkMode ? "#FFD700" : "#1d2052"} />
          <Text style={{ marginLeft: 5, color: isDarkMode ? "#FFD700" : "#1d2052", fontWeight: "600" }}>
            {isDarkMode ? "Dark" : "Light"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={themedStyles.container}>
        <Text style={themedStyles.title}>About M-Dev</Text>

        <Text style={themedStyles.paragraph}>
          M-Dev was created to help you begin each day with God,
          through a short meditation, a Bible verse, and a moment of reflection.
        </Text>

        <Text style={themedStyles.paragraph}>
          Providing you daily a source of encouragement and
          spiritual growth, reminding you that every day counts and that
          God speaks in many ways if we take time to listen.
        </Text>

        <Text style={themedStyles.paragraph}>
          Our goal is not only to provide daily inspiration but also to help 
          you build a consistent habit of spending time with God, no matter 
          where you are.
        </Text>

        <Text style={themedStyles.paragraph}>
          May this app be a source of peace, encouragement, and guidance in 
          your spiritual journey.
        </Text>

        <Text style={themedStyles.contactTitle}>Contact:</Text>
        <Text selectable style={themedStyles.contact}>📧 Email: buyanabenite@gmail.com</Text>
        <Text selectable style={themedStyles.contact}>📱 WhatsApp: +250 798 973 727</Text>
        <Text selectable style={themedStyles.contact}>🔗 Join our WhatsApp Channel: https://whatsapp.com/channel/0029VbAaXlxKbYMI6P75Nx3J</Text>
      </ScrollView>
    </View>
  );
}

const styles = (isDark: boolean) => StyleSheet.create({
  container: {
    padding: 25,
    flexGrow: 1,
    backgroundColor: isDark ? '#121212' : '#f6f8fa',
  },
  topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 10,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 3,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
    color: isDark ? "#fff" : "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: isDark ? '#fff' : "#1d2052",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: isDark ? '#ddd' : "#333",
    marginBottom: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: isDark ? '#fff' : "#1d2052",
    marginTop: 15,
  },
  contact: {
    marginTop: 10,
    fontSize: 14,
    color: isDark ? '#aaa' : "#666",
  },
});
