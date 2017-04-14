const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const extractSass = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: {
        site: './src/script/index.js',
    },

    output: {
        path: path.resolve('public'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['es2015', { modules: false }],
                                'stage-2',
                                'react',
                            ],
                        },
                    },
                    { loader: 'eslint-loader' },
                ],
            },

            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: !isProduction },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: !isProduction,
                                plugins: () => [autoprefixer],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction,
                                includePaths: ['./src/style', 'node_modules'],
                                outputStyle: isProduction ? 'compressed' : 'nested',
                            },
                        },
                    ],
                }),
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },

    plugins: [
    	extractSass,
		// new CopyWebpackPlugin([], {}),
	],
    devtool: 'source-map',
};
