export function formatPrice(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formattedAmount} €`;
}
