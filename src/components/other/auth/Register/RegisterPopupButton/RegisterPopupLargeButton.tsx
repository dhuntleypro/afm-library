// 'use client'

// // import { Button, Popup } from '@dhuntleypro/darriens-react-component-library';
// import React, { useState } from 'react';
// import styled from 'styled-components';

// // import LoginPopupContent from '../LoginPopupButton/LoginPopupContent';
// import RegisterPopupContent from './RegisterAndLoginPopupContent';
// import Button from '@/components/general/buttons/Button.styles';
// import Popup from '@/components/general/popup/Popup';
// import LoginPopupContent from '../../Login/LoginPopupButton/LoginPopupContent';

// const MenuButton = styled(Button)`
//   text-decoration: none;
//   color: black;
//   font-size: 50px;

//   &:hover {
//     font-weight: bold;
//   }
// `;

// export const RegisterPopupLargeButton = () => {
//   const [loginPopup, setLoginPopup] = useState(false);
//   const [registerPopup, setRegisterPopup] = useState(false);

//   return (
//     <>
//       <MenuButton
//         onClick={() => {
//           setRegisterPopup(!registerPopup);
//         }}
//       >
//         Register
//       </MenuButton>

//       <Popup
//         trigger={loginPopup}
//         setTrigger={() => setLoginPopup(!loginPopup)}
//         variant={'even'} // required
//       >
//         <LoginPopupContent
//           closeLogin={loginPopup}
//           setCloseLogin={() => setLoginPopup(!loginPopup)}
//           openRegister={registerPopup}
//           setOpenRegister={() => setRegisterPopup(!registerPopup)}
//           x_api_key={''}
//           login_url={''}
//           login_image={''}
//           submit={undefined}
//         />
//       </Popup>

//       <Popup
//         trigger={registerPopup}
//         setTrigger={() => setRegisterPopup(!registerPopup)}
//         variant={'even'} // required
//       >
//         <RegisterPopupContent
//           closeRegister={registerPopup}
//           setCloseRegister={() => setRegisterPopup(!registerPopup)}
//           openLogin={loginPopup}
//           setOpenLogin={() => setLoginPopup(!loginPopup)}
//         />
//       </Popup>
//     </>
//   );
// };

// export default RegisterPopupLargeButton;
