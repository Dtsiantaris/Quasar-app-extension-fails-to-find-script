/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */
//@ts-ignore
import { QuasarConfProxy as WebpackQuasarConfProxy } from "@quasar/app-webpack";
// import { QuasarConfProxy as ViteQuasarConfProxy } from "@quasar/app-vite";
import { IndexAPI } from "./quasar";

const blue = "\x1b[34m";
const reset = "\x1b[0m";

export default function (api: IndexAPI) {
  const logWithPrefix = (message: string) => {
    console.log(` ${blue}Blazar •${reset} ${message}`);
  };
  // Quasar compatibility check; you may need hard dependencies,
  // as in a minimum version of the "quasar" package or
  // a minimum version of "@quasar/app-*" CLI
  api.compatibleWith("quasar", "^2.0.0");

  
  // @ts-ignore
  api.extendQuasarConf((conf, api) => {
    conf.boot!.push("~@namespace/quasar-app-extension-blazar/boot/register");

    conf.framework.plugins.push("Dialog");
    conf.framework.plugins.push("LocalStorage");

    // make sure app extension files get transpiled
    if (api.hasWebpack) {
      const config = conf as unknown as WebpackQuasarConfProxy;
      config.build.webpackTranspileDependencies.push(
        /@namespace[\\/]quasar-app-extension-blazar[\\/]dist/
      );
    }

  });
}
