import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { useMankindProduct } from "@/contexts/MankindProductContext";

const AuthLayout = () => {
  const { authState } = useAuth();
  return (
      <Stack
        screenOptions={{
          headerShown: false, // Hide headers globally
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
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

export default AuthLayout;

const styles = StyleSheet.create({});
