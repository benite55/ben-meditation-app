import { supabase } from '@/lib/supabase'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './_styleSheet'

export default function Auth({ isSignUpProp=false }: { isSignUpProp?: boolean }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(isSignUpProp)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [church, setChurch] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<any>(null)
  const [successfull, setSuccessfull] = useState<string | null>(null)

  async function signInWithEmail() {
    setLoading(true)
    setNotification(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setNotification(error.message)
    if (!error) {
      setSuccessfull('Bienvenue !')
      router.replace('/')
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    setNotification(null)
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          church,
          avatar,
          role: 'Admin'
        },
      },
    })
    if (error) setNotification(error.message)
    if (!error) {
      setSuccessfull('Inscription réussie. Bienvenue !')
      setIsSignUp(false)
    }
    setLoading(false)
  }

async function pickAvatar() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  })

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const image = result.assets[0]
    setAvatarFile(image)

    setAvatarUploading(true)

    try {
      // Extract file extension
      const ext = image.uri.split('.').pop()
      const fileName = `${Date.now()}.${ext || 'jpg'}`

      // Convert to blob
      const response = await fetch(image.uri)
      const blob = await response.blob()

      // Upload to Supabase
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(fileName, blob, {
          contentType: image.type || 'image/jpeg',
          upsert: false,
        })

      setAvatarUploading(false)

      if (uploadError) {
        console.log('Avatar upload error:', uploadError)
        setNotification('Avatar upload failed')
        return
      }

      const publicUrl = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName).data.publicUrl

      setAvatar(publicUrl)
    } catch (err) {
      console.error('Unexpected error during upload:', err)
      setNotification('Upload failed due to an unexpected error')
    } finally {
      setAvatarUploading(false)
    }
  }
}


  function handleForgotPassword() {
    setNotification('Password reset functionality not yet implemented.')
  }

  function handleGoogleLogin() {
    setNotification('Google login functionality not yet implemented')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      { isSignUp &&
      <View style={styles.avatarPickerContainer}>
            <View style={styles.avatarPreviewWrapper}>
              <Image
                source={avatar ? { uri: avatar } : require('@/assets/images/icon.png')}
                style={styles.avatarPreview}
              />
              <TouchableOpacity
                style={styles.avatarOverlay}
                onPress={pickAvatar}
                disabled={avatarUploading || loading}
                activeOpacity={0.7}
              >
                <FontAwesome name="camera" size={28} color="#fff" />
              </TouchableOpacity>
              {avatarUploading && <ActivityIndicator style={styles.avatarUploadingIndicator} />}
            </View>
            <Text style={styles.avatarHint}>{avatar ? 'Change your profile photo' : 'Upload a profile photo'}</Text>
          </View>
          }
      {notification && (
        <View style={styles.notificationBox}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}
      {successfull && (
        <View style={styles.successfullBox}>
          <Text style={styles.successfullText}>{successfull}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#000"
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#007bff" style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#000"
          autoCapitalize="none"
          secureTextEntry
          editable={!loading}
        />
      </View>
      {isSignUp && (
        <>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#007bff" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Full Name"
              placeholderTextColor="#000"
              autoCapitalize="words"
              editable={!loading}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="phone" size={20} color="#007bff" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setPhone}
              value={phone}
              placeholder="Phone Number"
              placeholderTextColor="#000"
              keyboardType="phone-pad"
              editable={!loading}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="home" size={20} color="#007bff" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setChurch}
              value={church}
              placeholder="Church"
              placeholderTextColor="#000"
              autoCapitalize="words"
              editable={!loading}
            />
          </View>
          
        </>
      )}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={{ marginVertical: 16 }} />}
      <TouchableOpacity
        style={[styles.button, isSignUp && styles.signupButton, loading && styles.buttonDisabled]}
        onPress={isSignUp ? signUpWithEmail : signInWithEmail}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{isSignUp ? 'Sign up' : 'Sign in'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007bff', fontWeight: 'bold' }}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <FontAwesome name="google" size={20} style={{ marginRight: 8 }} />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  )
}
