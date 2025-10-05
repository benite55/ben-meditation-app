import { useSupabaseAuth } from "@/hooks/requests/useAuth";
import { useLikeMeditation, useUnlikeMeditation } from "@/hooks/requests/useMeditations";
import { Meditation } from "@/lib/types";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MeditationCard from "../meditaion/MeditationCard";
import MeditationDetailModal from "./MeditationDetailModal";

interface MeditationListProps {
  meditations: Meditation[];
  loading: boolean;
}

const MeditationList: React.FC<MeditationListProps> = ({ meditations, loading }) => {
  const { userInfo } = useSupabaseAuth();
  const { likeMeditation } = useLikeMeditation(userInfo?.id || "");
  const { unlikeMeditation } = useUnlikeMeditation(userInfo?.id || "");

  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  if (!meditations || meditations.length === 0) {
    return (
      <View style={styles.emptyIndicator}>
        <FontAwesome5 name="sad-tear" size={40} color="#aaa" />
        <Text style={styles.emptyText}>No meditations found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.feed}>
      {meditations.map((m) => (
        <TouchableOpacity key={m.id} onPress={() => setSelectedMeditation(m)}>
          <MeditationCard
            meditation={m}
            onLike={() => likeMeditation(m.id)}
            onUnlike={() => unlikeMeditation(m.id)}
          />
        </TouchableOpacity>
      ))}

      {/* Call the separate modal component */}
      <MeditationDetailModal
        meditation={selectedMeditation}
        visible={!!selectedMeditation}
        onClose={() => setSelectedMeditation(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
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

export default MeditationList;
