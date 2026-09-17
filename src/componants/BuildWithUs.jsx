import { useEffect, useRef, useState } from "react";

const BUILD_TOGETHER_IMAGES = [
  { src: "/slide1.png", alt: "DayOne works with founders." },
  { src: "/slide2.png", alt: "The DayOne venture-building system." },
  { src: "/slide3.png", alt: "DayOne works with investors." },
  { src: "/slide4.png", alt: "Building better companies together." },
];

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      const nextProgress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setProgress(Math.max(0, Math.min(1, nextProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

export default function BuildWithUs() {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches
  );
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setMobileActiveIndex((currentIndex) => (currentIndex + 1) % BUILD_TOGETHER_IMAGES.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isMobile]);

  const activeIndex = Math.min(BUILD_TOGETHER_IMAGES.length - 1, Math.floor(progress * BUILD_TOGETHER_IMAGES.length));
  const displayedIndex = isMobile ? mobileActiveIndex : activeIndex;

  return (
    <section ref={containerRef} className="relative w-full py-16 sm:py-20 lg:h-[400vh] lg:py-0" style={{ backgroundColor: "#F4F0E2" }}>
      <div className="flex w-full flex-col items-center gap-10 px-6 sm:px-10 lg:sticky lg:top-0 lg:h-[100svh] lg:flex-row lg:gap-0 lg:px-16 lg:pt-32 2xl:px-24 max-w-[100rem] mx-auto">
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-16 shrink-0 z-10">
          <h2 className="text-[10vw] lg:text-[5.5vw] font-medium leading-[1.05] tracking-tight mb-6 lg:mb-8" style={{ color: "#211D1B" }}>
            Built for<br />
            founders.<br />
            Structured for<br />
            investors.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-md" style={{ color: "rgba(33, 29, 27, 0.65)" }}>
            For founders, DAYONE is the support system behind the company. For investors, DAYONE is a focused pipeline of startups built with structure, visibility and discipline.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center z-0">
          <div className="relative w-full max-w-[28rem] mx-auto aspect-[1145/1374] rounded-[2rem] lg:aspect-[4/5] lg:rounded-[3rem] overflow-hidden shadow-2xl">
            {BUILD_TOGETHER_IMAGES.map((image, index) => (
              <div
                key={image.src}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: displayedIndex === index ? 1 : 0, pointerEvents: displayedIndex === index ? "auto" : "none", zIndex: displayedIndex === index ? 10 : 0 }}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-contain lg:object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
