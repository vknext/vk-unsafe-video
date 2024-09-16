import clearFolder from 'clear-folder';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';
import 'webpack-dev-server'; // для исправления типов
import WebpackExtensionManifestPlugin from 'webpack-extension-manifest-plugin';
import UTF8BOMPlugin from 'webpack-utf8-bom';
import yargsParser from 'yargs-parser';

import getManifest from './manifest.config.ts';
import ZipPlugin from './plugins/ZipPlugin.ts';

const argv = yargsParser(process.argv.slice(2));

const files = ['.svg', '.ttf', '.ts', '.tsx', '.css', '.scss', '.json'];
const DEFAULT_PUBLIC_PATH = '/';

if (!argv.noclear) {
	clearFolder([path.resolve('./', 'build')]);
}

const IS_DEV = Boolean(argv.dev);
const IS_FIREFOX = Boolean(argv.firefox);

const BUILD_PATH = IS_FIREFOX ? path.resolve(`./build/firefox`) : path.resolve(`./build/chrome`);

const PORT = process.env.PORT || 4001;

const manifest = getManifest({ isFirefox: IS_FIREFOX, isDev: IS_DEV });

const options: Configuration = {
	entry: {
		content: {
			import: path.resolve('./', 'src', 'content.ts'),
			chunkLoading: false,
			runtime: false,
		},
		injected: {
			import: path.resolve('./', 'src', 'injected.ts'),
			publicPath: './',
			runtime: false,
		},
	},
	mode: IS_DEV ? 'development' : 'production',
	devtool: IS_DEV ? 'source-map' : false,
	devServer: {
		hot: false,
		client: false,
		host: 'localhost',
		port: PORT,
		static: {
			directory: BUILD_PATH,
		},
		devMiddleware: {
			publicPath: `http://localhost:${PORT}/`,
			writeToDisk: true,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		allowedHosts: 'all',
	},
	output: {
		path: BUILD_PATH,
		clean: true,
		publicPath: DEFAULT_PUBLIC_PATH,
		environment: {
			arrowFunction: true,
			bigIntLiteral: false,
			const: true,
			destructuring: true,
			dynamicImport: true,
			forOf: true,
			module: false,
			optionalChaining: true,
			templateLiteral: true,
		},
		filename: '[name].vuv.js',
		chunkFilename: '[name].vuv.js',
	},
	infrastructureLogging: {
		level: 'info',
	},
	resolve: {
		extensions: files,
		plugins: [
			new TsconfigPathsPlugin({
				extensions: files,
			}),
		],
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: (chunk) => !(chunk.name || '').endsWith('content'),
			automaticNameDelimiter: '.',
			minSize: 40_000,
		},
	},
	cache: {
		type: 'filesystem',
		allowCollectingMemory: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].vuv.css',
			chunkFilename: '[name].vuv.css',
			ignoreOrder: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './assets',
					to: path.join(BUILD_PATH, 'assets'),
					force: true,
				},
				{
					from: './_locales',
					to: path.join(BUILD_PATH, '_locales'),
					force: true,
				},
			],
		}),
		new WebpackExtensionManifestPlugin({
			config: manifest,
		}),
		new UTF8BOMPlugin(true),
		new ESLintPlugin({}),
		!IS_DEV &&
			new ZipPlugin({
				filename: `vuv${manifest.version}_${IS_FIREFOX ? 'firefox' : 'chrome'}.zip`,
				path: path.resolve(`./build`),
			}),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.json$/i,
				type: 'asset/resource',
			},
			{
				test: /\.[jt]sx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.module\.(scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV,
							modules: {
								localIdentName: 'vuv[local]--[hash:base64:5]',
								mode: 'local',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [['postcss-preset-env']],
							},
						},
					},
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
			{
				test: /\.(scss|sass)$/,
				exclude: /\.(module|file)\.(scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV,
							importLoaders: 3,
							modules: {
								mode: 'icss',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [['postcss-preset-env']],
							},
						},
					},
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
				sideEffects: true,
			},
			{
				test: /\.svg$/,
				use: 'raw-loader',
			},
		],
	},
};

export default options;
