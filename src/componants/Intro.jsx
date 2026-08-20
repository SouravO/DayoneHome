import React, { useState, useEffect } from 'react';

export const Intro = () => {
  const [phase, setPhase] = useState('initial'); // initial, oneDay, dayOne, exit, done

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';

    // Snappy, instant cinematic timing sequence
    const t1 = setTimeout(() => setPhase('oneDay'), 200);   // Reveal "One Day" quickly
    const t2 = setTimeout(() => setPhase('dayOne'), 800);   // Immediate swap into "DayOne"
    const t3 = setTimeout(() => setPhase('exit'), 1600);    // Slide away 
    const t4 = setTimeout(() => {
      setPhase('done');
      // Restore scrolling when intro finishes
      document.body.style.overflow = '';
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  const isVisible = phase !== 'initial';
  const isSwapped = phase === 'dayOne' || phase === 'exit';

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
          /* Fast, smooth slide up */
          transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
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

        /* Container holding both words initially spaced as "One Day" */
        .swap-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35em;
          opacity: 0;
          transform: translateY(15px);
          filter: blur(8px);
          transition: opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease-out;
          will-change: transform, opacity, filter;
        }

        /* Initial reveal of "One Day" */
        .swap-stage.visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }

        /* Micro offset adjustment so the final locked "DayOne" remains optical dead-center */
        .swap-stage.swapped {
          transform: translateY(0) translateX(0.175em);
          transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Base styling for word blocks */
        .word {
          display: inline-block;
          white-space: nowrap;
          color: #262119;
          font-weight: 400;
          letter-spacing: -0.01em;
          will-change: transform, color, font-weight, letter-spacing;
          transition: color 0.22s cubic-bezier(0.2, 0.8, 0.2, 1),
                      font-weight 0.22s cubic-bezier(0.2, 0.8, 0.2, 1),
                      letter-spacing 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* "One" moves right in an upward curve, turns red, and tightens into the brand wordmark */
        .word-one.swapped {
          animation: swapRight 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          color: #CF2D26;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        /* "Day" moves left in a downward curve, closing the gap to form "DayOne" */
        .word-day.swapped {
          animation: swapLeft 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        /* Accelerated curved trajectory keyframes for "One" (moves Right) */
        @keyframes swapRight {
          0% {
            transform: translate(0, 0) scale(1);
          }
          45% {
            transform: translate(50%, -0.2em) scale(1.02);
          }
          100% {
            transform: translate(100%, 0) scale(1);
          }
        }

        /* Accelerated curved trajectory keyframes for "Day" (moves Left) */
        @keyframes swapLeft {
          0% {
            transform: translate(0, 0) scale(1);
          }
          45% {
            transform: translate(calc(-50% - 0.175em), 0.2em) scale(0.98);
          }
          100% {
            transform: translate(calc(-100% - 0.35em), 0) scale(1);
          }
        }
      `}</style>

      <div className={`intro-overlay ${phase === 'exit' ? 'exit' : ''}`}>
        <div className="intro-text-wrapper">
          <div className={`swap-stage ${isVisible ? 'visible' : ''} ${isSwapped ? 'swapped' : ''}`}>
            <span className={`word word-one ${isSwapped ? 'swapped' : ''}`}>
              One
            </span>
            <span className={`word word-day ${isSwapped ? 'swapped' : ''}`}>
              Day
            </span>
          </div>
        </div>
      </div>
    </>
  );
};