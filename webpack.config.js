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
      home: "./src/ts/pages/home.ts",
      register: "./src/ts/pages/register.ts",
      resetPassword: "./src/ts/pages/resetPassword.ts",
      settings: "./src/ts/pages/settings.ts",
      formValidations: "./src/ts/utils/formValidations.ts",
      togglePasswordVisibility: "./src/ts/utils/togglePasswordVisibility.ts",
      index: "./src/ts/utils/index.ts",
      config: "./src/ts/config.ts",
      constants: "./src/ts/constants.ts",
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
        path: ".env.development",
        // path: process.env.NODE_ENV.trim() === "production" ? ".env.production" : ".env.development",
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      //       filename: "js/[name].bundle.js",
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    // mode: process.env.NODE_ENV.trim(),
    // devtool: process.env.NODE_ENV.trim() === "production" ? false : "source-map",
    mode: "development",
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      hot: true,
      port: 8080,
      open: true,
    },
  };
};

export default config;
