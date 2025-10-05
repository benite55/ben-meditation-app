import Auth from "@/components/auth/login";
import CreatePrayerRequestForm from "@/components/meditaion/CreatePrayerRequestForm";
import PrayerCard from "@/components/meditaion/PrayerCard";
import { useSupabaseAuth } from "@/hooks/requests/useAuth";
import { useAddPrayerRequest, useGetUserPrayerRequests } from "@/hooks/requests/usePrayerRequests";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function PrayerScreen() {
  const { userInfo, isAuthenticated } = useSupabaseAuth();
  const { requests, loading } = useGetUserPrayerRequests(userInfo?.id || "");
  const { addRequest } = useAddPrayerRequest();

  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 🌗 Dark/Light mode toggle
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  const themedStyles = styles(isDarkMode);

  // Handle adding new prayer
  const handleAddPrayer = async (description: string) => {
    setError(null);
    setSuccess(null);
    if (!description.trim()) {
      setError("Description cannot be empty");
      return;
    }
    const { data, error } = await addRequest(userInfo?.id || "", description);
    if (error) setError(error.message);
    if (data) {
      setSuccess("Request Added!");
      setError(null);
      setShowPrayerForm(false);
    }
  };

  if (!isAuthenticated) {
    return <Auth />;
  }

  const role = userInfo?.user_metadata.role;

  return (
    <View style={themedStyles.pageContainer}>
      {/* 🔹 Top Bar FIXE */}
      <View
        style={[
          themedStyles.topBar,
          { backgroundColor: isDarkMode ? "#121212" : "#f6f8fa" },
        ]}
      >
                <TouchableOpacity
          onPress={() => router.back()}
          style={themedStyles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color={isDarkMode ? "#fff" : "#333"} />
          <Text style={[themedStyles.backText, { color: isDarkMode ? "#fff" : "#333" }]}>Back</Text>
        </TouchableOpacity>
        {/* Dark/Light mode button (top left) */}
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons
            name={isDarkMode ? "moon" : "sunny"}
            size={22}
            color={isDarkMode ? "#FFD700" : "#1d2052"}
          />
          <Text
            style={{
              marginLeft: 5,
              color: isDarkMode ? "#FFD700" : "#1d2052",
              fontWeight: "600",
            }}
          >
            {isDarkMode ? "Dark" : "Light"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={themedStyles.container}>
        <View style={{ flex: 1, padding: 20 }}>
<Text style={[themedStyles.title, { color: isDarkMode ? "#fff" : "#1d2052",textAlign:"center", marginBottom: 20 }]}>Prayer Requests</Text>
          {/* Intro Paragraph */}
          <Text style={[themedStyles.introText, { color: isDarkMode ? "#ddd" : "#333" }]}>
We are called to pray for one another because prayer is a powerful act of love, unity, and faith. When we intercede for others, we not only bring their needs before God, but we also strengthen the bonds within the body of Christ.{"\n"}No request is too small or too big for Him.{"\n"}Feel free to share your burdens, and let’s carry them together before the Lord.{"\n"}
_____James 5:16          </Text>

          {/* Add Prayer Modal */}
          <Modal visible={showPrayerForm} animationType="slide" transparent>
            <View style={[themedStyles.fullScreenForm, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
              <TouchableOpacity
                style={themedStyles.closeButton}
                onPress={() => setShowPrayerForm(false)}
              >
                <Ionicons name="close" size={32} color={isDarkMode ? "#fff" : "#1d2052"} />
              </TouchableOpacity>
              <CreatePrayerRequestForm
                onCreate={handleAddPrayer}
                error={error}
                success={success}
                isDarkMode={isDarkMode}
              />
            </View>
          </Modal>

          {/* Header & Add Button */}
          <View style={themedStyles.headerRow}>
            <TouchableOpacity
              style={themedStyles.addButton}
              onPress={() => {
                setShowPrayerForm(true);
                setError(null);
                setSuccess(null);
              }}
            >
              <Ionicons name="add-circle-outline" size={20} color={isDarkMode ? "#fff" : "#1d2052"} />
              <Text style={[themedStyles.addText, { color: isDarkMode ? "#fff" : "#1d2052" }]}>write a prayer request</Text>
            </TouchableOpacity>
          </View>

          {/* Prayer List */}
          <View style={themedStyles.feed}>
            {loading ? (
              <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#1d2052"} />
            ) : requests?.length === 0 ? (
              <View style={themedStyles.emptyIndicator}>
                <FontAwesome5 name="sad-tear" size={40} color="#aaa" />
                <Text style={themedStyles.emptyText}>No request found</Text>
              </View>
            ) : (
              requests?.map((p) => <PrayerCard key={p.id} prayer={p} role={role} />)
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (isDark: boolean) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#f9f9f9",
    },
    container: {
      padding: 1,
      flexGrow: 1,
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
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    backText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: "600",
    },
    introText: {
      fontSize: 16,
      marginBottom: 20,
    },
    fullScreenForm: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 20,
    },
    closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 10,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 15,
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    addText: {
      marginLeft: 5,
      fontWeight: "bold",
    },
    feed: {
      flex: 1,
      marginTop: 10,
    },
    emptyIndicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    emptyText: {
      marginTop: 10,
      fontSize: 16,
      color: "#aaa",
    },
  });
