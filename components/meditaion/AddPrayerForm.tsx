import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

interface Props {
  onAddPrayer: (text: string) => void;
}

export default function AddPrayerForm({ onAddPrayer }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text) return Alert.alert("Validation", "Prayer cannot be empty");
    onAddPrayer(text);
    setText("");
  };

  return (
    <View style={styles.form}>
      <TextInput placeholder="New Prayer Request" value={text} onChangeText={setText} style={styles.input} />
      <Button title="Add Prayer" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginVertical: 16 },
  input: { backgroundColor: "#fff", padding: 10, marginBottom: 8, borderRadius: 6 },
});
