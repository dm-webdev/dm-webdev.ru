"use strict";

var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var _require = require("clean-webpack-plugin"),
    CleanWebpackPlugin = _require.CleanWebpackPlugin;

var FaviconsWebpackPlugin = require("favicons-webpack-plugin"); // const CopyWebpackPlugin = require('copy-webpack-plugin');


var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var TerserJSPlugin = require("terser-webpack-plugin"); // const postcssPresetEnv = require("postcss-preset-env");


var devMode = process.env.NODE_ENV !== "production";
module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./assets/index.js"]
  },
  output: {
    filename: devMode ? "[name].js" : "[name].[hash].js",
    path: path.resolve(__dirname, "build")
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: !devMode,
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  devtool: devMode ? "source-map" : "",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    hot: devMode,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, "build/index.html"),
    template: "./assets/index.html",
    scriptLoading: "defer",
    minify: false
  }), new CleanWebpackPlugin(), new FaviconsWebpackPlugin("./favicon/favicon.png"), new MiniCssExtractPlugin({
    filename: devMode ? "styles/[name].css" : "styles/[name].[hash].css",
    options: {
      hmr: devMode,
      reloadAll: true
    }
  })],
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../"
        }
      }, "css-loader", "postcss-loader"]
    }, {
      test: /\.(png|jpeg|jpg|gif|webp|header-logo.svg)$/i,
      loader: "file-loader",
      options: {
        outputPath: "img",
        name: devMode ? "[name].[ext]" : "[name].[hash].[ext]"
      }
    }, {
      test: /header-logo.svg/,
      loader: "file-loader",
      options: {
        outputPath: "img",
        name: devMode ? "[name].[ext]" : "[name].[hash].[ext]"
      }
    }, {
      test: /\.svg/,
      exclude: /header-logo.svg/,
      use: {
        loader: "svg-url-loader",
        options: {
          iesafe: true
        }
      }
    }, {
      test: /\.(woff|woff2)$/i,
      loader: "file-loader",
      options: {
        outputPath: "fonts",
        name: devMode ? "[name].[ext]" : "[name].[ext]"
      }
    }, {
      test: /\.html$/i,
      loader: "html-loader"
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ["env"]
      }
    }]
  }
};