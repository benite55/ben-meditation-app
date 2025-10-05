import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ActivitiesTab from "./ActivitiesTab";
import MeditationTab from "./MeditationTab";
import PrayersTab from "./PrayersTab";
import { mainStyleSheet as styles } from "./style";
import UsersTab from "./UsersTab";

type Tab = "meditations" | "users" | "prayers" | "activities";

export default function AdminTabs({ userId, role }: { userId: string, role: string }) {
  const isAdmin = role === 'Admin';
  const [activeTab, setActiveTab] = useState<Tab>(isAdmin ? "meditations" : "prayers");
  const allTabs: { key: Tab; label: string; icon: any, keyRole: string}[]=  [
    { key: "meditations", label: "Meditations", icon: "book-outline", keyRole: 'Admin' },
    { key: "users", label: "Users", icon: "person-outline", keyRole: 'Admin' },
    { key: "prayers", label: "Prayer Requests", icon: "heart-outline", keyRole: 'User'},
    { key: "activities", label: "Activities", icon: "pulse-outline", keyRole: 'Admin'}
  ];

  const tabs = role === 'Admin' ? allTabs : allTabs.filter(t => t.keyRole === 'User');

  

  return (
    <View>
      {/* Tab Menu */}
      <View style={styles.tabMenu}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabItem, activeTab === t.key && styles.tabItemActive, [{flex: 1 / tabs.length}]]}
            onPress={() => setActiveTab(t.key)}
          >
            <Ionicons
              name={t.icon}
              size={18}
              color={activeTab === t.key ? "#1d2052" : "#888"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === t.key && styles.tabTextActive,
              ]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === "meditations" && <MeditationTab userId={userId} />}
      {activeTab === "users" && <UsersTab />}
      {activeTab === "prayers" && <PrayersTab userId={userId} role={role} />} 
      {activeTab === "activities" && <ActivitiesTab />}
      
    </View>
  );
}
