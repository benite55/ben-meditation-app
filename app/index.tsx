import { getTodayMeditation } from "@/data/meditations";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import LanguageSelector from "../components/LanguageSelector";
import ParallaxScrollView from "../components/ParallaxScrollView";

export default function HomeScreen() {
  const router = useRouter();
  const meditationDuJour = getTodayMeditation() || {
    id: "default",
    title: "Méditation du jour",
    verse:
      "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    reference: "Jérémie 29:11",
    date: new Date().toISOString(),
  };

  return (
    <>
      <StatusBar style="inverted" />
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerHeight={450}
        headerImage={
          <View style={styles.heroImageContainer}>
            <Image
              source={require("../assets/images/meditation1.png")}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroImageOverlay} />

            {/* Header Overlay */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.brand}>Dev-M</Text>
                <Text style={styles.tagline}>Votre espace spirituel</Text>
              </View>
              <LanguageSelector />
            </View>

            <View style={styles.heroImageContent}>
              <View style={styles.glassCard}>
                <Text style={styles.heroImageTitle}>
                  Méditation quotidienne
                </Text>
                <Text style={styles.heroImageSubtitle}>
                  Trouvez la paix intérieure chaque jour
                </Text>

                <View style={styles.heroDateContainer}>
                  <Text style={styles.heroDate}>
                    {new Date().toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </Text>
                </View>

                <Text style={styles.heroMeditationTitle} numberOfLines={2}>
                  {meditationDuJour.title}
                </Text>

                {meditationDuJour.verse && (
                  <>
                    <Text style={styles.heroVerse} numberOfLines={3}>
                      "{meditationDuJour.verse.replace(/^_+/, "").trim()}"
                    </Text>
                    {meditationDuJour.reference && (
                      <Text style={styles.heroReference}>
                        — {meditationDuJour.reference}
                      </Text>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        }
      >
        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionsHeader}>
            <Text style={styles.actionsTitle}>Actions rapides</Text>
            <View style={styles.actionsSubtitle}>
              <Ionicons name="flash" size={16} color="#64748b" />
              <Text style={styles.actionsSubtitleText}>Accès direct</Text>
            </View>
          </View>

          <View style={styles.actionsGrid}>
            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                styles.archivesCard,
                {
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
              onPress={() => router.push("./archives")}
            >
              <View style={styles.actionIconContainer}>
                <View style={[styles.actionIcon, styles.archivesIcon]}>
                  <Ionicons name="library" size={26} color="#fff" />
                </View>
              </View>
              <Text style={styles.actionTitle}>Archives</Text>
              <Text style={styles.actionSubtitle}>Bibliothèque</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                styles.prayerCard,
                {
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
              onPress={() => router.push("./prayer")}
            >
              <View style={styles.actionIconContainer}>
                <View style={[styles.actionIcon, styles.prayerIcon]}>
                  <Ionicons name="heart" size={26} color="#fff" />
                </View>
              </View>
              <Text style={styles.actionTitle}>Requêtes</Text>
              <Text style={styles.actionSubtitle}>Prière</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                styles.calendarCard,
                {
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
              onPress={() => router.push("./meditation/choose-day")}
            >
              <View style={styles.actionIconContainer}>
                <View style={[styles.actionIcon, styles.calendarIcon]}>
                  <Ionicons name="calendar" size={26} color="#fff" />
                </View>
              </View>
              <Text style={styles.actionTitle}>Calendrier</Text>
              <Text style={styles.actionSubtitle}>Choisir</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                styles.profileCard,
                {
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
              onPress={() => router.push("./profile")}
            >
              <View style={styles.actionIconContainer}>
                <View style={[styles.actionIcon, styles.profileIcon]}>
                  <Ionicons name="person" size={26} color="#fff" />
                </View>
              </View>
              <Text style={styles.actionTitle}>Profil</Text>
              <Text style={styles.actionSubtitle}>Paramètres</Text>
            </Pressable>
          </View>
        </View>

        {/* Inspiration Card */}
        <View style={styles.inspirationCard}>
          <View style={styles.inspirationHeader}>
            <View style={styles.inspirationIconContainer}>
              <Ionicons name="sparkles" size={24} color="#fff" />
            </View>
            <View style={styles.inspirationTitleContainer}>
              <Text style={styles.inspirationTitle}>Inspiration du jour</Text>
              <Text style={styles.inspirationSubtitle}>
                Sagesse quotidienne
              </Text>
            </View>
          </View>
          <View style={styles.inspirationQuoteContainer}>
            <Text style={styles.inspirationText}>
              "La méditation est un voyage vers l'intérieur, un retour à la
              source de votre être."
            </Text>
            <View style={styles.inspirationAuthor}>
              <Text style={styles.inspirationAuthorText}>
                — Sagesse ancienne
              </Text>
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}

// ...styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 60,
    zIndex: 10,
  },
  headerContent: {
    flex: 1,
  },
  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  heroImageContainer: {
    flex: 1,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  heroImageContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 24,
    minHeight: 200,
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 20,
    backdropFilter: "blur(20px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
  },
  heroImageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
  },
  heroImageSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
    marginBottom: 16,
  },
  heroDateContainer: {
    marginBottom: 12,
  },
  heroDate: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  heroMeditationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    lineHeight: 24,
  },
  heroVerse: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 20,
    fontStyle: "italic",
    marginBottom: 8,
  },
  heroReference: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
    textAlign: "right",
  },
  meditationCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
  },
  meditationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  meditationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  meditationBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  meditationTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  meditationTimeText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  meditationTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 28,
    marginBottom: 16,
  },
  meditationVerse: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
    marginBottom: 24,
  },
  meditationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  meditationDate: {
    flex: 1,
  },
  meditationDateText: {
    fontSize: 14,
    color: "#71717a",
    fontWeight: "500",
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  actionsTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
  },
  actionsSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionsSubtitleText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 28,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  archivesCard: {
    backgroundColor: "rgba(102, 126, 234, 0.05)",
    borderColor: "rgba(102, 126, 234, 0.1)",
  },
  prayerCard: {
    backgroundColor: "rgba(240, 147, 251, 0.05)",
    borderColor: "rgba(240, 147, 251, 0.1)",
  },
  calendarCard: {
    backgroundColor: "rgba(79, 172, 254, 0.05)",
    borderColor: "rgba(79, 172, 254, 0.1)",
  },
  profileCard: {
    backgroundColor: "rgba(67, 233, 123, 0.05)",
    borderColor: "rgba(67, 233, 123, 0.1)",
  },
  actionIconContainer: {
    marginBottom: 14,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
  },
  archivesIcon: {
    backgroundColor: "#667eea",
  },
  prayerIcon: {
    backgroundColor: "#f093fb",
  },
  calendarIcon: {
    backgroundColor: "#4facfe",
  },
  profileIcon: {
    backgroundColor: "#43e97b",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 0,
    fontWeight: "500",
  },
  inspirationCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(20px)",
  },
  inspirationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  inspirationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f59e0b",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f59e0b",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  inspirationTitleContainer: {
    flex: 1,
  },
  inspirationTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 2,
  },
  inspirationSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  inspirationQuoteContainer: {
    backgroundColor: "rgba(245, 158, 11, 0.05)",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  inspirationText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    fontStyle: "italic",
    marginBottom: 12,
  },
  inspirationAuthor: {
    alignItems: "flex-end",
  },
  inspirationAuthorText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
});
