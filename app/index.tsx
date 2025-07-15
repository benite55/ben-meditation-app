import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import { getTodayMeditation } from '././meditation/today';


export default function HomeScreen() {
  const router = useRouter();
  const meditationDuJour = getTodayMeditation();

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
        <View style={styles.content}>
          {/* Top Bar */}
      <View style={styles.topBar}>
        <LanguageSelector />
        <Text style={styles.devotionsTitle}>Dev-M</Text>
      </View>

      {/* Center Message */}
      <View style={styles.welcomeBox}>
        <Image source={require('../assets/images/bg.jpeg')} style={styles.image} />
        <Text style={styles.welcomeText}>Bienvenue dans la dévotion matinale</Text>
        <Text style={styles.text}>Vous esperans bien portant,voici la meditation d'aujourd'hui</Text>

      </View>

      {/* Date + Button */}
      <Text style={styles.date}>{today}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (meditationDuJour) {
            router.push(`./meditation/${meditationDuJour.id}`);
          } else {
            alert("Aucune méditation disponible pour aujourd'hui.");
          }
        }}
      >
        <Text style={styles.buttonText}>Méditer</Text>
      </TouchableOpacity>
  </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fffbe6', 
  },
  content: {
  flex: 1,
  paddingTop: 20, 
  padding: 20, 

},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  devotionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d2052',
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
    color: '#1d2052',
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text:{
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
   textAlign: 'center',
  },
  date: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#1d2052',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
