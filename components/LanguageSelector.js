import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageSelector() {
  const [language, setLanguage] = useState('fr');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setLanguage('fr')}>
        <Text style={[styles.lang, language === 'fr' && styles.selected]}>FR</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>|</Text>
      <TouchableOpacity onPress={() => setLanguage('en')}>
        <Text style={[styles.lang, language === 'en' && styles.selected]}>EN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  lang: { fontSize: 16, color: '#1d2052', marginHorizontal: 4 },
  selected: { fontWeight: 'bold', textDecorationLine: 'underline' },
  separator: { fontSize: 16, color: '#1d2052' },
});
