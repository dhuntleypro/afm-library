// import React, { useState } from 'react';
// import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { COLORS, SIZES } from '@/utils/theme';
// import { OrderModelProps } from '@/models/OrderModelProps';
// // import { Button } from 'react-native-paper';

// const ClientOrderCard = () => {
//   const { orderId, order, loading, error, isPending, loadingPay, loadingDeliver, userInfo } = route.params;
//   const navigation = useNavigation();

//   // const deliverOrderHandler = () => {
//   //   // Handle order delivery
//   // };

//   // const createOrder = () => {
//   //   // Handle PayPal order creation
//   // };

//   // const onApprove = () => {
//   //   // Handle PayPal order approval
//   // };

//   // const onError = () => {
//   //   // Handle PayPal errors
//   // };

//   // if (loading) {
//   //   return <LoadingBox />;
//   // }

//   // if (error) {
//   //   return <MessageBox variant="danger">{error}</MessageBox>;
//   // }

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text style={styles.title}>Order {orderId}</Text>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Shipping</Text>
//           <Text>
//             <Text style={styles.boldText}>Name: </Text>
//             {order.shippingAddress.fullName}
//           </Text>
//           <Text>
//             <Text style={styles.boldText}>Address: </Text>
//             {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//           </Text>
//           {order.isDelivered ? (
//             <Text style={{color: 'green'}}>Delivered at {order.deliveredAt}</Text>
//           ) : (
//             <Text style={{color: 'red'}}>Not Delivered</Text>

//           )}
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Payment</Text>
//           <Text>
//             <Text style={styles.boldText}>Method: </Text>
//             {order.paymentMethod}
//           </Text>
//           {order.isPaid ? (
//             <Text >Paid at {order.paidAt}</Text>
//           ) : (
//             <Text>Not Paid</Text>
//           )}
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Items</Text>
//           {order.orderItems.map((item: OrderModelProps) => (
//             <View key={item.id} style={styles.itemRow}>
//               <Image source={{ uri: item. }} style={styles.image} />
//               <TouchableOpacity onPress={() => navigation.navigate('Product', { slug: item.slug })}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//               </TouchableOpacity>
//               <Text style={styles.itemQuantity}>{item.quantity}</Text>
//               <Text style={styles.itemPrice}>${item.price}</Text>
//             </View>
//           ))}
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Order Summary</Text>
//           <View style={styles.summaryRow}>
//             <Text>Items</Text>
//             <Text>${order.itemsPrice.toFixed(2)}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text>Shipping</Text>
//             <Text>${order.shippingPrice.toFixed(2)}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text>Tax</Text>
//             <Text>${order.taxPrice.toFixed(2)}</Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text style={styles.boldText}>Order Total</Text>
//             <Text style={styles.boldText}>${order.totalPrice.toFixed(2)}</Text>
//           </View>
//           {!order.isPaid && (
//             <View>
//               {isPending ? (
//                 <LoadingBox />
//               ) : (
//                 <View>
//                   {/* Replace with your PayPal integration for React Native */}
//                   <Text>PayPal Button Placeholder</Text>
//                 </View>
//               )}
//               {loadingPay && <LoadingBox />}
//             </View>
//           )}
//           {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//             <View>
//               {loadingDeliver && <LoadingBox />}
//               <Button mode="contained" onPress={deliverOrderHandler}>
//                 Deliver Order
//               </Button>
//             </View>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ClientOrders;

// const styles = StyleSheet.create({
//   container: {
//     padding: SIZES.medium,
//   },
//   title: {
//     fontSize: SIZES.xxLarge,
//     fontWeight: 'bold',
//     marginBottom: SIZES.medium,
//   },
//   card: {
//     backgroundColor: COLORS.gray,
//     borderRadius: SIZES.small,
//     padding: SIZES.medium,
//     marginBottom: SIZES.medium,
//   },
//   cardTitle: {
//     fontSize: SIZES.large,
//     fontWeight: 'bold',
//     marginBottom: SIZES.small,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   itemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: SIZES.small,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     marginRight: SIZES.small,
//     borderRadius: SIZES.small,
//   },
//   itemName: {
//     flex: 1,
//     fontSize: SIZES.medium,
//   },
//   itemQuantity: {
//     fontSize: SIZES.medium,
//     marginRight: SIZES.medium,
//   },
//   itemPrice: {
//     fontSize: SIZES.medium,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: SIZES.small,
//   },
// });
