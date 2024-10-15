import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Head from 'expo-router/head';

type SEOHeaderProps = {
  title: string;
  content: string;
};

// Apply to every page
const SEOHeader: React.FC<SEOHeaderProps> = ({ title, content }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Head>
  );
};

export default SEOHeader;

const styles = StyleSheet.create({});