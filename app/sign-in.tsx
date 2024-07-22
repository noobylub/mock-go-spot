import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import { useLogto } from '@logto/rn';
import { useRouter, Redirect } from 'expo-router';
const SignInScreen = () => {
  const { signIn, isAuthenticated, fetchUserInfo } = useLogto();
  const [loading, setLoading] = useState(false);
    const router = useRouter();
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('io.logto://callback');
      await fetchUserInfo();
        router.push('/(tabs)')
    } catch (error) {
      console.error('Sign-in error:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if(isAuthenticated){
    return <Redirect href="/sign-in" />;
  }
  else{
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <Button title="Sign In with Logto" onPress={handleSignIn} />
        </View>
      );
  }
  

  
};

const styles = StyleSheet.create({
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
  },
});

export default SignInScreen;
