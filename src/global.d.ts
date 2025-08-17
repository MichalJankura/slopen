declare module 'qrcode.react' {
  import * as React from 'react';
  export interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    imageSettings?: {
      src: string;
      x?: number;
      y?: number;
      height?: number;
      width?: number;
      excavate?: boolean;
    };
  }
  export const QRCodeCanvas: React.FC<QRCodeProps>;
  export const QRCodeSVG: React.FC<QRCodeProps>;
}

// Vite env typings
interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY?: string;
  readonly DEV?: boolean; // Vite injects import.meta.env.DEV at build time
  readonly PROD?: boolean; // Vite injects import.meta.env.PROD
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
