import Auth from '@/components/auth/login'
import { supabase } from '@/lib/supabase'
import { UserMetadata } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { styles } from '../../components/profile/_styleSheet'



export default function Profile() {
	const [profile, setProfile] = useState<null | UserMetadata>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | string>(null)
	const router = useRouter();

	useEffect(() => {
		async function fetchProfile() {
			setLoading(true)
			setError(null)
			const {
				data: { user },
				error: userError
			} = await supabase.auth.getUser()
			if (userError || !user) {
				setError("User not found")
				setLoading(false)
				return
			}
			// Merge user_metadata and user core fields
			setProfile({
				name: user.user_metadata?.name,
				email: user.email,
				phone: user.user_metadata?.phone,
				church: user.user_metadata?.church,
				id: user.id,
				created_at: user.created_at,
			})
			setLoading(false)
		}
		fetchProfile()
	}, [])

		if (loading) {
			return (
				<View style={styles.centered}><ActivityIndicator size="large" /></View>
			)
		}
		if (error) {
			return <Auth />
		}
		return (
			<View style={styles.pageContainer}>
				{/* Cover Image */}
				<Image
					source={require('@/assets/images/bg.jpeg')}
					style={styles.coverImage}
				/>
				{/* Avatar and Name */}
				<View style={styles.avatarContainer}>
					<Image
						source={require('@/assets/images/icon.png')}
						style={styles.avatar}
					/>
					<Text style={styles.name}>{profile?.name || 'N/A'}</Text>
					<Text style={styles.church}>{profile?.church || ''}</Text>
				</View>
				{/* Info Card */}
				<View style={styles.infoCard}>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Email</Text>
						<Text style={styles.value}>{profile?.email || 'N/A'}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Téléphone</Text>
						<Text style={styles.value}>{profile?.phone || 'N/A'}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Rôle</Text>
						<Text style={styles.value}>{profile?.role ? profile.role : 'user'}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Identifiant</Text>
						<Text style={styles.value}>{profile?.id || 'N/A'}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Date de création</Text>
						<Text style={styles.value}>{profile?.created_at ? new Date(profile?.created_at).toLocaleString('fr-FR') : 'N/A'}</Text>
					</View>
				</View>
				{/* Logout Button */}
				<View style={styles.logoutContainer}>
					<Text style={styles.logoutLabel}>Déconnexion</Text>
					<Text style={styles.logoutDesc}>Se déconnecter de votre compte</Text>
					<View style={styles.logoutButtonWrapper}>
						<Text style={styles.logoutButton} onPress={async () => {
							await supabase.auth.signOut();
							setProfile(null);
							setError('User not found');
							router.push('/')
						}}>Logout</Text>
					</View>
				</View>
			</View>
		)
}

