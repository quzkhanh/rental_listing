export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ/tháng';
}

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    return millions % 1 === 0 
      ? `${millions} triệu/tháng` 
      : `${millions.toFixed(1)} triệu/tháng`;
  }
  return formatPrice(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getZaloLink(phone: string, message: string): string {
  return `https://zalo.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getGoogleMapsEmbedUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}
