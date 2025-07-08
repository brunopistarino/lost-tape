export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Default to ARS for Argentine pesos
    minimumFractionDigits: 2,
  }).format(price) // Convert cents to pesos
}
