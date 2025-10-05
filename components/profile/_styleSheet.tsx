import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	logoutContainer: {
		marginVertical: 32,
		alignItems: 'center',
	},
	logoutLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#d32f2f',
		marginBottom: 4,
	},
	logoutDesc: {
		color: '#888',
		fontSize: 14,
		marginBottom: 12,
	},
	logoutButtonWrapper: {
		backgroundColor: '#d32f2f',
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 32,
	},
	logoutButton: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
	},
	pageContainer: {
		flex: 1,
		backgroundColor: '#f6f8fa',
	},
	coverImage: {
		width: '100%',
		height: 160,
		resizeMode: 'cover',
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	avatarContainer: {
		alignItems: 'center',
		marginTop: -50,
		marginBottom: 16,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 3,
		borderColor: '#fff',
		backgroundColor: '#e0e0e0',
		marginBottom: 8,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1d2052',
		marginBottom: 2,
		textAlign: 'center',
	},
	church: {
		fontSize: 16,
		color: '#007bff',
		marginBottom: 8,
		textAlign: 'center',
	},
	infoCard: {
		backgroundColor: '#fff',
		borderRadius: 16,
		marginHorizontal: 24,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 2,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	label: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#1d2052',
	},
	value: {
		fontSize: 16,
		color: '#555',
		maxWidth: '60%',
		textAlign: 'right',
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f6f8fa',
	},
	errorText: {
		color: '#d32f2f',
		fontSize: 16,
		textAlign: 'center',
	},
})