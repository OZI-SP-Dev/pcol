import { spfi, SPBrowser } from "@pnp/sp";
declare const _spPageContextInfo: { webAbsoluteUrl: string };

export const webUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : _spPageContextInfo.webAbsoluteUrl;

export const spWebContext = spfi().using(SPBrowser({ baseUrl: webUrl }));
