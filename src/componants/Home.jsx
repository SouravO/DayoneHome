import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import HowWeBuild from "./HowWeBuild";

const COLORS = {
  cream: "#F4F1DF",
  red: "#DD3027",
  charcoal: "#221F1F",
  charcoalMuted: "rgba(34, 31, 31, 0.68)",
  hairline: "rgba(34, 31, 31, 0.12)",
};

/* Hooks */
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

/* Reveal + button primitives */
function TextReveal({ children, delay = 0, className = "", clip = true }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`${clip ? "overflow-hidden" : "overflow-visible"} py-2 ${className}`}>
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

/* Data */
const FALLBACK_CAPABILITY_IMAGE = "/Home.png";

const CAPABILITIES_DATA = [
  { title: "Venture Strategy", desc: "Business models, market strategy, pricing and growth direction.", img: "/business_strategy.png" },
  { title: "Product & Brand", desc: "Product thinking, positioning, identity, packaging and customer experience.", img: "/product_development.png" },
  { title: "Growth & Go-To-Market", desc: "Marketing, distribution, sales, digital, retail, partnerships and customer acquisition.", img: "/Go-to-Market.png" },
  { title: "Finance", desc: "Financial modelling, unit economics, cash-flow discipline and capital planning.", img: "/Service.png" },
  { title: "Operations", desc: "People, systems, KPIs, workflows, hiring and execution.", img: "/Operations.png" },
  { title: "Technology", desc: "Platforms, automation, dashboards and venture infrastructure.", img: "/Technology.png" },
  { title: "Founder Development", desc: "Mentorship, leadership, accountability and peer learning.", img: "/Home.png" },
  { title: "Capital", desc: "Investor readiness, strategic introductions and fundraising support when the company is ready.", img: "/Brand_Building.png" },
];

/* Sections */
function Hero({ loaded }) {
  const [imgRef, imgOffset] = useParallax(0.15);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#262119]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/Hero.png"
          alt="DayOne Studio Office"
          className="hero-background-image absolute inset-0 h-full w-full object-cover object-center transition-all duration-[2500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            transform: `translateY(${imgOffset}px) scale(${loaded ? 1.02 : 1.08})`,
            opacity: loaded ? 1 : 0.4,
            filter: "contrast(1.05) brightness(0.95)",
            objectPosition: "76% center",
          }}
        />
        <style>{`
          @media (min-width: 1024px) {
            .hero-background-image { object-position: 88% center !important; }
          }
        `}</style>

        <div
          className="absolute inset-0 bg-gradient-to-t from-[#262119] via-[#262119]/70 to-transparent transition-opacity duration-[2000ms] ease-out pointer-events-none"
          style={{ opacity: loaded ? 0.95 : 0 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#262119]/90 via-[#262119]/65 to-[#262119]/10 w-full lg:w-3/4 transition-opacity duration-[2500ms] ease-out pointer-events-none"
          style={{ opacity: loaded ? 1 : 0 }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[60vw] h-[60vh] bg-[#CF2D26]/25 blur-[160px] rounded-full mix-blend-screen pointer-events-none transition-all duration-[3000ms] ease-out"
          style={{
            opacity: loaded ? 0.7 : 0,
            transform: `translate(${loaded ? '0%' : '-5%'}, ${loaded ? '0%' : '5%'}) scale(${loaded ? 1 : 0.9})`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-10 lg:px-16 2xl:px-24 pb-8 sm:pb-10 lg:pb-10 pt-28 sm:pt-24 lg:pt-28">
        <div className="max-w-[88vw] sm:max-w-[32rem] lg:max-w-[48rem]">
          <h1 className="flex flex-col text-[clamp(3.7rem,15vw,6rem)] font-black uppercase leading-[0.72] tracking-[-0.055em]" style={{ color: COLORS.cream }}>
            <TextReveal delay={100} className="leading-none">Every idea</TextReveal>
            <TextReveal delay={250} className="-mt-1 lg:-mt-3 leading-none">has a start.</TextReveal>
            <span className="font-serif italic font-normal capitalize tracking-[-0.04em] mt-1 lg:mt-2 text-[clamp(2rem,7vw,4.5rem)] leading-[0.8] text-[#CF2D26] drop-shadow-2xl flex">
              <TextReveal delay={400} className="pb-1">We turn opportunities<br />into businesses.</TextReveal>
            </span>
          </h1>

          <div className="mt-5 sm:mt-10 lg:mt-9">
            <FadeReveal delay={600}>
              <p className="max-w-[32rem] text-base sm:text-lg lg:text-[1.42rem] leading-[1.55] font-medium" style={{ color: "rgba(245, 241, 224, 0.85)" }}>
                Day One Ventures builds, launches and scales new companies across India, the Middle East and global markets.
              </p>
            </FadeReveal>

            <FadeReveal delay={750} distance="translate-y-6" className="mt-6 sm:mt-10">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <PremiumButton dark onClick={() => navigate("/services")}>Explore Ventures</PremiumButton>
                <PremiumButton dark onClick={() => navigate("/career")}>Careers</PremiumButton>
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5F1E0]/20 to-transparent z-10" />
    </section>
  );
}

function Intro() {
  return (
    <section
      className="intro-background relative h-[calc(100svh-5rem)] min-h-0 w-full overflow-hidden bg-center bg-no-repeat"
    >
      <style>{`
        .intro-background {
          background-image: url('/framebg.png');
          background-size: 100% 100%;
        }
        @media (max-width: 639px) {
          .intro-background {
            background-image: url('/framebgmobile.png');
          }
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent sm:bg-gradient-to-r" />
      <div className="relative z-10 flex h-full items-start px-5 pt-8 sm:items-center sm:px-10 sm:py-8 lg:px-16 lg:py-10 2xl:px-24">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="w-full max-w-3xl">
            <h2 className="text-[clamp(2.2rem,6.8vw,5.8rem)] font-black uppercase leading-none tracking-tighter sm:text-[clamp(2.3rem,6.2vw,5.8rem)]" style={{ color: COLORS.cream }}>
              <TextReveal className="py-0 leading-none">Opportunities</TextReveal>
              <TextReveal delay={150} className="py-0 leading-none">become businesses.</TextReveal>
              <span className="font-serif italic lowercase tracking-tight leading-[1] text-[#CF2D26] block">
                <TextReveal delay={300} className="py-0 leading-none">We build what's next.</TextReveal>
              </span>
            </h2>

            <div className="mt-5 max-w-xl grid gap-3 border-l-2 pl-4 sm:mt-[clamp(1.5rem,5vh,4rem)] sm:gap-[clamp(0.75rem,2vh,1.5rem)] sm:pl-6 lg:pl-8" style={{ borderColor: COLORS.red }}>
              <FadeReveal delay={200}>
                <p className="text-[clamp(0.9rem,1.65vw,1.35rem)] leading-[1.35] font-medium sm:text-[clamp(0.9rem,1.45vw,1.35rem)]" style={{ color: "rgba(244, 241, 223, 0.9)" }}>
                  Day One Ventures works with founders and institutions to create, launch and scale companies across markets.
                </p>
              </FadeReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const marqueeImages = [
    { src: '/scroll1.png' },
    { src: '/scroll3.png' },
    { src: '/scroll4.png' },
    { src: '/scroll5.png' },
    { src: '/scroll6.png' },
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
            <span className="font-serif italic lowercase tracking-tight leading-[1] text-[#CF2D26] block mt-2 lg:mt-4">
              <TextReveal delay={200} clip={false}>for what's next.</TextReveal>
            </span>
          </h2>
          <FadeReveal delay={300} className="mt-12 lg:mt-16">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl font-medium" style={{ color: COLORS.charcoalMuted }}>
              Day One focuses on emerging opportunities where consumer needs, innovation and execution come together to create new businesses.
            </p>
          </FadeReveal>
        </div>
      </div>

      <div className="mt-8 lg:mt-12 w-full marquee-container">
        <div className="animate-infinite-scroll">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex gap-4 sm:gap-6 lg:gap-10 pr-4 sm:pr-6 lg:pr-10 items-center">
              {marqueeImages.map((item, i) => (
                <div
                  key={`set${loop}-${i}`}
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
          ))}
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
        <div className="max-w-4xl">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#CF2D26] block mb-4">The Backbone</span>
          <h2 className="text-[10vw] lg:text-[6.5vw] font-black uppercase leading-[0.85] tracking-tighter" style={{ color: COLORS.charcoal }}>
            <TextReveal>Everything a venture</TextReveal>
            <span className="font-serif italic lowercase tracking-tight leading-[1] text-[#CF2D26] block mt-1">
              <TextReveal delay={150}>needs to move forward.</TextReveal>
            </span>
          </h2>

          <FadeReveal delay={250} className="mt-8 lg:mt-10">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl font-medium" style={{ color: COLORS.charcoalMuted }}>
              DAYONE gives selected startups access to a shared venture-building backbone made up of experienced operators, specialist teams, mentors, technology, performance systems and investor networks.
            </p>
          </FadeReveal>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
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
                  <div className="flex w-full items-start justify-between gap-4 sm:gap-6">
                    <div className="flex min-w-0 flex-1 items-center gap-6 sm:gap-10">
                      <span
                        className={`shrink-0 text-xs md:text-sm font-mono font-bold tracking-widest transition-all duration-500 transform ${
                          isActive ? "text-[#CF2D26] -translate-y-1" : "text-[#262119]/40"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <h3
                        className={`min-w-0 flex-1 text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold uppercase tracking-tight transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "text-[#CF2D26] translate-x-4 lg:translate-x-6" : "text-[#262119]"
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>
                    <div
                      className={`hidden shrink-0 sm:flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "border-[#CF2D26] bg-[#CF2D26] text-white opacity-100 translate-x-0"
                          : "border-transparent text-transparent opacity-0 -translate-x-4"
                      }`}
                    >
                      <ArrowRight size={18} className={`transition-transform duration-500 ${isActive ? "rotate-[-45deg]" : "rotate-0"}`} />
                    </div>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 pb-2 pl-12 sm:pl-[4.5rem] lg:pl-[5.5rem] text-lg lg:text-xl font-medium leading-relaxed max-w-xl" style={{ color: COLORS.charcoalMuted }}>
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block lg:col-span-5 sticky top-20">
            <FadeReveal distance="translate-y-12">
              <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#262119]">
                {CAPABILITIES_DATA.map((cap, i) => (
                  <img
                    key={`img-${cap.title}`}
                    src={cap.img || FALLBACK_CAPABILITY_IMAGE}
                    alt={cap.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = FALLBACK_CAPABILITY_IMAGE;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#262119] via-[#262119]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-[#F5F1E0]">
                  <div className="overflow-hidden mb-2">
                    <span
                      key={`tag-${activeIndex}`} // forces re-animation on index change
                      className="text-xs uppercase tracking-[0.2em] font-bold text-[#CF2D26] block transform transition-transform duration-[800ms] ease-out"
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
                  We do not stand outside the company and advise. <span className="text-[#CF2D26] italic font-serif lowercase leading-[1] block mt-1">We build from inside.</span>
                </p>
              </FadeReveal>
            </FadeReveal>
          </div>
        </div>
      </div>

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
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[70svh] flex flex-col justify-center py-20 overflow-hidden" style={{ backgroundColor: COLORS.red }}>
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto w-full text-center flex flex-col items-center">
        <h2 className="text-[clamp(3.2rem,8.5vw,8rem)] font-black uppercase leading-[0.82] tracking-tighter" style={{ color: COLORS.cream, fontFamily: "var(--display)" }}>
          <TextReveal>Great businesses</TextReveal>
          <TextReveal delay={100}>start with a</TextReveal>
          <TextReveal delay={200}>bold idea.</TextReveal>
        </h2>

        <FadeReveal delay={300} className="mt-12 lg:mt-20 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-normal" style={{ color: "rgba(245, 241, 224, 0.9)" }}>
            The first insight. The first step. The first customer. The first move towards something bigger.
          </p>
        </FadeReveal>

        <FadeReveal delay={450} distance="translate-y-8" className="mt-16">
          <button
            type="button"
            onClick={() => navigate("/contact")}
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
      className="w-full overflow-clip font-sans antialiased selection:bg-[#CF2D26] selection:text-[#F5F1E0]"
      style={{ backgroundColor: COLORS.cream, color: COLORS.charcoal }}
    >
      <Hero loaded={loaded} />
      <Intro />
      <Ecosystem />
      <Capabilities />
      {/* <HowWeBuild /> */}
      <ClosingCTA />
    </main>
  );
}

export default Home;