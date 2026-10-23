// Added by Tofu on 2026-10-23 under GPL-3.0: reproducible static-site packaging.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = __dirname;
const run = (command, args, env = process.env) => {
  const result = spawnSync(command, args, { cwd: root, env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
};

run(process.execPath, [
  "--openssl-legacy-provider",
  path.join(root, "tofu-vue-service.cjs"),
], {
  ...process.env,
  VUE_CLI_SERVICE_CONFIG_PATH: path.join(root, "tofu.vue.config.js"),
});

const site = path.join(root, "site");
// A .txt name makes static hosts serve the license as text the browser shows.
fs.copyFileSync(path.join(root, "LICENSE"), path.join(site, "LICENSE.txt"));
// Upstream's Google Search Console token proves site ownership to upstream's
// Google account; a copy served on someone else's address must not carry it.
for (const name of fs.readdirSync(site)) {
  if (/^google[0-9a-f]+\.html$/.test(name)) fs.rmSync(path.join(site, name));
}
// The corresponding GPL source is this repository at the pinned tag (the About
// view links it); no archive is written into site/, because Tofu's Free static
// hosting serves only file types it recognises and refuses a `.tar.gz`.
console.log("Static site ready in site/; the license text is included as LICENSE.txt.");
