import AdminTabs from '@/components/admin/AdminTabs'
import Auth from '@/components/auth/login'
import { useSupabaseAuth } from '@/hooks/requests/useAuth'
import { Ionicons } from '@expo/vector-icons'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RootTabParamList } from '../_layout'

type Props = BottomTabScreenProps<RootTabParamList, 'Profil'>

export default function Profile({ route }: Props) {
  const { userInfo, isAuthenticated, loading, logOut } = useSupabaseAuth()
  const isSignUp = route.params.isSignUp
  const router = useRouter()

  // 🌗 Dark/Light mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false)

  const themedStyles = styles(isDarkMode)

  if (loading) {
    return (
      <View style={themedStyles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isAuthenticated) {
    return <Auth isSignUpProp={isSignUp} />
  }

  return (
    <View style={themedStyles.pageContainer}>
      {/* 🔹 Top Bar FIXE */}
      <View
        style={[
          themedStyles.topBar,
          { backgroundColor: isDarkMode ? '#1c1c1c' : '#f6f8fa' },
        ]}
      >
		        {/* Title in the center */}
        <Text
          style={[
            themedStyles.devotionsTitle,
            { color: isDarkMode ? '#fff' : '#1d2052' },
          ]}
        >
          Profile
        </Text>
        {/* Dark/Light mode button (top left) */}
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
      </View>

      {/* 🔹 Content scrollable */}
      <ScrollView style={themedStyles.scrollContent}>
        {/* Cover Image */}
        <Image
          source={require('@/assets/images/bg.jpeg')}
          style={themedStyles.coverImage}
        />

        {/* Avatar and Name */}
        <View style={themedStyles.avatarContainer}>
          <Image
            source={{
              uri:
                userInfo?.user_metadata?.avatar ||
                'https://via.placeholder.com/100',
            }}
            style={themedStyles.avatar}
          />
          <Text style={themedStyles.name}>
            {userInfo?.user_metadata?.name || 'N/A'}
          </Text>
        </View>

        {/* Info Card */}
        <View style={themedStyles.infoCard}>
          <View style={themedStyles.infoRow}>
            <Text style={themedStyles.label}>Email address</Text>
            <Text style={themedStyles.value}>{userInfo?.email || 'N/A'}</Text>
          </View>
          <View style={themedStyles.infoRow}>
            <Text style={themedStyles.label}>Phone Number</Text>
            <Text style={themedStyles.value}>
              {userInfo.user_metadata?.phone || 'N/A'}
            </Text>
          </View>
          <View style={themedStyles.infoRow}>
            <Text style={themedStyles.label}>Church</Text>
            <Text style={themedStyles.value}>
              {userInfo.user_metadata?.church || 'N/A'}
            </Text>
          </View>
          <View style={themedStyles.infoRow}>
            <Text style={themedStyles.label}>Role</Text>
            <Text style={themedStyles.value}>
              {userInfo.user_metadata?.role
                ? userInfo.user_metadata?.role
                : 'user'}
            </Text>
          </View>

          <View style={themedStyles.infoRow}>
            <Text style={themedStyles.label}>Creation date</Text>
            <Text style={themedStyles.value}>
              {userInfo?.created_at
                ? new Date(userInfo?.created_at).toLocaleString('fr-FR')
                : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={themedStyles.logoutContainer}>
          <Text style={themedStyles.logoutDesc}>Log out of your account</Text>
          <View style={themedStyles.logoutButtonWrapper}>
            <Text
              style={themedStyles.logoutButton}
              onPress={async () => {
                logOut()
                router.push('/')
              }}
            >
              Logout
            </Text>
          </View>
        </View>

        <AdminTabs
          userId={userInfo?.id}
          role={userInfo?.user_metadata?.role || 'user'}
        />
      </ScrollView>
    </View>
  )
}

// Styles that adapt to dark / light
const styles = (isDark: boolean) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#f9f9f9',
    },
    scrollContent: {
      flex: 1,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    devotionsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    coverImage: {
      width: '100%',
      height: 150,
    },
    avatarContainer: {
      alignItems: 'center',
      marginTop: -50,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
	  backgroundColor: isDark ? '#333' : '#e0e0e0',
      borderColor: isDark ? '#fff' : '#6a6a6aff',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
      marginTop: 8,
    },
    infoCard: {
      margin: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 6,
    },
    label: {
      fontWeight: '600',
      color: isDark ? '#aaa' : '#444',
    },
    value: {
      color: isDark ? '#fff' : '#000',
    },
    logoutContainer: {
      margin: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
    },
    logoutDesc: {
      marginBottom: 8,
      color: isDark ? '#aaa' : '#444',
	  textAlign:"center"
    },
    logoutButtonWrapper: {
      alignItems: 'center',
    },
    logoutButton: {
      padding: 10,
      backgroundColor: isDark ? '#c63b3bff' : '#c63b3bff',
      color: '#fff',
      borderRadius: 8,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '50%',
    },
  })
