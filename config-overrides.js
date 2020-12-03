const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {
  addLessLoader, override, fixBabelImports, addWebpackPlugin,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd', style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
   }
  }),
  process.env.NODE_ENV === 'production' && addWebpackPlugin(new BundleAnalyzerPlugin()),
);
