// import React, { FC, useState } from 'react';
// import LoginPopupContent from './LoginPopupContent';
// import RegisterPopupContent from '../../Register/RegisterPopupButton/RegisterAndLoginPopupContent';
// import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
// import Button from '../../../general/Button';
// import Popup from '../../../general/Popup';
// import { SIZES } from '../@/utils/theme';

// export const LoginPopupButton = () => {
//   const [loginPopup, setLoginPopup] = useState(false);
//   const [registerPopup, setRegisterPopup] = useState(false);

//   return (
//     <>
//       <Button
//         color='black'
//         onPress={() => {
//           setLoginPopup(!loginPopup);
//         } } 
//         title={'Login'}>
        
//       </Button>

//       <Popup
//         trigger={loginPopup}
//         setTrigger={() => setLoginPopup(!loginPopup)}
//         variant={'even'} // required
//         cancelButtonColor={'gray'} // corrected a typo here
//       >
//         <LoginPopupContent
//           closeLogin={loginPopup}
//           setCloseLogin={() => setLoginPopup(!loginPopup)}
//           openRegister={registerPopup}
//           setOpenRegister={() => setRegisterPopup(!registerPopup)}
//         />
//       </Popup>

//       <Popup
//         trigger={registerPopup}
//         setTrigger={() => setRegisterPopup(!registerPopup)}
//         variant={'even'} // required
//         cancelButtonColor={'gray'} // corrected a typo here
//       >
//         <RegisterPopupContent
//           closeRegister={registerPopup}
//           setCloseRegister={() => setRegisterPopup(!registerPopup)}
//           openLogin={loginPopup}
//           setOpenLogin={() => setLoginPopup(!loginPopup)}
//           navigateToDashboard={false}
//         />
//       </Popup>
//     </>
//   );
// };

// export default LoginPopupButton;




// const styles = StyleSheet.create({
//   container: {
//     marginTop: SIZES.medium,
//     marginLeft: 12
//   }
// })










