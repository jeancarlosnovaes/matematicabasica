const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'jane.min.css'
})

module.exports = {
	devtool: 'source-map',
	context: path.resolve('./themes/jane/src'),
	entry: {
		jane: './js/main.js'
	},
	output: {
		path: path.resolve('./themes/jane/static/dist'),
		filename: `[name].min.js`
	},
	module: {
		rules: [
			{
				test:  /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader', options: { minimize: true, sourceMap: false }
						},
						{
							loader: 'postcss-loader', options: {
								sourceMap: false,
								config: {
									path: './postcss.config.js'
								},
								plugins: (loader) => [
									new IconfontWebpackPlugin({
										resolve: loader.resolve,
										fontNamePrefix: 'custom-',
										modules: false,
									})
								]
							 }
						},
						{
							loader: 'sass-loader', options: { sourceMap: false }
						},
					],
					fallback: 'style-loader',
				})
			},
			{
				test: /iconfont\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: ['file-loader?name=[path][name].[ext]?hash=[hash:7]']
			},
			{
				test: /apple-chancery-webfont\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: ['file-loader?name=[path][name].[ext]']
			}
		]
	},
	plugins: [
		extractSass,
		new UglifyJSPlugin({
			sourceMap: false
		}),
	]
}
