
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "@/utils/theme";
import convertToCurrency from "@/hooks/convertToCurrency";
import { ProductModelProps } from "@/models/ProductModelProps";
import { Link } from "expo-router";
import { useClientProduct } from "@/contexts/ClientProductContext";
import { Ionicons } from "@expo/vector-icons";

const ClientProductCard: React.FC<{ product: ProductModelProps }> = ({
  product,
}) => {
  const { selectProduct } = useClientProduct();
  const [status, setStatus] = useState<boolean>(product.active);

  const handleProductPress = () => {
    selectProduct(product);
  };

  useEffect(() => {
    setStatus(product.active);
  }, [product.active]);

  return (
    <Link
      href={`(tabs)/client-products/(details)/${product.id}` as never}
      asChild
    >
      <TouchableOpacity style={styles.card} onPress={handleProductPress}>
        <View style={styles.body}>
          <Ionicons
            name="bag"
            size={30}
            color={COLORS.primary}
            style={styles.icon}
          />
          <View style={styles.details}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
            <Text style={styles.date}>Placed on: {product.createdOn}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, getStatusStyle(status)]}>
              {status ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const getStatusStyle = (status: boolean) => {
  if (status) {
    return styles.activeStatus;
  } else {
    return styles.inactiveStatus;
  }
};

export default ClientProductCard;

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
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingRight: SIZES.medium,
  },
  details: {
    flex: 1,
  },
  name: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  price: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  date: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    fontFamily: "bold",
    fontSize: SIZES.small,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.large,
  },
  activeStatus: {
    backgroundColor: COLORS.green,
    color: COLORS.white,
  },
  inactiveStatus: {
    backgroundColor: COLORS.red,
    color: COLORS.white,
  },
});













// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { COLORS, SIZES } from "@/utils/theme";
// import convertToCurrency from "@/hooks/convertToCurrency";
// import { ProductModelProps } from "@/models/ProductModelProps";
// import { Link } from "expo-router";
// import { useClientProduct } from "@/contexts/ClientProductContext";
// import { Ionicons } from "@expo/vector-icons";

// const ClientProductCard: React.FC<{ product: ProductModelProps }> = ({
//   product,
// }) => {
//   const { selectProduct } = useClientProduct();
//   const [status, setStatus] = useState<boolean>(false);

//   const handleProductPress = () => {
//     selectProduct(product);
//   };

//   useEffect(() => {
//     setStatus(product.active);
//   }, [product.active]);

//   return (
//     <Link
//       href={`(tabs)/client-products/(details)/${product.id}` as never}
//       asChild
//     >
//       <TouchableOpacity style={styles.card} onPress={handleProductPress}>
//         <View style={styles.body}>
//           <Ionicons
//             name="bag"
//             size={30}
//             color={COLORS.primary}
//             style={styles.icon}
//           />
//           <View style={styles.details}>
//             <Text style={styles.name}>{product.name}</Text>
//             <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
//             <Text style={styles.date}>Placed on: {product.createdOn}</Text>
//           </View>
//           <View style={styles.statusContainer}>
//             <Text style={[styles.status, getStatusStyle(status)]}>
//               {status}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Link>
//   );
// };

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "Fulfill Product":
//       return styles.fulfillProductStatus;
//     case "Mark as Shipped":
//       return styles.markAsShippedStatus;
//     case "Shipped !":
//       return styles.shippedStatus;
//     default:
//       return styles.defaultStatus;
//   }
// };

// export default ClientProductCard;

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
//   body: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     paddingRight: SIZES.medium,
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontFamily: "bold",
//     fontSize: SIZES.medium,
//     color: COLORS.primary,
//   },
//   price: {
//     fontFamily: "regular",
//     fontSize: SIZES.medium,
//     color: COLORS.primary,
//   },
//   date: {
//     fontFamily: "regular",
//     fontSize: SIZES.small,
//     color: COLORS.gray,
//   },
//   statusContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   status: {
//     fontFamily: "bold",
//     fontSize: SIZES.small,
//     paddingVertical: SIZES.small,
//     paddingHorizontal: SIZES.medium,
//     borderRadius: SIZES.large,
//   },
//   fulfillProductStatus: {
//     backgroundColor: COLORS.primary,
//     color: COLORS.white,
//   },
//   markAsShippedStatus: {
//     backgroundColor: COLORS.orange,
//     color: COLORS.black,
//   },
//   shippedStatus: {
//     backgroundColor: COLORS.green,
//     color: COLORS.black,
//   },
//   defaultStatus: {
//     backgroundColor: COLORS.blue,
//     color: COLORS.white,
//   },
// });

// // ProductCard.tsx
// import React from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// // import { ProductModelProps } from './Product';
// import { COLORS, SIZES } from '@/utils/theme';
// import { Ionicons } from '@expo/vector-icons';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { Link } from 'expo-router';
// import { useClientProduct } from '@/contexts/ClientProductContext';

// const ClientProductCard: React.FC<ProductModelProps> = (product) => {
//   const { selectProduct } = useClientProduct();

//   const handleProductPress = () => {
//     selectProduct(product);
//   };
//   return (
//     // <Link href={"(tabs)/client-products/(create)/create-client-product" as never} asChild>
//     // <Link href={"(tabs)/client-products/(create)/create-client-product" as never} asChild>

//     <Link href={`(tabs)/client-products/(details)/${product.id}` as never} asChild>

//     <TouchableOpacity style={styles.card} onPress={handleProductPress}>
//       <View style={styles.header}>
//         <Text style={styles.productId}>Product ID: {product.id}</Text>
//         <Text style={styles.status}>{product.product_status}</Text>
//       </View>

//       <View style={styles.body}>
//         {/* <Image source={{ uri: props.items[0].image }} style={styles.image} /> */}
//         <View style={styles.details}>
//           <Text style={styles.title}>{product.title}</Text>
//           <Text style={styles.date}>Placed on: {product.product_placed_date}</Text>
//           <Text style={styles.price}>{convertToCurrency(product.total)}</Text>
//         </View>
//       </View>

//       <View style={styles.footer}>
//         <Ionicons name="square" size={24} color={COLORS.primary} />
//       </View>
//     </TouchableOpacity>
//     </Link>
//   );
// };

// export default ClientProductCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: COLORS.white,
//     bproductRadius: SIZES.medium,
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
//   productId: {
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
//     bproductRadius: SIZES.small,
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
