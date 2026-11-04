export const site = {
  name: "SHARK TEAM",
  tagline: "القمة في التغذية والتدريب",
  /** واتساب الاستشارة الطبية والطلب */
  whatsappNumberE164: "9647731612753",
  whatsappNoteAr:
    "ملاحظة: الطلب يكون عبر واتساب للحصول على استشارة صحية أفضل قبل الشراء.",
  appStoreUrl: "https://apps.apple.com/dk/app/shark-fit/id6774619074",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.sharkteam.fitness",
};

export function buildWhatsappOrderMessage(productName: string) {
  return `مرحباً SHARK TEAM، أرغب بطلب منتج «${productName}» مع الحصول على استشارة.`;
}

export function buildWhatsappProductsMessage() {
  return "مرحباً SHARK TEAM، أرغب بطلب المنتجات مع الحصول على استشارة.";
}

export function buildWhatsappUrl(message: string, numberE164 = site.whatsappNumberE164) {
  const text = encodeURIComponent(message);
  const cleaned = numberE164.replace(/[^\d]/g, "");
  return `https://wa.me/${cleaned}?text=${text}`;
}
