import { site } from "@/lib/site";
import { InstagramGlyph, TelegramGlyph, WhatsAppGlyph } from "./BrandIcons";

const DEVELOPER_WHATSAPP_E164 = "9647736114455";

export function Footer() {
  const whatsappHref = `https://wa.me/${site.whatsappNumberE164.replace(/[^\d]/g, "")}`;
  const developerWhatsappHref = `https://wa.me/${DEVELOPER_WHATSAPP_E164}`;
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
                className={[
                  "inline-flex items-center gap-3 rounded-xl border px-4 py-3 transition",
                  "border-[#25D366]/45 bg-[#25D366]/12 text-white shadow-[0_0_24px_rgba(37,211,102,0.12)]",
                  "hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:shadow-[0_0_28px_rgba(37,211,102,0.22)]",
                ].join(" ")}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white ring-1 ring-[#25D366]/55 shadow-[0_0_18px_rgba(37,211,102,0.45)]">
                  <WhatsAppGlyph className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">واتساب</span>
                <span className="ms-auto text-xs text-white/70">طلب واستشارة سريعة</span>
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex items-center gap-3 rounded-xl border px-4 py-3 transition",
                  "border-[#229ED9]/45 bg-[#229ED9]/12 text-white shadow-[0_0_24px_rgba(34,158,217,0.12)]",
                  "hover:border-[#229ED9]/70 hover:bg-[#229ED9]/20 hover:shadow-[0_0_28px_rgba(34,158,217,0.22)]",
                ].join(" ")}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#229ED9] text-white ring-1 ring-[#229ED9]/55 shadow-[0_0_18px_rgba(34,158,217,0.45)]">
                  <TelegramGlyph className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">تيليغرام</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex items-center gap-3 rounded-xl border px-4 py-3 transition",
                  "border-fuchsia-500/35 bg-gradient-to-br from-[#f58529]/14 via-[#dd2a7b]/14 to-[#8134af]/14 text-white",
                  "shadow-[0_0_24px_rgba(221,42,123,0.1)]",
                  "hover:border-fuchsia-400/50 hover:from-[#f58529]/22 hover:via-[#dd2a7b]/22 hover:to-[#8134af]/22",
                  "hover:shadow-[0_0_28px_rgba(129,52,175,0.18)]",
                ].join(" ")}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white ring-1 ring-white/25 shadow-[0_0_18px_rgba(221,42,123,0.35)]"
                  aria-hidden
                >
                  <InstagramGlyph className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">إنستغرام</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} ‏{site.name}. جميع الحقوق محفوظة.
          </div>
          <div className="text-white/55">
            تمت البرمجة بواسطة علي قاسم للتواصل{" "}
            <a
              href={developerWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand/85 underline underline-offset-[3px] decoration-brand/70 transition hover:text-brand hover:decoration-brand"
            >
              اضغط هنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
