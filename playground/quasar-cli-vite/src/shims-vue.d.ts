// shims-vue.d.ts
/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Unified parsed data structure, if you’re importing both template and script together
declare module "*?sourceCode" {
  const content: {
    template: string;
    script: string;
    all: string;
  };
  export default content;
}
