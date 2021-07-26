// import와 require의 차이
// import = JS에서 라이브러리 가져올 때 사용
// require = Node.js에서 사용되고 있는 키워드
let path = require("path");
let webpack = require("webpack");
let fileSystem = require("fs");

// __dirname = ....../project명
let reduxSaga = path.join(__dirname, "src"); // >> ...../project명/src
let nodeModules = path.join(__dirname, "node_modules"); // >> ...../project명/node_modules

// 인터넷 환경에 따라 자동으로 -webkit이나 -ms같은 접두어를 붙여줌
const autoprefixer = require("autoprefixer");

//적정사이즈의 bundle을 생성하고 관리
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// Pwa ( serviceWorker.js )
/*const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");
const manifest = require("./public/manifest.json");

const pwaPlugin = new WebpackPwaManifest(manifest);
const swSrc = path.join(__dirname, "src", "main", "webapp", "resources", "js", "serviceWorker") // .../portfolio/src/main/webapp/resources/js/serviceWorker.js

const workboxPlugin = new InjectManifest({
	swSrc: swSrc,
	swDest: "serviceWorker.js",
});*/

//src폴더, node_modules폴더가 있는지 판단
if(fileSystem.existsSync(reduxSaga) && fileSystem.existsSync(nodeModules)) {

	// import ... from redux-saga를 호출하면
	// redux-saga를 자동으로 src경로로 매핑시켜 준다.
	module.exports.resolve = {
		alias: {
			"redux-saga": reduxSaga
		}
	}
	
	module.exports = {
		/*optimization: {
			minimizer: [
				new UglifyJsPlugin ({
					cache: true,
					parallel: true,
					uglifyOptions: {
						compress: {
							warnings: false,
						},
						ecma: 6,
						mangle: true
					},
					sourceMap: true
				})
			]
		},*/
		entry: {
			index: path.join(__dirname, "src", "main", "webapp", "resources", "js", "index"), // .../portfolio/src/main/webapp/resources/js/index.js
		},
		mode: "development",
		// cache: true,
		devtool: "sourcemaps",
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(), // 발생 시점에 따라 ID를 할당 시켜주며 자주 사용하는 ID는 더 낮은 ID를 갖는다.
			new webpack.HotModuleReplacementPlugin(), // dev-server 모드에서 Hot Module Replace를 가능하게 해준다.
			new webpack.NoEmitOnErrorsPlugin(), // 컴파일 도중 오류가 발생한 리소스들은 제외하고 bundling한다.
			new webpack.DefinePlugin({ // 컴파일할 코드에서 특정 문자열을 설정한 값으로 치환.
				"process.env.NODE_ENV": JSON.stringify("development"),
				"MAIN_HOST": JSON.stringify("http://localhost:8080/portfolio"),
				"AUTH_HOST": JSON.stringify("http://localhost:8081/portfolioauth"),
				"RESOURCE_HOST": JSON.stringify("http://localhost:8082/portfolioapi"),
				"OPEN_WEATHER_HOST": JSON.stringify("https://api.openweathermap.org/data/2.5/weather"),
			}),
			new MiniCssExtractPlugin({
				filename: "portfolio.css"
			}),

			// new UglifyJsPlugin(),
			// new BundleAnalyzerPlugin(),
			//workboxPlugin,
			
		],
		module: {
			rules: [
				
/*				
				{
					test: path.join(__dirname, "."),
					exclude: /(node_modules)/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: [
									"@babel/preset-env",
									"@babel/preset-react"
								],
								plugins: [
									"@babel/plugin-proposal-class-properties"
								]
							}
						}
					]
				},

*/



				// css 설정
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						//require.resolve("style-loader"), // HTML코드안에 style태그로 만들어줌.
						{
							loader: require.resolve("css-loader"),
							options: {
								importLoaders: 1,
								localIdentName: "[path][name]__[local]--[hash:base64:5]"
							}
						}
					]
				},

				{
					test: /\.s[ac]ss$/i,
					exclude: /(node_modules)/,
					use: [
						
						MiniCssExtractPlugin.loader,
						// require.resolve("style-loader"), // HTML코드안에 style태그로 만들어줌.
						{
							loader: require.resolve("css-loader"),
							options: {
								importLoaders: 1,
								localIdentName: "[path][name]__[local]--[hash:base64:5]"
							}
						},
						{
							loader: require.resolve("postcss-loader"),
							options: {
								ident: "postcss",
								plugins: () => [
									require("postcss-flexbugs-fixes"),
									autoprefixer({
										overrideBrowserslist: [
											">0.2%",
											"last 4 version",
											"Firefox ESR",
											"not ie < 9"
										],
										flexbox: "no-2009"
									})
								]
							}
						},
						{
							loader: require.resolve("sass-loader"),
							options: {
								sassOptions: {
									includePaths: [
										path.join(__dirname, "src", "main", "webapp", "resources", "scss")
									],
									indentType: "tab",
									indentWidth: 1,
									outputStyle: "expanded"
								}
							}
						}
						
					]
				},
				
				{
					test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
					loader: "file-loader",
					options: {
						publicPath: "./"
					}
				},
				
				
				{
					test: /\.(js|jsx)?$/,
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-transform-runtime"
						]
					},
					include: reduxSaga
				},
				{
					test: /\.(js|jsx)?$/,
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-transform-runtime"
						]
					},
					include: path.join(__dirname, "sagaMonitor")
				},
				
			]
		},
		output: {
			path: path.join(__dirname, "src", "main", "webapp", "resources", "built"),
			filename: "bundle.js",
		}
	}
	
}