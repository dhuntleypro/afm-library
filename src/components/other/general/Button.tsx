import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  textColor: string
  bgColor: string; // New color prop
  
}

const Button: FC<ButtonProps> = ({ title, onPress, buttonStyle, textStyle, bgColor, textColor }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle, { backgroundColor: bgColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle, {color: textColor}] }>{title}</Text>
    </TouchableOpacity>
  ); 
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', // Default color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
