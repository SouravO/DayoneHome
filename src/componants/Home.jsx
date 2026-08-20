import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

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

const CAPABILITIES_DATA = [
  {
    title: "Business Strategy",
    desc: "Define the right opportunity, business model and path forward before turning an idea into a scalable venture.",
    img: "/business_strategy.png"
  },
  {
    title: "Product Development",
    desc: "Turn promising ideas into focused products through strategy, validation and thoughtful execution.",
    img: "/product_development.png"
  },
  {
    title: "Brand Building",
    desc: "Build distinctive brands that communicate clearly, create trust and give new businesses a strong identity.",
    img: "/Brand_Building.png"
  },
  {
    title: "Technology",
    desc: "Design and build the technology foundation needed to turn ambitious ideas into scalable products and systems.",
    img: "/Technology.png"
  },
  {
    title: "Go-to-Market",
    desc: "Shape the positioning, launch strategy and growth path needed to bring the right product to the right market.",
    img: "/Go-to-Market.png"
  },
  {
    title: "Operations",
    desc: "Build the processes, systems and operational foundation that allow a growing company to move faster and smarter.",
    img: "/Operations.png"
  },
  {
    title: "Fundraising Preparation",
    desc: "Prepare the story, strategy and materials needed to approach investors with clarity and confidence.",
    img: "/Fundraising_Preparation.png"
  }
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
              Dayone Ventures creates, structures, launches and scales new companies across India, the Middle East and global markets.
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
              <TextReveal>A venture</TextReveal>
              <TextReveal delay={150}>studio built</TextReveal>
              <span className="font-serif italic lowercase tracking-tight text-[#CF2D26] block">
                <TextReveal delay={300}>for day one.</TextReveal>
              </span>
            </h2>
            
            <div className="mt-16 lg:mt-24 max-w-2xl grid gap-8 border-l-2 pl-6 lg:pl-10" style={{ borderColor: COLORS.red }}>
              <FadeReveal delay={200}>
                <p className="text-xl md:text-2xl leading-relaxed font-medium" style={{ color: COLORS.charcoalMuted }}>
                  Dayone Ventures creates, structures, launches and scales new companies, working alongside founders and institutions.
                </p>
              </FadeReveal>
              <FadeReveal delay={300}>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: COLORS.charcoalMuted }}>
                  We work across business strategy, product development, brand building, technology, go-to-market, operations and fundraising preparation.
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
    { src: '/about.png' },
    { src: '/Home.png' },
    { src: '/Banner.png' },
    { src: '/quote.png' },
    { src: '/Hero.png' },
    { src: '/image.png' },
    { src: '/aboutbanner.png' },
    { src: '/image1.png' },
    { src: '/service.png' },
    { src: '/quote2.png' },
    { src: '/quote3.png' },
    { src: '/business_strategy.png' },
    { src: '/product_development.png' },
    { src: '/Brand_Building.png' },
    { src: '/Technology.png' },
    { src: '/Go-to-Market.png' },
    { src: '/Operations.png' },
    { src: '/Fundraising_Preparation.png' },
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
            <TextReveal>We build</TextReveal>
            <span className="font-serif italic lowercase tracking-tight text-[#CF2D26] block mt-2 lg:mt-4">
              <TextReveal delay={200}>for everyday life.</TextReveal>
            </span>
          </h2>
          <FadeReveal delay={300} className="mt-12 lg:mt-16">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl font-medium" style={{ color: COLORS.charcoalMuted }}>
              Dayone focuses on large, repeat-use markets where consumer behaviour, innovation and distribution create significant enterprise value.
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
                className="relative shrink-0 w-[70vw] sm:w-[45vw] lg:w-[28vw] aspect-[4/3] overflow-hidden rounded-2xl md:rounded-[2rem] group/image cursor-pointer"
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
                className="relative shrink-0 w-[70vw] sm:w-[45vw] lg:w-[28vw] aspect-[4/3] overflow-hidden rounded-2xl md:rounded-[2rem] group/image cursor-pointer"
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

function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden border-t" style={{ backgroundColor: COLORS.cream, borderColor: COLORS.hairline }}>
      <div className="px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-4xl">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#CF2D26] block mb-4">
            DayOne Ventures
          </span>
          <h2 className="text-[10vw] lg:text-[6.5vw] font-black uppercase leading-[0.85] tracking-tighter" style={{ color: COLORS.charcoal }}>
            <TextReveal>Built for</TextReveal>
            <span className="font-serif italic lowercase tracking-tight text-[#CF2D26] block mt-1">
              <TextReveal delay={150}>day one.</TextReveal>
            </span>
          </h2>
          
          <FadeReveal delay={250} className="mt-8 lg:mt-10">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl font-medium" style={{ color: COLORS.charcoalMuted }}>
              A venture studio that works alongside founders and institutions to create, structure, launch and scale new companies.
            </p>
          </FadeReveal>
        </div>

        {/* Editorial Layout: Interactive Capabilities List + Parallax Visual Card */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Main Column: Interactive Editorial List */}
          <div className="lg:col-span-7 flex flex-col border-t" style={{ borderColor: COLORS.hairline }}>
            {CAPABILITIES_DATA.map((cap, i) => {
              const isActive = activeIndex === i;
              
              return (
                <div
                  key={cap.title}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`group relative flex flex-col py-6 lg:py-8 border-b transition-colors duration-500 cursor-pointer ${
                    isActive ? "border-[#CF2D26]" : "border-[#262119]/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 sm:gap-10">
                      {/* Editorial Index */}
                      <span 
                        className={`text-xs md:text-sm font-mono font-bold tracking-widest transition-all duration-500 transform ${
                          isActive ? "text-[#CF2D26] -translate-y-1" : "text-[#262119]/40"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      
                      {/* Capability Title */}
                      <h3 
                        className={`text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold uppercase tracking-tight transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "text-[#CF2D26] translate-x-4 lg:translate-x-6" : "text-[#262119]"
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>

                    {/* Interactive Arrow Indicator */}
                    <div 
                      className={`hidden sm:flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "border-[#CF2D26] bg-[#CF2D26] text-white opacity-100 translate-x-0" 
                          : "border-transparent text-transparent opacity-0 -translate-x-4"
                      }`}
                    >
                      <ArrowRight size={18} className={`transition-transform duration-500 ${isActive ? "rotate-[-45deg]" : "rotate-0"}`} />
                    </div>
                  </div>

                  {/* Expandable Description Area (Fluid CSS Grid Height Transition) */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p 
                        className="pt-4 pb-2 pl-12 sm:pl-[4.5rem] lg:pl-[5.5rem] text-lg lg:text-xl font-medium leading-relaxed max-w-xl" 
                        style={{ color: COLORS.charcoalMuted }}
                      >
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Right Column: Sticky Contextual Image Reveal */}
          <div className="hidden lg:block lg:col-span-5 sticky top-20">
            <FadeReveal distance="translate-y-12">
              <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#262119]">
                
                {/* Image Stack */}
                {CAPABILITIES_DATA.map((cap, i) => (
                  <img
                    key={`img-${cap.title}`}
                    src={cap.img}
                    alt={cap.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
                    }`}
                  />
                ))}

                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#262119] via-[#262119]/20 to-transparent pointer-events-none" />
                
                {/* Contextual Tag */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-[#F5F1E0]">
                  <div className="overflow-hidden mb-2">
                    <span 
                      className="text-xs uppercase tracking-[0.2em] font-bold text-[#CF2D26] block transform transition-transform duration-[800ms] ease-out"
                      key={`tag-${activeIndex}`} // Forces re-animation on index change
                      style={{ animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
                    >
                      {CAPABILITIES_DATA[activeIndex].title}
                    </span>
                  </div>
                  <div className="h-[2px] w-12 bg-[#CF2D26] opacity-50" />
                </div>
              </div>

              <FadeReveal delay={350} className="mt-10 pt-8 border-l-2 pl-6 lg:pl-8" style={{ borderColor: COLORS.red }}>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-snug" style={{ color: COLORS.charcoal }}>
                  We are not consultants advising from the outside. <span className="text-[#CF2D26] italic font-serif lowercase block mt-1">We become part of the building process.</span>
                </p>
              </FadeReveal>
            </FadeReveal>
          </div>

        </div>
      </div>
      
      {/* Inline Keyframes for minor visual touches */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
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
          <TextReveal>Great</TextReveal>
          <TextReveal delay={100}>Companies</TextReveal>
          <span className="font-serif italic lowercase tracking-tight text-[#9A302B] mix-blend-multiply block mt-2 lg:mt-4">
            <TextReveal delay={200}>have a day one.</TextReveal>
          </span>
        </h2>

        <FadeReveal delay={300} className="mt-12 lg:mt-20 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-[1.7rem] leading-snug font-medium" style={{ color: "rgba(245, 241, 224, 0.9)" }}>
            The first idea. The first prototype. The first customer. The first impossible ambition.
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
      <Capabilities />
      <ClosingCTA />
    </main>
  );
}

export default Home;