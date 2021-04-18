const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/', 'index.html'), // template file
      filename: 'index.html', // output file
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimize: false,
    usedExports: true,
  },
  performance: {
    hints: false,
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:6464',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/', 'index.jsx'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist/'),
    open: true,
    compress: false,
    hot: true,
    host: '0.0.0.0',
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  { targets: 'defaults' }],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
          exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 2,
                includePaths: ['src/styles'],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ]
  },
}
