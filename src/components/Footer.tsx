import { site } from "@/lib/site";
import { Camera, MessageCircle, Send } from "lucide-react";

export function Footer() {
  const whatsappHref = `https://wa.me/${site.whatsappNumberE164.replace(/[^\d]/g, "")}`;
  return (
    <footer className="border-t border-brand/25 bg-black/40 shadow-[inset_0_1px_0_rgba(30,111,217,0.12)] backdrop-blur-sm">
      <div className="shark-container py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="text-xl font-semibold tracking-tight text-white">{site.name}</div>
            <div className="mt-3 max-w-xl leading-7 text-white/70">
              طلب باستشارة أولاً لنتيجة أوضح: منتجات مختارة بدعم مباشر عبر الواتساب.
            </div>
            <div className="mt-6 text-xs font-extrabold tracking-[0.22em] text-brand/80">
              صحة • لياقة • استشارة
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="text-sm font-semibold text-white">تواصل</div>
            <div className="mt-4 grid gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 hover:border-brand/45 hover:bg-brand/10 transition"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">واتساب</span>
                <span className="ms-auto text-xs text-white/55">طلب واستشارة سريعة</span>
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 hover:border-brand/45 hover:bg-brand/10 transition"
              >
                <Send className="h-5 w-5" />
                <span className="text-sm font-semibold">تيليغرام</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 hover:border-brand/45 hover:bg-brand/10 transition"
              >
                <Camera className="h-5 w-5" />
                <span className="text-sm font-semibold">إنستغرام</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} ‏{site.name}. جميع الحقوق محفوظة.
          </div>
          <div className="text-brand/55">هوية مستوحاة من الشعار • حركة سلسة</div>
        </div>
      </div>
    </footer>
  );
}
