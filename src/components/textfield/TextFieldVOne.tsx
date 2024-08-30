import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TextFieldVOneProps {
  label: string;
  value: string;
  secureTextEntry?: boolean;
  editable?: boolean;
}

const TextFieldVOne: React.FC<TextFieldVOneProps> = ({
  label,
  value,
  secureTextEntry = false,
  editable = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };


const styles = StyleSheet.create({
    content: {
      // padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      width: '80%', // Restricting the TextInput to 80% of the container's width
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
      backgroundColor: editable ? '#fff' : '#f5f5f5',
    },
    iconContainer: {
      paddingLeft: 10, // Adding space between the TextInput and the icon
    },
  });
  return (
    <View style={styles.content}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={isPasswordVisible ? value : '*********'}
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          editable={editable}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextFieldVOne;

