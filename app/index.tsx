import MeditationDetailModal from '@/components/admin/MeditationDetailModal';
import { useSupabaseAuth } from '@/hooks/requests/useAuth';
import { useGetMeditations } from '@/hooks/requests/useMeditations';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { meditations, loading } = useGetMeditations();
  const { isAuthenticated } = useSupabaseAuth();
  const [showMeditation, setShowMeditation] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // 🌗 Dark/Light theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  const now = new Date();
  const today4am = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    4
  );
  const meditationDuJour = (meditations || []).find((m) => {
    const showDate = new Date(m.date);
    return (
      showDate.getFullYear() === today4am.getFullYear() &&
      showDate.getMonth() === today4am.getMonth() &&
      showDate.getDate() === today4am.getDate()
    );
  });

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1c1c1c' : '#f6f8fa' },
      ]}
    >
      {/* 🔹 Top Bar FIXE */}
      <View
        style={[
          styles.topBar,
          { backgroundColor: isDarkMode ? '#1c1c1c' : '#f6f8fa' },
        ]}
      >
                <Text
          style={[
            styles.devotionsTitle,
            { color: isDarkMode ? '#fff' : '#1d2052' },
          ]}
        >
          M-Dev
        </Text>
        {/* Dark/Light mode button à gauche */}
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={22}
            color={isDarkMode ? '#FFD700' : '#1d2052'}
          />
          <Text
            style={{
              marginLeft: 5,
              color: isDarkMode ? '#FFD700' : '#1d2052',
              fontWeight: '600',
            }}
          >
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>

        {/* Title à droite */}

      </View>

      {/* 🔹 Content scrollable */}
      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>
          {/* Center Message */}
          <View style={styles.welcomeBox}>
            <Image
              source={require('../assets/images/bg.jpeg')}
              style={styles.image}
            />
            <Text
              style={[
                styles.welcomeText,
                { color: isDarkMode ? '#fff' : '#1d2052' },
              ]}
            >
              Welcome To Our Morning Devotion Session
            </Text>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? '#ddd' : 'rgba(0, 0, 0, 0.61)' },
              ]}
            >
              Every day counts{"\n"}Through the Holy Spirit, God transforms us
              from glory to glory in His image. Yes, it is the small daily
              efforts that build our transformation.{"\n"} Yes, God
              speaks, sometimes one way, sometimes another, if we pay attention.
              Let yourself be shaped, strengthened, and lifted up day by day.{"\n"}
            </Text>
            <Text
              style={[
                styles.textVrst,
                { color: isDarkMode ? '#FFD700' : '#1d2052' },
              ]}
            >
              2 Corinthians 3:18
            </Text>

            {/* Date */}
            <Text
              style={[
                styles.date,
                { color: isDarkMode ? '#fff' : '#130202ff' },
              ]}
            >
              {today}
            </Text>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? '#ddd' : 'rgba(0, 0, 0, 0.61)' },
              ]}
            >
              We hope you are well, {"\n"}here is today&apos;s meditation.
            </Text>
          </View>

          {/* Today Meditation Button */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#1d2052"
              style={{ marginTop: 20 }}
            />
          ) : meditationDuJour ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowMeditation(true)}
            >
              <Text style={styles.buttonText}>View today&apos;s meditation</Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                color: isDarkMode ? '#aaa' : '#555',
              }}
            >
              No meditation available for today
            </Text>
          )}

          {/* Archives Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#555', marginTop: 10 }]}
            onPress={() => navigation.navigate('Archives')}
          >
            <Text style={styles.buttonText}>View archives</Text>
          </TouchableOpacity>

          {/* Signup Button */}
          {!isAuthenticated && (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: '#34D399', marginTop: 10 },
              ]}
              onPress={() => navigation.navigate('Profil', { isSignUp: true })}
            >
              <Text style={styles.buttonText}>Creat a account</Text>
            </TouchableOpacity>
          )}

          {/* About */}
          <Text
            style={[styles.title, { color: isDarkMode ? '#fff' : '#1d2052' }]}
          >
            About M-Dev
          </Text>

          <Text
            style={[styles.paragraph, { color: isDarkMode ? '#ddd' : '#333' }]}
          >
            M-Dev was created to help you begin each day with God, through a
            short meditation, a Bible verse, and a moment of reflection.
          </Text>

          <Text
            style={[styles.paragraph, { color: isDarkMode ? '#ddd' : '#333' }]}
          >
            Our vision is to provide a daily source of encouragement and
            spiritual growth, reminding you that every day counts and that God
            speaks in many ways if we take time to listen...
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#1d2052', marginTop: 20 }]}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.buttonText}>View more</Text>
          </TouchableOpacity>

          {/* Meditation Detail Modal */}
          <MeditationDetailModal
            meditation={meditationDuJour || null}
            visible={showMeditation}
            onClose={() => setShowMeditation(false)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// ...styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e1e1ff',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  devotionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeBox: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  textVrst: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#1d2052',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 70,
    marginBottom: 10,
  },
  buttonText: {
    textAlign:'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
});
