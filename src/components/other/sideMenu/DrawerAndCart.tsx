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

// const DrawerAndCart = () => {
//   const navigation = useNavigation()
//   const { carts , quantity} = useContext(CartContext)
//   const [isOpen, setIsOpen] = useState(false);
//   const animation = useRef(new Animated.Value(0)).current;


//   const { authState, onLogout } = useAuth()

  


//   const profileImage = authState?.user ? authState.user.profile_image : '';
//   const userActive = authState?.user ? authState.user.active : false;
//   const userFullName = authState?.user ? authState.user.name : '';


//   const [storeDropdownVisible, setStoreDropdownVisible] = useState(false);


//   const toggleDrawer = () => {
//     if (isOpen) {
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setIsOpen(false));
//     } else {
//       setIsOpen(true);
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const drawerTranslateX = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-width * 0.75, 0],
//   });
  
//   const toggleStoreDropdown = () => {
//     setStoreDropdownVisible(!storeDropdownVisible);
//   };
//   return (
//     <>
//     <View style={styles.header}>
//         <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
//         <Ionicons name="menu" size={30} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.spacer} />
 
//         <TouchableOpacity  style={styles.cartButton} onPressIn={() => navigation.navigate("Cart" as never)} >

//         <Fontisto name='shopping-bag' size={24} />
//           <View style={styles.cartCount}>
//             <Text style={styles.cartNumber}>3</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       {isOpen && (
//         <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
//       )}


//       <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
       
//        {/* Spacing above */}
//        <View style={{padding: 20}} /> 

       
//        <View style={styles.userInfoSection}>
//         <View style={{flexDirection: 'row'}}>
//           <Avatar.Image source={{uri: 'https://appsformankind-assets.s3.amazonaws.com/Collections/Furniture/Furniture_1.jpg'}} size={60}/>
          
          
//           <View style={{marginLeft: 20}}>
//             <Title style={styles.title}>{userFullName}</Title>
//             <Caption  style={styles.caption}>Status: {userActive ? "Active": "InActive"}</Caption>
//           </View>
//         </View>
//       </View>


//             <Divider />


// {/* 
//         <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("InboxScreen" as never)} >
//         <Text style={styles.menuText}>Inbox</Text>   
//         </TouchableOpacity>

//         <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("TodoCrudScreen" as never)} >
//         <Text style={styles.menuText}>To Do List</Text>   
//         </TouchableOpacity> */}

//         <TouchableOpacity style={styles.drawerItem} onPressIn={toggleStoreDropdown}>
//         <Text style={styles.menuText}>Store</Text>
//       </TouchableOpacity>
//       {storeDropdownVisible && (
//         <View style={styles.dropdown}>
//           <TouchableOpacity style={styles.dropdownItem} onPressIn={() => navigation.navigate("OrderCrudScreen" as never)}>
//             <Text style={styles.dropdownText}>Orders</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dropdownItem} onPressIn={() => navigation.navigate("UserCrudScreen" as never)}>
//             <Text style={styles.dropdownText}>Customers</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dropdownItem} onPressIn={() => navigation.navigate("ProductCrudScreen" as never)}>
//             <Text style={styles.dropdownText}>Products</Text>
//           </TouchableOpacity>
//            <TouchableOpacity style={styles.dropdownItem} onPressIn={() => navigation.navigate("CollectionCrudScreen" as never)}>
//             <Text style={styles.dropdownText}>Collections</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dropdownItem} onPressIn={() => navigation.navigate("CouponCrudScreen" as never)}>
//             <Text style={styles.dropdownText}>Coupons</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dropdownItem} onPressIn={() => navigation.navigate("MediaScreen" as never)}>
//             <Text style={styles.dropdownText}>Media</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//         <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("WalletScreen" as never)} >
//         <Text style={styles.menuText}>Wallet</Text>   
//         </TouchableOpacity>

//         <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("AdvertisingScreen" as never)} >
//         <Text style={styles.menuText}>Advertising</Text>   
//         </TouchableOpacity>

//         <TouchableOpacity  style={styles.drawerItem} onPressIn={() => navigation.navigate("AccountScreen" as never)} >
//         <Text style={styles.menuText}>Account</Text>   
//         </TouchableOpacity>

//       </Animated.View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // // padding: 20,
//     // position: 'absolute',
//     // top: 0,
//     // left: 0,
//     // right: 0,
//     // zIndex: 10,
//     // backgroundColor: 'white',
//   },
//   userInfoSection: {
//     // paddingHorizontal: 30,
//     marginBottom: 25
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     // marginTop: 15,
//     marginBottom: 5
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//     fontWeight: '500',

//   },
//   menuButton: {
//     padding: 10,
//   },
//   menuText: {
//     fontSize: 22,
//     fontWeight: 'bold'
//   },
//   spacer: {
//     flex: 1,
//   },
//   cartButton: {
   
//     alignItems: "flex-end",
//     marginRight: 10
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 9,
//   },
//   drawer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     width: width * 0.75,
//     backgroundColor: '#fff',
//     padding: 20,
//     zIndex: 10,
//   },
//   drawerItem: {
//     fontSize: 20,
//     paddingVertical: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   cartCount: {
//     position: "absolute",
//     bottom: 16,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     backgroundColor: "blue",
//     justifyContent: "center",
//     zIndex: 999
// },
// cartNumber: {
//     fontFamily: "regular",
//     fontWeight: "600",
//     fontSize: 10,
//     color: COLORS.lightWhite
// },
// dropdown: {
//     paddingLeft: 20,
//     // overflow: 'hidden',

//   },
//   dropdownItem: {
//     paddingVertical: 10,
//   },
//   dropdownText: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });

// export default DrawerAndCart;
