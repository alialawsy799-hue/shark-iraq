"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsappOrderMessage, buildWhatsappUrl, site } from "@/lib/site";

export function WhatsAppOrderButton({ productName }: { productName: string }) {
  const message = buildWhatsappOrderMessage(productName);
  const href = buildWhatsappUrl(message);

  return (
    <div className="space-y-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shark-btn-primary gap-2"
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        الطلب عبر واتساب
      </a>
      <div className="text-xs leading-6 text-white/55">{site.whatsappNoteAr}</div>
    </div>
  );
}
