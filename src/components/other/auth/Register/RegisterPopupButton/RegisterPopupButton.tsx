// // import { Button, Popup } from '@dhuntleypro/darriens-react-component-library';
// import React, { FC, useState } from 'react';
// // import LoginPopupContent from '../LoginPopupButton/LoginPopupContent';
// import RegisterPopupContent from './RegisterAndLoginPopupContent';
// import Button from '../../../general/Button';
// import Popup from '../../../general/Popup';

// export interface RegisterPopupButtonProps {
//   name: string;
//   color?: string;
//   padding?: string;
//   paddingLeft?: string;
//   paddingRight?: string;
//   backgroundColor?: string;
//   borderRadius?: string;
//   width?: string;
//   height?: string;
//   display?: string;
//   justifyContent?: string;
//   paddingTop?: string;
// }

// export const RegisterPopupButton: FC<RegisterPopupButtonProps> = (props) => {
//   const [loginPopup, setLoginPopup] = useState(false);
//   const [registerPopup, setRegisterPopup] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <>
//       <Button
//         // style={{ ...props }}
//         onPress={() => {
//           setRegisterPopup(!registerPopup);
//         } } 
//         title={ props.name}>
        
//       </Button>
//       <Popup
//         trigger={loginPopup}
//         setTrigger={() => setLoginPopup(!loginPopup)}
//         variant={'even'} // required
//       >
//         <LoginPopupContent
//           email={email}
//           password={password}
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
//       >
//         <RegisterPopupContent
//           email={email}
//           password={password}
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

// export default RegisterPopupButton;
