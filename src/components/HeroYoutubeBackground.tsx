"use client";

/** فيديو YouTube Shorts كخلفية للهيرو — صامت، تلقائي، متكرر */
export function HeroYoutubeBackground({ videoId }: { videoId: string }) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    showinfo: "0",
  });
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    videoId
  )}?${params.toString()}`;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0">
        <iframe
          src={src}
          title=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{
            width: "max(100vw, 56.25vh)",
            height: "max(100vh, 177.78vw)",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(30, 111, 217, 0.2) 0%, transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
}
