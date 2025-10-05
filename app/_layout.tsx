import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AboutScreen from './about';
import AccueilScreen from './index';
import ArchivesScreen from './meditations';
import PrayerScreen from './prayer';
import ProfileScreen from './profile/index';

const Tab = createBottomTabNavigator();

export type RootTabParamList = {
  Accueil: undefined;
  Meditations: undefined;
  Request: undefined;
  'About': undefined;
  Profil: { isSignUp?: boolean };
};


export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1d2052",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          paddingVertical: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={AccueilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Archives"
        component={ArchivesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={PrayerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />



    <Tab.Screen
      name="Profil"
      component={ProfileScreen}
      initialParams={{ isSignUp: false }} // optional param
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle-outline" size={size} color={color} />
        ),
      }}
    />

    </Tab.Navigator>
  );
}
