// import React, { useEffect, useState } from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Link, router, Tabs } from "expo-router";
// import { Pressable, ActivityIndicator, View } from "react-native";
// import { useTheme } from "@/contexts/ThemeContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { useClientProduct } from "@/contexts/ClientProductContext";
// import { useClientStore } from "@/contexts/ClientStoreContext";
// import { useClientCollection } from "@/contexts/ClientCollectionContext";
// // import { useAuth, useClientCollection, useClientProduct, useClientStore, useTheme } from "@dhuntleypro/afm-library";
// // import { CONSTANTS } from "@/constants/constants";

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }


// const store_id = "P5V8A9ZE"  


// export default function TabLayoutContent() {
//   const { colors } = useTheme(); // Pulling colors from the custom theme
//   const { authState } = useAuth();
//   const { getClientProducts } = useClientProduct();
//   const { getClientStore } = useClientStore();
//   const { getClientCollections } = useClientCollection();

// // used to have it here...

// const [isMounted, setIsMounted] = useState(false);
// const [isCheckingAuth, setIsCheckingAuth] = useState(true);


// useEffect(() => {
//   if (!isMounted) return;

//   const checkAuthStatus = async () => {
//     setIsCheckingAuth(true);
//     if (authState?.authenticated) {
//       console.log("User authenticated, fetching data...");
//       await getClientProducts(store_id);
//       await getClientStore(store_id);
//       await getClientCollections(store_id);
//     } else {
//       await getClientStore(store_id);
//       router.replace("/welcome" as never);
//     }
//     setIsCheckingAuth(false);
//   };

//   checkAuthStatus();
// }, [isMounted, authState]);

// useEffect(() => {
//   setIsMounted(true);
// }, []);

// if (isCheckingAuth) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" color={colors.primary} />
//     </View>
//   );
// }



//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color }) => {
//           const iconColor = focused ? colors.tabIconSelected : colors.tabIconDefault;
//           let iconName: React.ComponentProps<typeof FontAwesome>["name"] = "question-circle";
//           switch (route.name) {
//             case "(home)":
//               iconName = "home";
//               break;
//             case "collections":
//               iconName = "gift";
//               break;
//             case "cart":
//               iconName = "shopping-cart";
//               break;
//             case "(settings)":
//               iconName = "gear";
//               break;
//           }
//           return <TabBarIcon name={iconName} color={iconColor} />;
//         },
//         tabBarActiveTintColor: colors.tabIconSelected, // Using tabIconSelected from theme
//         tabBarInactiveTintColor: colors.tabIconDefault, // Using tabIconDefault from theme
//         tabBarStyle: { backgroundColor: colors.background }, // Set background color for tabs
//         headerShown: false, // Default behavior, header is hidden
//       })}
//     >
//       <Tabs.Screen
//         name="(home)"
//         options={{
//           title: "Home",
//         //   headerRight: () => (
//         //     <Link href="/modal" asChild>
//         //       <Pressable>
//         //         {({ pressed }) => (
//         //           <FontAwesome
//         //             name="info-circle"
//         //             size={25}
//         //             color={pressed ? colors.secondary : colors.title}
//         //             style={{ marginRight: 15 }}
//         //           />
//         //         )}
//         //       </Pressable>
//         //     </Link>
//         //   ),
//         }}
//       />
//       <Tabs.Screen
//         name="collections"
//         options={{
//           title: "Collections",
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           headerShown: true, // Show header specifically for the cart screen
//         }}
//       />
//       <Tabs.Screen
//         name="(settings)"
//         options={{
//           title: "Settings",
//         }}
//       />
//     </Tabs>
//   );
// }









// REALLY GOOD - EVERYTHHING IS THE SAME
// import React, { useEffect, useState } from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Link, router, Tabs } from "expo-router";
// import { Pressable, ActivityIndicator, View } from "react-native";
// import { useAuth, useClientCollection, useClientProduct, useClientStore, useTheme } from "@dhuntleypro/afm-library";
// import { CONSTANTS } from "@/constants/constants";

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayoutContent() {
//   const { colors } = useTheme(); // Pulling colors from the custom theme
//   const { authState } = useAuth();
//   const { getClientProducts } = useClientProduct();
//   const { getClientStore } = useClientStore();
//   const { getClientCollections } = useClientCollection();

//   const [isMounted, setIsMounted] = useState(false);
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   useEffect(() => {
//     if (!isMounted) return;

//     const checkAuthStatus = async () => {
//       setIsCheckingAuth(true);
//       if (authState?.authenticated) {
//         console.log("User authenticated, fetching data...");
//         await getClientProducts(CONSTANTS.store_id);
//         await getClientStore(CONSTANTS.store_id);
//         await getClientCollections(CONSTANTS.store_id);
//       } else {
//         await getClientStore(CONSTANTS.store_id);
//         router.replace("/welcome");
//       }
//       setIsCheckingAuth(false);
//     };

//     checkAuthStatus();
//   }, [isMounted, authState]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (isCheckingAuth) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color }) => {
//           const iconColor = focused ? colors.tabIconSelected : colors.tabIconDefault;
//           let iconName: React.ComponentProps<typeof FontAwesome>["name"] = "question-circle";
//           switch (route.name) {
//             case "(home)":
//               iconName = "home";
//               break;
//             case "collections":
//               iconName = "gift";
//               break;
//             case "cart":
//               iconName = "shopping-cart";
//               break;
//             case "(settings)":
//               iconName = "gear";
//               break;
//           }
//           return <TabBarIcon name={iconName} color={iconColor} />;
//         },
//         tabBarActiveTintColor: colors.tabIconSelected, // Using tabIconSelected from theme
//         tabBarInactiveTintColor: colors.tabIconDefault, // Using tabIconDefault from theme
//         tabBarStyle: { backgroundColor: colors.background }, // Set background color for tabs
//         headerShown: false,
//       })}
//     >
//       <Tabs.Screen
//         name="(home)"
//         options={{
//           title: "Homed",
//           headerRight: () => (
//             <Link href="/modal" asChild>
//               <Pressable>
//                 {({ pressed }) => (
//                   <FontAwesome
//                     name="info-circle"
//                     size={25}
//                     color={pressed ? colors.secondary : colors.text}
//                     style={{ marginRight: 15 }}
//                   />
//                 )}
//               </Pressable>
//             </Link>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="collections"
//         options={{
//           title: "Collections",
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//         }}
//       />
//       <Tabs.Screen
//         name="(settings)"
//         options={{
//           title: "Settings",
//         }}
//       />
//     </Tabs>
//   );
// }






// import React, { useEffect, useState } from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Link, router, Tabs } from "expo-router";
// import { Pressable, ActivityIndicator, View } from "react-native";
// import { useAuth, useClientCollection, useClientProduct, useClientStore, useTheme } from "@dhuntleypro/afm-library";
// import { CONSTANTS } from "@/constants/constants";

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
//   const { colors } = useTheme(); // Pulling colors from the custom theme
//   const { authState } = useAuth();
//   const { getClientProducts } = useClientProduct();
//   const { getClientStore } = useClientStore();
//   const { getClientCollections } = useClientCollection();

//   const [isMounted, setIsMounted] = useState(false);
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   useEffect(() => {
//     if (!isMounted) return;

//     const checkAuthStatus = async () => {
//       setIsCheckingAuth(true);
//       if (authState?.authenticated) {
//         console.log("User authenticated, fetching data...");
//         await getClientProducts(CONSTANTS.store_id);
//         await getClientStore(CONSTANTS.store_id);
//         await getClientCollections(CONSTANTS.store_id);
//       } else {
//         await getClientStore(CONSTANTS.store_id);
//         router.replace("/welcome");
//       }
//       setIsCheckingAuth(false);
//     };

//     checkAuthStatus();
//   }, [isMounted, authState]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (isCheckingAuth) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.primary, // Using store-based color from theme
//         headerShown: false,
//         tabBarStyle: { backgroundColor: colors.background }, // Set background color for tabs
//       }}
//     >
//       <Tabs.Screen
//         name="(home)"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => <TabBarIcon name="square" color={colors.selected} />,
//           headerRight: () => (
//             <Link href="/modal" asChild>
//               <Pressable>
//                 {({ pressed }) => (
//                   <FontAwesome
//                     name="info-circle"
//                     size={25}
//                     color={pressed ? colors.secondary : colors.text}
//                     style={{ marginRight: 15 }}
//                   />
//                 )}
//               </Pressable>
//             </Link>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="collections"
//         options={{
//           title: "Collections",
//           tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="(settings)"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
