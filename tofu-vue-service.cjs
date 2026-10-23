// Added by Tofu on 2026-10-23 under GPL-3.0: load only the web build plugins.
// The desktop plugin imports Electron's executable even for a web-only build.
const Service = require("@vue/cli-service");
const service = new Service(__dirname, {
  plugins: [
    { id: "@vue/cli-plugin-babel", apply: require("@vue/cli-plugin-babel") },
    { id: "@vue/cli-plugin-eslint", apply: require("@vue/cli-plugin-eslint") },
  ],
});
service.run("build").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
