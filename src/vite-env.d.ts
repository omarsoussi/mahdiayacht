/// <reference types="vite/client" />

// Additional ambient for ImportMeta if needed by older TS tooling
declare interface ImportMeta {
  glob: (pattern: string, options?: any) => Record<string, any>;
  globEager?: (pattern: string) => Record<string, any>;
}
