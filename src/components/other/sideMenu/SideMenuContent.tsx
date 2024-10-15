// // Drawer.js
// import React, { useState, useRef, useContext } from 'react';
// import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
// import { Ionicons , Fontisto} from '@expo/vector-icons'
// import { useNavigation } from '@react-navigation/native';
// // import { CartContext } from '../../contexts/CartContext';
// import { COLORS } from '@/utils/theme';
// // import { Divider } from 'react-native-paper';
// // import { useAuth } from '../../contexts/AuthContext';
// import { Avatar , Title, Caption, TouchableRipple} from 'react-native-paper'

// const { width } = Dimensions.get('window');

// const SideMenuContent = () => {
//     const navigation = useNavigation()
//     const [isOpen, setIsOpen] = useState(false);
//     const animation = useRef(new Animated.Value(0)).current;
  
//     const { authState, onLogout } = useAuth()

//     const userActive = authState?.user ? authState.user.active : false;
//     const userFullName = authState?.user ? authState.user.name : '';
  

//   const drawerTranslateX = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-width * 0.75, 0],
//   });
//   return (
//     <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
       
//     {/* Spacing above */}
//     <View style={{padding: 20}} /> 

    
//     <View style={styles.userInfoSection}>
//      <View style={{flexDirection: 'row'}}>
//        <Avatar.Image source={{uri: 'https://appsformankind-assets.s3.amazonaws.com/Collections/Furniture/Furniture_1.jpg'}} size={60}/>
       
       
//        <View style={{marginLeft: 20}}>
//          <Title style={styles.title}>{userFullName}</Title>
//          <Caption  style={styles.caption}>Status: {userActive ? "Active": "InActive"}</Caption>
//        </View>
//      </View>
//    </View>


//          <Divider />



//      <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("Inbox" as never)} >
//      <Text style={styles.menuText}>Inbox</Text>   
//      </TouchableOpacity>

//      <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("To Do List" as never)} >
//      <Text style={styles.menuText}>To Do List</Text>   
//      </TouchableOpacity>

//      <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("Store" as never)} >
//      <Text style={styles.menuText}>Store</Text>   
//      </TouchableOpacity>

//      <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("Wallet" as never)} >
//      <Text style={styles.menuText}>Wallet</Text>   
//      </TouchableOpacity>

//      <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("Advertising" as never)} >
//      <Text style={styles.menuText}>Advertising</Text>   
//      </TouchableOpacity>

//      <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("Account" as never)} >
//      <Text style={styles.menuText}>Account</Text>   
//      </TouchableOpacity>

//    </Animated.View>
//   )
// }

// export default SideMenuContent



// const styles = StyleSheet.create({
   
//     userInfoSection: {
//       // paddingHorizontal: 30,
//       marginBottom: 25
//     },
//     title: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       // marginTop: 15,
//       marginBottom: 5
//     },
//     caption: {
//       fontSize: 14,
//       lineHeight: 14,
//       fontWeight: '500',
  
//     },
//     menuButton: {
//       padding: 10,
//     },
//     menuText: {
//       fontSize: 22,
//       fontWeight: 'bold'
//     },
//     spacer: {
//       flex: 1,
//     },
//     cartButton: {
     
//       alignItems: "flex-end",
//       marginRight: 10
//     },
  
//     drawer: {
//       position: 'absolute',
//       top: 0,
//       bottom: 0,
//       left: 0,
//       width: width * 0.75,
//       backgroundColor: '#fff',
//       padding: 20,
//       zIndex: 10,
//     },
//     drawerItem: {
//       fontSize: 20,
//       paddingVertical: 15,
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
   

//   });
  
  