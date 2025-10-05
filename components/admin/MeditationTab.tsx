import { useCreateMeditation, useGetMeditations } from "@/hooks/requests/useMeditations";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CreateMeditationModal from "./MeditationFormModal";
import MeditationList from "./MeditationList";
import { mainStyleSheet as styles } from "./style";

export default function MeditationTab({ userId }: { userId: string }) {
  const { meditations, loading } = useGetMeditations();
  const [showMeditationForm, setShowMeditationForm] = useState(false);
  const { createMeditation } = useCreateMeditation();
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <View>
    <CreateMeditationModal
        visible={showMeditationForm}
        setShowMeditationForm={setShowMeditationForm}
        createMeditation={createMeditation}
        userId={userId}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text style={styles.section}>Meditations</Text>
       {/* Dashboard Actions */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setShowMeditationForm(true);
                    setError(null);
                    setSuccess(null);
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="#1d2052" />
                  <Text style={styles.actionText}>Create Meditation</Text>
                </TouchableOpacity>
              </View>
      </View>
      <MeditationList
        meditations={meditations || []}
        loading={loading}
        

      />
    </View>
  );
}
