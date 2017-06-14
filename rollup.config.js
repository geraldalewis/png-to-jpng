//import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  entry: 'src/index.js',
  dest: 'www/index.js',
  format: 'umd',
  moduleName: 'png-to-jpng',
  plugins: [
    buble(),
    nodeResolve(),
    /*uglify(),*/
    copy({
            "src/index.html": "www/index.html",
            verbose: true
        }) 
  ]
};