import { useGetComments } from "@/hooks/requests/useMeditations";
import { Meditation } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import AudioPlayer from "../AudioPlayer";

interface Props {
  meditation: Meditation | null;
  visible: boolean;
  onClose: () => void;
}

const MeditationDetailModal: React.FC<Props> = ({
  meditation,
  visible,
  onClose,
}) => {
  const { comments, loading } = useGetComments(meditation?.id || 0);

  // 🌗 Dark / Light mode
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const themedStyles = styles(isDarkMode);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={themedStyles.fullModal}>
        {/* 🔹 Top Bar */}
        <View style={themedStyles.topBar}>
          <TouchableOpacity onPress={onClose} style={themedStyles.backButton}>
            <Ionicons
              name="arrow-back"
              size={20}
              color={isDarkMode ? "#fff" : "#333"}
            />
            <Text style={themedStyles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Dark / Light Toggle */}
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
        {/* Content */}
        <ScrollView contentContainerStyle={themedStyles.modalScroll}>
          
        {/* Title */}
        <Text style={themedStyles.detmedttl}>Meditation</Text>
          <Text style={themedStyles.modalTitle}>{meditation?.title}</Text>
          <Text style={themedStyles.modalDate}>
            {meditation?.date
              ? new Date(meditation.date).toDateString()
              : "No date"}
          </Text>
          <Text style={themedStyles.modalVerse}>{meditation?.verse}</Text>
          <Text style={themedStyles.modalDescription}>
            {meditation?.description}
          </Text>

          {meditation?.audio_url && (
            <AudioPlayer source={meditation?.audio_url} />
          )}

          {/* Comments */}
          <View style={themedStyles.commentsSection}>
            <Text style={themedStyles.commentsHeader}>
              Comments ({comments?.length || 0})
            </Text>
            {loading ? (
              <ActivityIndicator />
            ) : comments?.length === 0 ? (
              <Text style={themedStyles.noComments}>No comments yet</Text>
            ) : (
              comments?.map((c: any) => (
                <View key={c?.id} style={themedStyles.commentCard}>
                  <Image
                    source={{
                      uri: c.avatar || "https://via.placeholder.com/40",
                    }}
                    style={themedStyles.commentAvatar}
                  />
                  <View style={themedStyles.commentContentWrapper}>
                    <Text style={themedStyles.commentAuthor}>{c.name}</Text>
                    <Text style={themedStyles.commentContent}>{c.content}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = (isDark: boolean) =>
  StyleSheet.create({
    fullModal: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#fff",
      paddingBottom: 80,
      padding: 30,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    backText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#333",
    },
    detmedttl: {
      fontSize: 22,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#1d2052",
      marginBottom: 20,
      textAlign: "center",
    },
    modalScroll: {
      paddingBottom: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      color: isDark ? "#fff" : "#1d2052",
    },
    modalDate: {
      fontSize: 14,
      color: isDark ? "#bbb" : "#888",
      marginBottom: 8,
    },
    modalVerse: {
      fontSize: 18,
      fontStyle: "italic",
      marginBottom: 16,
      color: isDark ? "#ddd" : "#000",
    },
    modalDescription: {
      fontSize: 16,
      lineHeight: 22,
      color: isDark ? "#ccc" : "#333",
    },
    commentsSection: { marginTop: 20 },
    commentsHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      color: isDark ? "#fff" : "#1d2052",
    },
    noComments: {
      fontStyle: "italic",
      color: isDark ? "#aaa" : "#555",
      textAlign: "center",
    },
    commentCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: isDark ? "#1e1e1e" : "#f0f2f5",
      padding: 10,
      borderRadius: 20,
      marginBottom: 8,
    },
    commentAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      borderColor: "#ccc",
      borderWidth: 1,
    },
    commentContentWrapper: { flex: 1 },
    commentAuthor: {
      fontWeight: "bold",
      color: isDark ? "#fff" : "#1a1a1a",
      marginBottom: 2,
    },
    commentContent: {
      color: isDark ? "#ccc" : "#1a1a1a",
      fontSize: 14,
      lineHeight: 18,
    },
  });

export default MeditationDetailModal;
