// Tofu static build configuration, added 2026-10-23 under GPL-3.0.
// Keep upstream's desktop build settings intact; limit workers for shared builders.
module.exports = {
  ...require("./vue.config.js"),
  outputDir: "site",
  productionSourceMap: false,
  parallel: false,
  chainWebpack(config) {
    config.optimization.minimizer("terser").tap((args) => {
      args[0].parallel = false;
      return args;
    });
  },
};
