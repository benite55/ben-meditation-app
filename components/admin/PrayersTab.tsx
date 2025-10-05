import CreatePrayerRequestForm from "@/components/meditaion/CreatePrayerRequestForm";
import PrayerCard from "@/components/meditaion/PrayerCard";
import { useAddPrayerRequest, useGetPrayerRequests, useGetUserPrayerRequests } from "@/hooks/requests/usePrayerRequests";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";
import { mainStyleSheet as styles } from "./style";

export default function PrayersTab({ userId, role }: { userId: string, role?:string }) {
  
  const { requests: adminRequests, loading: isLoadingAdminrPrayers } = useGetPrayerRequests();
   const { requests: userRequests, loading: isLoadingUserPrayers } = useGetUserPrayerRequests(role === 'Admin' ? undefined : userId);

  const requests = role === 'Admin' ? adminRequests : userRequests;
  const loading = role === 'Admin' ? isLoadingAdminrPrayers : isLoadingUserPrayers;

  const { addRequest } = useAddPrayerRequest();
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Call prayer request form
  const handleAddPrayer = async (description: string) => {
    setError(null);
    setSuccess(null);
    if (!description.trim()) {
      setError("Prayer request cannot be empty.");
      return;
    }
    const { data, error } = await addRequest(userId, description);
    if (error) setError(error.message);
    if (data) {
      setSuccess("Prayer request added!");
      setError(null);
      setShowPrayerForm(false);
    }
  };

  return (
    <View>
      {/* Prayer Request Modal */}
      <Modal visible={showPrayerForm} animationType="slide" transparent>
        <View style={styles.fullScreenForm}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowPrayerForm(false)}
          >
            <Ionicons name="close" size={32} color="#1d2052" />
          </TouchableOpacity>
          <CreatePrayerRequestForm
            onCreate={handleAddPrayer}
            error={error}
            success={success}
          />
        </View>
      </Modal>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={styles.section}>Prayer Requests</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setShowPrayerForm(true);
              setError(null);
              setSuccess(null);
            }}
          >
            <Ionicons name="add-circle-outline" size={20} color="#1d2052" />
            <Text style={styles.actionText}>Add Prayer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.feed}>
        {loading ? (
          <ActivityIndicator />
        ) : requests?.length === 0 ? (
          <View style={styles.emptyIndicator}>
            <FontAwesome5 name="sad-tear" size={40} color="#aaa" />
            <Text style={styles.emptyText}>No prayer requests found.</Text>
          </View>
        ) : (
          requests?.map((p) => <PrayerCard key={p.id} role={role} prayer={p} />)
        )}
      </View>
    </View>
  );
}
