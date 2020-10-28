"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  context: path.resolve(__dirname, "src"),

  mode: "development",

  entry: {
    main: ["@babel/polyfill", "./assets/index.js"],
  },

  output: {
    filename: devMode ? "[name].js" : "[name].[hash].js",
    path: path.resolve(__dirname, "build"),
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: !devMode,
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})],
  },

  devtool: devMode ? "source-map" : "",

  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    hot: devMode,
    port: 9000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "build/index.html"),
      template: "./assets/index.html",
      scriptLoading: "defer",
      minify: "production",
    }),

    new CleanWebpackPlugin(),

    new FaviconsWebpackPlugin({
      logo: "./favicon/favicon.svg",
      inject: true,
      outputPath: "/build",
      publicPath: "",
    }),

    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, 'src/assets/favicon/favicon.ico'),
    //     to: path.resolve(__dirname, 'build/favicon')
    //   }]
    // }),

    new MiniCssExtractPlugin({
      filename: devMode ? "styles/[name].css" : "styles/[name].[hash].css",
      options: {
        hmr: devMode,
        reloadAll: true,
      },
    }),

    // require('autoprefixer'),
  ],

  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader", "postcss-loader"]
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      // MiniCssExtractPlugin.loader,
      // {
      //   loader: 'css-loader',
      // options: {
      //   modules: true,
      //   importLoaders: 1,
      //   localIdentName: '[hash:base64:6]',
      //   minimize: { safe: true }
      // }
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             [
      //               'autoprefixer',
      //               {
      //                 browsers:['ie >= 8', 'last 4 version']
      //               },
      //             ],
      //           ],
      //         },
      //       }
      //     }
      //   ],
      //   exclude: /node_modules/,
      // },
      //
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,

      //       options: {
      //         publicPath: '../',
      //       },
      //     },
      //       'css-loader', 'postcss-loader'],
      //   },
      // {
      //   test: /\.css$/,
      //   // use: ["style-loader", "css-loader", "postcss-loader"],

      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: "../",
      //       },
      //     },
      //     {
      //       loader: "css-loader",
      //     },
      //     {
      //       loader: "postcss-loader",

      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             [
      //               "autoprefixer",
      //               {
      //                 overrideBrowserslist: 'last 4 version',
      //               },
      //             ],
      //           ],
      //         },
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', ],
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: {} },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'env': '.browserslistrc'
                }),
              ]
            }
          },
        ]
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif|webp)$/i,
        loader: "file-loader",
        options: {
          outputPath: "img",
          name: devMode ? "[name].[ext]" : "[name].[hash].[ext]",
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        loader: "file-loader",
        options: {
          outputPath: "fonts",
          name: devMode ? "[name].[ext]" : "[name].[hash].[ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env"],
        },
      },
    ],
  },
};
