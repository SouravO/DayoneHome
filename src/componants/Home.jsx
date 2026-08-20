import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const COLORS = {
  cream: "#F5F1E0",
  creamMuted: "#EBE5D3",
  red: "#CF2D26",
  deepRed: "#9A302B",
  charcoal: "#262119",
  charcoalMuted: "rgba(38, 33, 25, 0.68)",
  charcoalFaint: "rgba(38, 33, 25, 0.4)",
  charcoalGhost: "rgba(38, 33, 25, 0.06)",
  hairline: "rgba(38, 33, 25, 0.12)",
  hairlineLight: "rgba(245, 241, 224, 0.12)",
};

/* ------------------------------------------------------------------ */
/* Hooks & Utils                                                      */
/* ------------------------------------------------------------------ */

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function useParallax(speed = 0.05) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let rafId;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      if (rect.top < viewHeight && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2) - viewHeight / 2;
        rafId = requestAnimationFrame(() => setOffset(centerOffset * speed));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return [ref, offset];
}

/* ------------------------------------------------------------------ */
/* Components                                                         */
/* ------------------------------------------------------------------ */

function TextReveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  
  return (
    <div ref={ref} className={`overflow-hidden py-1 ${className}`}>
      <div
        className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{
          transform: visible ? "translateY(0)" : "translateY(110%)",
          transitionDelay: visible ? `${delay}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FadeReveal({ children, delay = 0, className = "", distance = "translate-y-8" }) {
  const [ref, visible] = useReveal();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : distance,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function PremiumButton({ children, dark = false, className = "", ...props }) {
  const borderCol = dark ? "border-white/20" : "border-[#262119]/20";
  const textCol = dark ? "text-[#F5F1E0]" : "text-[#262119]";
  
  return (
    <button
      type="button"
      {...props}
      className={`group relative inline-flex items-center justify-center overflow-hidden border px-10 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-700 hover:border-[#CF2D26] ${borderCol} ${textCol} ${className}`}
    >
      <div className="absolute inset-0 z-0 origin-bottom translate-y-full bg-[#CF2D26] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      <span className="relative z-10 flex items-center gap-4 group-hover:text-[#F5F1E0] transition-colors duration-500">
        {children}
        <ArrowRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
      </span>
    </button>
  );
}

function LineDivider({ delay = 0, dark = false }) {
  const [ref, visible] = useReveal();
  const color = dark ? COLORS.hairlineLight : COLORS.hairline;
  return (
    <div ref={ref} className="w-full overflow-hidden h-px">
      <div 
        className="w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left"
        style={{ 
          backgroundColor: color, 
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: `${delay}ms`
        }} 
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const INDUSTRIES = [
  { name: "Marketing", desc: "Building brands, communication and growth businesses." },
  { name: "Energy", desc: "Exploring opportunities across energy and petroleum businesses." },
  { name: "Technology", desc: "Creating technology-led products and business models." },
  { name: "Consumer", desc: "Building businesses around changing customer behavior and demand." },
  { name: "Hospitality", desc: "Developing experience-led businesses and hospitality concepts." },
  { name: "Property", desc: "Exploring opportunities across property and real-estate services." },
  { name: "Business Services", desc: "Creating practical businesses around operational needs." },
  { name: "Emerging Ventures", desc: "Exploring new opportunities where the next business can begin." },
];

const VENTURES = [
  { name: "DayOne Media", desc: "Building modern businesses around brand, communication and growth." },
  { name: "DayOne Energy", desc: "Exploring opportunities across the evolving energy ecosystem." },
  { name: "DayOne Digital", desc: "Building digital products and technology-led business models." },
  { name: "DayOne Commerce", desc: "Creating modern consumer businesses around changing customer behavior." },
  { name: "DayOne Hospitality", desc: "Building differentiated hospitality and experience-led ventures." },
  { name: "DayOne Property", desc: "Exploring opportunities across property and real-estate services." },
];

const _PHILOSOPHY_STATES = [
  {
    title: "The best ideas",
    desc: "We're ruthless about only committing resources and capital to the most promising ideas.",
    bg: "#E3B651",
    textCol: "text-white",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="6" fill="white"/>
        <path d="M60 20L60 35M60 85L60 100M20 60L35 60M85 60L100 60M31.7157 31.7157L42.3223 42.3223M77.6777 77.6777L88.2843 88.2843M31.7157 88.2843L42.3223 77.6777M77.6777 42.3223L88.2843 31.7157M45 23L50 36M75 97L70 84M23 75L36 70M97 45L84 50M23 45L36 50M97 75L84 70M45 97L50 84M75 23L70 36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Focus on building",
    desc: "Spend your time building while our team of experts does the rest.",
    bg: "#181512",
    textCol: "text-white",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="42" cy="60" r="18" fill="white"/>
        <circle cx="78" cy="60" r="18" fill="white"/>
        <circle cx="60" cy="42" r="18" fill="white"/>
        <circle cx="60" cy="78" r="18" fill="white"/>
        <rect x="36" y="54" width="12" height="12" fill="#181512"/>
        <path d="M78 54L84 60L78 66L72 60L78 54Z" fill="#181512"/>
        <path d="M60 34C60 34 63 42 66 42C63 42 60 50 60 50C60 50 57 42 54 42C57 42 60 34 60 34Z" fill="#181512"/>
        <path d="M60 70C60 70 63 78 66 78C63 78 60 86 60 86C60 86 57 78 54 78C57 78 60 70 60 70Z" fill="#181512"/>
      </svg>
    )
  },
  {
    title: "Unfair advantage",
    desc: "Go to market faster with the best ideas, playbooks, team, and flexible funding structure.",
    bg: "#3B6946",
    textCol: "text-white",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 30H50V50H30V30Z" fill="white"/>
        <path d="M55 30H75V50H55V30Z" fill="white"/>
        <path d="M80 30H100V50H80V30Z" fill="white"/>
        <path d="M30 55H50V75H30V55Z" fill="white"/>
        <path d="M55 55H75V75H55V55Z" fill="white"/>
        <path d="M80 55L100 75H80V55Z" fill="white"/>
        <path d="M30 80H50V100H30V80Z" fill="white"/>
        <path d="M55 80L75 100H55V80Z" fill="white"/>
        <path d="M30 30L50 50H30V30Z" fill="#3B6946"/>
        <path d="M55 30L75 50H55V30Z" fill="#3B6946"/>
        <path d="M30 55L50 75H30V55Z" fill="#3B6946"/>
        <path d="M30 80L50 100H30V80Z" fill="#3B6946"/>
        <path d="M55 55L75 75H55V55Z" fill="#3B6946"/>
      </svg>
    )
  },
  {
    title: "Outsized impact",
    desc: "Our goal is to build the largest and fastest growing companies, giving our co-founders more opportunity for upside.",
    bg: "#E09C83",
    textCol: "text-white",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 40C60 40 64 52 70 52C64 52 60 64 60 64C60 64 56 52 50 52C56 52 60 40 60 40Z" fill="white"/>
        <path d="M36 60C36 60 48 88 60 88C60 88 60 70 60 60C60 60 46 54 36 60Z" fill="white"/>
        <path d="M84 60C84 60 72 88 60 88C60 88 60 70 60 60C60 60 74 54 84 60Z" fill="white"/>
      </svg>
    )
  }
];

/* ------------------------------------------------------------------ */
/* Sections                                                           */
/* ------------------------------------------------------------------ */

function Hero({ loaded }) {
  const [imgRef, imgOffset] = useParallax(0.15);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#262119]">
      
      {/* 1. Cinematic Full-Screen Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/Hero.png"
          alt="DayOne Studio Office"
          className="w-full h-[120%] object-cover object-center transition-all duration-[2500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ 
            transform: `translateY(${imgOffset}px) scale(${loaded ? 1 : 1.1})`,
            opacity: loaded ? 1 : 0.4,
            filter: "contrast(1.05) brightness(0.95)"
          }}
        />
        
        {/* 2. Controlled Dark Overlays for Perfect Contrast & Readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#262119] via-[#262119]/70 to-transparent transition-opacity duration-[2000ms] ease-out pointer-events-none"
          style={{ opacity: loaded ? 0.95 : 0 }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#262119]/95 via-[#262119]/50 to-transparent w-full lg:w-3/4 transition-opacity duration-[2500ms] ease-out pointer-events-none"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* 3. WOW Detail: Subtle ambient red glow behind the red serif text */}
        <div 
          className="absolute -bottom-20 -left-20 w-[60vw] h-[60vh] bg-[#CF2D26]/25 blur-[160px] rounded-full mix-blend-screen pointer-events-none transition-all duration-[3000ms] ease-out"
          style={{ 
            opacity: loaded ? 0.7 : 0,
            transform: `translate(${loaded ? '0%' : '-5%'}, ${loaded ? '0%' : '5%'}) scale(${loaded ? 1 : 0.9})`
          }}
        />
      </div>

      {/* 4. Cinematic Foreground Typography & Content */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[90vw] lg:max-w-[80vw]">
          <h1 className="flex flex-col text-[14vw] lg:text-[10vw] font-black uppercase leading-[0.82] tracking-tighter" style={{ color: COLORS.cream }}>
            <TextReveal delay={100}>Every</TextReveal>
            <TextReveal delay={250} className="-mt-1 lg:-mt-4">Business</TextReveal>
            <span className="font-serif italic lowercase tracking-tight mt-2 lg:mt-5 text-[#CF2D26] drop-shadow-2xl flex">
              <TextReveal delay={400} className="pl-4 lg:pl-[12%]">has a day one.</TextReveal>
            </span>
          </h1>
        </div>

        <div className="mt-12 lg:mt-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-24">
          <FadeReveal delay={600} className="max-w-xl">
            <p className="text-xl md:text-2xl lg:text-[1.6rem] leading-relaxed font-medium" style={{ color: "rgba(245, 241, 224, 0.85)" }}>
              DayOne Ventures is a studio building, operating and growing businesses across industries.
            </p>
          </FadeReveal>
          
          <FadeReveal delay={750} distance="translate-y-6" className="shrink-0">
            <PremiumButton dark>Explore ventures</PremiumButton>
          </FadeReveal>
        </div>
      </div>
      
      {/* 5. Smooth structural transition into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5F1E0]/20 to-transparent z-10" />
    </section>
  );
}

function Intro() {
  const [imgRef, imgOffset] = useParallax(0.08);

  return (
    <section className="relative w-full pb-16 overflow-hidden" style={{ backgroundColor: COLORS.creamMuted }}>
      <div className="pt-12 lg:pt-20 px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between items-start">
          
          {/* Massive Typographic Statement */}
          <div className="w-full lg:w-[65%] shrink-0">
            <h2 className="text-[12vw] lg:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter" style={{ color: COLORS.charcoal }}>
              <TextReveal>We build</TextReveal>
              <TextReveal delay={150}>more than</TextReveal>
              <span className="font-serif italic lowercase tracking-tight text-[#CF2D26] block">
                <TextReveal delay={300}>ideas.</TextReveal>
              </span>
            </h2>
            
            <div className="mt-16 lg:mt-24 max-w-2xl grid gap-8 border-l-2 pl-6 lg:pl-10" style={{ borderColor: COLORS.red }}>
              <FadeReveal delay={200}>
                <p className="text-xl md:text-2xl leading-relaxed font-medium" style={{ color: COLORS.charcoalMuted }}>
                  DayOne is built around the belief that strong businesses are created when opportunity meets disciplined execution.
                </p>
              </FadeReveal>
              <FadeReveal delay={300}>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: COLORS.charcoalMuted }}>
                  We bring strategy, creativity, technology, and operational thinking together to move from an early idea to something scalable and enduring.
                </p>
              </FadeReveal>
            </div>
          </div>

          {/* Asymmetric Image Presentation */}
          <div className="w-full lg:w-[35%] lg:mt-32">
            <FadeReveal distance="translate-y-16">
              <div className="relative w-full aspect-[3/4] overflow-hidden group">
                <img 
                  ref={imgRef}
                  src="/Home.png" 
                  alt="DayOne Studio Execution" 
                  className="w-full h-[120%] object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  style={{ transform: `translateY(${imgOffset}px)` }}
                />
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>
     
    </section>
  );
}

function Ecosystem() {
  const marqueeImages = [
    { src: '/about.png', aspect: 'aspect-[4/3]', width: 'w-[70vw] sm:w-[45vw] lg:w-[28vw]' },
    { src: '/Home.png', aspect: 'aspect-[3/4]', width: 'w-[55vw] sm:w-[35vw] lg:w-[22vw]' },
    { src: '/Banner.png', aspect: 'aspect-[16/9]', width: 'w-[85vw] sm:w-[55vw] lg:w-[35vw]' },
    { src: '/quote.png', aspect: 'aspect-square', width: 'w-[60vw] sm:w-[40vw] lg:w-[24vw]' },
    { src: '/Hero.png', aspect: 'aspect-[4/5]', width: 'w-[50vw] sm:w-[32vw] lg:w-[20vw]' },
    { src: '/image.png', aspect: 'aspect-[3/2]', width: 'w-[75vw] sm:w-[48vw] lg:w-[30vw]' },
    { src: '/aboutbanner.png', aspect: 'aspect-[4/3]', width: 'w-[65vw] sm:w-[42vw] lg:w-[26vw]' },
    { src: '/image1.png', aspect: 'aspect-[3/4]', width: 'w-[60vw] sm:w-[38vw] lg:w-[23vw]' },
    { src: '/service.png', aspect: 'aspect-[16/9]', width: 'w-[80vw] sm:w-[50vw] lg:w-[32vw]' },
    { src: '/quote2.png', aspect: 'aspect-square', width: 'w-[55vw] sm:w-[35vw] lg:w-[21vw]' },
    { src: '/quote3.png', aspect: 'aspect-[3/2]', width: 'w-[70vw] sm:w-[45vw] lg:w-[28vw]' },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      <style>
        {`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 60s linear infinite;
            display: flex;
            width: max-content;
          }
          .marquee-container:hover .animate-infinite-scroll {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-[11vw] lg:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter" style={{ color: COLORS.charcoal }}>
            <TextReveal>Many Industries.</TextReveal>
            <span className="font-serif italic lowercase tracking-tight text-[#CF2D26] block mt-2 lg:mt-4">
              <TextReveal delay={200}>One mindset.</TextReveal>
            </span>
          </h2>
          <FadeReveal delay={300} className="mt-12 lg:mt-16">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl font-medium" style={{ color: COLORS.charcoalMuted }}>
              DayOne explores and builds opportunities across markets, bringing the same entrepreneurial discipline to every venture.
            </p>
          </FadeReveal>
        </div>
      </div>

      {/* High-End Continuous Image Marquee */}
      <div className="mt-8 lg:mt-12 w-full marquee-container">
        <div className="animate-infinite-scroll">
          {/* First Loop Content */}
          <div className="flex gap-4 sm:gap-6 lg:gap-10 pr-4 sm:pr-6 lg:pr-10 items-center">
            {marqueeImages.map((item, i) => (
              <div 
                key={`set1-${i}`} 
                className={`relative shrink-0 overflow-hidden rounded-2xl md:rounded-[2rem] group/image cursor-pointer ${item.width} ${item.aspect}`}
              >
                <img 
                  src={item.src} 
                  alt="DayOne Ecosystem" 
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[#262119]/0 transition-colors duration-700 ease-out group-hover/image:bg-[#262119]/10" />
              </div>
            ))}
          </div>
          {/* Second Loop for seamless infinite transition */}
          <div className="flex gap-4 sm:gap-6 lg:gap-10 pr-4 sm:pr-6 lg:pr-10 items-center">
            {marqueeImages.map((item, i) => (
              <div 
                key={`set2-${i}`} 
                className={`relative shrink-0 overflow-hidden rounded-2xl md:rounded-[2rem] group/image cursor-pointer ${item.width} ${item.aspect}`}
              >
                <img 
                  src={item.src} 
                  alt="DayOne Ecosystem" 
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[#262119]/0 transition-colors duration-700 ease-out group-hover/image:bg-[#262119]/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ventures() {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section className="relative w-full py-16 lg:py-24 bg-charcoal overflow-hidden group/section" style={{ backgroundColor: COLORS.charcoal }}>
      
      {/* Dynamic Background Image linked to hover state */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-[1200ms] ease-out opacity-0 group-hover/section:opacity-[0.15]"
      >
        <img 
          src="/Home.png" 
          alt="Ventures Abstract" 
          className="w-full h-full object-cover grayscale mix-blend-luminosity transition-transform duration-[2000ms] ease-out scale-110 group-hover/section:scale-100" 
          style={{ objectPosition: hoverIndex !== null ? `center ${hoverIndex * 15}%` : "center center" }}
        />
        <div className="absolute inset-0 bg-[#262119]/50" />
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto">
        <h2 className="text-[11vw] lg:text-[7.5vw] font-black uppercase leading-[0.85] tracking-tighter" style={{ color: COLORS.cream }}>
          <TextReveal>Businesses</TextReveal>
          <span className="font-serif italic lowercase tracking-tight text-[#CF2D26] block pl-12 lg:pl-32 mt-2">
            <TextReveal delay={150}>in motion.</TextReveal>
          </span>
        </h2>

        <div className="mt-12 lg:mt-20 flex flex-col w-full border-t" style={{ borderColor: COLORS.hairlineLight }}>
          {VENTURES.map((v, i) => (
            <div 
              key={v.name}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="group flex flex-col lg:flex-row lg:items-center justify-between border-b py-10 lg:py-14 cursor-pointer transition-colors duration-500 hover:bg-[#F5F1E0]/5"
              style={{ borderColor: COLORS.hairlineLight }}
            >
              <div className="w-full lg:w-[45%] overflow-hidden">
                <h3 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-black uppercase tracking-tighter text-[#F5F1E0] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-8">
                  {v.name}
                </h3>
              </div>
              
              <div className="mt-6 lg:mt-0 w-full lg:w-[40%] pr-8">
                <p className="text-lg lg:text-xl leading-relaxed text-[#F5F1E0]/70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-4">
                  {v.desc}
                </p>
              </div>

              <div className="mt-8 lg:mt-0 w-full lg:w-[10%] flex justify-start lg:justify-end">
                <div className="w-14 h-14 rounded-full border border-[#F5F1E0]/20 flex items-center justify-center text-[#F5F1E0] transition-all duration-500 ease-out group-hover:bg-[#CF2D26] group-hover:border-[#CF2D26] group-hover:text-white lg:group-hover:-translate-x-4">
                  <ArrowUpRight size={24} className="transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative w-full min-h-[70svh] flex flex-col justify-center py-20 overflow-hidden" style={{ backgroundColor: COLORS.red }}>
      {/* Grain / Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto w-full text-center flex flex-col items-center">
        
        <h2 className="text-[14vw] lg:text-[11vw] font-black uppercase leading-[0.8] tracking-tighter" style={{ color: COLORS.cream }}>
          <TextReveal>What&rsquo;s</TextReveal>
          <TextReveal delay={100}>Your</TextReveal>
          <span className="font-serif italic lowercase tracking-tight text-[#9A302B] mix-blend-multiply block mt-2 lg:mt-4">
            <TextReveal delay={200}>day one?</TextReveal>
          </span>
        </h2>

        <FadeReveal delay={300} className="mt-12 lg:mt-20 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-[1.7rem] leading-snug font-medium" style={{ color: "rgba(245, 241, 224, 0.9)" }}>
            Every business has a first decision, first customer, and first step. We&rsquo;re interested in what comes next.
          </p>
        </FadeReveal>

        <FadeReveal delay={450} distance="translate-y-8" className="mt-16">
          <button
            type="button"
            className="group relative inline-flex items-center justify-center overflow-hidden bg-[#F5F1E0] px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] text-[#CF2D26] transition-transform duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-[#262119] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            <span className="relative z-10 flex items-center gap-4 group-hover:text-[#F5F1E0] transition-colors duration-500">
              Start a conversation
              <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </button>
        </FadeReveal>

      </div>
    </section>
  );
}

function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main
      // Fix applied here: Changed `overflow-x-hidden` to `overflow-clip`
      className="w-full overflow-clip font-sans antialiased selection:bg-[#CF2D26] selection:text-[#F5F1E0]"
      style={{ backgroundColor: COLORS.cream, color: COLORS.charcoal }}
    >
      <Hero loaded={loaded} />
      <Intro />
      <Ecosystem />
      <Ventures />
      <ClosingCTA />
    </main>
  );
}

export default Home;