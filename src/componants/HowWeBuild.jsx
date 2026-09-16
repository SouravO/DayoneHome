import React, { useEffect, useRef } from 'react';

const STAGES = [
  {
    id: '01',
    title: 'DISCOVER',
    desc: 'Find the opportunity.',
    capabilities: [
      'Market research',
      'Problem validation',
      'Opportunity sizing',
      'Venture strategy'
    ],
    align: 'left',
    visual: (
      <div className="w-full h-[400px] relative overflow-hidden bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--text)] transition-colors duration-700 flex items-center justify-center">
        {/* Abstract Architectural - Discovery */}
        <div className="absolute w-[200%] h-[1px] bg-[var(--text)] opacity-20 transform -rotate-45 group-hover:rotate-0 transition-transform duration-1000 ease-in-out"></div>
        <div className="w-48 h-48 border border-[var(--accent)] rounded-full opacity-40 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--accent)] rounded-full group-hover:translate-x-4 transition-transform duration-500"></div>
      </div>
    )
  },
  {
    id: '02',
    title: 'BUILD',
    desc: 'Turn the opportunity into a business.',
    capabilities: [
      'Business model',
      'Product development',
      'Brand & positioning',
      'Technology'
    ],
    align: 'right',
    visual: (
      <div className="w-full h-[400px] relative overflow-hidden bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--text)] transition-colors duration-700 flex flex-col justify-end p-4 group-hover:p-6">
        {/* Abstract Architectural - Building Blocks */}
        <div className="w-full h-1/3 border border-[var(--text)] opacity-20 group-hover:h-1/2 transition-all duration-700 ease-out"></div>
        <div className="w-2/3 h-1/4 border-l border-r border-b border-[var(--text)] opacity-20 bg-[var(--accent)] bg-opacity-5 group-hover:bg-opacity-10 transition-all duration-700"></div>
        <div className="w-1/3 h-1/6 bg-[var(--accent)] opacity-80 group-hover:w-1/2 transition-all duration-500"></div>
      </div>
    )
  },
  {
    id: '03',
    title: 'LAUNCH',
    desc: 'Take the venture to market.',
    capabilities: [
      'Go-to-market',
      'Early customers',
      'Revenue',
      'Operations'
    ],
    align: 'left',
    visual: (
      <div className="w-full h-[400px] relative overflow-hidden bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--text)] transition-colors duration-700 flex items-center justify-center">
        {/* Abstract Architectural - Launch */}
        <div className="absolute bottom-0 w-[1px] h-full bg-[var(--text)] opacity-20 transform -skew-x-12 group-hover:-skew-x-0 transition-transform duration-700"></div>
        <div className="absolute bottom-0 w-[1px] h-3/4 bg-[var(--text)] opacity-20 transform -skew-x-12 translate-x-8 group-hover:-skew-x-0 group-hover:translate-x-4 transition-transform duration-700"></div>
        <div className="w-32 h-32 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-full transform translate-y-1/4 -translate-x-1/4 group-hover:-translate-y-8 transition-transform duration-700 ease-out"></div>
      </div>
    )
  },
  {
    id: '04',
    title: 'SCALE',
    desc: 'Build the system for sustainable growth.',
    capabilities: [
      'Growth systems',
      'Performance',
      'Operations',
      'Expansion'
    ],
    align: 'right',
    visual: (
      <div className="w-full h-[400px] relative overflow-hidden bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--text)] transition-colors duration-700 flex items-center justify-center p-8">
        {/* Abstract Architectural - Expansion */}
        <div className="w-full h-full relative">
          <div className="absolute inset-0 border border-[var(--text)] opacity-10 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-4 border border-[var(--text)] opacity-20 group-hover:scale-105 transition-transform duration-700 delay-75"></div>
          <div className="absolute inset-8 border border-[var(--accent)] opacity-40 group-hover:scale-105 transition-transform duration-700 delay-150"></div>
          <div className="absolute inset-12 bg-[var(--accent)] opacity-10 group-hover:opacity-20 transition-opacity duration-700 delay-200"></div>
        </div>
      </div>
    )
  }
];

const HowWeBuild = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const animatableElements = sectionRef.current.querySelectorAll('.reveal-elem');
    animatableElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 w-full overflow-hidden font-sans"
      style={{ 
        '--bg': '#F4F1DF',
        '--text': '#221F1F',
        '--accent': '#DD3027',
        '--border': 'rgba(34, 31, 31, 0.14)',
        backgroundColor: 'var(--bg)', 
        color: 'var(--text)',
        fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif"
      }}
    >
      <style>{`
        /* Typography utilities */
        .font-sans-display {
          font-family: 'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        
        .font-editorial-italic {
          font-family: 'Behind The Nineties Italics', 'Behind The Nineties', Georgia, serif;
          font-style: italic;
        }

        /* Scroll reveal animations */
        .reveal-elem {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .reveal-elem.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-500 { transition-delay: 500ms; }

        /* Path drawing animation for the wave line */
        .wave-path {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          transition: stroke-dashoffset 2s cubic-bezier(0.25, 1, 0.5, 1) 0.3s;
        }
        
        .is-visible .wave-path {
          stroke-dashoffset: 0;
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20">
        
        {/* INTRO HEADER */}
        <header className="mb-20 md:mb-32">
          <h3 
            className="reveal-elem text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-8 md:mb-12"
            style={{ color: 'var(--accent)' }}
          >
            Ways to build with DayOne
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <h2 className="reveal-elem delay-100 lg:col-span-8 text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
              From opportunity<br/>
              <span className="font-sans font-light pr-3 opacity-90">to</span> 
              <em 
                className="font-editorial-italic font-normal" 
                style={{ color: 'var(--accent)' }}
              >
                operating business.
              </em>
            </h2>
            <p className="reveal-elem delay-200 lg:col-span-4 text-lg md:text-xl opacity-80 leading-relaxed font-light max-w-md">
              Every venture starts from a different point. We meet it where the opportunity is strongest.
            </p>
          </div>
        </header>

        {/* TIMELINE AREA */}
        <div className="relative">
          
          {/* Desktop Connection Wave SVG */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[100px] z-0 reveal-elem pointer-events-none">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 1000 100" 
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Smooth gentle curve connecting the 4 points */}
              <path 
                className="wave-path"
                d="M -50 50 C 125 50, 125 20, 250 50 C 375 80, 375 20, 500 50 C 625 80, 625 20, 750 50 C 875 80, 875 50, 1050 50" 
                fill="none" 
                stroke="var(--border)" 
                strokeWidth="1.5" 
              />
              {/* Desktop Anchor Points */}
              <circle cx="12.5%" cy="50" r="4" fill="var(--accent)" className="reveal-elem delay-300" />
              <circle cx="37.5%" cy="50" r="4" fill="var(--accent)" className="reveal-elem delay-400" />
              <circle cx="62.5%" cy="50" r="4" fill="var(--accent)" className="reveal-elem delay-500" />
              <circle cx="87.5%" cy="50" r="4" fill="var(--accent)" className="reveal-elem delay-500" />
            </svg>
          </div>

          {/* Mobile Connection Line */}
          <div className="md:hidden absolute top-0 left-[27px] w-[1px] h-full bg-[var(--border)] z-0"></div>

          {/* Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 md:gap-y-0 md:gap-x-8 relative z-10">
            {STAGES.map((stage, index) => (
              <article 
                key={stage.id} 
                className={`reveal-elem group flex flex-col relative pl-16 md:pl-0 pt-0 md:pt-24 delay-${(index + 2) * 100}`}
              >
                {/* Mobile Anchor Point */}
                <div 
                  className="md:hidden absolute left-6 top-2 w-2 h-2 rounded-full transform -translate-x-1/2" 
                  style={{ backgroundColor: 'var(--accent)' }}
                ></div>

                {/* Oversized Stage Number */}
                <div 
                  className="absolute top-0 left-0 md:left-auto md:w-full md:text-center text-7xl md:text-8xl lg:text-9xl font-bold opacity-10 group-hover:opacity-20 group-hover:-translate-y-2 transition-all duration-500 pointer-events-none select-none z-0" 
                  style={{ color: 'var(--text)' }}
                >
                  {stage.id}
                </div>

                <div className={`relative z-10 flex-1 flex flex-col h-full ${stage.align === 'right' ? 'md:pl-4' : 'md:pr-4'}`}>
                  
                  {/* Stage Meta */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-semibold tracking-widest" style={{ color: 'var(--accent)' }}>
                      {stage.id}
                    </span>
                    <div className="h-[1px] w-8 bg-[var(--accent)] opacity-50 group-hover:w-12 transition-all duration-500"></div>
                  </div>

                  {/* Text Content */}
                  <div className={`mb-8 ${stage.align === 'right' ? 'md:order-2 md:mt-8 md:mb-0' : 'md:order-1'}`}>
                    <h3 className="text-2xl md:text-3xl font-light mb-3 group-hover:text-[var(--accent)] transition-colors duration-500">
                      {stage.title}
                    </h3>
                    <p className="font-editorial-italic text-lg md:text-xl opacity-70 mb-8 min-h-[3rem]">
                      {stage.desc}
                    </p>

                    {/* Capabilities List */}
                    <ul className="space-y-3">
                      {stage.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-center text-xs md:text-sm uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                          <span className="w-1.5 h-1.5 rounded-full mr-3 border border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors duration-300 delay-100"></span>
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Panel */}
                  <div className={`w-full ${stage.align === 'right' ? 'md:order-1' : 'md:order-2'} group-hover:shadow-xl transition-shadow duration-700 ease-out`}>
                    {stage.visual}
                  </div>
                  
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <footer className="reveal-elem delay-500 mt-24 md:mt-32 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-70">
          <p className="text-sm tracking-[0.15em] uppercase font-semibold">
            Ideas Today. Impact Tomorrow.
          </p>
          <p className="text-xs font-editorial-italic tracking-wide">
            [ DISCOVER / BUILD / LAUNCH / SCALE ]
          </p>
        </footer>

      </div>
    </section>
  );
};

export default HowWeBuild;