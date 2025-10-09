import Auth from "@/components/auth/login";
import CreatePrayerRequestForm from "@/components/meditaion/CreatePrayerRequestForm";
import PrayerCard from "@/components/meditaion/PrayerCard";
import { useSupabaseAuth } from "@/hooks/requests/useAuth";
import { useAddPrayerRequest, useGetUserPrayerRequests } from "@/hooks/requests/usePrayerRequests";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";

export default function PrayerScreen() {
  const { userInfo, isAuthenticated } = useSupabaseAuth();
  const { requests: initialRequests, loading } = useGetUserPrayerRequests(userInfo?.id || "");
  const { addRequest } = useAddPrayerRequest();

  const [requests, setRequests] = useState<any[]>(initialRequests || []);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPrayerForm, setShowPrayerForm] = useState(false);

  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const themedStyles = styles(isDarkMode);

  const role = userInfo?.user_metadata?.role || "User";

  // 🔹 Mettre à jour les requêtes si le hook initial change
  useEffect(() => {
    setRequests(initialRequests || []);
  }, [initialRequests]);

  // ✅ Ajouter une requête et l’afficher immédiatement
  const handleAddPrayer = async (description: string) => {
    setError(null);
    setSuccess(null);

    if (!description.trim()) {
      setError("Please enter your prayer request before submitting.");
      return;
    }

    const { data, error } = await addRequest(userInfo?.id || "", description);

    if (error) {
      setError(error.message);
      return;
    }

    if (data) {
      setSuccess("Your prayer request has been added!");
      setShowPrayerForm(false);
      // Ajouter directement la nouvelle prière dans la liste locale
      setRequests((prev) => [data, ...prev]);
    }
  };

  if (!isAuthenticated) return <Auth />;

  return (
    <View style={themedStyles.pageContainer}>
      {/* 🔹 Top Bar */}
      <View
        style={[
          themedStyles.topBar,
          { backgroundColor: isDarkMode ? "#121212" : "#f6f8fa" },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={themedStyles.backButton}>
          <Ionicons name="arrow-back" size={20} color={isDarkMode ? "#fff" : "#333"} />
          <Text style={[themedStyles.backText, { color: isDarkMode ? "#fff" : "#333" }]}>
            Back
          </Text>
        </TouchableOpacity>

        {/* 🌗 Dark/Light mode toggle */}
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

      {/* 🔹 Page Content */}
      <ScrollView contentContainerStyle={themedStyles.container}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text
            style={[
              themedStyles.title,
              { color: isDarkMode ? "#fff" : "#1d2052", textAlign: "center", marginBottom: 15 },
            ]}
          >
            Prayer Requests
          </Text>

          <Text style={[themedStyles.introText, { color: isDarkMode ? "#ddd" : "#333" }]}>
            We are called to pray for one another because prayer is a powerful act of love,
            unity, and faith. When we intercede for others, we bring their needs before God,
            strengthening the body of Christ.{"\n\n"}
            Feel free to share your burdens, and let’s carry them together before the Lord.
            {"\n"}— James 5:16
          </Text>

          {/* 🔹 Add Prayer Modal */}
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

          {role === "Admin" ? (
            <Text style={{ color: "#888", textAlign: "center", marginTop: 50 }}>
            </Text>
          ) : (
            <>
              {/* 🔹 Header + Add Button */}
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[themedStyles.sectionTitle, { color: isDarkMode ? "#fff" : "#1d2052" }]}>
                  My Prayer Requests
                </Text>
                <TouchableOpacity
                  style={themedStyles.actionButton}
                  onPress={() => {
                    setShowPrayerForm(true);
                    setError(null);
                    setSuccess(null);
                  }}
                >
                  <Ionicons name="add-circle-outline" size={20} color={isDarkMode ? "#fff" : "#1d2052"} />
                  <Text style={[themedStyles.actionText, { color: isDarkMode ? "#fff" : "#1d2052" }]}>
                    Add Prayer
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 🔹 Prayer List */}
              <View style={themedStyles.feed}>
                {loading ? (
                  <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#1d2052"} />
                ) : requests?.length === 0 ? (
                  <View style={themedStyles.emptyIndicator}>
                    <Text style={themedStyles.emptyText}>No prayer requests found.</Text>
                  </View>
                ) : (
                  requests.map((p) => <PrayerCard key={p.id} role={role} prayer={p} />)
                )}
              </View>
            </>
          )}
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
      lineHeight: 22,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionText: {
      marginLeft: 5,
      fontWeight: "bold",
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
