import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import FlashingImages from '../FlashingImages'
import LoginComponentOne from './auth/login/LoginComponentOne'

const SplashScreenView = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 10000)
  })
  return <>{showSplash ? <SplashScreenView /> : <LoginComponentOne/>}</>
}

export default SplashScreenView

const styles = StyleSheet.create({})