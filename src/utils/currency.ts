// Static exchange rates (EUR as base) for MVP
const RATES_TO_EUR: Record<string, number> = {
  EUR: 1,
  GBP: 1.16,
  USD: 0.92,
  TRY: 0.026,
  CZK: 0.04,
  ISK: 0.0067,
  JPY: 0.0062,
  CHF: 1.03,
  SEK: 0.089,
};

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  const fromRate = RATES_TO_EUR[from];
  const toRate = RATES_TO_EUR[to];
  if (!fromRate || !toRate) return amount;
  const eurAmount = amount * fromRate;
  return Math.round((eurAmount / toRate) * 100) / 100;
}

export function formatPrice(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    EUR: "€",
    GBP: "£",
    USD: "$",
    TRY: "₺",
    CZK: "Kč",
    ISK: "kr",
    JPY: "¥",
    CHF: "CHF",
  };
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
}
