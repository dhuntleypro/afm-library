import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '@/utils/theme';
import convertToCurrency from '@/hooks/convertToCurrency';
import { OrderModelProps } from '@/models/OrderModelProps';
import { Link } from 'expo-router';
import { useClientOrder } from '@/contexts/ClientOrderContext';
import { Ionicons } from '@expo/vector-icons';

const ClientOrderCard: React.FC<{ order: OrderModelProps }> = ({ order }) => {
  const { selectOrder } = useClientOrder();
  const [status, setStatus] = useState(order.order_status);

  const handleOrderPress = () => {
    selectOrder(order);
  };

  useEffect(() => {
    setStatus(order.order_status);
  }, [order.order_status]);

  return (
    <Link href={`(tabs)/client-orders/(details)/${order.id}` as never} asChild>
      <TouchableOpacity style={styles.card} onPress={handleOrderPress}>
        <View style={styles.body}>
          <Ionicons name="bag" size={30} color={COLORS.primary} style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.name}>{order.to_address.name}</Text>
            <Text style={styles.price}>{convertToCurrency(order.total)}</Text>
            <Text style={styles.date}>Placed on: {order.order_placed_date}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, getStatusStyle(status)]}>{status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Fulfill Order':
      return styles.fulfillOrderStatus;
    case 'Mark as Shipped':
      return styles.markAsShippedStatus;
    case 'Shipped !':
      return styles.shippedStatus;
    default:
      return styles.defaultStatus;
  }
};

export default ClientOrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: SIZES.medium,
  },
  details: {
    flex: 1,
  },
  name: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  price: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  date: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontFamily: 'bold',
    fontSize: SIZES.small,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.large,
  },
  fulfillOrderStatus: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  markAsShippedStatus: {
    backgroundColor: COLORS.orange,
    color: COLORS.black,
  },
  shippedStatus: {
    backgroundColor: COLORS.green,
    color: COLORS.black,
  },
  defaultStatus: {
    backgroundColor: COLORS.blue,
    color: COLORS.white,
  },
});





// // OrderCard.tsx
// import React from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// // import { OrderModelProps } from './Order';
// import { COLORS, SIZES } from '@/utils/theme';
// import { Ionicons } from '@expo/vector-icons';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { OrderModelProps } from '@/models/OrderModelProps';
// import { Link } from 'expo-router';
// import { useClientOrder } from '@/contexts/ClientOrderContext';


// const ClientOrderCard: React.FC<OrderModelProps> = (order) => {
//   const { selectOrder } = useClientOrder();

//   const handleProductPress = () => {
//     selectOrder(order);
//   };
//   return (
//     // <Link href={"(tabs)/client-orders/(create)/create-client-order" as never} asChild>
//     // <Link href={"(tabs)/client-orders/(create)/create-client-order" as never} asChild>

//     <Link href={`(tabs)/client-orders/(details)/${order.id}` as never} asChild>

//     <TouchableOpacity style={styles.card} onPress={handleProductPress}>
//       <View style={styles.header}>
//         <Text style={styles.orderId}>Order ID: {order.id}</Text>
//         <Text style={styles.status}>{order.order_status}</Text>
//       </View>
      
//       <View style={styles.body}>
//         {/* <Image source={{ uri: props.items[0].image }} style={styles.image} /> */}
//         <View style={styles.details}>
//           <Text style={styles.title}>{order.title}</Text>
//           <Text style={styles.date}>Placed on: {order.order_placed_date}</Text>
//           <Text style={styles.price}>{convertToCurrency(order.total)}</Text>
//         </View>
//       </View>
      
//       <View style={styles.footer}>
//         <Ionicons name="square" size={24} color={COLORS.primary} />
//       </View>
//     </TouchableOpacity>
//     </Link>
//   );
// };

// export default ClientOrderCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: COLORS.white,
//     borderRadius: SIZES.medium,
//     marginBottom: SIZES.medium,
//     padding: SIZES.medium,
//     shadowColor: COLORS.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: SIZES.small,
//   },
//   orderId: {
//     fontFamily: 'bold',
//     fontSize: SIZES.medium,
//     color: COLORS.primary,
//   },
//   status: {
//     fontFamily: 'regular',
//     fontSize: SIZES.small,
//     color: COLORS.gray,
//   },
//   body: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: SIZES.small,
//     marginRight: SIZES.medium,
//   },
//   details: {
//     flex: 1,
//   },
//   title: {
//     fontFamily: 'bold',
//     fontSize: SIZES.medium,
//     marginBottom: SIZES.small,
//     color: COLORS.primary,
//   },
//   date: {
//     fontFamily: 'regular',
//     fontSize: SIZES.small,
//     color: COLORS.gray,
//   },
//   price: {
//     fontFamily: 'bold',
//     fontSize: SIZES.medium,
//     color: COLORS.primary,
//     marginTop: SIZES.small,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: SIZES.small,
//   },
// });
