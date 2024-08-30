import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

interface GlowButtonProps {
  onPress: () => void;
  buttonText: string;
}

const GlowButton: React.FC<GlowButtonProps> = ({ onPress, buttonText }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onPress();

    // Reset animation state after some time
    setTimeout(() => setIsPressed(false), 500);
  };

  return (
    <MotiView
      from={{
        shadowOpacity: 0,
      }}
      animate={{
        shadowOpacity: isPressed ? 0.8 : 0,
      }}
      transition={{
        type: 'timing',
        duration: 300,
      }}
      style={styles.glow}
    >
      <TouchableOpacity
        style={styles.buyButton}
        onPress={handlePress}
      >
        <Text style={styles.buyButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default GlowButton;

const styles = StyleSheet.create({
  glow: {
    shadowColor: 'black', // Gold-like color for the glow
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  buyButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    // width: 200, // Adjust the width as needed

   
  },
  buyButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
