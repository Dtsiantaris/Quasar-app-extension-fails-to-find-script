import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const asciiBlue = "\x1b[34m";

// @ts-ignore
const log = (msg) => {
  console.log(`${asciiBlue}[patchQuasarVite]: ${msg}`);
};
// Get the directory name in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = resolve(
  __dirname,
  "node_modules/@quasar/app-vite/lib/app-extension/AppExtensionInstance.js"
);

// The original method code to find
const originalCode = `
  #getScriptFile (scriptName) {
    if (this.isInstalled === false) return

    return getPackageScriptPath(
      this.packageFullName,
      scriptName,
      this.#packagePath
    )
  }
`;

// The replacement method code
const patchedCode = `
  #getScriptFile (scriptName) {
    if (this.isInstalled === false) return

    let scriptFile = join(this.#packagePath, \`dist/\${ scriptName }.js\`);
    if (fse.existsSync(scriptFile)) {
      return scriptFile;
    }

    scriptFile = join(this.#packagePath, \`src/\${ scriptName }.js\`);
    if (fse.existsSync(scriptFile)) {
      return scriptFile;
    }
  }
`;

try {
  // Read the file contents
  let fileContents = readFileSync(filePath, "utf8");

  // Replace the original code with the patched code
  if (fileContents.includes(originalCode)) {
    fileContents = fileContents.replace(originalCode, patchedCode);

    // Write the patched contents back to the file
    writeFileSync(filePath, fileContents, "utf8");
    log("Attempting to patch quasar vite AppExtensionInstance.js...");
    log("File patched successfully!");
  } else {
    log("Original code not found. The file might have already been patched.");
  }
} catch (error) {
  console.error("Error patching the file:", error);
}
