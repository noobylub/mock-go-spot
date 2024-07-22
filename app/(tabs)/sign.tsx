import React, { useEffect, useState } from 'react';
import { useLogto } from '@logto/rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';



const Content = () => {
  const { signIn, signOut, isAuthenticated, fetchUserInfo } = useLogto();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUserData();
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo()
        .then((claims) => {
          setUser(claims);
          return claims;
        })
        .then((claims) => {
          AsyncStorage.setItem('user', JSON.stringify(claims));
        });
    }
  }, [isAuthenticated]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('io.logto://callback');
      const data = await fetchUserInfo();
      setUser(data);
      await AsyncStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : isAuthenticated ? (
        <>
          <Text style={styles.text}>User ID: {user?.sub}</Text>
          <Text style={styles.text}>Email: {user?.email}</Text>
          <Button title="Sign out" onPress={handleSignOut} />
        </>
      ) : (
        <Button title="Sign in" onPress={handleSignIn} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Content;
