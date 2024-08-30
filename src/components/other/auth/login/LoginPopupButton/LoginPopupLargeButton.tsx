// 'use client'

// // import { Button, Popup } from '@dhuntleypro/darriens-react-component-library';
// // import { Button, Popup } from '@dhuntleypro/darriens-react-component-library';
// import React, { useState } from 'react';
// import styled from 'styled-components';

// // import RegisterPopupContent from '../RegisterPopupButton/RegisterAndLoginPopupContent';
// import LoginPopupContent from './LoginPopupContent';
// import Button from '@/components/general/buttons/Button.styles';
// import Popup from '@/components/general/popup/Popup';
// import RegisterPopupContent from '../../Register/RegisterPopupButton/RegisterAndLoginPopupContent';

// const MenuButton = styled(Button)`
//   text-decoration: none;
//   color: black;
//   font-size: 50px;

//   &:hover {
//     font-weight: bold;
//   }
// `;

// export const LoginPopupLargeButton = () => {
//   const [loginPopup, setLoginPopup] = useState(false);
//   const [registerPopup, setRegisterPopup] = useState(false);

//   return (
//     <>
//       <MenuButton
//         onClick={() => {
//           setLoginPopup(!loginPopup);
//         }}
//       >
//         Login
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

// export default LoginPopupLargeButton;
