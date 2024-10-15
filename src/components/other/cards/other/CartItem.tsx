// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { getProduct } from '../../api/productsApi';
// import useFetchObjects from '../../hook/useFetchObjects';

// type CartItemProps = {
//     id: string;
//     quantity: number;
//   };

// export function CartItem({ id, quantity }: CartItemProps) {

//   const { data, isLoading, error, refetch } = useFetchObjects(getProduct);



//   const item = Products?.find((i: ProductModelProps) => i.id === id); // gives you acces to everthing in cart id
//   const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

//   if (item == null) return null;


//   return (
//     <>
//       <View style={{ display: 'flex', paddingBottom: '20px' }}>
//         <View>
//           <Image
//             src={item.image}
//             alt=""
//             style={{
//               width: '110px',
//               height: '150px',
//               objectFit: 'cover',
//               border: '1px solid black',
//               // paddingTop: '20px',
//             }}
//           />
//         </View>

//         <View
//           style={{
//             paddingLeft: '20px',
//             width: '250px',
//             fontSize: '12px',
//           }}
//         >
//           {item.name}{' '}
//           {quantity > 1 && (
//             <span className="text-muted" style={{ fontSize: '.65rem' }}>
//               x{quantity}
//             </span>
//           )}
//           <View style={{ paddingTop: '5px' }}>Size: {item.size}</View>
//           <View
//             style={{
//               paddingTop: '5px',
//             }}
//           >
//             Price: {convertToCurrency(item.price)}
//           </View>
//           <View
//             style={{
//               paddingTop: '5px',

//               paddingBottom: '5px',
//             }}
//           >
//             Total: {convertToCurrency(item.price * quantity)}
//           </View>
//           <View style={{ gap: '.5rem', display: 'flex' }}>
//             <View style={{ gap: '.5rem', display: 'flex', paddingBottom: '10px' }}>
//               <Button style={{ padding: '3px', border: '1px solid black' }} onClick={() => decreaseCartQuantity(id)}>
//                 -
//               </Button>
//               <View
//                 style={{
//                   paddingTop: '5px',
//                 }}
//               >
//                 {quantity} in cart
//               </View>
//               <Button style={{ padding: '3px', border: '1px solid black' }} onClick={() => increaseCartQuantity(id)}>
//                 +
//               </Button>
//             </View>
//           </View>
//           <Button
//             style={{
//               fontSize: '10px',
//               display: 'flex',
//               width: '55px',
//               padding: '3px',
//               background: 'none',
//               color: 'black',
//               border: '1.5px solid black',
//             }}
//             onClick={() => removeFromCart(item.id)}
//           >
//             Remove
//           </Button>
//         </View>
//       </View>
//     </>
//   );
// }

// export default CartItem;

//   )
// }

// export default CartItem

// const styles = StyleSheet.create({})