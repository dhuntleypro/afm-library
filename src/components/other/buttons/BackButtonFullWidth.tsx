import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

interface BackButtonProps {
  title: string
}

const BackButtonFullWidth: FC<BackButtonProps> = (props) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} color={COLORS.lightWhite}/>
          </TouchableOpacity>
          <Text style={styles.heading}>{props.title}</Text>
        </View>
      </View>
    </View>
  )
}

export default BackButtonFullWidth

const styles = StyleSheet.create({
  container: {
    height: 100, // Adjust the height as needed
    // backgroundColor: COLORS.lightWhite
  },
  wrapper: {
    height: '100%',
    alignItems: 'center', // Align items to the center
    marginTop: SIZES.large // Adjust the top margin
  },
  upperRow: {
    width: SIZES.width - 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    paddingHorizontal: SIZES.large // Add horizontal padding
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5
  }
})
