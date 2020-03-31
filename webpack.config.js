const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const myWebpackPlugin = require("./my-webpack-plugin");
const { BannerPlugin, DefinePlugin } = require("webpack");
const childProcess = require("child_process");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js"
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     title: "Caching",
  //   })
  // ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    // filename: "[name].js"
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [path.resolve(__dirname, "./my-webpack-loader.js")]
      // },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader"
        ]
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: "file-loader",
      //   options: {
      //     publicPath: "./dist/",
      //     name: "[name].[ext]?[hash]" // 원본파일명.확장자명.해쉬
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./",
          name: "[name].[ext]?[hash]", // 원본파일명.확장자명.해쉬
          limit: 12000
        }
      }
    ]
  },
  plugins: [
    // new myWebpackPlugin(),
    new BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : ""
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true
            }
          : false
    }),
    new DefinePlugin({
      MY: JSON.stringify("milban")
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css"
          })
        ]
      : [])
  ]
};
