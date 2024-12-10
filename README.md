# Description

This is a minimal repro of a possible bug introduced in recent `@quasar/app-vite` versions.

# Steps to reproduce

- `pnpm install` in the root folder.
- Navigate inside the `app-extension` folder.
- Run the build command(pnpm run build).
- Navigate to `playground/quasar-cli-vite`.
- Run `quasar ext add @namespace/blazar`.
- Run `quasar dev` or `quasar dev`

# What should happen

The dev server should run normally(or the build should go through).

# What is actually happening

The process exist with the following error message:

```
 App • ⚠️  App Extension "@namespace/blazar" has missing index script...
```

# Important notes

- Using `pnpm run dev/build` or `pnpm exec quasar dev/build` works in windows(tested in 2 different machines).
- Using other package managers to run the command(tested with yarn and npm) also works.
- Using `pnpm run dev/build` or `pnpm exec quasar dev/build` DOES NOT WORK in linux(tested in kubernetes).

--Inside `playground/quasar-cli-vite` there is a `patchQuasarVite.js` file. Running this postinstall patches this behavior and everything works as expected.

# What causes this error

- I've traced this to [`@quasar/app-vite/lib/app-extension/AppExtensionInstance.js#L344`](https://github.com/quasarframework/quasar/blob/dev/app-vite/lib/app-extension/AppExtensionInstance.js#L344)
- Commits one month changed the way scriptFiles are retrieved.
- The new way utilizes [this internal function](https://github.com/quasarframework/quasar/blob/dev/app-vite/lib/utils/get-package-path.js)(@quasar/app-vite/lib/utils/get-package-path)

# Possible solution/workarounds

- pnpm/yarn/npm <command> works in windows. Maybe it does in Linux too and I just haven't tested enough.
- This issue probably is causes by this line:
  `"@namespace/quasar-app-extension-blazar": "link:..\\..\\app-extension",`
  inside the `package.json` and node sometimes fails to resolve this symlink.
- I found [this old issue](https://github.com/nodejs/help/issues/1212) that might be related.
