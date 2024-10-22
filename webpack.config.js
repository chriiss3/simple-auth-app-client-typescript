import path from "path";
import { fileURLToPath } from "url";
import Dotenv from "dotenv-webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = () => {
  return {
    entry: {
      forgotpassword: "./src/ts/pages/forgot-password.ts",
      login: "./src/ts/pages/login.ts",
      myaccount: "./src/ts/pages/my-account.ts",
      register: "./src/ts/pages/register.ts",
      resetpassword: "./src/ts/pages/reset-password.ts",
      formValidation: "./src/ts/utils/form-validation.ts",
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
