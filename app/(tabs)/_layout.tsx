import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "OCR撮影",
          tabBarIcon: ( {size, color} ) => (
            <Ionicons name="camera" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="import"
        options={{ 
          title: "OCR読み込み",
          tabBarIcon: ( {size, color} ) => (
            <Ionicons name="document-text" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: "データ",
          tabBarIcon: ( {size, color} ) => (
            <Ionicons name="list" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="aiChat"
        options={{
          title: "AIチャット",
          tabBarIcon: ( {size, color} ) => (
            <Ionicons name="chatbubble-ellipses" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
