import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
// import { useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
// import { useMankindProduct } from "@/contexts/MankindProductContext";

export const AuthLayoutContent = () => {
  return (
      <Stack
        screenOptions={{
          headerShown: false, // Hide headers globally
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            // headerShown: false,
            presentation: "fullScreenModal", // Full-screen modal presentation
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            presentation: "fullScreenModal", // Full-screen modal presentation
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            presentation: "fullScreenModal", // Full-screen modal presentation
          }}
        />
      </Stack>
    );

};

export default AuthLayoutContent;

const styles = StyleSheet.create({});
