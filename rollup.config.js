const  resolve =require('@rollup/plugin-node-resolve');
const  commonjs =require('@rollup/plugin-commonjs');
const  babel =require('@rollup/plugin-babel');

module.exports= {
    input: 'src/index.js',
    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'TankWebSocket'
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
    ]
};
