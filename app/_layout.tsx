import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function RootLayout() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <MenuProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: true,
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>AI-OCR SCANNER</Text>
                <Ionicons name="scan" size={24} color="#fff" />
              </View>
            ),
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
            headerRight: () => (
              <Menu>
                <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerWrapper: styles.controlButton, }}>
                  <Ionicons name="person-circle-outline" size={36} color="white" />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.optionsContainer}>
                  <MenuOption onSelect={() => alert("ログアウトしました")}>
                    <Text>ログアウト</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => alert("アップグレードしました")}>
                    <Text>アップグレード</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            ),
          }} />
        </Stack>
        <StatusBar style="auto" />
      </MenuProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#fff',
  },
  controlButton: {
    alignSelf: 'flex-end',
    marginRight: Platform.OS === 'web' ? 24 : 0,
  },
  optionsContainer: {
    marginTop: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 136,
  },
});
