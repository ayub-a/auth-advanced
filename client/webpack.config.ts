import path from 'path'
import { fileURLToPath } from 'url';
import type { Configuration } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import 'webpack-dev-server'


// WTF ?
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const config: Configuration = {

    mode: 'development',


    entry: path.resolve(__dirname, 'src', 'index.tsx'),


    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build')
    },


    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },


    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],


    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },


    devtool: 'inline-source-map',
    
    
    devServer: {
        port: 3000
    }
}


export default config
