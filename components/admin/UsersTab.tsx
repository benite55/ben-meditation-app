import { useDeleteUser, useGetUsers, useInviteUser, useUpdateUser } from "@/hooks/requests/useUsers";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { mainStyleSheet as styles } from "./style";

export default function UsersTab() {
  const { users, loading, error } = useGetUsers();
  const { inviteUser } = useInviteUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState<string>("");
  const [errorMsg , setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Filter users by search
  const filteredUsers = users?.filter(
    (u) =>
      (u.user_metadata?.name || u.email || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Update handler
  const handleUpdate = async (userId: string) => {
    setActionLoading(userId);
    setUpdateMsg("");
    const { error } = await updateUser(userId, { role: "Admin" });
    if (error) setErrorMsg("Update failed: " + error.message);
    else setUpdateMsg("User updated!");
    setActionLoading(null);
  };

  // Delete handler
  const handleDelete = async (userId: string) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setActionLoading(userId);
            const { error } = await deleteUser(userId);
            if (error) setUpdateMsg("Delete failed: " + error.message);
            else setUpdateMsg("User deleted!");
            setActionLoading(null);
          },
        },
      ]
    );
  };

  return (
    <View>
      <Text style={styles.section}>Users</Text>
      {/* Search Input */}
      <View style={{ marginBottom: 12, flexDirection: "row", alignItems: "center", paddingHorizontal: 8 }}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search users..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            backgroundColor: "#f6f8fa",
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            color: "#222",
          }}
        />
      </View>
      <View style={styles.feed}>
        {error && (
          <Text style={{ color: "#e74c3c", textAlign: "center", marginTop: 20 }}>
            Error loading users: {error.message}
          </Text>
        )}
        {updateMsg ? (
          <Text style={{ color: "#1DB954", textAlign: "center", marginBottom: 10 }}>{updateMsg}</Text>
        ) : null}

        {errorMsg ? (
          <Text style={{ color: "#e74c3c", textAlign: "center", marginBottom: 10 }}>{errorMsg}</Text>
        ) : null}

        {loading ? <ActivityIndicator />:
            filteredUsers?.map((u) => (
          <View key={u.id} style={styles.card}>
            <Text style={{ fontWeight: "bold" }}>
              Names: {u.name || "No Name"}
            </Text>
            <Text>Email: {u.email}</Text>
            <Text>Role: {u.user_metadata?.role || "N/A"}</Text>
            <Text>Phone Number: {u.phone || "N/A"}</Text>
            <Text>Created At: {new Date(u.created_at).toLocaleDateString()}</Text>
            <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#1DB954",
                  borderRadius: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  marginRight: 10,
                }}
                onPress={() => handleUpdate(u.id)}
                disabled={actionLoading === u.id}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Make Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#e74c3c",
                  borderRadius: 20,
                  padding: 6,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleDelete(u.id)}
                disabled={actionLoading === u.id}
              >
                <Ionicons name="trash" size={20} color="#fff" />
              </TouchableOpacity>
              {actionLoading === u.id && <ActivityIndicator style={{ marginLeft: 10 }} />}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
