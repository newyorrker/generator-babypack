const webpack = require('webpack');
const path    = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {

	const devMode = !env.production;

	if (devMode) console.log('Running in DEVELOPMENT mode');

	process.env.NODE_ENV = devMode ? 'development' : 'production';

	return {
		entry: ['./src/main.js', './src/main.scss', './src/templates/index.html', 'webpack/hot/dev-server'],
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/dist',
			hotUpdateChunkFilename: 'hot/hot-update.js',
	    hotUpdateMainFilename: 'hot/hot-update.json'
		},
		devServer: {
			port: 3100,
			hot: true,
			watchContentBase: false,
			writeToDisk: true,
			contentBase: path.join(__dirname, 'dist'),
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.resolve(__dirname, './src/templates/index.html'),
				alwaysWriteToDisk: true
			}),
			new HtmlWebpackPlugin({
				filename: 'pages/sample.html',
				template: path.resolve(__dirname, './src/templates/pages/sample.html'),
				alwaysWriteToDisk: true
			}),
			new HtmlBeautifyPlugin({
					config: {
						html: {
							indent_size: 2,
							indent_with_tabs: true,
							indent_inner_html: true,
							preserve_newlines: true,
							max_preserve_newlines: 0,
							unformatted: ['p', 'i', 'b', 'span']
						}
					},
					replace: [ ' type="text/javascript"' ]
			}),
			new HtmlWebpackHarddiskPlugin(),
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css"
			}),
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new StyleLintPlugin({config: {
				"extends": "./node_modules/stylelint-config-airbnb/index.js",
				"rules": {
					"rule-empty-line-before": "never",
					"max-nesting-depth": 3,
					"indentation": "tab"
				}
			}}),
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader', 'eslint-loader']
				},
				{
					test: /\main.scss$/,
					exclude: /node_modules/,
					use: [
						'css-hot-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
				},
				{
					test: /\.scss$/,
					exclude: /\main.scss$/,
					use: [
						'css-hot-loader',
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
									localIdentName: "[local]&[hash:base64:2]"
							},
						},
						'postcss-loader',
						'sass-loader'
					]
				},
				{
					test: /\.html$/,
					use: [ 'html-loader', 'nunjucks-html-loader']
				}
			]
		},
		optimization: {
	    minimizer: [new UglifyJsPlugin()],
	  },
		mode: devMode ? 'development' : 'production',
		devtool: devMode ? 'source-map' : ''
	}
};