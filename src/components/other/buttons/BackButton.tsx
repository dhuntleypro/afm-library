import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

interface BackButtonProps {
  title: string
}

const BackButton: FC<BackButtonProps> = (props) => {
  const navigation = useNavigation()
  return (
    // <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} color={COLORS.black}/>
          </TouchableOpacity>
          <Text style={styles.heading}>{props.title}</Text>
        </View>
      </View>
    // </View>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    height: 100, // Adjust the height as needed
    // backgroundColor: COLORS.lightWhite
  },
  wrapper: {
    // height: '100%',
    // alignItems: 'center', // Align items to the center
    // marginTop: SIZES.large // Adjust the top margin
  },
  upperRow: { // text
    // width: SIZES.width - 50,
    flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    // borderRadius: SIZES.large,
    // paddingHorizontal: SIZES.large // Add horizontal padding
  },
  heading: { // text
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 5
  }
})
