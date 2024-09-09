import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AWS_HOLDER_IMAGE } from '@/utils/api';
import Divider from '@/components/divider/Divider';
import { useTheme } from '@/contexts/ThemeContext';

const PromoBannerCard = () => {
  const isDecider = true; // Assuming the condition is met. Replace with actual condition logic.
  const { colors } = useTheme(); // Directly access colors from the theme

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  colors.cardBackground,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  arrowIcon: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: colors.buttonBackground,
    padding: 15,
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color:  colors.buttonText, // '#fff',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 20,
  },
  footerStats: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusIcons}>
          {/* Add status icons here */}
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Making —</Text>
        <Text style={styles.title}>Days ` Better *</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Creating Economic - For Everyone.</Text>
          {isDecider && (
            <Ionicons name="arrow-forward" size={24} color="#000" style={styles.arrowIcon} />
          )}
        </View>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
        
        <Image 
          source={{ uri: AWS_HOLDER_IMAGE }}
          style={styles.image}
        />
      </View>
     
      <View style={styles.footer}>
        <Text style={styles.footerText}>Active From 2018</Text>
        <Divider />
        <Text style={styles.footerStats}>1.2B</Text>
      </View>
    </View>
  );
}


export default PromoBannerCard;
