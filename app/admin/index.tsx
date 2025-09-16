import Auth from "@/components/auth/login";
import CreateMeditationForm from "@/components/meditaion/CreateMeditationForm";
import MeditationCard from "@/components/meditaion/MeditationCard";
import PrayerCard from "@/components/meditaion/PrayerCard";
import { useCreateMeditation, useGetMeditations, useLikeMeditation, useUnlikeMeditation } from "@/hooks/requests/useMeditations";
import { useAddPrayerRequest, useGetPrayerRequests } from "@/hooks/requests/usePrayerRequests";
import { supabase } from "@/lib/supabase";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminScreen() {
  const { meditations, loading: loadingMeditations } = useGetMeditations();
  const [userId, setUserId] = React.useState<string>("");
  const [showMeditationForm, setShowMeditationForm] = useState(false);

  const { createMeditation } = useCreateMeditation();
  const { likeMeditation } = useLikeMeditation(userId);
  const { unlikeMeditation } = useUnlikeMeditation(userId);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { requests: prayerRequests, loading: loadingPrayers } = useGetPrayerRequests();
  const { addRequest } = useAddPrayerRequest();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        setUserId("");
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (!userId) {
    return <Auth />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f2f5" }}>
      {/* Meditation Form Full Screen Modal */}
      <Modal visible={showMeditationForm} animationType="slide" presentationStyle="fullScreen">
        <View style={styles.fullScreenForm}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowMeditationForm(false)}
          >
            <Ionicons name="close" size={32} color="#1d2052" />
          </TouchableOpacity>
          <CreateMeditationForm
            onCreate={async (title, description, date, verse, audioUrl) => {
             const {data, error } = await createMeditation(userId, title, description, date, verse, audioUrl);
              if (error) setError(error);
              if (data) {
                  setError(null);
                  setSuccess("Meditation created successfully");
                  setShowMeditationForm(false);
              }

            }}
            error={error}
            success={success}
          />
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        {/* Facebook-like Cover and Avatar */}
        <View style={styles.coverContainer}>
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={styles.coverImage}
          />
          <View style={styles.avatarContainer}>
            <Image
              source={require("@/assets/images/adaptive-icon.png")}
              style={styles.avatar}
            />
            <Text style={styles.adminName}>Admin</Text>
            <Text style={styles.adminRole}>Administrator</Text>
          </View>
        </View>

        {/* Dashboard Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setShowMeditationForm(true);
              setError(null);
              setSuccess(null);
            }
          }
          >
            <Ionicons name="create-outline" size={20} color="#1d2052" />
            <Text style={styles.actionText}>Create Meditation</Text>
          </TouchableOpacity>
        </View>

        {/* Meditations Feed */}
        <Text style={styles.section}>Meditations</Text>
        <View style={styles.feed}>
          {loadingMeditations && <Text style={styles.loading}>Loading...</Text>}
          {!loadingMeditations && (!meditations || meditations.length === 0) && (
            <View style={styles.emptyIndicator}>
              <FontAwesome5 name="sad-tear" size={40} color="#aaa" />
              <Text style={styles.emptyText}>No meditations found.</Text>
            </View>
          )}
          {meditations?.map((m) => (
            <MeditationCard
              key={m.id}
              meditation={m}
              onLike={() => likeMeditation(m.id)}
              onUnlike={() => unlikeMeditation(m.id)}
            />
          ))}
        </View>

        {/* Prayer Requests Section */}
        <Text style={styles.section}>Prayer Requests</Text>
      
        <View style={styles.feed}>
          {loadingPrayers && <Text style={styles.loading}>Loading...</Text>}
          {!loadingPrayers && (!prayerRequests || prayerRequests.length === 0) && (
            <View style={styles.emptyIndicator}>
              <FontAwesome5 name="sad-tear" size={40} color="#aaa" />
              <Text style={styles.emptyText}>No prayer requests found.</Text>
            </View>
          )}
          {prayerRequests?.map((p) => (
            <PrayerCard key={p.id} prayer={p} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  coverContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 16,
  },
  coverImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  avatarContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#e0e0e0",
  },
  adminName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1d2052",
    marginTop: 8,
  },
  adminRole: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "600",
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 10,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    marginLeft: 8,
    color: "#1d2052",
    fontWeight: "bold",
    fontSize: 15,
  },
  section: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 18,
    marginVertical: 10,
    color: "#1d2052",
  },
  feed: {
    marginHorizontal: 12,
    marginBottom: 16,
  },
  loading: {
    textAlign: "center",
    color: "#888",
    marginVertical: 8,
  },
  fullScreenForm: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 24,
    zIndex: 10,
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyIndicator: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 8,
    color: "#aaa",
    fontSize: 16,
  },
});
