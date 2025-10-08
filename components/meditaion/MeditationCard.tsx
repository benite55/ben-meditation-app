import { useSupabaseAuth } from "@/hooks/requests/useAuth";
import { useAddComment } from "@/hooks/requests/useMeditations";
import { Meditation } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  meditation: Meditation;
  onLike: () => void;
  onUnlike: () => void;
}

export default function MeditationCard({ meditation, onLike, onUnlike }: Props) {
  const { userInfo } = useSupabaseAuth();
  const isLiked = meditation.like_user_ids?.includes(userInfo?.id || "");

  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { addComment, loading: addingComment } = useAddComment();

  const handleLikeToggle = () => {
    if (isLiked) {
      onUnlike();
    } else {
      onLike();
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(userInfo.id, meditation.id, newComment);
    setNewComment("");
    setCommentModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.date}>{meditation.date}</Text>
      <Text numberOfLines={5} style={styles.text}>
        {meditation.description}
      </Text>

      {/* Like / Comment Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLikeToggle} style={styles.likeBtn}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "#555"}
          />
          <Text style={styles.countText}>{meditation.likes_count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCommentModalVisible(true)}
          style={styles.commentBtn}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#555" />
          <Text style={styles.countText}>{meditation.comments_count || 0}</Text>
        </TouchableOpacity>
      </View>

      {/* Add Comment Modal */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add a comment</Text>
          <TextInput
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
            style={styles.textArea}
            editable={!addingComment}
            multiline
          />

          <TouchableOpacity
            onPress={handleAddComment}
            style={styles.addButton}
            disabled={addingComment}
          >
            <Text style={styles.addButtonText}>
              {addingComment ? "..." : "Send"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCommentModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  date: { fontSize: 12, color: "#555", marginBottom: 4 },
  verse: { fontStyle: "italic", color: "#444", marginBottom: 6 },
  text: { color: "#333", marginBottom: 6 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  likeBtn: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  commentBtn: { flexDirection: "row", alignItems: "center" },
  countText: { marginLeft: 6, color: "#555" },
  titleDet: { fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#1d2052" },

  // Modal
  modalContainer: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#1d2052" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 16 },
  addButton: { backgroundColor: "#1d2052", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  closeButton: { backgroundColor: "#888", padding: 12, borderRadius: 8, alignItems: "center", },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
  textArea: {
  borderWidth: 1,
  borderRadius: 8,
  height: 100, 
   marginBottom: 16,
  fontSize: 16, paddingVertical: 10, backgroundColor: "transparent",
    color: "#000"
},

});
