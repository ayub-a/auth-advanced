import path from 'path'
import type { Configuration } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import 'webpack-dev-server'


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
