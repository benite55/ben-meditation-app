import { Meditation } from "@/lib/types";
import React from "react";
import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AudioPlayer from "../AudioPlayer";

interface Props {
  meditation: Meditation | null;
  visible: boolean;
  onClose: () => void;
}

const MeditationDetailModal: React.FC<Props> = ({ meditation, visible, onClose }) => {
  const { comments, loading } = useGetComments(meditation?.id || 0);

  return (
    
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
            <View style={styles.fullModal}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
  <Ionicons name="arrow-back" size={20} color="#333" />
  <Text style={styles.backText}>Back</Text>
</TouchableOpacity>

          <Text style={styles.detmedttl}>Meditation</Text>
        <ScrollView contentContainerStyle={styles.modalScroll}>
          {/* Meditation Info */}
          <Text style={styles.modalTitle}>{meditation?.title}</Text>
          <Text style={styles.modalDate}>{new Date(meditation?.date || '').toDateString()}</Text>
          <Text style={styles.modalVerse}>{meditation?.verse}</Text>
          <Text style={styles.modalDescription}>{meditation?.description}</Text>
          {meditation?.audio_url && <AudioPlayer source={meditation?.audio_url} />}

          {/* credentials Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsHeader}>Comments({comments?.length})</Text>
            {loading ? (
              <ActivityIndicator />
            ) : comments?.length === 0 ? (
              <Text style={styles.noComments}>No credentials yet</Text>
            ) : (
              comments?.map((c: any) => (
                <View key={c?.id} style={styles.commentCard}>
                    <Image
                      source={{ uri: c.avatar || 'https://via.placeholder.com/40' }}
                      style={styles.commentAvatar}
                    />
  
                  <View style={styles.commentContentWrapper}>
                    <Text style={styles.commentAuthor}>{c.name}</Text>
                    <Text style={styles.commentContent}>{c.content}</Text>
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

const styles = StyleSheet.create({
  fullModal: { flex: 1, backgroundColor: "#fff", paddingBottom: 80,
    padding: 30,
    flexGrow: 1, },
  modalScroll: { 
    paddingBottom: 10,},
 detmedttl: {    fontSize: 22,
    fontWeight: "bold",
    color: "#1d2052",
    marginBottom: 20,
    textAlign: "center",},
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
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#1d2052" },
  modalDate: { fontSize: 14, color: "#888", marginBottom: 8 },
  modalVerse: { fontSize: 18, fontStyle: "italic", marginBottom: 16 },
  modalDescription: { fontSize: 16, lineHeight: 22 },
  closeButton: {    marginTop: 15,
    backgroundColor: '#1d2052',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 70,
   position: "absolute", bottom: 20, left: 20, right: 20, padding: 15},
  closeButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  commentsSection: { marginTop: 20 },
  commentsHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  noComments: { fontStyle: "italic", color: "#555", textAlign: "center" },

  commentCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f0f2f5",
    padding: 10,
    borderRadius: 20,
  },
  commentHeader: { flexDirection: "row", marginBottom: 4 },
  commentAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, borderColor: "#ccc", borderWidth: 1 },
  commentAvatarPlaceholder: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: "#ccc" },
  commentContentWrapper: { flex: 1 },
  commentAuthor: { fontWeight: "bold", color: "#1a1a1a", marginBottom: 2 },
  commentContent: { color: "#1a1a1a", fontSize: 14, lineHeight: 18 },
});

export default MeditationDetailModal;
