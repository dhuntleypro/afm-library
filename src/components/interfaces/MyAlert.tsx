import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface AlertComponentProps {
  title: string;
  message: string;
  cancelText?: string;
  updateText?: string;
  onCancelPress?: () => void;
  onUpdatePress?: () => void;
  cancelable?: boolean;
}

export const MyAlert: React.FC<AlertComponentProps> = ({
  title,
  message,
  cancelText = 'Cancel',
  updateText = 'Update Store',
  onCancelPress,
  onUpdatePress,
  cancelable = false,
}) => {
  const router = useRouter();

  React.useEffect(() => {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancelText,
          onPress: onCancelPress || (() => console.log('Cancel Pressed')),
          style: 'cancel',
        },
        {
          text: updateText,
          onPress: onUpdatePress || (() => router.push('/store' as never)),
        },
      ],
      { cancelable }
    );
  }, []);

  return null; // This component doesn't render anything visible.
};

export default MyAlert;
