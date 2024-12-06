// constants/timezones.ts

export const TIMEZONES = [
    { value: "UTC", label: "UTC (Universal Coordinated Time)" },
    { value: "GMT", label: "GMT (Greenwich Mean Time)" },
    { value: "EST", label: "EST (Eastern Standard Time UTC-5)" },
    { value: "EDT", label: "EDT (Eastern Daylight Time UTC-4)" },
    { value: "CST", label: "CST (Central Standard Time UTC-6)" },
    { value: "CDT", label: "CDT (Central Daylight Time UTC-5)" },
    { value: "MST", label: "MST (Mountain Standard Time UTC-7)" },
    { value: "MDT", label: "MDT (Mountain Daylight Time UTC-6)" },
    { value: "PST", label: "PST (Pacific Standard Time UTC-8)" },
    { value: "PDT", label: "PDT (Pacific Daylight Time UTC-7)" },
    { value: "AKST", label: "AKST (Alaska Standard Time UTC-9)" },
    { value: "AKDT", label: "AKDT (Alaska Daylight Time UTC-8)" },
    { value: "HST", label: "HST (Hawaii Standard Time UTC-10)" },
    { value: "HADT", label: "HADT (Hawaii-Aleutian Daylight Time UTC-9)" },
    { value: "BST", label: "BST (British Summer Time UTC+1)" },
    { value: "CET", label: "CET (Central European Time UTC+1)" },
    { value: "CEST", label: "CEST (Central European Summer Time UTC+2)" },
    { value: "IST", label: "IST (India Standard Time UTC+5:30)" },
    { value: "CST-CN", label: "CST (China Standard Time UTC+8)" },
    { value: "JST", label: "JST (Japan Standard Time UTC+9)" },
    { value: "AEST", label: "AEST (Australian Eastern Standard Time UTC+10)" },
    { value: "AEDT", label: "AEDT (Australian Eastern Daylight Time UTC+11)" },
    { value: "NZST", label: "NZST (New Zealand Standard Time UTC+12)" },
    { value: "NZDT", label: "NZDT (New Zealand Daylight Time UTC+13)" },
  ] as const;
  
  export type TimezoneValue = typeof TIMEZONES[number]["value"];