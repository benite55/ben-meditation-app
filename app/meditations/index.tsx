import MeditationList from "@/components/admin/MeditationList";
import { useGetMeditations } from "@/hooks/requests/useMeditations";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";

export default function Screen() {
  const router = useRouter();
  const { meditations, loading } = useGetMeditations();

  // 🌗 Detect system theme
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const themedStyles = styles(isDarkMode);

  return (
       <><View style={themedStyles.container}>
      {/* 🔹 Top Bar */}
      <View style={themedStyles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={themedStyles.backButton}>
          <Ionicons name="arrow-back" size={20} color={isDarkMode ? "#fff" : "#333"} />
          <Text style={themedStyles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={22}
            color={isDarkMode ? '#FFD700' : '#1d2052'} />
          <Text style={{ marginLeft: 5, color: isDarkMode ? '#FFD700' : '#1d2052', fontWeight: '600' }}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>
      </View>

    </View><ScrollView contentContainerStyle={themedStyles.container}>
        <Text style={themedStyles.title}>{loading ? 'loading...' : 'Archives'}</Text>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          {/* Dashboard Actions can go here */}
        </View>

        <MeditationList
          meditations={meditations || []}
          loading={loading} />
      </ScrollView></>
  );
}

const styles = (isDark: boolean) => StyleSheet.create({
  container: {
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: isDark ? '#fff' : '#1d2052',
  },
  card: {
    backgroundColor: isDark ? '#1e1e1e' : "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: isDark ? '#fff' : '#000',
  },
  cardDate: {
    fontSize: 12,
    color: isDark ? '#aaa' : '#999',
    marginBottom: 5,
  },
  section: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 18,
    marginVertical: 10,
    color: isDark ? '#fff' : "#1d2052",
  }
});
