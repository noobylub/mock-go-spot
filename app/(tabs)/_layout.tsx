import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable } from 'react-native';
import { useLogto } from '@logto/rn';
import * as SplashScreen from 'expo-splash-screen';
import {  Text, StyleSheet } from 'react-native';

import { useEffect } from 'react';

import { useFonts } from 'expo-font';


export default function TabLayout() {

  const { signIn, isAuthenticated, fetchUserInfo } = useLogto();
  const [loaded, error] = useFonts({
    'PlaywriteHR-Regular': require('../../assets/PlaywriteHR-VariableFont_wght.ttf'),
  });






  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }
  else {

    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          headerShown: false,
          
        }
      
      }
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: () => <CustomHeaderTitle />,
            title: 'Swipe',
            headerRight: () => (
              <Link href="/modals/preference" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color="red"
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="swiped"
          options={{
            title: 'Welcome to settings',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    );
  }
}

const CustomHeaderTitle = () => {
  return <Text style={styles.headerTitle}>Swipe on places you like</Text>;
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4FD0E9',
    textAlign: 'center',

    textShadowRadius: 10,
    fontFamily: 'PlaywriteHR-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'PlaywriteHR-Regular',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'PlaywriteHR-Regular',
  },
});
