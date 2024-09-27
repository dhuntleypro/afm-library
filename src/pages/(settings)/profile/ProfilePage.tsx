import React, { useState, useCallback } from 'react';
import { Alert, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { useAuth, AWS_HOLDER_IMAGE, UserProps } from "@dhuntleypro/afm-library";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native'; // Assuming useTheme is coming from your custom theme
import { useAuth } from '@/contexts/AuthContext';
import { UserProps } from '@/models/UserProps';
import { AWS_HOLDER_IMAGE } from '@/utils/api';

const { width } = Dimensions.get('window');

const ProfilePage: React.FC = () => {
  const { authState, updateSingleUserItem , deleteUser , onLogout } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors)


  const [name, setName] = useState(authState?.user?.name || '');
  const [email] = useState(authState?.user?.email || ''); // Email not editable
  const [address, setAddress] = useState(authState?.user?.address || '');
  const [addressCity, setAddressCity] = useState(authState?.user?.address_city || '');
  const [addressState, setAddressState] = useState(authState?.user?.address_state || '');
  const [addressZip, setAddressZip] = useState(authState?.user?.address_zip || '');
  const [profileImage, setProfileImage] = useState(authState?.user?.profile_image || AWS_HOLDER_IMAGE);

  const handleProfileImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // const handleDelete = async () => {
  //   if (authState.user) {
  //     try {
  //       await deleteUser(authState.user.email);  // Call deleteUser with the user's ID
  //       console.log(`User account deleted : ${authState.user.email}`);

  //       // 
  //       // onLogout()
  //     } catch (error) {
  //       console.error('Error deleting account:', error);
  //     }
  //   } else {
  //     console.log("No current user")
  //   }
  // };


  const handleDelete = async () => {
      const userEmail = authState.user?.email;
      if (userEmail) {
          // Show a confirmation alert before proceeding with the deletion
          Alert.alert(
              "Confirm Deletion",
              "Are you sure you want to delete your account? This action cannot be undone.",
              [
                  {
                      text: "Cancel",
                      onPress: () => console.log("Deletion canceled"),
                      style: "cancel"
                  },
                  { 
                      text: "Delete", 
                      onPress: async () => {
                          try {
                              await deleteUser(userEmail);  // Call deleteUser with the user's email
                              console.log(`User account deleted : ${userEmail}`);
                              // onLogout()
                          } catch (error) {
                              console.error('Error deleting account:', error);
                          }
                      },
                      style: "destructive"
                  }
              ],
              { cancelable: true }
          );
      } else {
          console.log("No current user");
      }
  };
  


  // Function to check if the current value is different from the original value
  const isDifferent = (currentValue: any, originalValue: any) => currentValue !== originalValue;

  // Function to update only changed fields
  const saveProfileChanges = useCallback(async () => {
    const user = authState?.user;

    const updateField = async (field: keyof UserProps, value: any) => {
      if (user && isDifferent(user[field], value)) {
        try {
          await updateSingleUserItem(field, value); // TypeScript knows that `field` is a valid `keyof UserProps`
          console.log(`${String(field)} updated successfully`);
        } catch (error) {
          console.error(`Failed -- to update ${String(field)}:`, error);
        }
      }
    };

    // Save changes for each field that has been modified
    await Promise.all([
      updateField('name', name),
      updateField('address', address),
      updateField('address_city', addressCity),
      updateField('address_state', addressState),
      updateField('address_zip', addressZip),
      updateField('profile_image', profileImage)
    ]);

    Alert.alert("Profile updated successfully!");
}, [authState?.user, name, address, addressCity, addressState, addressZip, profileImage, updateSingleUserItem]);
// }, [authState?.user, address, updateSingleUserItem]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleProfileImagePick}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{authState?.user?.name}</Text>
            <Text style={styles.title}>Edit your profile information</Text>
            
            <TouchableOpacity onPress={() => handleDelete()}>
            <Text style={styles.delete}>Delete Account</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Editable Fields */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="Name"
            onChangeText={setName}
            value={name}
            style={styles.input}
            placeholderTextColor={colors.border}
          />
        </View>

        {email && (
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={colors.text} />
            <TextInput
              placeholder="Email"
              value={email}
              style={styles.input}
              editable={false} // Ensure email is not editable
              placeholderTextColor={colors.border}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="Address"
            onChangeText={setAddress}
            value={address}
            style={styles.input}
            placeholderTextColor={colors.border}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="City"
            onChangeText={setAddressCity}
            value={addressCity}
            style={styles.input}
            placeholderTextColor={colors.border}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="State"
            onChangeText={setAddressState}
            value={addressState}
            style={styles.input}
            placeholderTextColor={colors.border}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color={colors.text} />
          <TextInput
            placeholder="ZIP Code"
            onChangeText={setAddressZip}
            value={addressZip}
            style={styles.input}
            placeholderTextColor={colors.border}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfileChanges}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Create styles dynamically based on the theme colors
const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  card: {
    width: width * 0.9,
    backgroundColor: colors.card,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    paddingTop: 10,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: colors.subtitle,
    textAlign: 'center',
    marginBottom: 10,
  },
  delete: {
    fontSize: 16,
    color: "red",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    width: width - 40,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: width - 40,   
    marginVertical: 20,  
  },                     
  saveButtonText: {      
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfilePage;


