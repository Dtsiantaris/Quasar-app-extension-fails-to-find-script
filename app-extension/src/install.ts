import path from "path";
import fs from "fs";
import { InstallAPI } from "./quasar";

const blue = "\x1b[34m";
const reset = "\x1b[0m";

export default function (api: InstallAPI) {
  const quasarDeclarationFilePath = path.resolve(api.appDir, "src/quasar.d.ts");

  const logWithPrefix = (message: string) => {
    console.log(`${blue}Blazar •${reset} ${message}`);
  };

  const lineToAdd = `/// <reference types="@namespace/quasar-app-extension-blazar" />`;
  const commentToAdd = `// Added by Quasar App Extension for Blazar
// This line ensures that TypeScript recognizes the types defined in @namespace/quasar-app-extension-blazar
`;

  if (fs.existsSync(quasarDeclarationFilePath)) {
    const fileContent = fs.readFileSync(quasarDeclarationFilePath, "utf-8");

    if (!fileContent.includes(lineToAdd)) {
      const newContent = `${commentToAdd}${lineToAdd}\n\n${fileContent}`;
      fs.writeFileSync(quasarDeclarationFilePath, newContent, "utf-8");
      logWithPrefix(
        `Added reference to @namespace/quasar-app-extension-blazar in ${quasarDeclarationFilePath}`
      );
    } else {
      logWithPrefix(
        `Reference to @namespace/quasar-app-extension-blazar already exists in ${quasarDeclarationFilePath}`
      );
    }
  } else {
    const newContent = `${commentToAdd}${lineToAdd}\n\n`;
    fs.writeFileSync(quasarDeclarationFilePath, newContent, "utf-8");
    logWithPrefix(
      `Created ${quasarDeclarationFilePath} and added reference to @namespace/quasar-app-extension-blazar`
    );
  }
}
