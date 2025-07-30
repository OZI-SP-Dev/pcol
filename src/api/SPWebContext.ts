import { spfi, SPBrowser } from "@pnp/sp";

export const webUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : _spPageContextInfo.webAbsoluteUrl;

export const spWebContext = spfi().using(SPBrowser({ baseUrl: webUrl }));

export const subWebContext = (subWeb: string) =>
  subWeb // if empty string return context for app web instead of subweb
    ? spfi().using(SPBrowser({ baseUrl: webUrl + "/" + subWeb }))
    : spWebContext;
