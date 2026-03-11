/**
 * Supported delivery countries and their regions/cities.
 * No cross-border delivery between countries.
 */

export type CountryCode = "SA" | "AE" | "QA" | "KW" | "BH" | "OM" | "EG";

export interface CityOption {
  id: string;
  nameEn: string;
  nameAr: string;
}

export interface RegionOption {
  id: string;
  nameEn: string;
  nameAr: string;
  cities: CityOption[];
}

export interface CountryOption {
  code: CountryCode;
  nameEn: string;
  nameAr: string;
  regions: RegionOption[];
}

export const countries: CountryOption[] = [
  {
    code: "SA",
    nameEn: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    regions: [
      { id: "riyadh", nameEn: "Riyadh", nameAr: "الرياض", cities: [{ id: "riyadh", nameEn: "Riyadh", nameAr: "الرياض" }, { id: "al-kharj", nameEn: "Al-Kharj", nameAr: "الخرج" }] },
      { id: "makkah", nameEn: "Makkah", nameAr: "مكة المكرمة", cities: [{ id: "jeddah", nameEn: "Jeddah", nameAr: "جدة" }, { id: "makkah", nameEn: "Makkah", nameAr: "مكة المكرمة" }, { id: "taif", nameEn: "Taif", nameAr: "الطائف" }] },
      { id: "madinah", nameEn: "Madinah", nameAr: "المدينة المنورة", cities: [{ id: "madinah", nameEn: "Madinah", nameAr: "المدينة المنورة" }, { id: "yanbu", nameEn: "Yanbu", nameAr: "ينبع" }] },
      { id: "eastern", nameEn: "Eastern Province", nameAr: "المنطقة الشرقية", cities: [{ id: "dammam", nameEn: "Dammam", nameAr: "الدمام" }, { id: "khobar", nameEn: "Khobar", nameAr: "الخبر" }, { id: "dhahran", nameEn: "Dhahran", nameAr: "الظهران" }] },
      { id: "qassim", nameEn: "Qassim", nameAr: "القصيم", cities: [{ id: "buraidah", nameEn: "Buraidah", nameAr: "بريدة" }, { id: "unayzah", nameEn: "Unaizah", nameAr: "عنيزة" }] },
      { id: "asir", nameEn: "Asir", nameAr: "عسير", cities: [{ id: "abha", nameEn: "Abha", nameAr: "أبها" }, { id: "khamis", nameEn: "Khamis Mushait", nameAr: "خميس مشيط" }] },
    ],
  },
  {
    code: "AE",
    nameEn: "United Arab Emirates",
    nameAr: "الإمارات العربية المتحدة",
    regions: [
      { id: "dubai", nameEn: "Dubai", nameAr: "دبي", cities: [{ id: "dubai", nameEn: "Dubai", nameAr: "دبي" }, { id: "jbr", nameEn: "JBR", nameAr: "جيه بي آر" }, { id: "jlt", nameEn: "JLT", nameAr: "جيه إل تي" }] },
      { id: "abu-dhabi", nameEn: "Abu Dhabi", nameAr: "أبوظبي", cities: [{ id: "abu-dhabi", nameEn: "Abu Dhabi", nameAr: "أبوظبي" }, { id: "al-ain", nameEn: "Al Ain", nameAr: "العين" }] },
      { id: "sharjah", nameEn: "Sharjah", nameAr: "الشارقة", cities: [{ id: "sharjah", nameEn: "Sharjah", nameAr: "الشارقة" }, { id: "ajman", nameEn: "Ajman", nameAr: "عجمان" }] },
      { id: "ras-al-khaimah", nameEn: "Ras Al Khaimah", nameAr: "رأس الخيمة", cities: [{ id: "rak", nameEn: "Ras Al Khaimah", nameAr: "رأس الخيمة" }] },
      { id: "fujairah", nameEn: "Fujairah", nameAr: "الفجيرة", cities: [{ id: "fujairah", nameEn: "Fujairah", nameAr: "الفجيرة" }] },
      { id: "umm-al-quwain", nameEn: "Umm Al Quwain", nameAr: "أم القيوين", cities: [{ id: "uaq", nameEn: "Umm Al Quwain", nameAr: "أم القيوين" }] },
    ],
  },
  {
    code: "QA",
    nameEn: "Qatar",
    nameAr: "قطر",
    regions: [
      { id: "doha", nameEn: "Doha", nameAr: "الدوحة", cities: [{ id: "doha", nameEn: "Doha", nameAr: "الدوحة" }, { id: "west-bay", nameEn: "West Bay", nameAr: "الخليج الغربي" }] },
      { id: "al-rayyan", nameEn: "Al Rayyan", nameAr: "الريان", cities: [{ id: "al-rayyan", nameEn: "Al Rayyan", nameAr: "الريان" }] },
      { id: "al-wakrah", nameEn: "Al Wakrah", nameAr: "الوكرة", cities: [{ id: "al-wakrah", nameEn: "Al Wakrah", nameAr: "الوكرة" }] },
      { id: "al-khor", nameEn: "Al Khor", nameAr: "الخور", cities: [{ id: "al-khor", nameEn: "Al Khor", nameAr: "الخور" }] },
    ],
  },
  {
    code: "KW",
    nameEn: "Kuwait",
    nameAr: "الكويت",
    regions: [
      { id: "hawalli", nameEn: "Hawalli", nameAr: "حولي", cities: [{ id: "hawalli", nameEn: "Hawalli", nameAr: "حولي" }, { id: "salmiya", nameEn: "Salmiya", nameAr: "السالمية" }] },
      { id: "asima", nameEn: "Capital", nameAr: "العاصمة", cities: [{ id: "kuwait-city", nameEn: "Kuwait City", nameAr: "مدينة الكويت" }] },
      { id: "ahmadi", nameEn: "Ahmadi", nameAr: "الأحمدي", cities: [{ id: "fahaheel", nameEn: "Fahaheel", nameAr: "الفحيحيل" }, { id: "ahmadi", nameEn: "Ahmadi", nameAr: "الأحمدي" }] },
      { id: "jahra", nameEn: "Jahra", nameAr: "الجهراء", cities: [{ id: "jahra", nameEn: "Jahra", nameAr: "الجهراء" }] },
      { id: "mubarak", nameEn: "Mubarak Al-Kabeer", nameAr: "مبارك الكبير", cities: [{ id: "mubarak", nameEn: "Mubarak Al-Kabeer", nameAr: "مبارك الكبير" }] },
    ],
  },
  {
    code: "BH",
    nameEn: "Bahrain",
    nameAr: "البحرين",
    regions: [
      { id: "capital", nameEn: "Capital", nameAr: "العاصمة", cities: [{ id: "manama", nameEn: "Manama", nameAr: "المنامة" }] },
      { id: "muharraq", nameEn: "Muharraq", nameAr: "المحرق", cities: [{ id: "muharraq", nameEn: "Muharraq", nameAr: "المحرق" }] },
      { id: "northern", nameEn: "Northern", nameAr: "الشمالية", cities: [{ id: "sitra", nameEn: "Sitra", nameAr: "سترة" }, { id: "hamad-town", nameEn: "Hamad Town", nameAr: "مدينة حمد" }] },
      { id: "southern", nameEn: "Southern", nameAr: "الجنوبية", cities: [{ id: "riffa", nameEn: "Riffa", nameAr: "الرفاع" }, { id: "isa-town", nameEn: "Isa Town", nameAr: "مدينة عيسى" }] },
    ],
  },
  {
    code: "OM",
    nameEn: "Oman",
    nameAr: "عُمان",
    regions: [
      { id: "muscat", nameEn: "Muscat", nameAr: "مسقط", cities: [{ id: "muscat", nameEn: "Muscat", nameAr: "مسقط" }, { id: "qurum", nameEn: "Qurum", nameAr: "قرم" }, { id: "ghubrah", nameEn: "Ghubrah", nameAr: "غبرة" }] },
      { id: "dhofar", nameEn: "Dhofar", nameAr: "ظفار", cities: [{ id: "salalah", nameEn: "Salalah", nameAr: "صلالة" }] },
      { id: "musandam", nameEn: "Musandam", nameAr: "مسندم", cities: [{ id: "khasab", nameEn: "Khasab", nameAr: "خصب" }] },
      { id: "dakhiliyah", nameEn: "Ad Dakhiliyah", nameAr: "الداخلية", cities: [{ id: "nizwa", nameEn: "Nizwa", nameAr: "نزوى" }] },
    ],
  },
  {
    code: "EG",
    nameEn: "Egypt",
    nameAr: "مصر",
    regions: [
      { id: "cairo", nameEn: "Cairo", nameAr: "القاهرة", cities: [{ id: "cairo", nameEn: "Cairo", nameAr: "القاهرة" }, { id: "nasr-city", nameEn: "Nasr City", nameAr: "مدينة نصر" }, { id: "heliopolis", nameEn: "Heliopolis", nameAr: "هليوبوليس" }] },
      { id: "giza", nameEn: "Giza", nameAr: "الجيزة", cities: [{ id: "giza", nameEn: "Giza", nameAr: "الجيزة" }, { id: "6-october", nameEn: "6th October City", nameAr: "مدينة السادس من أكتوبر" }] },
      { id: "alexandria", nameEn: "Alexandria", nameAr: "الإسكندرية", cities: [{ id: "alexandria", nameEn: "Alexandria", nameAr: "الإسكندرية" }] },
      { id: "sharqia", nameEn: "Sharqia", nameAr: "الشرقية", cities: [{ id: "zagazig", nameEn: "Zagazig", nameAr: "الزقازيق" }] },
      { id: "daqahliya", nameEn: "Dakahlia", nameAr: "الدقهلية", cities: [{ id: "mansoura", nameEn: "Mansoura", nameAr: "المنصورة" }] },
    ],
  },
];

export const countryCodes: CountryCode[] = ["SA", "AE", "QA", "KW", "BH", "OM", "EG"];

export function getCountryByCode(code: CountryCode): CountryOption | undefined {
  return countries.find((c) => c.code === code);
}

export function getRegion(countryCode: CountryCode, regionId: string): RegionOption | undefined {
  const country = getCountryByCode(countryCode);
  return country?.regions.find((r) => r.id === regionId);
}
