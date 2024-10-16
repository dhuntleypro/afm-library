// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createDrawerNavigator } from '@react-navigation/drawer' 
// import { SimpleLineIcons } from "@expo/vector-icons"
// // import Home from '../../screens/Home'


// const Sidebar = () => {
//   const Drawer = createDrawerNavigator()
  
//   return (
//     <NavigationContainer>
//         <Drawer.Navigator
//           screenOptions={{
//             drawerStyle: {
//               backgroundColor:"#fff",
//               width: 250
//             },
//             headerStyle: {
//               backgroundColor: "#f4511e"
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold"
//             },
//             drawerActiveTintColor: "blue",
//             drawerLabelStyle: {
//               color: "#111"
//             }
//           }}
//           >
//             <Drawer.Screen 
//               name='Home'
//               options={{
//                 drawerLabel: "Home",
//                 title: "Home",
//                 drawerIcon: () => (
//                   <SimpleLineIcons name="home" size={20} color="#808080" />
//                 )
//               }}
//               component={Home}
//             />
           
            
           
//         </Drawer.Navigator>
  
//     </NavigationContainer>
//   )
// }

// export default Sidebar

// const styles = StyleSheet.create({})