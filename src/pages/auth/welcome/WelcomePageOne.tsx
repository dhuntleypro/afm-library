import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useClientStore } from '@/contexts/ClientStoreContext';

export default function WelcomePageOne() {
  const logo = { uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/logo.png" };

  const {store} = useClientStore()
  return (
    <LinearGradient
      colors={['#FF6B6B', '#FFD93D']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={logo} // Replace with your logo path
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.title}>Welcome to {store?.store_name}</Text>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>Your gateway to a world of possibilities.</Text>
        <Text style={styles.description}>Sign in to explore amazing features tailored just for you.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  textContainer: {
    marginHorizontal: 40,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
