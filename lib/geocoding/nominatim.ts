/**
 * Reverse geocoding via OSM Nominatim (public instance).
 * @see https://nominatim.org/release-docs/latest/api/Reverse/
 * Use sparingly (debounce); respect usage policy for nominatim.openstreetmap.org.
 */

export type ReverseGeocodeResult = {
  city: string;
  addressDetail: string;
};

type NominatimAddress = {
  house_number?: string;
  road?: string;
  pedestrian?: string;
  neighbourhood?: string;
  suburb?: string;
  quarter?: string;
  city_district?: string;
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  region?: string;
  country?: string;
};

type NominatimReverseJson = {
  display_name?: string;
  address?: NominatimAddress;
};

function pickCity(addr: NominatimAddress): string {
  const candidates = [
    addr.city,
    addr.town,
    addr.village,
    addr.municipality,
    addr.city_district,
    addr.county,
    addr.state,
    addr.region,
  ];
  for (const c of candidates) {
    if (c && typeof c === "string" && c.trim()) return c.trim();
  }
  return "";
}

function stripCityAndCountry(displayName: string, city: string): string {
  const parts = displayName
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const filtered = parts.filter((p) => {
    if (city && p.toLowerCase() === city.toLowerCase()) return false;
    if (/^(saudi arabia|السعودية|ksa|kingdom of saudi arabia)$/i.test(p)) return false;
    return true;
  });
  return filtered.slice(0, 5).join(", ");
}

function buildAddressLine(addr: NominatimAddress, displayName: string, cityForStrip: string): string {
  const parts: string[] = [];
  if (addr.house_number?.trim()) parts.push(addr.house_number.trim());
  if (addr.road?.trim()) parts.push(addr.road.trim());
  else if (addr.pedestrian?.trim()) parts.push(addr.pedestrian.trim());
  if (addr.neighbourhood?.trim()) parts.push(addr.neighbourhood.trim());
  if (addr.suburb?.trim()) parts.push(addr.suburb.trim());
  if (addr.quarter?.trim()) parts.push(addr.quarter.trim());
  const line = parts.filter(Boolean).join(", ");
  if (line) return line;

  if (displayName) {
    return stripCityAndCountry(displayName, cityForStrip);
  }
  return "";
}

export async function reverseGeocode(
  lat: number,
  lng: number,
  options?: { signal?: AbortSignal; acceptLanguage?: string }
): Promise<ReverseGeocodeResult> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("zoom", "18");

  const res = await fetch(url.toString(), {
    signal: options?.signal,
    headers: {
      Accept: "application/json",
      "Accept-Language": options?.acceptLanguage ?? "en",
    },
  });

  if (!res.ok) {
    throw new Error(`Nominatim HTTP ${res.status}`);
  }

  const data = (await res.json()) as NominatimReverseJson;
  const addr = data.address ?? {};
  const display = data.display_name ?? "";

  let city = pickCity(addr);
  if (!city && display) {
    const first = display.split(",")[0]?.trim();
    if (first) city = first;
  }

  const addressDetail = buildAddressLine(addr, display, city);

  return {
    city,
    addressDetail: addressDetail || stripCityAndCountry(display, city),
  };
}
