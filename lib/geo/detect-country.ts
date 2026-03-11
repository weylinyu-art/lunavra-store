import type { CountryCode } from "@/lib/data/locations";
import { countryCodes } from "@/lib/data/locations";

const GEO_API = "https://ipapi.co/json/";

export async function detectCountry(): Promise<CountryCode | null> {
  try {
    const res = await fetch(GEO_API, { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    const code = (data.country_code ?? data.country ?? "").toUpperCase();
    if (countryCodes.includes(code as CountryCode)) {
      return code as CountryCode;
    }
    return null;
  } catch {
    return null;
  }
}
