import { Button, Image, StyleSheet, Text, TextInput, View, Alert , Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, SplashScreen, Stack, useNavigation, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { UserProps } from '@/models/UserProps';
import { generateUUID } from '@/hooks/generateUUID';
import { useClientStore } from '@/contexts/ClientStoreContext';

const LoginComponentOne = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister, onLogout , authState } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [openModal , setOpenModal] = useState(false)

  const {store} = useClientStore()



  const showAlert = (message: string) => Alert.alert("Error", message, [{ text: "OK" }]);

  const loginAction = async () => {
    try {
      const result = await onLogin!(store?.id ?? "",email, password);
      if (result.error) {
        showAlert(result.msg);
      } else {
        console.log("Login successful");
        // Wrap navigation.goBack in a try-catch block
        try {
        router.replace('/home' as never)

        } catch (navError) {
          console.error("Navigation error:", navError);
        }
      }
    } catch (error: any) {
      console.error("(5) Login error:", error.message);
      showAlert("Login failed. Please try again.");
    }
  };

  const registerAction = async () => {
    const user: UserProps = {
      id: generateUUID(8),
      name,
      email,
      password,
      store_ids: [],
      store_owner_id: '',
      onboardingQ1: '',
      onboardingQ2: '',
      onboardingQ3: '',
      onboardingQ4: '',
      orders: [],
      favoriteItems: [],
      cart: [],
      affiliate_link: '',
      active: false,
      role: '',
      birthday: '',
      todo_completed: false,
      tableName: '',
      username: '',
      phone_number: '',
      gender: '',
      profile_image: '',
      address_city: '',
      address_state: '',
      location_history: [],
      current_notification: '',
      notifications: [],
      payment_due: 0,
      payment_due_date: '',
      payment_due_day: '',
      payment_monthly_amount: 0,
      device_id: '',
      device_os_version: '',
      device_model: '',
      device_ip_address: '',
      device_battery_level: '',
      device_battery_statue: '',
      device_network_connectio_type: '',
      loyalty_date: '',
      payment_history_total: 0,
      subscription_id: '',
      paid_subscriber: false,
      newsletter_subscriber: false,
      notification_subscriber: false,
      left_review: false,
      review_stars: [],
      reviews: [],
      testimonials: [],
      notify_arn: '',
      owner_notify_arn: ''
    };

    try {
      const result = await onRegister!(store?.id ?? "", user);
      if (result.error) {
        showAlert(result);
        return;
      } else {
        console.log("Registration successful");
        // Call the loginAction after successful registration
        loginAction();
      }
    } catch (error : any) {
      console.error("(1) Registration error:", error.message);
      showAlert("Registration failed. Please try again.");
    }
  };

  return (
    
    // <Modal visible={openModal} >
    <View style={styles.container}>
            <Stack.Screen  options={{ title: 'Login'  }}  />

      {/* <Modal visible={openModal} transparent={true} animationType='fade' > */}
      <View style={styles.imgContainer}>
        <Image source={{ uri: 'https://appsformankind-assets.s3.amazonaws.com/Products/Oak_and_Ivy/Furniture_8.jpg' }} style={styles.img} />
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name} />
        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
        <Button onPress={loginAction} title="Sign in" />
        <Button onPress={registerAction} title="Create Account" />
        <Button onPress={onLogout} title="Logout" />
        {/* <Text>{authState?.authenticated ? "TRUE": "FALSE"}</Text> */}

      </View>
      {/* </Modal> */}
    </View>
   
    
  );
};

export default LoginComponentOne;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  imgContainer: {
    marginLeft: 8,
    height: 200,
    width: 200,
    borderRadius: 6,
    paddingTop: 30,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  form: {
    paddingTop: 50,
    gap: 10,
    width: '60%',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});





