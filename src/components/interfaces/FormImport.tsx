import React, { FC } from "react";
import { Text, TextInput, TextInputProps, StyleSheet, View } from "react-native";

export interface FormInputProps {
    label: string;
    value: any;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: TextInputProps['keyboardType'];
    multiline?: boolean;
}

export const FormInput: FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Ensures the text starts at the top of the input
  },
});
