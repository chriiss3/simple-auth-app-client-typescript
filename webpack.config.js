import path from "path";
import { fileURLToPath } from "url";
import Dotenv from "dotenv-webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = () => {
  return {
    entry: {
      forgotPassword: "./src/ts/pages/forgotPassword.ts",
      login: "./src/ts/pages/login.ts",
      myAccount: "./src/ts/pages/myAccount.ts",
      register: "./src/ts/pages/register.ts",
      resetPassword: "./src/ts/pages/resetPassword.ts",
      formValidation: "./src/ts/utils/formValidation.ts",
      utils: "./src/ts/utils/utils.ts",
      config: "./src/ts/config.ts",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === "production" ? false : "source-map",
    devServer: {
      static: "./dist",
      hot: true,
      port: 8080,
      open: true,
    },
  };
};

export default config;
