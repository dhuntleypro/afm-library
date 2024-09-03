// 'use client'

// import React, { useState } from 'react';
// import { v4 as uuid } from 'uuid';

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { EvenContainerContent, EvenContainerImageContainer, EvenContainerLeftImage, EvenContainerWithShadow } from '../../Login/LoginPopupElements';

// import { getStore } from '@/api/storeApi';

// import { UserProps, convertToCapitalizeText } from '@dhuntleypro/darriens-react-component-library';
// import { STORE_ID } from '@/utilities/constants';
// import Button from '../../../general/Button';
// import TextField from '../../../general/Textfield';

// export const FormContainer = styled.div`
//   @media screen and (max-width: 768px) {
//     display: flex;
//   }
// `;

// export const FormRight = styled.div`
//   @media screen and (max-width: 768px) {
//     padding-left: 50px;
//   }
// `;

// export const RegisterPopupContent = (props: any) => {
//   const randomID = uuid();
//   const unique_id = randomID.slice(0, 8);
  

//   const [id, setId] = useState('');
//   const [newName, setNewName] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newConfirmPassword, setNewConfirmPassword] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const queryClient = useQueryClient();

//   const { data: store } = useQuery({
//     queryKey: ['store'], // The query key
//     queryFn: getStore, // The query function
//   });

//   const { mutate: handleSubmit } = useMutation({
//     mutationFn: async () => {
      
//     const registerUser: UserProps = {

//         id: 'sampleId',
//         store_ids: ['store1', 'store2'],
//         store_owner_id: 'ownerId',
//         onboardingQ1: 'Answer1',
//         onboardingQ2: 'Answer2',
//         onboardingQ3: 'Answer3',
//         onboardingQ4: 'Answer4',
//         orders: ['order1', 'order2'],
//         cart: [
//         ],
//         favoriteItems: [],
//         abandonedCart: true,
//         affiliate_link: 'sampleAffiliateLink',
//         active: true,
//         role: 'user',
//         birthday: '1990-01-01',
//         todo_completed: false,
//         tableName: 'userTable',
//         name: 'John Doe',
//         username: 'john_doe',
//         email: 'john@example.com',
//         password: 'securePassword',
//         phone_number: '1234567890',
//         gender: 'male',
//         profile_image: 'profileImage.jpg',
//         isAdmin: false,
//         address: '123 Main St',
//         address_city: 'Cityville',
//         address_state: 'Stateville',
//         address_zip: '12345',
//         location: 'Locationville',
//         location_history: ['Location1', 'Location2'],
//         current_notification: 'notification1',
//         notifications: ['notification2', 'notification3'],
//         payment_due: 100.50,
//         payment_due_date: '2023-01-15',
//         payment_due_day: 'Friday',
//         payment_monthly_amount: 50.25,
//         device_id: 'deviceId123',
//         device_os_version: 'iOS 15',
//         device_model: 'iPhone 13',
//         device_ip_address: '192.168.0.1',
//         device_battery_level: '80%',
//         device_battery_statue: 'Charging',
//         device_network_connectio_type: 'WiFi',
//         loyalty_date: '2023-01-01',
//         payment_history_total: 500.75,
//         subscription_id: 'subscription123',
//         paid_subscriber: true,
//         newsletter_subscriber: true,
//         notification_subscriber: true,
//         left_review: true,
//         review_stars: [4, 5],
//         reviews: ['Review1', 'Review2'],
//         testimonials: ['Testimonial1', 'Testimonial2'],
//         notify_arn: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
//       };

//     try {
//       const response = await axios.post(
//         `https://yiiuqhh3a3.execute-api.us-east-1.amazonaws.com/prod/register?tableName=prof-website-user-table&store_id=${STORE_ID}`,
//         registerUser
//       );

//       return response.data; // Return the response data
//     } catch (error) {
//       alert(error);
//       // throw error; // Throw the error to be handled in the `onError` callback
     
//     }
//   },
//   onSuccess: (data) => {
//     console.log('User logged in!!');
//     setNewEmail('');
//     // Handle the successful response data here
//   },
//   onError: (error) => {
//     console.log('Failed to log in');
//     alert(error ? error.message : 'Network error');
//     // Handle the error here
//   },
// });
  

//   return props.closeRegister ? (
//     <>
//       <EvenContainerWithShadow>
//         <EvenContainerImageContainer>
//           <EvenContainerLeftImage
//             style={{
//               height: '450px',
//             }}
//             src={store?.images.register_popup_image ?? ""}
//             alt={'Register Image'}
//           />
//         </EvenContainerImageContainer>

//         <EvenContainerContent style={{ padding: '20px' }}>
//           <h2 style={{ paddingBottom: '20px' }}>Register</h2>
//           <div
//             style={{
//               color: 'red',
//             }}
//           >
//             {<p>{convertToCapitalizeText(message)}</p>}
//           </div>

//           <div style={{ display: 'flex', fontSize: '12px' }}>
//             <p style={{ paddingBottom: '20px', color: 'gray' }}>
//               Already have an account ?
//             </p>
//             <p style={{ paddingBottom: '20px', paddingLeft: '2px' }}>
//               <Button
//                 onPress={() => {
//                   props.setCloseRegister(false);
//                   props.setOpenLogin(true);
//                 } } title={'login'}>
                
//               </Button>
//             </p>
//           </div>

//           <form >
//             {isLoading ? <LoadingIndicator /> : <></>}
//             {/* <FormContainer> */}
//             <div>
//               <TextField
//              //   required={false}
//               //  {...textField_Design_v1}
//               //  label={'Name'}
//               //  width={'260px'}
//              //   value={newName}
//              //   onChange={(event: any) => setNewName(event.target.value)}
//               />

//               <TextField
//                 required={false}
//                 {...textField_Design_v1}
//                 label={'Email'}
//                 value={newEmail}
//                 width={'260px'}
//                 onChange={(event: any) => setNewEmail(event.target.value)}
//               />
//             </div>

//             {/* <FormRight> */}
//             <TextField
//               required={false}
//               {...textField_Design_v1}
//               type={'password'}
//               width={'260px'}
//               value={newPassword}
//               label={'Password'}
//               onChange={(event: any) => setNewPassword(event.target.value)} // width={'100%'}
//             />

//             <TextField
//               required={false}
//               {...textField_Design_v1}
//               type={'password'}
//               width={'260px'}
//               value={newConfirmPassword}
//               label={'Confirm Password'}
//               onChange={(event: any) => {
//                 setNewConfirmPassword(event.target.value);
//                 // setIsAdmin(true);
//               }} // width={'100%'}
//             />

//             <div
//               style={{
//                 paddingTop: '25px',
//               }}
//             >
//               <input
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   // paddingBottom: '70px',
//                   background: 'none',
//                   color: 'black',
//                   border: '2px solid black',
//                   borderRadius: '30px',
//                   boxShadow: '1em',
//                 }}
//                 type="submit"
//                 value="Register"
//                 onClick={() =>{handleSubmit}}
//               />

//               <Button  onClick={() =>{handleSubmit()}}>Submit register</Button>
//             </div>
//           </form>
//         </EvenContainerContent>
//       </EvenContainerWithShadow>
//     </>
//   ) : (
//     <></>
//   );
// };

// export default RegisterPopupContent;








