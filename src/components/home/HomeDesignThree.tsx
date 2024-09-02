import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import convertToCurrency from '@/hooks/convertToCurrency'

export const HomeDesignThree = () => {
    const numb = 5
  return (
    <View>
      <Text>HomeDesignThree  {convertToCurrency(numb)}</Text>
     
    </View>
  )
}

export default HomeDesignThree

const styles = StyleSheet.create({})