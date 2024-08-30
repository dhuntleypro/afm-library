import { TextStyle, ViewStyle } from "react-native";

export interface MyButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
  }