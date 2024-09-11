import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native'; // Assuming this is from react-navigation

export const BannerVOne = () => {
  const { colors } = useTheme(); // Directly access colors from the theme

  useEffect(() => {
    console.log('Current Theme Colors:', colors); // Debugging theme colors
  }, [colors]);

  const styles = createStyles(colors); // Pass colors directly to the styles function

  return (
    <View style={styles.container}>
      <View style={styles.bannerSection}>
        <Text style={styles.bannerTitle}>Customize Your Experience</Text>
        <Text style={styles.bannerSubtitle}>
          Manage your preferences, update account settings, and explore options to tailor your experience to your needs, even things like dark mode.
        </Text>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => router.push('/appearance' as never)}
        >
          <Text style={styles.editPreferences}>Dark Mode</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.primary} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => {
  return StyleSheet.create({
    container: {
      padding: 20, // Ensure padding to prevent overlapping issues
    },
    bannerSection: {
      backgroundColor: colors.background,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
    },
    bannerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.title,
      marginBottom: 10,
    },
    bannerSubtitle: {
      fontSize: 14,
      color: colors.subtitle || colors.title, // Use subtitle if available, otherwise fallback to text color
      marginBottom: 20,
    },
    editPreferences: {
      fontSize: 14,
      color: colors.title,
      fontWeight: 'bold',
    },
    arrow: {
      marginLeft: 10,
      marginTop: 3,
    },
  });
};

export default BannerVOne;
















// import React, { useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useTheme } from '@/contexts/ThemeContext'; // Import your custom ThemeProvider

// export const BannerVOne = () => {
//   const { isDarkMode, themeValue } = useTheme(); // Access the current theme context

//   // Ensure that themeValue is correctly passed and contains the necessary values
//   useEffect(() => {
//     console.log('themeValue:', themeValue); // Log theme values for debugging
//     console.log('isDarkMode:', isDarkMode); // Log dark mode state for debugging
//   }, [themeValue, isDarkMode]);

//   //// If the theme is not ready, show a fallback message
//   // if (!themeValue || !themeValue.dark || !themeValue.light) {
//   //   return (
//   //     <View style={{ padding: 20 }}>
//   //       <Text>Loading theme...</Text>
//   //     </View>
//   //   );
//   // }

//   const styles = createStyles(isDarkMode, themeValue); // Pass theme data to the styles function

//   return (
//     <View style={styles.container}>
//       <View style={styles.bannerSection}>
//         <Text style={styles.bannerTitle}>Customize Your Experience</Text>
//         <Text style={styles.bannerSubtitle}>
//           Manage your preferences, update account settings, and explore options to tailor your experience to your needs, even things like dark mode.
//         </Text>
//         <TouchableOpacity
//           style={{ flexDirection: 'row' }}
//           onPress={() => router.push('/appearance' as never)}
//         >
//           <Text style={styles.editPreferences}>Dark Mode</Text>
//           <Ionicons name="arrow-forward" size={15} color={styles.arrow.color} style={styles.arrow} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const createStyles = (isDarkMode: boolean, themeValue: any) => {
//   return StyleSheet.create({
//     container: {
//       padding: 20, // Ensure padding to prevent overlapping issues
//     },
//     bannerSection: {
//       backgroundColor: isDarkMode ? themeValue.dark.background : themeValue.light.background,
//       borderRadius: 15,
//       padding: 20,
//       marginBottom: 20,
//     },
//     bannerTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: isDarkMode ? themeValue.dark.text : themeValue.light.text,
//       marginBottom: 10,
//     },
//     bannerSubtitle: {
//       fontSize: 14,
//       color: isDarkMode ? themeValue.dark.subtitle : themeValue.light.subtitle,
//       marginBottom: 20,
//     },
//     editPreferences: {
//       fontSize: 14,
//       color: isDarkMode ? themeValue.dark.text : themeValue.light.text,
//       fontWeight: 'bold',
//     },
//     arrow: {
//       marginLeft: 10,
//       marginTop: 3,
//       color: isDarkMode ? themeValue.dark.icon : themeValue.light.icon,
//     },
//   });
// };

// export default BannerVOne;












// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useTheme } from '@/contexts/ThemeContext'; // Import your custom ThemeProvider

// export const BannerVOne = () => {
//   const { isDarkMode, themeValue } = useTheme(); // Access the current theme context

//   // Ensure that themeValue is correctly passed and contains the necessary values
//   if (!themeValue || !themeValue.dark || !themeValue.light) {
//     console.log(themeValue)
//     console.log(themeValue.dark)
//     console.log(themeValue.light)
//     return null; // Return nothing or a loading indicator if themeValue is not ready
//   }

//   const styles = createStyles(isDarkMode, themeValue); // Pass theme data to the styles function

//   return (
//     <View style={styles.container}>
//       <View style={styles.bannerSection}>
//         <Text style={styles.bannerTitle}>Customize Your Experience</Text>
//         <Text style={styles.bannerSubtitle}>
//           Manage your preferences, update account settings, and explore options to tailor your experience to your needs, even things like dark mode.
//         </Text>
//         <TouchableOpacity
//           style={{ flexDirection: 'row' }}
//           onPress={() => router.push('/appearance' as never)}
//         >
//           <Text style={styles.editPreferences}>Dark Mode</Text>
//           <Ionicons name="arrow-forward" size={15} color={styles.arrow.color} style={styles.arrow} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BannerVOne;

// const createStyles = (isDarkMode: boolean, themeValue: any) => {
//   return StyleSheet.create({
//     container: {
//       // Add any container styling here
//     },
//     bannerSection: {
//       backgroundColor: isDarkMode ? themeValue.dark.background : themeValue.light.background,
//       borderRadius: 15,
//       padding: 20,
//       marginBottom: 20,
//     },
//     bannerTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: isDarkMode ? themeValue.dark.text : themeValue.light.text,
//       marginBottom: 10,
//     },
//     bannerSubtitle: {
//       fontSize: 14,
//       color: isDarkMode ? themeValue.dark.subtitle : themeValue.light.subtitle,
//       marginBottom: 20,
//     },
//     editPreferences: {
//       fontSize: 14,
//       color: isDarkMode ? themeValue.dark.text : themeValue.light.text,
//       fontWeight: 'bold',
//     },
//     arrow: {
//       marginLeft: 10,
//       marginTop: 3,
//       color: isDarkMode ? themeValue.dark.icon : themeValue.light.icon,
//     },
//   });
// };











// NOT DARK MODE
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// // import { COLORS } from '@/utils/theme'
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { COLORS } from '@/utils/theme';

// {/* Banner Section */}

// export const BannerVOne = () => {
//   return (
//     <View style={styles.container}>
//         <View style={styles.bannerSection}>
//           <Text style={styles.bannerTitle}>Customize Your Experience</Text>
//           <Text style={styles.bannerSubtitle}>
//           Manage your preferences, update account settings, and explore options to tailor your experience to your needs, even things like dark mode.
//           </Text>
//           <TouchableOpacity style={{ flexDirection: 'row',}} onPress={() => router.push('/appearance' as never)}>
//           <Text style={styles.editPreferences}>Dark Mode</Text>
//           <Ionicons name="arrow-forward" size={15} color="white" style={styles.arrow} />
//           </TouchableOpacity>
//         </View>
//         </View>
//   )
// }

// export default BannerVOne

// const styles = StyleSheet.create({
//     container: {
//         // padding:16
//     },
//     bannerSection: {
//       backgroundColor: '#1C1C1E',
//       borderRadius: 15,
//       padding: 20,
//       marginBottom: 20,
//     },
//     bannerTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: '#FFFFFF',
//       marginBottom: 10,
//     },
  
//     bannerSubtitle: {
//       fontSize: 14,
//       color: COLORS.gray3,
//       marginBottom: 20,
//     },
  
//     editPreferences: {
//       fontSize: 14,
//       color: COLORS.white,
//       fontWeight: 'bold',
//     },
    
//     arrow : {
//       marginLeft: 10,
//       marginTop: 3,
//     },
//   });
