import React from 'react';
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { Link } from 'expo-router';

type CustomLinkProps = {
  url: string;
  title: string;
  style?: StyleProp<ViewStyle | TextStyle>; // Style prop for flexibility
  replace?: boolean;
  asChild?: boolean;
};

export const CustomLink: React.FC<CustomLinkProps> = ({ url, title, style, replace, asChild }) => {
  if (asChild) {
    return (
      <Link href={url as never} replace={replace}>
        <Text style={style}>{title}</Text>
      </Link>
    );
  }

  return (
    <Link href={url as never} replace={replace} asChild>
      <Pressable>
        <Text style={style}>{title}</Text>
      </Pressable>
    </Link>
  );
};

export default CustomLink;