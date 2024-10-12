// src/types/css.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// src/types/cssVariables.d.ts
declare module '@/styles/variables' {
  export interface CSSVariables {
    '--z-index-app': string;
    '--z-index-modal': string;
    '--z-index-popover': string;
    '--z-index-overlay': string;
    '--z-index-max': string;
    '--scale': string;
    '--spacing-xs': string;
    '--spacing-sm': string;
    '--spacing-md': string;
    '--spacing-lg': string;
    '--spacing-xl': string;

  }
}