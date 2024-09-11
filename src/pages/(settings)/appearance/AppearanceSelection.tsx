import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface AppearanceOption {
  label: string;
  mode: 'light' | 'dark' | 'system';
}

const options: AppearanceOption[] = [
  { label: 'Light', mode: 'light' },
  { label: 'Dark', mode: 'dark' },
  { label: 'System', mode: 'system' },
];

const AppearanceSelection: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const handleSelection = (mode: AppearanceOption['mode']) => {
    setTheme(mode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APPEARANCE</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={[
              styles.option,
              theme === option.mode && styles.selectedOption,
            ]}
            onPress={() => handleSelection(option.mode)}
          >
            <View style={styles.optionContent}>
              <View style={[styles.preview, theme === option.mode && styles.selectedPreview]}>
                <Text style={styles.previewText}>Aa</Text>
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
              {theme === option.mode && (
                <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    width: (width - 60) / 3, // Ensures the three options fit horizontally
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
  },
  selectedOption: {
    borderColor: 'black',
    backgroundColor: '#EDEDED',
  },
  optionContent: {
    alignItems: 'center',
  },
  preview: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  selectedPreview: {
    backgroundColor: '#333',
  },
  previewText: {
    fontSize: 18,
    color: 'black',
  },
  optionLabel: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
  checkIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default AppearanceSelection;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// interface AppearanceOption {
//   label: string;
//   mode: 'light' | 'dark' | 'system';
// }

// const options: AppearanceOption[] = [
//   { label: 'Light', mode: 'light' },
//   { label: 'Dark', mode: 'dark' },
//   { label: 'System', mode: 'system' },
// ];

// const AppearanceSelection: React.FC = () => {
//   const [selectedMode, setSelectedMode] = useState<AppearanceOption['mode']>('system');

//   const handleSelection = (mode: AppearanceOption['mode']) => {
//     setSelectedMode(mode);
//     // Implement theme changing logic here, such as updating context or calling a theme switching function
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>APPEARANCE</Text>
//       <View style={styles.optionsContainer}>
//         {options.map((option) => (
//           <TouchableOpacity
//             key={option.mode}
//             style={[
//               styles.option,
//               selectedMode === option.mode && styles.selectedOption,
//             ]}
//             onPress={() => handleSelection(option.mode)}
//           >
//             <View style={styles.optionContent}>
//               <View style={[styles.preview, selectedMode === option.mode && styles.selectedPreview]}>
//                 <Text style={styles.previewText}>Aa</Text>
//               </View>
//               <Text style={styles.optionLabel}>{option.label}</Text>
//               {selectedMode === option.mode && (
//                 <Ionicons name="checkmark-circle" size={24} color="black" style={styles.checkIcon} />
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#888',
//     marginBottom: 10,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   option: {
//     width: (width - 60) / 3, // Ensures the three options fit horizontally
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     backgroundColor: '#f7f7f7',
//   },
//   selectedOption: {
//     borderColor: 'black',
//     backgroundColor: '#EDEDED',
//   },
//   optionContent: {
//     alignItems: 'center',
//   },
//   preview: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ddd',
//   },
//   selectedPreview: {
//     backgroundColor: '#333',
//   },
//   previewText: {
//     fontSize: 18,
//     color: 'black',
//   },
//   optionLabel: {
//     marginTop: 10,
//     fontSize: 14,
//     color: 'black',
//   },
//   checkIcon: {
//     position: 'absolute',
//     right: 5,
//     top: 5,
//   },
// });

// export default AppearanceSelection;
