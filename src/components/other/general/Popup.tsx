import React from 'react';
import { Text, View , StyleSheet} from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons'; // Importing icons

const Popup = (props: any) => {
  return props.trigger ? (
    <>
      {/* 1 column */}
      {props.variant === 'single' ? <View><Text>uhii</Text></View> : <></>}

      {/* 2+ column */}
      {props.variant === 'even' ? (
        // <EvenColumn>
        <View style={styles.popupContainer}>
          <View style={styles.popupInner}>
            <View style={styles.closeButtonContainer}>
            <Ionicons name="close" size={32} color={props.cancleButtonColor} />
            </View>
            {props.children}
          </View>
        </View>
      ) : (
        <View><Text>[popup] under development</Text></View>
      )}
    </>
  ) : (
    <></>
  );
};

export default Popup;


const styles = StyleSheet.create({
    popupContainer: {
        position: 'absolute', // Use absolute positioning instead of fixed
        top: 0,
        left: 0,
        right: 0, // Use right: 0 instead of width: '100%'
        bottom: 0, // Use bottom: 0 instead of height: '100vh'
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Example background color with opacity
        justifyContent: 'center', // Adjust as needed
        alignItems: 'center', // Adjust as needed
      },
  popupInner: {
    position: 'relative',
    width: '100%',
    maxWidth: 640,
    backgroundColor: '#fff',
    borderRadius: 30,
    zIndex: 99,
    // overflow: 'hidden', // Remove this line, as overflow is not supported in React Native
    // overscrollBehavior: 'contain', // Remove this line, as overscrollBehavior is not supported in React Native

    // Add media query styles directly in the component based on screen dimensions
    // For simplicity, we're not including media query styles here
  },
  closeButtonContainer: {
   
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 25,
  },
});

