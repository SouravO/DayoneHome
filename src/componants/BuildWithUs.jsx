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
  const activeIndex = Math.min(BUILD_TOGETHER_IMAGES.length - 1, Math.floor(progress * BUILD_TOGETHER_IMAGES.length));

  return (
    <section ref={containerRef} className="relative w-full h-[400vh]" style={{ backgroundColor: "#F4F0E2" }}>
      <div className="sticky top-0 w-full h-[100svh] flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto pt-24 lg:pt-32">
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-16 shrink-0 z-10 pb-8 lg:pb-0">
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

        <div className="w-full lg:w-1/2 flex items-center justify-center z-0 pb-16 lg:pb-0">
          <div className="relative w-full max-w-[28rem] mx-auto aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
            {BUILD_TOGETHER_IMAGES.map((image, index) => (
              <div
                key={image.src}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: activeIndex === index ? 1 : 0, pointerEvents: activeIndex === index ? "auto" : "none", zIndex: activeIndex === index ? 10 : 0 }}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}