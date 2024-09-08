import React, { FC, useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
// import { COLORS, SIZES } from '../utils/theme';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { ProductModelProps } from '../../models/ProductModelProps';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import convertToCurrency from '@/hooks/convertToCurrency';;
import {  useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
// import { CONSTANTS } from '../utils/constants';
// import { WebView } from 'react-native-webview';
// import { HStack, VStack } from '../swiftui/Stack';
import BackButton from '../other/buttons/BackButton';
import paymentApi, { showStripeHostedPage } from '../../api/paymentApi';
import { COLORS, SIZES } from '@/utils/theme';
import { CONSTANTS } from '@/utils/constants';
// import { COLORS, SIZES } from '@/app/utils/theme';
// import { CONSTANTS } from '../../app/utils/constants';

export interface NavigationProp {
  navigation: any; // Adjust the type according to your navigation props type
}

const ProductDetails: FC<ProductModelProps> = (item) => {
  const { authState, onLogout , updateSingleUserItem} = useAuth();

  // const route = useRoute<RouteProp<{ params: { item: ProductModelProps } }>>();
  // const { addToCart } = useContext(CartContext);

  const { addToCart } = useCart()

  // const { item } = route.params;
  const [count, setCount] = useState(1);
  const [likedProducts, setLikedProducts] = useState(false);
  const [stripeUrl, setStripeUrl] = useState<string | null>(null);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const toggleLikes = (productId: string) => {
    const alreadyLiked = authState?.user?.favoriteItems.includes(productId);
    if (alreadyLiked) {
      const updatedLikedProducts = authState?.user?.favoriteItems.filter((id) => id !== productId);
      setLikedProducts(!likedProducts);
    } else {
      setLikedProducts(!likedProducts);
    }
  };


  const handlePayment = async ( variantPriceId : string) => {
    try {
      const response = await showStripeHostedPage(variantPriceId);
      setStripeUrl(response.url);
    } catch (error : any) {
      let errorMessage = 'Failed to create payment session';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  if (stripeUrl) {
    return (
      <>
        <View style={{ padding: 20, paddingTop: 40 }} />
        <View style={{ paddingBottom: 20, paddingLeft: 20 }}>
          <BackButton title={'Home'} />
        </View>
        {/* <WebView
          source={{ uri: stripeUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={(navState: any) => {
            if (navState.url.includes('success')) {
              Alert.alert('Payment Successful');
              setStripeUrl(null);
            }
          }}
        /> */}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity>
          <Ionicons name='chevron-back-circle' size={30} color={COLORS.black} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          toggleLikes(item.id)
          console.log("Item favorted 3- check favorites")

          }}>
          <Ionicons name={likedProducts ? 'heart' : 'heart-outline'} size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image style={styles.image} source={{ uri: item.image ? item.image : CONSTANTS.holderImageProductCard }} />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{convertToCurrency(item.price)}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[...Array(5)].map((_, index: number) => (
              <Ionicons key={index} name='star' size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={increment}>
              <SimpleLineIcons name='plus' size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>  {count}  </Text>
            <TouchableOpacity onPress={decrement}>
              <SimpleLineIcons name='minus' size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name='location-outline' size={20} />
              <Text>  New York</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name='truck-delivery-outline' size={20} />
              <Text>  Free Delivery    </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>{item.item_type === "subscription" ? "SUBSCRIBE NOW" : "BUY NOW"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            addToCart(item );
          }} style={styles.addToCart}>
            <Fontisto name='shopping-bag' size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.variantContainer}>
          {item.variants.map((variant, index) => (
            <Text key={index} style={styles.variant}>
              {variant.title}
              <TouchableOpacity onPress={() => handlePayment(variant.product_id)} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>{item.item_type === "subscription" ? "SUBSCRIBE NOW" : "BUY NOW"}</Text>
          </TouchableOpacity>
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 2,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    paddingHorizontal: SIZES.xSmall,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  descriptionText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  addToCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  variantContainer: {
    padding: 20,
  },
  variant: {
    color: 'red',
  },
});






// import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
// import React , {FC, useContext, useState} from 'react'
// import { COLORS, SIZES } from '../utils/theme'
// import { Ionicons , SimpleLineIcons, MaterialCommunityIcons , Fontisto} from "@expo/vector-icons"
// import { ProductModelProps } from '../models/ProductModelProps';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import convertToCurrency from '../hook/convertToCurrency';
// import { CartContext } from '../contexts/CartContext';
// import { useAuth } from '../contexts/AuthContext';
// import { CONSTANTS } from '../utils/constants';

// export interface NavigationProp {
//   navigation: any; // Adjust the type according to your navigation props type
//   // item: ProductModelProps
// }


// const ProductDetails: FC<NavigationProp> = ({navigation}) => {
//     const { authState, onLogout } = useAuth()

//     const route = useRoute<RouteProp<{ params: { item: ProductModelProps } }>>();
//     const { addToCart} = useContext(CartContext)

//     const { item } = route.params // || {};
//     const [count, setCount] = useState(1)
//     const [likedProducts, setLikedProducts] = useState(false)
   
//    // Plus
//    const increment = () => {
//     setCount(count + 1)
//    }

//    // Minus
//    const decrement = () => {
//     if (count > 1) {
//       setCount(count - 1)
//     } 
//    }




//   const toggleLikes = (productId: string) => {
//     // Check if the product ID is already in the liked products array
//     const alreadyLiked = authState?.user?.favoriteItems.includes(productId);
  
//     // If already liked, remove it from the liked products array; otherwise, add it
//     if (alreadyLiked) {
//       const updatedLikedProducts = authState?.user?.favoriteItems.filter((id) => id !== productId);

//       console.log(`-----${updatedLikedProducts}`)
//       setLikedProducts(!likedProducts);
//     } else {

//       setLikedProducts(!likedProducts);
//       //   //   setLiked(!likes);

//     }
  
//     // Update user's favorites in the backend (you'll need to implement this)
//   //  updateUserFavorites([...likedProducts, productId]); // Replace this with your actual function to update user favorites
//   };


//   return (
    
//     <View style={styles.container}>
//       <View style={styles.upperRow}>
//         <TouchableOpacity onPress={()=>{navigation.goBack()}}>
//         <Ionicons name='chevron-back-circle' size={30} color={COLORS.black}/>
//         </TouchableOpacity>


//         <TouchableOpacity onPress={()=>toggleLikes(item.id)}>
//         <Ionicons name= {likedProducts ? 'heart' : "heart-outline" }size={30} color={COLORS.primary}/>
//         </TouchableOpacity>
//       </View>

//       <Image style={styles.image} source={{uri: item.image  ? item.image : CONSTANTS.holderImage}} />

//       <View  style={styles.details}>
//         <View  style={styles.titleRow}>
//           <Text style={styles.title} >{item.name}</Text>
          
//           <View style={styles.priceWrapper}>
//             <Text  style={styles.price}>{convertToCurrency(item.price)}</Text>
//           </View>
//         </View>

//         <View style={styles.ratingRow}>
//           <View style={styles.rating}>
//           {[...Array(5)].map((_, index: number) => (
//         <Ionicons
//           key={index}
//           // name={index < rating ? 'star' : 'star-outline'} // Use 'star' for filled stars and 'star-outline' for unfilled stars
//           name={'star'} 
//           size={24}
//           color="gold"
//         />
//       ))}

//     <Text style={styles.ratingText}>(4.9)</Text>
//     </View>

//       <View style={styles.rating}>
//         <TouchableOpacity onPress={()=>increment()}>
//           <SimpleLineIcons name='plus' size={20} />
//         </TouchableOpacity>

//         <Text style={styles.ratingText}>  {count}  </Text>

//         <TouchableOpacity onPress={()=> decrement()}>
//           <SimpleLineIcons name='minus' size={20} />
//         </TouchableOpacity>
//       </View> 
//       </View> 
      
//       <View  style={styles.descriptionWrapper}> 
//         <Text style={styles.description}>Description</Text>
//         <Text style={styles.descriptionText}>{item.description}</Text>
//       </View>

//       <View style={{marginBottom: SIZES.small}}>
//         <View style={styles.location}>
//           <View style={{flexDirection: "row"}}>
//             <Ionicons name='location-outline' size={20}/>
//             <Text>  New York</Text>
//           </View>
//           <View style={{flexDirection: "row"}}>
//             <MaterialCommunityIcons name='truck-delivery-outline' size={20}/>
//             <Text>  Free Delivery    </Text>
//           </View>
//         </View>

//       </View>


//       <View style={styles.cartRow}>
//         <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
//          <Text style={styles.cartTitle}>{item.item_type = "subscription" ?  "SUBSCRIBE NOW" : "BUY NOW"}</Text>
//         </TouchableOpacity>
       
//        {/* Cart Button */}
//         <TouchableOpacity onPress={() => {
//           addToCart(item)
//           console.log(item.id)

//         }


//         } style={styles.addToCart}>
//         <Fontisto name='shopping-bag' size={22} color={COLORS.lightWhite }/>
//         </TouchableOpacity>
       
//       </View>



//     </View>
//     </View>
//   )
// }

// export default ProductDetails

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightWhite,

//   },
//   upperRow: {
//     marginHorizontal: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     position: "absolute",
//     top: SIZES.xxLarge,
//     width: SIZES.width -44,
//     zIndex: 999
//   },
//   image: {
//     aspectRatio: 1,
//     resizeMode: "cover"
//   },
//   details: {
//     marginTop: -SIZES.large,
//     backgroundColor: COLORS.lightWhite,
//     width: SIZES.width,
//     borderTopLeftRadius: SIZES.medium,
//     borderTopRightRadius: SIZES.medium,

//   },
//   titleRow: {
//     marginHorizontal: 20,
//     paddingBottom: SIZES.small,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignContent: "center",
//     width: SIZES.width -44,
//     top: 20

//   },
//   title: {
//     fontFamily: "bold",
//     fontSize: SIZES.medium + 2

//   },
//   priceWrapper : {
//     backgroundColor: COLORS.secondary,
//     borderRadius: SIZES.large

//   },
//   price: {
//     paddingHorizontal: 10,
//     fontFamily: "semibold",
//     fontSize: SIZES.large

//   },
//   ratingRow: {
//     paddingBottom: SIZES.small,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignContent: "center",
//     width: SIZES.width -10,
//     top: 5
//   }, 
//   rating : {
//     top: SIZES.large,
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     marginHorizontal: SIZES.large

//   }, 
//   ratingText: {
//     color: COLORS.gray,
//     fontFamily: "medium",
//      paddingHorizontal: SIZES.xSmall
//   },
//   descriptionWrapper: {
//     marginTop: SIZES.large * 2,
//     marginHorizontal: SIZES.large
//   },
//   description: {
//     fontFamily: "medium",
//     fontSize: SIZES.large -2

//   },
//   descriptionText: {
//     fontFamily: "regular",
//     fontSize: SIZES.small ,
//     textAlign: 'justify',
//     marginBottom: SIZES.small

//   },
//   location: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: COLORS.secondary,
//     marginHorizontal: 12,
//     padding: 5,
//     borderRadius: SIZES.large
//   },
//   cartRow: {
//     paddingBottom: SIZES.small,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: SIZES.width ,
//   },
//   cartBtn: {
//     width: SIZES.width*0.7,
//     backgroundColor: COLORS.black,
//     padding: SIZES.small/2,
//     borderRadius: SIZES.large,
//     marginLeft: 12
//   },
//   cartTitle: {
//     marginLeft: SIZES.small,
//     fontFamily: "semibold",
//     fontSize: SIZES.medium,
//     color: COLORS.lightWhite
//   },
//   addToCart: {
//     width: 37,
//     height: 37,
//     borderRadius: 50,
//     margin: SIZES.small,
//     backgroundColor:  COLORS.black,
//     alignItems: "center",
//     justifyContent: "center"
//   }

// })