import * as webpack from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config: webpack.Configuration = {
    entry: [
        './src/index-web.tsx',
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/verdor/',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },

    module: {
        loaders: [
            // .ttf
            { test: /\.ttf$/, loader: 'url-loader', include: './node_modules/react-native-vector-icons' },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.(gif|jpe?g|png|svg)$/, loader: 'url-loader', query: { name: 'images/[name]-[hash:16].[ext]' } },
            { test: /\.(mp3|wav)$/, loader: 'url-loader', query: { name: 'sounds/[name]-[hash:16].[ext]' }},
            // { test: /\.(gif|png|jpeg|svg)$/i, loaders: ['file-loader?hash=sha512&digest=hex&name=[path][hash].[ext]'] }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({                        // 根据模板插入css/js等生成最终HTML
            // favicon: './src/favicon.ico', //favicon路径
            filename: '../index.html',    // 生成的html存放路径，相对于 path
            template: 'index.html',    // html模板路径
            inject: true,    // 允许插件修改哪些内容，包括head与body             hash:true,    //为静态资源生成hash值
            minify: {    // 压缩HTML文件
                removeComments: true,    // 移除HTML中的注释
                collapseWhitespace: false,    // 删除空白符与换行符
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                browser: JSON.stringify(true),
                development: JSON.stringify(true),
                version: JSON.stringify('0.1'),
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
            },
            comments: false,
            sourceMap: false,
            exclude: [/\.min\.js$/gi],  // skip pre-minified libs
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'zopfli',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
};

export default config;
