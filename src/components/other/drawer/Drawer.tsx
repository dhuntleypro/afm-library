// Drawer.js
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const drawerTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.75, 0],
  });

  return (
    <>
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      {isOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
      )}

      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
        <Text style={styles.drawerItem}>Home</Text>
        <Text style={styles.drawerItem}>Profile</Text>
        <Text style={styles.drawerItem}>Settings</Text>
        <Text style={styles.drawerItem}>Logout</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  menuButtonText: {
    fontSize: 30,
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.75,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 10,
  },
  drawerItem: {
    fontSize: 20,
    paddingVertical: 15,
  },
});

export default Drawer;
