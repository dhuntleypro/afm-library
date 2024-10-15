import { Platform, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { router, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../utils/theme'
import { useClientOnlyValue } from '../hooks/useClientOnlyValue'
// import { useClientOnlyValue } from '@/hooks/useClientOnlyValue'
// import Footer from '@/components/web/Footer'
// import TopHeader from '@/components/web/TopHeader'
// import Colors from '@/constants/Colors'
// import { useClientOnlyValue } from '@/hooks/useClientOnlyValue'
// import { COLORS } from '@/utils/theme'
const AuthenticatedTabs = () => {
    const colorScheme = useColorScheme();

  return (
<>

      
   <Tabs screenOptions={{
        tabBarStyle: Platform.OS === 'web' ? { display: 'none' } : {},
        tabBarActiveTintColor: COLORS[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
       }}>
    <Tabs.Screen 
      name='(home)' // 'home'
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon : ({size, color }) => <Ionicons name='square' size={size} color={color} />
      }}
      
    />
      <Tabs.Screen 
      name='client-orders'
      options={{
        href: null,
        headerShown: false,
        tabBarLabel: 'Orders',
        tabBarIcon : ({size, color }) => <Ionicons name='newspaper' size={size} color={color} />
      }}
      />
     <Tabs.Screen 
      name='client-products'
      options={{
        href: null,

        headerShown: false,
        tabBarLabel: 'Products',
        tabBarIcon : ({size, color }) => <Ionicons name='person' size={size} color={color} />
      }}
      />
        <Tabs.Screen 
      name='collections'
      options={{
        // headerShown: false,
        tabBarLabel: 'Collections',
        tabBarIcon : ({size, color }) => <Ionicons name='newspaper' size={size} color={color} />
      }}
      />
     <Tabs.Screen 
      name='cart'
      options={{
        // // headerShown: false,
        // headerLeft: () => (
        //   <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        //     <Ionicons name="arrow-back" size={24} color="black" />
        //   </TouchableOpacity>
        // ),
        tabBarLabel: 'Cart',
        tabBarIcon : ({size, color }) => <Ionicons name='person' size={size} color={color} />
      }}
      />
       <Tabs.Screen 
      name='(settings)'
      options={{
        // href:null,
        // headerShown: false,
        tabBarLabel: 'Settings',
        tabBarIcon : ({size, color }) => <Ionicons name='settings-outline' size={size} color={color} />
      }}
    /> 


 

    {/* Hidden */}

    {/* <Tabs.Screen 
      name='search'
      options={{
        href: null,
        tabBarLabel: 'Collections',
        tabBarIcon : ({size, color }) => <Ionicons name='newspaper' size={size} color={color} />
      }}
      /> */}
    </Tabs>
    
    </>
  )
}

export default AuthenticatedTabs

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 8, // Adjust margin to position the back button
  },
})
























// import React from 'react';
// import { Tabs, Link } from 'expo-router';
// import { Platform, Pressable } from 'react-native';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// // import { TabBarIcon } from './TabBarIcon';

// export function AuthenticatedTabs() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarStyle: Platform.OS === 'web' ? { display: 'none' } : {},
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: useClientOnlyValue(false, true),
//       }}
//     >
//       <Tabs.Screen
//         name="(home)"
//         options={{
//           title: 'Home',
//         //   tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
//           headerRight: () => (
//             <Link href="/modal" asChild>
//               <Pressable>
//                 {({ pressed }) => (
//                   <FontAwesome
//                     name="info-circle"
//                     size={25}
//                     color={Colors[colorScheme ?? 'light'].text}
//                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//                   />
//                 )}
//               </Pressable>
//             </Link>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="two"
//         options={{
//           title: 'Tab Two',
//         //   tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
