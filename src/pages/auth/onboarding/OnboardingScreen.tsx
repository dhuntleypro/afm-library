import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View as MotiView } from 'moti';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItemInfo,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff' };

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  imageFrom: any;
  imageTo: any;  
  imageTransition: any;
  textFrom: any;
  textTo: any;
  textTransition: any;
}

const initialSlides: SlideData[] = [
  {
    id: 1,
    image: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/pitch-meeting-2.png",
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageFrom: { opacity: 0, translateY: 50, scale: 0.85 },
    imageTo: { opacity: 1, translateY: 0, scale: 1 },
    imageTransition: {
      type: 'timing',
      duration: 600,
      delay: 300,
    },
    textFrom: { opacity: 0, translateX: width }, // Start off-screen to the right
    textTo: { opacity: 1, translateX: 0 },
    textTransition: { type: 'timing', duration: 600, delay: 500 },
  },
  {
    id: 2,
    image: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/online-shopping-2.png",
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageFrom: { opacity: 0, translateY: 50, scale: 0.85 },
    imageTo: { opacity: 1, translateY: 0, scale: 1 },
    imageTransition: {
      type: 'timing',
      duration: 600,
      delay: 300,
    },
    textFrom: { opacity: 0, translateX: width }, // Start off-screen to the right
    textTo: { opacity: 1, translateX: 0 },
    textTransition: { type: 'timing', duration: 600, delay: 500 },
  },
  {
    id: 3,
    image: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/signin.png",
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageFrom: { opacity: 0, translateY: 50, scale: 0.85 },
    imageTo: { opacity: 1, translateY: 0, scale: 1 },
    imageTransition: {
      type: 'timing',
      duration: 600,
      delay: 300,
    },
    textFrom: { opacity: 0, translateX: width }, // Start off-screen to the right
    textTo: { opacity: 1, translateX: 0 },
    textTransition: { type: 'timing', duration: 600, delay: 500 },
  },
];

const Slide: React.FC<{ item: SlideData; resetKey: number }> = ({ item, resetKey }) => {
  return (

    
    <View style={{ alignItems: 'center', width }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <MotiView
        key={`${resetKey}-image`} // Force re-render to reset animation
        from={item.imageFrom}
        animate={item.imageTo}
        transition={item.imageTransition}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </MotiView>

      <MotiView
        key={`${resetKey}-text`} // Force re-render to reset animation
        from={item.textFrom}
        animate={item.textTo}
        transition={item.textTransition}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </MotiView>
    </View>
  );
};

const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [resetKey, setResetKey] = useState<number>(0);
  const ref = useRef<FlatList<SlideData>>(null);
  const { authState } = useAuth();
  const [slides, setSlides] = useState<SlideData[]>(initialSlides);

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
    setResetKey(prevKey => prevKey + 1); // Force reset on slide change
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
      setResetKey(prevKey => prevKey + 1); // Force reset on slide change
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
    setResetKey(prevKey => prevKey + 1); // Force reset on skip
  };

  const Footer: React.FC = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentSlideIndex === 2 ? (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.replace('/login' as never)}
            >
              <Text style={styles.btnText}>GET STARTED</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btnSkipAndNext, styles.skipButton]}
                onPress={skip}
              >
                <Text style={styles.skipText}>SKIP</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacing} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btnSkipAndNext}
              >
                <Text style={styles.btnText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }: ListRenderItemInfo<SlideData>) => 
          item.id === currentSlideIndex + 1 ? (
            <Slide item={item} resetKey={resetKey} />
          ) : (
            <View/>
          )
        }
        keyExtractor={(item) =>  String(item.id)}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer />
    </SafeAreaView>
  );
}  

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flatListContent: {
    // height: height * 0.75,
  },
  image: {
    marginTop: 100,
    height: 300,
    width: width * 0.9,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  skipButton: {
    borderColor: COLORS.white,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonSpacing: {
    width: 15,
  },
  btnSkipAndNext: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  skipText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.white,
  },
});




//// works
// import React, { useRef, useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { View as MotiView } from 'moti';
// import {
//   SafeAreaView,
//   Image,
//   StyleSheet,
//   FlatList,
//   View,
//   Text,
//   Platform,
//   TouchableOpacity,
//   Dimensions,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
//   ListRenderItemInfo,
// } from 'react-native';
// import { useRouter } from 'expo-router'; 
// import { useAuth } from '@/contexts/AuthContext';

// const { width, height } = Dimensions.get('window');

// const COLORS = { primary: '#282534', white: '#fff' };

// interface SlideData {
//   id: string;
//   image: string;
//   title: string;
//   subtitle: string;
//   imageFrom: any,
//   imageTo: any,  
//   imageTransition: any,

//   textFrom: any,
//   textTo: any,
//   textTransition: any,


//   titleFrom: any,
//   titleTo: any,
//   titleTransition: any,
//   subtitleFrom: any,
//   subtitleTo: any,
//   subtitleTransition: any,


 
// }

// const initialSlides: SlideData[] = [
//   {
//     id: '1',
//     image: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/pitch-meeting-2.png",
//     title: 'Best Digital Solution',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     imageFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     imageTo: { opacity: 1, translateY: 0, scale: 1 },
//     imageTransition: {
//       type: 'timing',
//       duration: 600,
//       delay: 300,
//     },
     
//     textFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     textTo: { opacity: 1, translateY: 0 },
//     textTransition: { type: 'timing', duration: 500, delay: 600 },

//     titleFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     titleTo: undefined,
//     titleTransition: undefined,
//     subtitleFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     subtitleTo: undefined,
//     subtitleTransition: undefined,
//   },
//   {
//     id: '2',
//     image: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/online-shopping-2.png",
//     title: 'Achieve Your Goals',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     imageFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     imageTo: { opacity: 1, translateY: 0, scale: 1 },
//     imageTransition: {
//       type: 'timing',
//       duration: 600,
//       delay: 300,
//     },
      
//     textFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     textTo: { opacity: 1, translateY: 0 },
//     textTransition: { type: 'timing', duration: 500, delay: 600 },


//     titleFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     titleTo: undefined,
//     titleTransition: undefined,
//     subtitleFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     subtitleTo: undefined,
//     subtitleTransition: undefined,
//   },
//   {
//     id: '3',
//     image: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/signin.png",
//     title: 'Increase Your Value',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     imageFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     imageTo: { opacity: 9, translateY: 0, scale: 1 },
//     imageTransition: {
//       type: 'timing',
//       duration: 600,
//       delay: 300,
//     },
     
//     textFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     textTo: { opacity: 1, translateY: 0 },
//     textTransition: { type: 'timing', duration: 500, delay: 600 },

   
//     titleFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     titleTo: undefined,
//     titleTransition: undefined,
//     subtitleFrom: { opacity: 0, translateY: -50, scale: 0.9 },
//     subtitleTo: undefined,
//     subtitleTransition: undefined,
//   },
// ];

// const Slide: React.FC<{ item: SlideData; resetKey: number }> = ({ item, resetKey }) => {
//   return (
//     <View style={{ alignItems: 'center', width }}>
//       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
//       <MotiView
//         key={resetKey} // Force re-render to reset animation
//         from={item.imageFrom}
//         animate={item.imageTo}
//         transition={item.imageTransition}
//       >
//         <Image source={{ uri: item.image }} style={styles.image} />
//       </MotiView>

//       <MotiView
//         key={resetKey + 1} // Force re-render to reset animation
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: 'timing', duration: 500, delay: 600 }}
//       >
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.subtitle}>{item.subtitle}</Text>
//         </View>
//       </MotiView>
//     </View>
//   );
// };

// const OnboardingScreen: React.FC = () => {
//   const router = useRouter();
//   const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
//   const [resetKey, setResetKey] = useState<number>(0);
//   const ref = useRef<FlatList<SlideData>>(null);
//   const { authState } = useAuth();
//   const [slides, setSlides] = useState<SlideData[]>(initialSlides);

//   const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     setCurrentSlideIndex(currentIndex);
//     setResetKey(prevKey => prevKey + 1); // Force reset on slide change
//   };

//   const goToNextSlide = () => {
//     const nextSlideIndex = currentSlideIndex + 1;
//     if (nextSlideIndex < slides.length) {
//       const offset = nextSlideIndex * width;
//       ref.current?.scrollToOffset({ offset });
//       setCurrentSlideIndex(nextSlideIndex);
//       setResetKey(prevKey => prevKey + 1); // Force reset on slide change
//     }
//   };

//   const skip = () => {
//     const lastSlideIndex = slides.length - 1;
//     const offset = lastSlideIndex * width;
//     ref.current?.scrollToOffset({ offset });
//     setCurrentSlideIndex(lastSlideIndex);
//     setResetKey(prevKey => prevKey + 1); // Force reset on skip
//   };

//   const Footer: React.FC = () => {
//     return (
//       <View style={styles.footer}>
//         <View style={styles.indicatorContainer}>
//           {slides.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.indicator,
//                 currentSlideIndex === index && {
//                   backgroundColor: COLORS.white,
//                   width: 25,
//                 },
//               ]}
//             />
//           ))}
//         </View>

//         <View style={styles.buttonContainer}>
//           {currentSlideIndex === 2 ? (
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={() => router.replace('/login')}
//             >
//               <Text style={styles.btnText}>GET STARTED</Text>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.navigationButtons}>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={[styles.btnSkipAndNext, styles.skipButton]}
//                 onPress={skip}
//               >
//                 <Text style={styles.skipText}>SKIP</Text>
//               </TouchableOpacity>
//               <View style={styles.buttonSpacing} />
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={goToNextSlide}
//                 style={styles.btnSkipAndNext}
//               >
//                 <Text style={styles.btnText}>NEXT</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={COLORS.primary} />
//       <FlatList
//         ref={ref}
//         data={slides}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.flatListContent}
//         renderItem={({ item }: ListRenderItemInfo<SlideData>) => <Slide item={item} resetKey={resetKey} />}
//         keyExtractor={(item) => item.id}
//         onMomentumScrollEnd={updateCurrentSlideIndex}
//       />
//       <Footer />
//     </SafeAreaView>
//   );
// };

// export default OnboardingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//   },
//   flatListContent: {
//     // height: height * 0.75,
//   },
//   image: {
//     marginTop: 100,
//     height: 300,
//     width: width * 0.9,
//     resizeMode: 'contain',
//   },
//   textContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   title: {
//     color: COLORS.white,
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     color: COLORS.white,
//     fontSize: 14,
//     marginTop: 5,
//     maxWidth: '80%',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   footer: {
//     height: height * 0.25,
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   indicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   indicator: {
//     height: 2.5,
//     width: 10,
//     backgroundColor: 'grey',
//     marginHorizontal: 3,
//     borderRadius: 2,
//   },
//   buttonContainer: {
//     marginBottom: 20,
//   },
//   navigationButtons: {
//     flexDirection: 'row',
//   },
//   skipButton: {
//     borderColor: COLORS.white,
//     borderWidth: 1,
//     backgroundColor: 'transparent',
//   },
//   buttonSpacing: {
//     width: 15,
//   },
//   btnSkipAndNext: {
//     flex: 1,
//     height: 50,
//     borderRadius: 5,
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btn: {
//     height: 50,
//     borderRadius: 5,
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   skipText: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: COLORS.white,
//   },
// });




