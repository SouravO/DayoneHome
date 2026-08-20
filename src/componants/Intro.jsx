import React, { useState, useEffect } from 'react';

export const Intro = () => {
  const [phase, setPhase] = useState('initial'); // initial, oneDay, dayOne, exit, done

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';

    // Cinematic timing sequence
    const t1 = setTimeout(() => setPhase('oneDay'), 400);   // Reveal "One Day"
    const t2 = setTimeout(() => setPhase('dayOne'), 2200);  // Morph to "DayOne"
    const t3 = setTimeout(() => setPhase('exit'), 4400);    // Slide away (allow settle to finish)
    const t4 = setTimeout(() => {
      setPhase('done');
      // Restore scrolling when intro finishes
      document.body.style.overflow = '';
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <>
      <style>{`
        .intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #F5F1E0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          /* Fast, cinematic slide up */
          transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .intro-overlay.exit {
          transform: translateY(-100%);
        }
        
        .intro-text-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 3.5rem;
          width: 100%;
          height: 100%;
        }
        @media (min-width: 768px) {
          .intro-text-wrapper {
            font-size: 5.5rem;
          }
        }

        .text-layer {
          position: absolute;
          white-space: nowrap;
          will-change: transform, opacity, filter, letter-spacing;
        }
        
        /* "One Day" entrance and exit */
        .text-one-day {
          color: #262119;
          opacity: 0;
          transform: translateY(20px);
          filter: blur(10px);
          font-weight: 400;
          letter-spacing: -0.01em;
          transition: opacity 1s ease-out, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), filter 1s ease-out;
        }
        .text-one-day.active {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }
        /* Quickly fade and blur out to prevent overlapping double-exposure */
        .text-one-day.morph-out {
          opacity: 0;
          transform: scale(1.05) translateY(-5px);
          filter: blur(12px);
          letter-spacing: 0.05em;
          transition: opacity 0.4s ease-in, transform 0.6s ease-in, filter 0.5s ease-in, letter-spacing 0.6s ease-in;
          pointer-events: none;
        }

        /* "DayOne" morph entrance */
        .text-day-one {
          color: #262119;
          opacity: 0;
          transform: scale(0.92) translateY(5px);
          font-weight: 600;
          filter: blur(12px);
          letter-spacing: -0.06em;
          transition: none;
        }
        .text-day-one.active {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0px);
          letter-spacing: -0.03em;
          /* 0.3s delay ensures the previous text has dissolved before this one emerges */
          transition: opacity 0.8s ease-out 0.3s, 
                      filter 0.8s ease-out 0.3s, 
                      /* 2.5s duration creates the subtle micro-scale "settle" effect */
                      transform 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
                      letter-spacing 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .accent-red {
          color: #CF2D26;
        }
      `}</style>

      <div className={`intro-overlay ${phase === 'exit' ? 'exit' : ''}`}>
        <div className="intro-text-wrapper">
          <div 
            className={`text-layer text-one-day ${
              phase === 'oneDay' ? 'active' : (phase === 'dayOne' || phase === 'exit' ? 'morph-out' : '')
            }`}
          >
            One Day
          </div>
          <div 
            className={`text-layer text-day-one ${
              phase === 'dayOne' || phase === 'exit' ? 'active' : ''
            }`}
          >
            Day<span className="accent-red">One</span>
          </div>
        </div>
      </div>
    </>
  );
};