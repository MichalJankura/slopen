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

// Minimal google maps ambient (if @types/google.maps not yet installed, prevents TS errors)
// Remove if you add the full @types package.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace google.maps.places {
    interface PlaceResult { name?: string; rating?: number; user_ratings_total?: number; place_id?: string; }
    type PlacesServiceStatus = string;
    class PlacesService {
      constructor(el: HTMLElement);
      findPlaceFromQuery(request: { query: string; fields: string[] }, cb: (results: PlaceResult[] | null, status: PlacesServiceStatus) => void): void;
      getDetails(request: { placeId: string; fields: string[] }, cb: (result: PlaceResult | null, status: PlacesServiceStatus) => void): void;
    }
  }
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Build-time injected secret hash (defined in vite.config.ts)
declare const __SECRET_WORD_SHA256__: string;
declare const __SECRET_WORD_FNV32__: string;
