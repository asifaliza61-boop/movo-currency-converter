// Full list of currencies with names and flag emojis
export const CURRENCIES = {
  PKR: { name: 'Pakistani Rupee',       flag: '🇵🇰' },
  USD: { name: 'US Dollar',              flag: '🇺🇸' },
  EUR: { name: 'Euro',                   flag: '🇪🇺' },
  GBP: { name: 'British Pound',          flag: '🇬🇧' },
  AED: { name: 'UAE Dirham',             flag: '🇦🇪' },
  SAR: { name: 'Saudi Riyal',            flag: '🇸🇦' },
  JPY: { name: 'Japanese Yen',           flag: '🇯🇵' },
  AUD: { name: 'Australian Dollar',      flag: '🇦🇺' },
  CAD: { name: 'Canadian Dollar',        flag: '🇨🇦' },
  CHF: { name: 'Swiss Franc',            flag: '🇨🇭' },
  CNY: { name: 'Chinese Yuan',           flag: '🇨🇳' },
  INR: { name: 'Indian Rupee',           flag: '🇮🇳' },
  MXN: { name: 'Mexican Peso',           flag: '🇲🇽' },
  BRL: { name: 'Brazilian Real',         flag: '🇧🇷' },
  KRW: { name: 'South Korean Won',       flag: '🇰🇷' },
  SGD: { name: 'Singapore Dollar',       flag: '🇸🇬' },
  HKD: { name: 'Hong Kong Dollar',       flag: '🇭🇰' },
  NOK: { name: 'Norwegian Krone',        flag: '🇳🇴' },
  SEK: { name: 'Swedish Krona',          flag: '🇸🇪' },
  DKK: { name: 'Danish Krone',           flag: '🇩🇰' },
  NZD: { name: 'New Zealand Dollar',     flag: '🇳🇿' },
  ZAR: { name: 'South African Rand',     flag: '🇿🇦' },
  TRY: { name: 'Turkish Lira',           flag: '🇹🇷' },
  THB: { name: 'Thai Baht',              flag: '🇹🇭' },
  MYR: { name: 'Malaysian Ringgit',      flag: '🇲🇾' },
  IDR: { name: 'Indonesian Rupiah',      flag: '🇮🇩' },
  PHP: { name: 'Philippine Peso',        flag: '🇵🇭' },
  BDT: { name: 'Bangladeshi Taka',       flag: '🇧🇩' },
  NPR: { name: 'Nepalese Rupee',         flag: '🇳🇵' },
  LKR: { name: 'Sri Lankan Rupee',       flag: '🇱🇰' },
  AFN: { name: 'Afghan Afghani',         flag: '🇦🇫' },
  QAR: { name: 'Qatari Riyal',           flag: '🇶🇦' },
  KWD: { name: 'Kuwaiti Dinar',          flag: '🇰🇼' },
  BHD: { name: 'Bahraini Dinar',         flag: '🇧🇭' },
  OMR: { name: 'Omani Rial',             flag: '🇴🇲' },
  EGP: { name: 'Egyptian Pound',         flag: '🇪🇬' },
  NGN: { name: 'Nigerian Naira',         flag: '🇳🇬' },
  KES: { name: 'Kenyan Shilling',        flag: '🇰🇪' },
  GHS: { name: 'Ghanaian Cedi',          flag: '🇬🇭' },
  RUB: { name: 'Russian Ruble',          flag: '🇷🇺' },
  PLN: { name: 'Polish Zloty',           flag: '🇵🇱' },
  CZK: { name: 'Czech Koruna',           flag: '🇨🇿' },
  HUF: { name: 'Hungarian Forint',       flag: '🇭🇺' },
  RON: { name: 'Romanian Leu',           flag: '🇷🇴' },
  CLP: { name: 'Chilean Peso',           flag: '🇨🇱' },
  COP: { name: 'Colombian Peso',         flag: '🇨🇴' },
  ARS: { name: 'Argentine Peso',         flag: '🇦🇷' },
  PEN: { name: 'Peruvian Sol',           flag: '🇵🇪' },
  TWD: { name: 'Taiwan Dollar',          flag: '🇹🇼' },
  VND: { name: 'Vietnamese Dong',        flag: '🇻🇳' },
  UAH: { name: 'Ukrainian Hryvnia',      flag: '🇺🇦' },
  ILS: { name: 'Israeli Shekel',         flag: '🇮🇱' },
  JOD: { name: 'Jordanian Dinar',        flag: '🇯🇴' },
  MAD: { name: 'Moroccan Dirham',        flag: '🇲🇦' },
  DZD: { name: 'Algerian Dinar',         flag: '🇩🇿' },
}

export const POPULAR_CURRENCIES = [
  'USD','EUR','GBP','AED','SAR','JPY','AUD','CAD','CNY','INR','QAR','KWD'
]

export const getCurrencyList = () =>
  Object.entries(CURRENCIES).map(([code, info]) => ({ code, ...info }))

export const formatAmount = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export const formatAmountPKR = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
