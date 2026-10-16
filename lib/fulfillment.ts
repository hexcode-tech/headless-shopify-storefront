export function getShippingCost(address: any) {
  // Simple flat-rate shipping by country for demo purposes
  const country = address?.country?.toLowerCase() || ''
  if (country === 'us' || country === 'united states') return 5.0
  if (country === 'gb' || country === 'uk' || country === 'united kingdom') return 8.0
  if (country === 'de' || country === 'fr' || country === 'es' || country === 'italy') return 10.0
  return 15.0
}

export function getTaxAmount(address: any, subtotalUSD: number) {
  const country = address?.country?.toLowerCase() || ''
  // Simplified tax rules: EU 20% VAT, US default 0-8% (we'll use 7%), UK 20%
  if (country === 'de' || country === 'fr' || country === 'es' || country === 'italy' || country === 'uk' || country === 'gb') return +(subtotalUSD * 0.20).toFixed(2)
  if (country === 'us' || country === 'united states') return +(subtotalUSD * 0.07).toFixed(2)
  return 0
}
