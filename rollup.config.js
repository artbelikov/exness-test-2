import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'cjs',
		sourcemap: true
	},
	plugins: [
    postcss({
      plugins: [
        require("autoprefixer")
      ],
      extract: 'public/style.css',
      extensions: ['.css', '.scss', '.sass'],
      minimize: production && {
        minifyFontValues: false,
        discardUnused: false
      }
    }),
		resolve(),
		commonjs(),
		production && uglify(), // minify, but only in production
    !production && serve({
      open: false,
      contentBase: 'public',
      host: '127.0.0.1',
      port: 8080,
    })
	]
};
