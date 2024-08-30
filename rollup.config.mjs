import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
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
    commonjs({
      include: 'node_modules/**',
    }),
    json(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
  external: id => /node_modules/.test(id),  // Exclude all node_modules from the build
  context: 'window',
  watch: {
    chokidar: {
      useFsEvents: false,
    },
  },
};



// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';

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
//     resolve({
//       extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure these extensions are resolved
//     }),
//     commonjs(),
//     json(),
//     typescript(),
//     babel({
//       exclude: 'node_modules/**',
//       babelHelpers: 'bundled',
//     }),
//     terser(),
//   ],
//   external: ['react', 'react-native'],
//   context: 'window',
//   watch: {
//     chokidar: {
//       useFsEvents: false,
//     },
//   },
// };


// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser'; // Use default import
// import json from '@rollup/plugin-json';

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
//     resolve(),
//     commonjs(),
//     json(),
//     babel({
//       exclude: 'node_modules/**',
//       babelHelpers: 'bundled',
//     }),
//     terser(), // Use terser as a default import
//   ],
//   external: ['react', 'react-native'],
//   context: 'window',
//   watch: {
//     chokidar: {
//       useFsEvents: false,
//     },
//   },
// };
