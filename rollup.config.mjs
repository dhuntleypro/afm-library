
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm', // Only ES Modules
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      terser(),
    ],
    external: id => /node_modules/.test(id), // Exclude node_modules from the bundle
  },
  // Separate configuration for generating types
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];






















// import { terser } from 'rollup-plugin-terser';

// export default {
//   input: 'src/index.ts',
//   output: [
//     {
//       file: 'dist/index.cjs.js',
//       format: 'cjs',
//       sourcemap: true,
//     },
//     {
//       file: 'dist/index.esm.js',
//       format: 'esm',
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//     terser(), // Minify the output
//     // other plugins
//   ],
// };















// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/index.cjs.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: 'dist/index.esm.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve({
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         browser: true,
//       }),
//       commonjs({
//         include: /node_modules/,
//         transformMixedEsModules: true,
//       }),
//       babel({
//         babelHelpers: 'runtime',
//         exclude: /node_modules\/(?!expo-router)/,  // Ensure that Babel processes expo-router
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         presets: [
//           '@babel/preset-env',
//           '@babel/preset-react', // To handle JSX
//           '@babel/preset-typescript',
//         ],
//         plugins: [
//           ['@babel/plugin-transform-private-property-in-object', { loose: true }],
//           ['@babel/plugin-transform-private-methods', { loose: true }],
//           ['@babel/plugin-transform-class-properties', { loose: true }],
//         ],
//       }),
//       json(),
//       typescript({
//         tsconfig: './tsconfig.json',
//         declaration: true,
//         declarationDir: 'dist',
//         rootDir: 'src',
//       }),
//       terser(), // Minify the output
//     ],
//     external: [
//       'react',
//       'react-dom',
//       'react-native',
//       'expo-router',
//       '@expo/vector-icons',
//       'stream',
//     ],
//   },
//   {
//     input: 'dist/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];








// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';
// import asyncToGenerator from '@babel/plugin-transform-async-to-generator';

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/index.cjs.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: 'dist/index.esm.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve({
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         browser: true, // Ensure axios is resolved for browser environments
//         preferBuiltins: false, // Ensure Node.js built-ins are not preferred
//       }),
//       commonjs({
//         include: /node_modules/,
//       }),
//       json(),
//       typescript({
//         tsconfig: './tsconfig.json',
//         declaration: true,
//         declarationDir: 'dist',
//         rootDir: 'src',
//       }),
//       babel({
//         exclude: 'node_modules/**',
//         babelHelpers: 'runtime', // Ensure proper handling of async functions
//         plugins: [asyncToGenerator], // Use this to handle async/await
//       }),
//       terser(), // Minify the output
//     ],
//     external: [
//       'react',
//       'react-dom',
//       'react-native',
//       'expo-router',
//       'stream',
//      // 'axios',  // Externalize axios so it's not included in the bundle
//     ],
//   },
//   {
//     input: 'dist/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];


// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import { terser } from '@rollup/plugin-terser';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/index.cjs.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: 'dist/index.esm.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve({
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         mainFields: ['module', 'main'],
//       }),
//       commonjs({
//         include: /node_modules/,
//         transformMixedEsModules: true,
//       }),
//       json(),
//       typescript({
//         tsconfig: './tsconfig.json',
//         declaration: true,
//         declarationDir: 'dist',
//         rootDir: 'src',
//       }),
//       babel({
//         presets: ['@babel/preset-react'],  // Ensure React preset is included
//         exclude: 'node_modules/**',
//         babelHelpers: 'bundled',
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],  // Process these extensions
//       }),
//       terser(),
//     ],
//     external: ['react', 'react-native', 'react/jsx-runtime'],
//   },
//   {
//     input: 'dist/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];































// // Rollup configuration without context and unnecessary namedExports
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/index.cjs.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: 'dist/index.esm.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve({
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       }),
//       commonjs(),
//       json(),
//       typescript({
//         tsconfig: './tsconfig.json',
//         declaration: true,
//         declarationDir: 'dist',
//         rootDir: 'src',
//       }),
//       babel({
//         exclude: 'node_modules/**',
//         babelHelpers: 'bundled',
//       }),
//       terser(),
//     ],
//     external: id => /node_modules/.test(id),
//   },
//   {
//     input: 'dist/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];











// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/index.cjs.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: 'dist/index.esm.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve({
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       }),
//       commonjs({
//         namedExports: {
//           'node_modules/react/react.js': ['Component', 'Children', 'createElement', 'PropTypes'],
//           'node_modules/react-dom/index.js': ['render']
//       },
//       include: ['node_modules/rxjs/**', 'node_modules/angular2-jwt/angular2-jwt.js']
//       }),
//       json(),
      
//       typescript({
//         tsconfig: './tsconfig.json',
//         declaration: true,
//         declarationDir: 'dist',
//         rootDir: 'src',
//       }),
//       babel({
//         exclude: 'node_modules/**',
//         babelHelpers: 'bundled',
//       }),
//       terser(),
//     ],
//     external: id => /node_modules/.test(id),
//     context: 'window',
//     watch: {
//       chokidar: {
//         useFsEvents: false,
//       },
//     },
//   },
//   // Separate config to bundle the .d.ts files
//   {
//     input: 'dist/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];
