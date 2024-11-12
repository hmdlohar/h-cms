import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import babel from "rollup-plugin-babel";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir:"dist",
        format: "cjs",
        sourcemap: true,
      },
      // {
      //   file: packageJson.module,
      //   format: "esm",
      //   sourcemap: true,
      // },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/env", "@babel/preset-react"],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: ["react"],
  },
  {
    input: ["src/index.ts"],
    output: [{ file: "dist/index.d.ts", format: "cjs" }],
    plugins: [dts()]
  },
];
