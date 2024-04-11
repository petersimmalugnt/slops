const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/js/main.js", // Huvudsaklig JavaScript-ingångspunkt
    style: "./src/css/main.scss", // Huvudsaklig CSS-ingångspunkt genererad från SCSS
  },
  output: {
    // Dynamiskt namn baserat på entry-punktens namn
    filename: "[name].js", // Använd '[name].js' här för att undvika konflikter
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Säkerställ att CSS-filerna har ett unikt namn
      filename: "[name].css", // Använd '[name].css' här
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
  },
};
