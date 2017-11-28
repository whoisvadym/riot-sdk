import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const babelConf = {exclude: 'node_modules/**'}


const plugins = process.env.entry? [babel(babelConf), uglify()] : []
const outFilename = process.env.entry? 'dist/riot.min.js' : 'dist/riot.js'

export default {
    input: 'src/riot.js',
    output: {
        file: outFilename,
        format: 'umd',
        name: 'riot'
    },
    plugins: plugins    
}