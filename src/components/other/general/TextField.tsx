import React, { FC, useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface TextFieldProps extends TextInputProps {
  initialText: string;
  onTextChange: (text: string) => void;
}

const TextField: FC<TextFieldProps> = ({ initialText = '', onTextChange, ...textInputProps }) => {
  const [text, setText] = useState(initialText);

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={text}
        placeholder="Enter text here..."
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        paddingHorizontal: 10,
        borderRadius: 8,
        fontFamily: 'System',
        fontSize: 16,
        backgroundColor: '#f9f9f9',
      },

    //   container: {
    //     borderBottomWidth: 3,
    //     borderColor: '#000',
    //     marginBottom: 10,
    //   },
    //   input: {
    //     width: '100%',
    //     height: 40,
    //     paddingHorizontal: 10,
    //     fontSize: 16,
    //   }, 
});

export default TextField;
