import React, { useState, useEffect, useRef, useCallback } from 'react';

export const Intro = () => {
  const [phase, setPhase] = useState('initial'); // initial, oneDay, dayOne, exit, done
  const [swap, setSwap] = useState({ oneX: 0, oneY: 0, dayX: 0, dayY: 0 });

  const stageRef = useRef(null);
  const oneRef = useRef(null);
  const dayRef = useRef(null);

  /**
   * Calculates exact horizontal displacement and a tight vertical arc clearance
   * using UNTRANSFORMED layout metrics (offsetWidth/offsetHeight).
   */
  const measureSwap = useCallback(() => {
    const oneEl = oneRef.current;
    const dayEl = dayRef.current;
    const stageEl = stageRef.current;
    if (!oneEl || !dayEl || !stageEl) return;

    // offsetWidth gets the true layout width, immune to CSS transforms/transitions
    const wOne = oneEl.offsetWidth;
    const wDay = dayEl.offsetWidth;
    const hOne = oneEl.offsetHeight;
    const hDay = dayEl.offsetHeight;

    const fontSize = parseFloat(window.getComputedStyle(stageEl).fontSize) || 16;
    
    // Initial gap between "One" and "Day" in CSS layout (0.35em)
    const gapInitial = fontSize * 0.35;
    // Final gap between "Day" and "One" when locked into "DayOne" brand word (0.04em)
    const gapFinal = fontSize * 0.04;

    // Halved difference ensures the unified "DayOne" stays centered on the exact same axis
    const gapDiffHalf = (gapInitial - gapFinal) / 2;

    // Exact horizontal distances required to swap positions without visual drift
    const shiftOne = (wDay + gapFinal) + gapDiffHalf;
    const shiftDay = -(wOne + gapInitial) + gapDiffHalf;

    // Vertical arc: Reduced by half for a tight, smooth transition. 
    // 0.55 ensures they clear exactly 110% of their total height mid-swap—enough 
    // to prevent collision, but tight enough to feel physically connected.
    const maxH = Math.max(hOne, hDay, fontSize);
    const oneY = -(maxH * 0.55); // "One" arcs cleanly UP
    const dayY = maxH * 0.55;    // "Day" arcs cleanly DOWN

    setSwap({
      oneX: shiftOne,
      oneY: oneY,
      dayX: shiftDay,
      dayY: dayY,
    });
  }, []);

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';

    // Measure initially and handle font loading / viewport resizes
    measureSwap();
    if (document.fonts?.ready) {
      document.fonts.ready.then(measureSwap);
    }
    window.addEventListener('resize', measureSwap);

    // Timeline strictly tuned to ~3.0 seconds total:

    // 0.0s – 0.5s: Reveal "One Day" cleanly
    const t1 = setTimeout(() => setPhase('oneDay'), 50);

    // 0.5s – 1.7s: Perform the One ↔ Day physical positional exchange (1.2s duration)
    const t2 = setTimeout(() => {
      measureSwap(); // Final verification before swap animation starts
      setPhase('dayOne');
    }, 500);

    // 1.7s – 2.2s: Hold settled "DayOne" position
    // 2.2s – 3.0s: Smoothly transition overlay away (0.8s slide exit)
    const t3 = setTimeout(() => setPhase('exit'), 2200);

    // 3.0s: Complete intro & restore scrolling
    const t4 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('resize', measureSwap);
      document.body.style.overflow = '';
    };
  }, [measureSwap]);

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
          transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
          overflow: hidden;
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
          font-size: clamp(2.8rem, 10vw, 6.5rem);
          width: 100%;
          height: 100%;
          padding: 0 5vw;
          box-sizing: border-box;
        }

        .swap-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35em;
          max-width: 100%;
          opacity: 0;
          transform: translateY(15px);
          filter: blur(6px);
          transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), 
                      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), 
                      filter 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity, filter;
        }

        .swap-stage.visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }

        .word {
          display: inline-block;
          white-space: nowrap;
          color: #262119;
          font-weight: 500;
          letter-spacing: -0.02em;
          will-change: transform, color;
          transition: color 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .word-one.swapped {
          animation: swapOne 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          color: #CF2D26;
        }

        .word-day.swapped {
          animation: swapDay 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        /* "One" arcs just high enough to clear "Day" */
        @keyframes swapOne {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(calc(var(--x) * 0.5), var(--y), 0);
          }
          100% {
            transform: translate3d(var(--x), 0, 0);
          }
        }

        /* "Day" arcs just low enough to clear "One" */
        @keyframes swapDay {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(calc(var(--x) * 0.5), var(--y), 0);
          }
          100% {
            transform: translate3d(var(--x), 0, 0);
          }
        }

        @media (max-width: 480px) {
          .swap-stage {
            gap: 0.25em;
          }
        }

        /* Accessibility: Reduced Motion Preferences */
        @media (prefers-reduced-motion: reduce) {
          .swap-stage, .word {
            transition: opacity 0.5s ease !important;
            filter: none !important;
          }
          .word-one.swapped { animation: swapOne 0.01s linear forwards !important; }
          .word-day.swapped { animation: swapDay 0.01s linear forwards !important; }
          .intro-overlay { transition: opacity 0.8s ease !important; }
          .intro-overlay.exit { opacity: 0; pointer-events: none; transform: none; }
        }
      `}</style>

      <div className={`intro-overlay ${phase === 'exit' ? 'exit' : ''}`}>
        <div className="intro-text-wrapper">
          <div ref={stageRef} className={`swap-stage ${isVisible ? 'visible' : ''}`}>
            <span
              ref={oneRef}
              className={`word word-one ${isSwapped ? 'swapped' : ''}`}
              style={{ '--x': `${swap.oneX}px`, '--y': `${swap.oneY}px` }}
            >
              One
            </span>
            <span
              ref={dayRef}
              className={`word word-day ${isSwapped ? 'swapped' : ''}`}
              style={{ '--x': `${swap.dayX}px`, '--y': `${swap.dayY}px` }}
            >
              Day
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;