# WeekToDo on Tofu

WeekToDo is a minimalist weekly planner with draggable tasks, custom lists, recurring tasks, reminders, task colors, Markdown descriptions, and multiple languages. It is a browser-local personal planner: tasks use IndexedDB and settings use localStorage. There is no account, hosted database, or device synchronization. The upstream name, logos, favicon, author credits, and ordinary project links are retained.

## Run this copy

- Tofu framework preset: `static`.
- **Set the app/site root to `site/`** (the gallery entry's folder is `site`), which contains the committed, ready-to-serve `index.html` and assets. Do not import the repository root as a static site: it contains Vue CLI source and a `package.json` build script.
- Deployment build command: none. The pinned `site/` is already built.
- Runtime environment variables: none. Do not configure Sentry or other telemetry.
- Managed database: none. The browser stores the user's data locally.
- Serve `site/` at the hostname root (`/`), not beneath a URL prefix. HTTPS is recommended for browser notifications.

## Rebuild the static site

The upstream project uses Vue 3, Vue CLI 4, webpack 4, and Yarn Classic. Its original `package.json`, `yarn.lock`, and desktop build configuration are preserved. Rebuild from the repository root with Node.js 22 and Yarn 1.22.22:

```sh
yarn install --frozen-lockfile --non-interactive --ignore-scripts --ignore-engines
node tofu-build.cjs
```

For a machine without a Yarn executable:

```sh
npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile --non-interactive --ignore-scripts --ignore-engines
node tofu-build.cjs
```

`--ignore-scripts` skips Electron's desktop binary download and native packaging hooks, which the browser build does not need. `--ignore-engines` accommodates the older development dependency engine declarations on Node.js 22. The build wrapper enables Node's OpenSSL legacy provider for webpack 4, limits compilation/minification parallelism, and uses an additive Vue configuration to write `site/`. `tofu-vue-service.cjs` loads only the Babel and ESLint web plugins, since the upstream Electron plugin imports a desktop executable even during a browser build. These options are for building only; they are not runtime secrets or app environment requirements. The wrapper also packages the exact adapted source, build scripts, lockfile, and license into `site/source.tar.gz` and copies the GPL license into `site/LICENSE.txt` (a `.txt` name, so hosts serve it as text the browser displays).

A local serving check uses:

```sh
python3 -m http.server 41837 --bind 127.0.0.1 --directory site
curl --fail --silent --output /dev/null --write-out '%{http_code}\n' http://127.0.0.1:41837/
```

## Adaptations and reasons

Changes by Tofu on 2026-10-23:

- Remove Sentry initialization and the unused public Honeybadger script so the browser does not perform external error reporting, session recording, or performance tracking.
- Remove the splash screen sponsor advertisement and its network request; disable the unused sponsor modal's network request. The WeekToDo logo splash remains.
- Remove the nonfunctional error-reporting switches from onboarding and settings, and the onboarding sentence offering error reports, since reporting is not part of this copy.
- Leave upstream's Google Search Console verification file (`public/googled50c8321df2bd61b.html`) out of the served `site/`. The file proves site ownership to the upstream owner's Google account, so serving it on a copy's address would let that account claim the copy in Search Console. It remains in the source tree.
- Remove unresolved, unused sponsor/collaborator component references from the About view. Add same-origin license and corresponding-source download links there while keeping upstream credits and links.
- Add `tofu.vue.config.js`, `tofu-vue-service.cjs` and `tofu-build.cjs` to produce the static `site/` without rewriting upstream's build manifest or lockfile.
- Commit the static output with its corresponding source archive so a copied app needs no dependency installation or third-party account to run.

Each modified source file carries a dated modification notice. The root `LICENSE` and upstream copyright notices are retained unchanged. Upstream telemetry and Electron packages remain in the untouched dependency manifest/lockfile for source reproducibility; the removed telemetry code is not imported into the application.

## Product limits

This is the upstream desktop-browser experience. On small/mobile viewports it shows the upstream unsupported-device notice; do not advertise it as a mobile planner. Data belongs to this browser profile and origin. Clearing site data, using a different browser/device, or moving to a different hostname does not carry tasks across; use WeekToDo's built-in export/import for backups and transfers. Browser notifications depend on browser support and permission. No server process runs reminders after the app is closed.

## Upstream and license

- Upstream: https://github.com/manuelernestog/weektodo
- Upstream branch: `main`
- Base commit: `d384fc72d04e9c8a8431d456a3218c08d0c77e29`
- Fork: https://github.com/tofu-gallery/weektodo
- Adaptations: `tofu` branch
- Pinned release tag: `pin/2026-10-23`
- License: GNU GPL version 3 (`LICENSE`). The adaptations and distributed application remain under GPL-3.0.

When redistributing this build or a changed build, preserve the license and copyright notices and keep its complete corresponding source available. This copy serves the source archive next to the compiled application. Rebuild with `node tofu-build.cjs` after source changes so the archive and the served JavaScript stay in agreement.
