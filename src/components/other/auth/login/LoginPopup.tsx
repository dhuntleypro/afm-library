// 'use client'

// import { login } from '@/api/Authentication';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// import React, { useState } from 'react'
// import { EvenContainerContent, EvenContainerImageContainer, EvenContainerLeftImage, EvenContainerWithShadow } from './LoginPopupElements';
// import Button from '@/components/general/buttons/Button.styles';
// import TextField from '@/components/general/textfields/Rectangle/TextField';
// import textField_Design_v1 from '@/components/general/textfields/TextField';
// import LoadingIndicator from '@/components/general/loading/LoadingIndicator';
// import { getStore } from '@/api/storeApi';
// import { STORE_ID } from '@/utilities/constants';

// const LoginPopup = () => {
//   const queryClient = useQueryClient();


//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');


    
//   const { data: store } = useQuery({
//     queryKey: ['store'], // The query key
//     queryFn: getStore, // The query function
//   });

//   const { mutate: handleSubmit } = useMutation({
//     mutationFn: async () => {
//       const loginUser = {
//         email: email,
//         password: password,
//       };

//       try {
//         const response = await axios.post(
//           `https://yiiuqhh3a3.execute-api.us-east-1.amazonaws.com/prod/login?tableName=prof-website-user-table&store_id=${STORE_ID}`,
//           loginUser
//         );
  
//         return response.data; // Return the response data
//       } catch (error) {
//         alert(error);
//         // throw error; // Throw the error to be handled in the `onError` callback
       
//       }
//     },
//     onSuccess: (data) => {
//       console.log('User logged in!!');
//       setEmail('');
//       // Handle the successful response data here
//     },
//     onError: (error) => {
//       console.log('Failed to log in');
//       alert(error ? error.message : 'Network error');
//       // Handle the error here
//     },
//   });
    
  

//   return (
//     <>
//     <div
//       style={{
//         overflow: 'hidden',
//       }}
//     >
//       <EvenContainerWithShadow>
//         <EvenContainerImageContainer
//           style={{
//             height: '400px',
//           }}
//         >
//           <EvenContainerLeftImage
//             //  src={store?.login_popup_image ?? "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/login-popup-image.jpg"}
//              src={store?.images.login_popup_image ?? "https://"}
//              // src={''}
//             alt={'login image'}
//             // style={{ height: '100%' }}
//           />
//         </EvenContainerImageContainer>

//         <EvenContainerContent style={{ padding: '20px' }}>
//           <h2 style={{ paddingBottom: '20px' }}>Login</h2>
//           <div style={{ display: 'flex' }}>
//             <p style={{ paddingBottom: '20px', color: 'gray' }}> {"Don't have an account ?"}</p>
//             <p style={{ paddingBottom: '20px', paddingLeft: '2px' }}>
//               <Button
//                 onClick={() => {
//                   // props.setCloseLogin(false);
//                   // props.setOpenRegister(true);
//                 }}
//               >
//                 Register
//               </Button>
//             </p>
//           </div>
//           <form>
//             {/* {isPending ? <LoadingIndicator /> : <></>} */}
//             <TextField
//               required={false}
//               {...textField_Design_v1}
//               label={'email'}
//               width={'200px'}
//               value={email}
//               onChange={(event: any) => setEmail(event.target.value)}
//             />

//             <TextField
//               required={false}
//               {...textField_Design_v1}
//               label={'password'}
//               type={'password'}
//               value={password}
//               onChange={(event: any) => setPassword(event.target.value)}
//             />

//             <div
//               style={{
//                 paddingTop: '25px',
//               }}
//             >
//              <button  
//             style={{
//                   width: '100%',
//                   padding: '10px',
//                   // paddingBottom: '70px',
//                   background: 'none',
//                   color: 'black',
//                   border: '2px solid black',
//                   borderRadius: '30px',
//                   boxShadow: '1em',

//                   // position: 'absolute',
//                   // bottom: 0,
//                 }}
//                 onClick={() => handleSubmit()
//                 }>Login</button>
            
//             </div>
           

//           </form>
//           {message && <p>{message}</p>}
//         </EvenContainerContent>
//       </EvenContainerWithShadow>
//     </div>
//   </>
//   )
// }

// export default LoginPopup
