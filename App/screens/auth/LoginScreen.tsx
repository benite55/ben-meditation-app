import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../../lib/supabase'
import { Button, Input } from '@rneui/themed'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#007bff' }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          labelStyle={styles.label}
        />
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#007bff' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          labelStyle={styles.label}
        />
        <Button
          title="Sign in"
          disabled={loading}
          onPress={signInWithEmail}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
  },
  formCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#222',
  },
  label: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})