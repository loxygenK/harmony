import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import sass from "sass";
import fibers from "fibers";

const isProduction = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]_[contenthash:16].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.module.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader?modules",
            options: {
              sourceMap: !isProduction,
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: isProduction ? "[hash:base64:8]" : "[path][name]__[local]",
                exportLocalsConvention: "dashesOnly"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProduction,
              implementation: sass,
              sassOptions: {
                fiber: fibers
              }
            }
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    fallback: {
      "fs": false,
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "defer",
      inject: "head",
      minify: isProduction
    })
  ],
}

export default config;

