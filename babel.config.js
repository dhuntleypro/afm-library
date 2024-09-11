module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-transform-runtime',
      'react-native-reanimated/plugin', // Required for Reanimated 2
    ],
  };
};




// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['@babel/plugin-transform-runtime'],
//   };
// };

// react-native-gesture-handler
// export default {
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-react',
//     '@babel/preset-typescript',
//   ],
//   plugins: [
//     '@babel/plugin-transform-runtime',
//     [
//       '@babel/plugin-transform-react-jsx',
//       {
//         runtime: 'automatic',
//       },
//     ],
//   ],
//   ignore: [/node_modules\/(?!expo-modules-core|@react-navigation)/],
// };

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['@babel/plugin-transform-runtime'],
//   };
// };













// export default {
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-react',
//     '@babel/preset-typescript',
//   ],
//   plugins: [
//     '@babel/plugin-transform-runtime',
//     [
//       'module-resolver',
//       {
//         root: ['./src'], // Define the root directory
//         alias: {
//           '@dhuntleypro/afm-library': './src', // Alias '@your-library-name' to the './src' directory
//         },
//       },
//     ],
//   ],
//   ignore: [/node_modules\/(?!expo-modules-core|@react-navigation)/],
// };





// export default {
//   presets: [
//     '@babel/preset-env',      // Transpiles modern JavaScript
//     '@babel/preset-react',    // Transpiles JSX
//     '@babel/preset-typescript', // Transpiles TypeScript
//   ],
//   plugins: [
//     '@babel/plugin-transform-runtime',  // Helps with polyfilling and reusing Babel helpers
//     ['@babel/plugin-proposal-class-properties', { loose: true }], // Handles class properties
//     ['@babel/plugin-transform-private-methods', { loose: true }], // Handles private methods
//     ['@babel/plugin-transform-private-property-in-object', { loose: true }], // Handles private properties in objects
//   ],
//   ignore: [/node_modules\/(?!expo-modules-core|@react-navigation)/], // Ignore most node_modules except for specific ones
// };



// export default {
//     presets: [
//       '@babel/preset-env',
//       '@babel/preset-react',
//       '@babel/preset-typescript',
//     ],
//     plugins: [
//       '@babel/plugin-transform-runtime',
//     ],
//     ignore: [/node_modules\/(?!expo-modules-core|@react-navigation)/],
//   };
  