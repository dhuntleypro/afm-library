import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
<<<<<<< HEAD

const HomeDesignThree = () => {
  return (
    <View>
      <Text>HomeDesignThree</Text>
=======
import convertToCurrency from '@/hooks/convertToCurrency'
import { useClientStore } from '@/contexts/ClientStoreContext'

export const HomeDesignThree = () => {
    const numb = 5
    // const { store } = useClientStore();

  return (
    <View>
      <Text>HomeDesignThree  {convertToCurrency(numb)}</Text>
     
>>>>>>> dev
    </View>
  )
}

export default HomeDesignThree

const styles = StyleSheet.create({})