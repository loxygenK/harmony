import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

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
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "defer",
      inject: "head",
      minify: isProduction
    })
  ]
}

export default config;

