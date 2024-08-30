import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '@/utils/theme';
import { Ionicons, Fontisto } from '@expo/vector-icons';
// import { NavigationProp } from '../../screens/ProductDetails';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../buttons/BackButton';

interface NavCrudHeader {
    onCheckPress: () => void;
    backButtonTitle: string;
    title: string;
  }
  

const NavBackAndTitle: FC<NavCrudHeader> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* <StatusBar /> */}
            <View style={styles.itemsContainer}>
                <BackButton title={props.backButtonTitle} />
                <TouchableOpacity style={styles.cartItem} onPress={props.onCheckPress}>
                <Fontisto name='check' size={24} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.headerTitle}>{props.title}</Text>
            </View>

    </View>
  );
};

export default NavBackAndTitle;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    padding: 15,
    // backgroundColor: COLORS.black,
  },
  itemsContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // flex: 1,
  },
  cartItem: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    // textAlign: 'center',

    // flex: 1,
  },
});


// const styles = StyleSheet.create({
//     container: {
      
//     },
//     itemsContainer: {
//         width: '100%',
//        flexDirection: 'row',
//        justifyContent: 'space-between',
//        padding: 16
//      },
//      menuItem: {
//         fontSize: 18,
//         color: COLORS.backgroundMedium,
//         padding: 12,
//         borderRadius: 10,
//         backgroundColor: COLORS.backgroundLight
//      },
//      cartItem: {
//         fontSize: 18,
//         color: COLORS.backgroundMedium,
//         padding: 12,
//         borderRadius: 10,
//         borderWidth: 1,
//         backgroundColor: COLORS.backgroundLight
//      },
//      headerTitle: {
//         fontSize: 30,
//         fontWeight: "bold", 
//         marginLeft: 16
//         }
 

// })