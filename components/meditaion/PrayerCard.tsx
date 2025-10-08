import { useUpdatePrayerStatus } from "@/hooks/requests/usePrayerRequests";
import { PrayerRequest } from "@/lib/types";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type PrayerCardProps = {
  prayer: PrayerRequest & { status?: "sent" | "pending" | "answered" | "canceled" };
  onStatusChange?: (newStatus: string) => void;
  role?: string;
};

const STATUS_OPTIONS: ("sent" | "pending" | "answered" | "canceled")[] = ["sent", "pending", "answered", "canceled"];

export default function PrayerCard({ prayer, onStatusChange, role }: PrayerCardProps) {
  const [status, setStatus] = useState(prayer.status || "sent");
  const [modalVisible, setModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { updateStatus, loading } = useUpdatePrayerStatus();

  const statusColor = {
    sent: "#0d6efd",
    pending: "#ffc107",
    answered: "#28a745",
    canceled: "#dc3545",
  }[status];

  const handleSelectStatus = async (newStatus: any, id: string) => {
    setModalVisible(false);
    if (newStatus === status) return;

    try {
      const { error } = await updateStatus(id, newStatus);
      if (error) throw error;
      setStatus(newStatus);
      onStatusChange?.(newStatus);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update status");
    } finally {
    }
  };

  return (
    <View style={styles.card}>
      {/* Status Badge */}
      <TouchableOpacity
  style={[styles.badge, { backgroundColor: statusColor }]}
  onPress={() => setModalVisible(true)}
  activeOpacity={0.8}
  disabled={updating}
>
        <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
      </TouchableOpacity>

      { role === 'Admin' ?  (
        <View>
          <Text style={styles.name}>Names: {prayer.name}</Text>
          <Text style={styles.church}>Church: {prayer.church}</Text>
          <Text style={styles.phone}>Phone: {prayer.phone}</Text>
        </View>
      ) : null }
      <Text style={styles.request}>{prayer.request}</Text>
      <Text style={styles.date}>{new Date(prayer.created_at).toLocaleString()}</Text>

      {/* Status Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {STATUS_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.modalOption}
                  onPress={() => handleSelectStatus(option, prayer.id)}
                >
                  <Text style={{ color: option === status ? "#0d6efd" : "#000", fontWeight: option === status ? "bold" : "normal" }}>
                    {option.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  name: { fontWeight: "bold" },
  church: {},
  phone: {},
  request: { marginTop: 6 },
  date: { fontSize: 10, color: "#666", marginTop: 4 },


  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 10 },
badge: {
  position: "absolute",
  top: 8,
  right: 8,
  paddingHorizontal: 14,
  paddingVertical: 6, // légèrement plus grand pour plus de surface cliquable
  borderRadius: 14,
  zIndex: 10, // pour être au-dessus des autres éléments
  elevation: 5, // effet Android
},

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: 200,
  },
  modalOption: {
    paddingVertical: 10,
    alignItems: "center",
  },
});
