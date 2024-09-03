// Rollup configuration without context and unnecessary namedExports
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
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
    external: id => /node_modules/.test(id),
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];











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
