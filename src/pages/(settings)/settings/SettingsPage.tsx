import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import BannerVOne from '@/components/banner/BannerVOne';
import { useAuth } from '@/contexts/AuthContext';
import MyButton from '@/components/buttons/MyButton';
import { useTheme } from '@/contexts/ThemeContext';

const SettingsPage = () => {
  const { colors } = useTheme(); // Directly access colors from the theme
   const { authState , onLogout } = useAuth()

  const handleLogOut = async () => {
    if (onLogout) {
      try {
        await onLogout();
        router.replace('/welcome' as never); // Navigate to the welcome screen after logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      console.error('Logout function is not defined');
    }
  };


  const styles = createStyles(colors); // Create styles using dynamic colors from the theme

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}></View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <BannerVOne />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <Link href={'/profile' as never} asChild>
            <TouchableOpacity style={styles.option}>
              <FontAwesome5 name="user" size={20} color={colors.title} />
              <Text style={styles.optionText}>Profile information</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.title} />
            </TouchableOpacity>
          </Link>

          <Link href={'/appearance' as never} asChild>
            <TouchableOpacity style={styles.option}>
              <Ionicons name="color-palette-outline" size={20} color={colors.title} />
              <Text style={styles.optionText}>Appearance</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.title} />
            </TouchableOpacity>
          </Link>

          <Link href={'/favorites' as never} asChild>
            <TouchableOpacity style={styles.option}>
              <Ionicons name="heart-outline" size={20} color={colors.title} />
              <Text style={styles.optionText}>Favorites</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.title} />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application</Text>
          
          <Link href={'/privacy-policy' as never} asChild>
            <TouchableOpacity style={styles.option}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.title} />
              <Text style={styles.optionText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.title} />
            </TouchableOpacity>
          </Link>

          <Link href={'/terms-of-use' as never} asChild>
            <TouchableOpacity style={styles.option}>
              <Ionicons name="help-circle-outline" size={20} color={colors.title} />
              <Text style={styles.optionText}>Terms of Use</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.title} />
            </TouchableOpacity>
          </Link>

      
        </View>

        <MyButton
          title="Log out"
          onPress={handleLogOut}
          buttonStyle={styles.logoutButton}
          textStyle={styles.logoutText}
        />
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, // Dynamic background color
    },
    upperSection: {},
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.title, // Dynamic text color
      textAlign: 'left',
      marginVertical: 20,
      marginLeft: 16,
      paddingBottom: 20,
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 4, // for Android shadow
      marginTop: 12,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.title, // Dynamic text color
      marginBottom: 10,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border, // Dynamic border color
    },
    optionText: {
      flex: 1,
      fontSize: 16,
      color: colors.title, // Dynamic text color
      marginLeft: 10,
    },
    logoutButton: {
      backgroundColor: colors.card, // Dynamic card color
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.title, // Dynamic border color
      marginTop: 20,
    },
    logoutText: {
      color: colors.title, // Dynamic text color
      fontSize: 16,
    },
  });
};

export default SettingsPage;
















// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
// import { Link} from 'expo-router';
// import BannerVOne from '@/components/banner/BannerVOne';
// import { useAuth } from '@/contexts/AuthContext';
// import MyButton from '@/components/buttons/MyButton';
// // import CustomButton from '@/components/buttons/WhiteButton';
// // import MyButton from '@/components/buttons/WhiteButton';

// const SettingsPage = () => {
//   // const insets = useSafeAreaInsets();

//   // const { authState , onLogout } = useAuth()

//   const handleLogOut = async () => {
//     // if (onLogout) {
//     //   try {
//     //     await onLogout();
//     //     router.replace('/welcome' as never); // Navigate to the welcome screen after logout
//     //   } catch (error) {
//     //     console.error('Logout failed:', error);
//     //   }
//     // } else {
//     //   console.error('Logout function is not defined');
//     // }
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Stack.Screen options={{headerShown: false}} /> */}
//      <View  style={styles.upperSection}>
//       {/* <View style={styles.divider}/> */}
//      {/* <View style={{paddingBottom: 20}}/> */}
//      </View>
//      <ScrollView contentContainerStyle={styles.content}>
//      <Text style={styles.title}>Settings</Text>

//       <BannerVOne />
     
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>General</Text>
          
//           <Link href={'/profile' as never} asChild>
//             <TouchableOpacity style={styles.option}>
//               <FontAwesome5 name="user" size={20} color="black" />
//               <Text style={styles.optionText}>Profile information</Text>
//               <Ionicons name="chevron-forward" size={20} color="black" />
//             </TouchableOpacity>
//           </Link>

// {/* 
//           <Link href={'settings/profile-information' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <MaterialIcons name="payment" size={20} color="black" />
//             <Text style={styles.optionText}>Payment methods</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
//           </Link> */}

//           <Link href={'/appearance' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="color-palette-outline" size={20} color="black" />
//             <Text style={styles.optionText}>Appearance</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
//           </Link> 

//           <Link href={'/favorites' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="color-palette-outline" size={20} color="black" />
//             <Text style={styles.optionText}>Favorites</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
//           </Link>
// {/* 
//           <Link href={'settings/profile-information' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="notifications-outline" size={20} color="black" />
//             <Text style={styles.optionText}>Notifications</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
//           </Link> */}

//         </View>

//         {/* <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Support</Text>
//           <Link href={'/report-an-issue' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="alert-circle-outline" size={20} color="black" />
//             <Text style={styles.optionText}>Report an issue</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
//           </Link>

//           <Link href={'/faq' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="help-circle-outline" size={20} color="black" />
//             <Text style={styles.optionText}>term</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>

//           </Link>

//         </View> */}



// <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Application</Text>
//           <Link href={'/privacy-policy' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="alert-circle-outline" size={20} color="black" />
//             <Text style={styles.optionText}>Privacy Policy</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
//           </Link>

//           <Link href={'/terms-of-use' as never} asChild>
//           <TouchableOpacity style={styles.option}>
//             <Ionicons name="help-circle-outline" size={20} color="black" />
//             <Text style={styles.optionText}>Terms of use</Text>
//             <Ionicons name="chevron-forward" size={20} color="black" />
//           </TouchableOpacity>
          
//           </Link>

//         </View>
//         <MyButton
//         title="Log out"
//         onPress={handleLogOut}
//         buttonStyle={styles.logoutButton}
//         textStyle={styles.logoutText}
//       />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   upperSection: {
  
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EAEAEA',
//     // paddingBottom: 20
//     // marginBottom: 20,
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'left',
//     marginVertical: 20,
//     marginLeft: 16,
//     paddingBottom: 20,
//   },
//   content: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 4, // for Android shadow
//     marginTop: 12,

//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 10,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EAEAEA',
//   },
//   optionText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//     marginLeft: 10,
//   },
//   logoutButton: {
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#000',
//     marginTop: 20,
//   },
//   logoutText: {
//     color: '#000',
//     fontSize: 16,
//   },
// });

// export default SettingsPage;
