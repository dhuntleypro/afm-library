import { Dimensions } from "react-native";
const { height , width } = Dimensions.get('window')

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';


const COLORS = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: '#0504aa', // Royal blue
    tabIconDefault: '#CCCCCC',
    tabIconSelected: '#0504aa',
    cardBackground: '#FFFFFF',
    cardText: '#000000',
    cardSecondaryText: '#83829A',  // Gray
    cardPrice: '#000000',
    cardBorder: '#E0E0E0',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: '#FFFFFF',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: '#FFFFFF',
    cardBackground: '#1C1C1E',  // Darker shade for cards in dark mode
    cardText: '#FFFFFF',
    cardSecondaryText: '#B0B0B0',  // Lighter gray
    cardPrice: '#FFFFFF',
    cardBorder: '#444444',  // Darker border for dark mode
  },
  primary: "#3f5a36",
  secondary: "#DDF0FF",
  tertiary: "#FF7754",
  darkGray: '#333333',
  green: '#8BC34A',
  forestGreen: '#3f5a36',
  lightGray: "#F5F5F5",
  gray: "#83829A",
  gray2: "#C1C0C8",
  gray3: "#d3d3d3",
  offwhite: "#F3F4F8",
  white: "#FFFFFF",
  black: "#000000",
  blue: "#0504aa",  // Royal blue
  red: "#E81E4D",
  orange: "#FF5733",
  lightWhite: "#FAFAFC",
  backgroundLight: "#F0F0F3",
  backgroundMedium: "#B9B9B9",
  backgroundDark: "#77777",
};




const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 44,
    height,
    width
}

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5
    }
}

export { COLORS, SIZES, SHADOWS }