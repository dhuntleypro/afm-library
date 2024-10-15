// CustomBottomSheet.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native'; // Assuming you're using react-navigation

// NOT WORKING CORRECTLY
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CustomBottomSheetProps {
  children: React.ReactNode;
  initialHeight?: number;
  maxHeight?: number;
}

const AFMBottomSheet: React.FC<CustomBottomSheetProps> = ({ children, initialHeight = 300, maxHeight = SCREEN_HEIGHT * 0.7 }) => {
  const translateY = useSharedValue(SCREEN_HEIGHT - initialHeight);

  // Animated styles for dynamic height control
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onGestureEvent = useCallback((event: any) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 0) {
      translateY.value = withSpring(SCREEN_HEIGHT - initialHeight + translationY);
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT - maxHeight + translationY);
    }
  }, []);

  const onGestureEnd = useCallback(() => {
    if (translateY.value > SCREEN_HEIGHT - initialHeight + 100) {
      translateY.value = withSpring(SCREEN_HEIGHT - initialHeight); // collapse
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT - maxHeight); // expand
    }
  }, []);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
      <Animated.View style={[styles.bottomSheet, animatedStyle]}>
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default AFMBottomSheet;
