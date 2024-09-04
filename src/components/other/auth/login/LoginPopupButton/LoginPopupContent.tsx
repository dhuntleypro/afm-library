// import React, { FC, useState } from 'react';

// // import { useRouter } from 'next/navigation';
// // import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// // import { getStore } from '@/api/storeApi';
// // import { AWS_LOGIN_URL, STORE_ID } from '@/utilities/constants';
// import {
//   EvenContainerContent,
//   EvenContainerImageContainer,
//   EvenContainerLeftImage,
//   EvenContainerWithShadow,
// } from '../LoginPopupElements';
// // import Button from '@/components/general/buttons/Button.styles';
// // import TextField from '@/components/general/textfields/Rectangle/TextField';
// // // import LoadingIndicator from '@/components/general/loading/LoadingIndicator';
// // import textField_Design_v1 from '@/components/general/textfields/TextField';
// // // import { getCookies, setCookie } from 'cookies-next';
// // import { UserProps } from '@dhuntleypro/darriens-react-component-library';
// // import { getUserCookie, setUserCookie } from '@/config/cookieUtils';
// // import * from 'next-cookies';

// export const LoginPopupContent = (props: any) => {
//   // const user: UserProps = getUserCookie();
//   // const isAdmin = user ? user.isAdmin : false;

//   // const { data: store, isLoading, error : storeError, isError: storeIsError } = useQuery({
//   //   queryKey: ['store'], // The query key
//   //   queryFn: getStore, // The query function
//   // });

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   // const router = useRouter()

//   // const queryClient = useQueryClient();

//   // const router = useRouter();
//   // const handleSubmit = (e: any) => {
//   //   e.preventDefault();

//   //   alert('Submit')
    
//   // };

  
//   const handleLogin = async () => {
//     try {
//       const loginUser = {
//         email: email,
//         password: password,
//       };

//       // Replace 'YOUR_LOGIN_URL' with your actual login endpoint
//       const response = await fetch(`https://yiiuqhh3a3.execute-api.us-east-1.amazonaws.com/prod/login?tableName=prof-website-user-table&store_id=${STORE_ID}`,
//        {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginUser),
//       });

//       if (response.ok) {
//         // Successful login, you can handle the response here
//         const data = await response.json();
//         console.log('User logged in:', data);
//         // setUserCookie(data.user, data.token);
        
//        router.push('/')


//         // You can store the user data or token in a session, cookie, or local storage
//         // Example: localStorage.setItem('user', JSON.stringify(data.user));
//         // Example: localStorage.setItem('token', data.token);

//         setMessage('Login Successful');
//       } else {
//         const errorData = await response.json();
//         setMessage(errorData.error || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage(`Network error: ${error}`);
//     }
//   };



//   return props.closeLogin ? (
//     <>
//       <div
//         style={{
//           overflow: 'hidden',
//         }}
//       >
//         <EvenContainerWithShadow>
//           <EvenContainerImageContainer
//             style={{
//               height: '400px',
//             }}
//           >
//             <EvenContainerLeftImage
//               src={store?.images.login_popup_image ?? ""}
//               alt={'login image'}
//               // style={{ height: '100%' }}
//             />
//           </EvenContainerImageContainer>

//           <EvenContainerContent style={{ padding: '20px' }}>
//             <h2 style={{ paddingBottom: '20px' }}>Login</h2>
//             <div style={{ display: 'flex' }}>
//               <p style={{ paddingBottom: '20px', color: 'gray' }}>
//                 {"Don't have an account ?"}
//               </p>
//               <p style={{ paddingBottom: '20px', paddingLeft: '2px' }}>
//                 <Button
//                   onClick={() => {
//                     props.setCloseLogin(false);
//                     props.setOpenRegister(true);
//                   }}
//                 >
//                   Register
//                 </Button>
//               </p>
//             </div>
//             <form>
//               {/* {isLoading ? <LoadingIndicator /> : <></>} */}
//               <TextField
//                 required={false}
//                 {...textField_Design_v1}
//                 label={'email'}
//                 width={'200px'}
//                 value={email}
//                 onChange={(event: any) => setEmail(event.target.value)}
//               />

//               <TextField
//                 required={false}
//                 {...textField_Design_v1}
//                 label={'password'}
//                 type={'password'}
//                 value={password}
//                 onChange={(event: any) => setPassword(event.target.value)}
//               />

//               <div
//                 style={{
//                   paddingTop: '25px',
//                 }}
//               >
                 
// <button    
//                          style={{
//                           width: '100%',
//                           padding: '10px',
//                           // paddingBottom: '70px',
//                           background: 'none',
//                           color: 'black',
//                           border: '2px solid black',
//                           borderRadius: '30px',
//                           boxShadow: '1em',
      
//                           // position: 'absolute',
//                           // bottom: 0,
//                         }}
//                           type="button" onClick={handleLogin}>
//           Login
//         </button>
//               </div>
//             </form>
//             {message && <p>{message}</p>}
//           </EvenContainerContent>
//         </EvenContainerWithShadow>
//       </div>
//     </>
//   ) : (
//     <></>
//   );
// };


// export default LoginPopupContent;


