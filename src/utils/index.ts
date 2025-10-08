import type { Country, Region } from "../types/commom.types";

export const getCountryName = (
  countryId: number | null,
  countries: Country[]
): string => {
  if (!countryId) return "N/A";
  const country = countries.find((c) => c.id === countryId);
  return country?.name || "Unknown Country";
};

export const getRegionName = (
  regionId: number | null,
  regions: Region[]
): string => {
  if (!regionId) return "N/A";
  const region = regions.find((r) => r.id === regionId);
  return region?.name || "Unknown Region";
};

export const createLookupMaps = (countries: Country[], regions: Region[]) => {
  const countriesMap = new Map<number, string>();
  const regionsMap = new Map<number, string>();

  countries.forEach((country) => {
    countriesMap.set(country.id, country.name);
  });

  regions.forEach((region) => {
    regionsMap.set(region.id, region.name);
  });

  return { countriesMap, regionsMap };
};

export const cleanHtmlContent = (htmlContent: string | null): string => {
  if (!htmlContent) return "N/A";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  let text = tempDiv.textContent || tempDiv.innerText || "";

  text = text
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

  return text || "N/A";
};
