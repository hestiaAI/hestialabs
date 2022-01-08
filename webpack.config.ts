// https://webpack.js.org/configuration/configuration-languages/#typescript
// https://github.com/webpack/webpack-cli/issues/2916
// https://typestrong.org/ts-node/docs/imports/#commonjs
// https://webpack.js.org/api/cli/#typeerror-err_unknown_file_extension-unknown-file-extension-ts-for-webpackconfigts
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
// import webpack from 'webpack'

const config = {
  mode: 'production',
  entry: {
    'facebook/dist/index': 'packages/facebook/src/index.ts',
    'twitter/dist/index': 'packages/twitter/src/index.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { configFile: 'tsconfig.build.json' }
      },
      {
        // https://webpack.js.org/guides/asset-modules/#inlining-assets
        test: /\.(?:png|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  // resolve: {
  //   extensions: ['.tsx', '.ts'],
  //   plugins: [
  //     // https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
  //     new TsconfigPathsPlugin({})
  //   ]
  // },
  output: {
    path: 'packages'
  }
}

export default config
