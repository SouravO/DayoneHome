// import { useRef, useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";

// const COLORS = {
//   cream: "#F4F1DF",
//   charcoal: "#221F1F",
//   charcoalMuted: "rgba(34, 31, 31, 0.68)",
//   hairline: "rgba(34, 31, 31, 0.12)",
//   dark: "#262119",
// };

// /* Reveal primitives — identical to Home.jsx so scroll-in motion feels
//    the same moving from Capabilities into this section. */
// function useReveal(threshold = 0.1) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const node = ref.current;
//     if (!node) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold, rootMargin: "0px 0px -5% 0px" }
//     );
//     observer.observe(node);
//     return () => observer.disconnect();
//   }, [threshold]);

//   return [ref, visible];
// }

// function TextReveal({ children, delay = 0, className = "", clip = true }) {
//   const [ref, visible] = useReveal();
//   return (
//     <div ref={ref} className={`${clip ? "overflow-hidden" : "overflow-visible"} py-2 ${className}`}>
//       <div
//         className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
//         style={{
//           transform: visible ? "translateY(0)" : "translateY(110%)",
//           transitionDelay: visible ? `${delay}ms` : "0ms",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// function FadeReveal({ children, delay = 0, className = "", distance = "translate-y-8" }) {
//   const [ref, visible] = useReveal();
//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${className}`}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : distance,
//         transitionDelay: visible ? `${delay}ms` : "0ms",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// /* Data — same four stages, same copy as before */
// const STAGES = [
//   {
//     id: "01",
//     title: "DISCOVER",
//     desc: "Find the opportunity.",
//     capabilities: ["Market research", "Problem validation", "Opportunity sizing", "Venture strategy"],
//   },
//   {
//     id: "02",
//     title: "BUILD",
//     desc: "Turn the opportunity into a business.",
//     capabilities: ["Business model", "Product development", "Brand & positioning", "Technology"],
//   },
//   {
//     id: "03",
//     title: "LAUNCH",
//     desc: "Take the venture to market.",
//     capabilities: ["Go-to-market", "Early customers", "Revenue", "Operations"],
//   },
//   {
//     id: "04",
//     title: "SCALE",
//     desc: "Build the system for sustainable growth.",
//     capabilities: ["Growth systems", "Performance", "Operations", "Expansion"],
//   },
// ];

// /* Visual panel — dark ground (matches the Hero/ClosingCTA/Capabilities dark tone)
//    so the linework is actually visible, instead of the old panels drawn in
//    var(--bg)-on-var(--bg), which is why they rendered as empty boxes. */
// function StageVisual({ index, title }) {
//   return (
//     <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden rounded-2xl md:rounded-[2rem] bg-[#262119] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] group-hover:shadow-2xl">
//       <div className="absolute inset-0 flex items-center justify-center">
//         {index === 0 && (
//           <>
//             <div className="absolute w-[160%] h-px bg-[#F5F1E0]/15 rotate-45 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[30deg]" />
//             <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-[#CF2D26]/60 transition-transform duration-700 ease-out group-hover:scale-110" />
//             <div className="absolute top-[38%] left-[38%] w-2 h-2 rounded-full bg-[#CF2D26] transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-2" />
//           </>
//         )}
//         {index === 1 && (
//           <div className="w-full h-full flex flex-col justify-end gap-2 p-6 sm:p-8">
//             <div className="w-full h-1/3 border border-[#F5F1E0]/20 transition-all duration-700 ease-out group-hover:h-1/2" />
//             <div className="w-2/3 h-1/5 border border-[#F5F1E0]/20 bg-[#CF2D26]/10 transition-all duration-700 group-hover:bg-[#CF2D26]/20" />
//             <div className="w-1/3 h-1/6 bg-[#CF2D26] transition-all duration-500 group-hover:w-1/2" />
//           </div>
//         )}
//         {index === 2 && (
//           <>
//             <div className="absolute bottom-0 left-[38%] w-px h-full bg-[#F5F1E0]/15 -skew-x-12 transition-transform duration-700 ease-out group-hover:skew-x-0" />
//             <div className="absolute bottom-0 left-[56%] w-px h-3/4 bg-[#F5F1E0]/15 -skew-x-12 transition-transform duration-700 ease-out group-hover:skew-x-0" />
//             <div className="w-16 h-16 sm:w-24 sm:h-24 border-t-2 border-r-2 border-[#CF2D26] rounded-tr-full translate-y-6 -translate-x-2 transition-transform duration-700 ease-out group-hover:-translate-y-4" />
//           </>
//         )}
//         {index === 3 && (
//           <div className="relative w-2/3 h-2/3">
//             <div className="absolute inset-0 border border-[#F5F1E0]/10 transition-transform duration-700 group-hover:scale-105" />
//             <div className="absolute inset-4 border border-[#F5F1E0]/20 transition-transform duration-700 delay-75 group-hover:scale-105" />
//             <div className="absolute inset-8 border border-[#CF2D26]/60 transition-transform duration-700 delay-150 group-hover:scale-105" />
//             <div className="absolute inset-12 bg-[#CF2D26]/20 transition-opacity duration-700 delay-200 group-hover:opacity-40" />
//           </div>
//         )}
//       </div>

//       <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#CF2D26]/25 blur-[70px] pointer-events-none" />
//       <div className="absolute inset-0 bg-gradient-to-t from-[#262119] via-[#262119]/5 to-transparent pointer-events-none" />
//       <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5 sm:p-6">
//         <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-[#F5F1E0]/70">{title}</span>
//         <div className="h-px w-8 bg-[#CF2D26]" />
//       </div>
//     </div>
//   );
// }

// function HowWeBuild() {
//   return (
//     <section
//       className="relative w-full py-20 lg:py-32 overflow-hidden border-t"
//       style={{ backgroundColor: COLORS.cream, borderColor: COLORS.hairline }}
//     >
//       <div className="px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto">
//         {/* Header — same rhythm as Capabilities: eyebrow, headline, supporting line */}
//         <div className="max-w-4xl">
//           <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#CF2D26] block mb-4">
//             Ways to build with DayOne
//           </span>
//           <h2
//             className="text-[10vw] lg:text-[6.5vw] font-black uppercase leading-[0.85] tracking-tighter"
//             style={{ color: COLORS.charcoal }}
//           >
//             <TextReveal>From opportunity</TextReveal>
//             <span className="font-serif italic lowercase tracking-tight leading-[1] text-[#CF2D26] block mt-1">
//               <TextReveal delay={150} clip={false}>to operating business.</TextReveal>
//             </span>
//           </h2>

//           <FadeReveal delay={250} className="mt-8 lg:mt-10">
//             <p
//               className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl font-medium"
//               style={{ color: COLORS.charcoalMuted }}
//             >
//               Every venture starts from a different point. We meet it where the opportunity is strongest.
//             </p>
//           </FadeReveal>
//         </div>

//         {/* Stages */}
//         <div
//           className="mt-16 lg:mt-24 pt-10 lg:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 xl:gap-x-12 gap-y-16 lg:gap-y-0 border-t"
//           style={{ borderColor: COLORS.hairline }}
//         >
//           {STAGES.map((stage, i) => (
//             <div
//               key={stage.id}
//               className={i === 0 ? "lg:pr-8 xl:pr-10" : "lg:border-l lg:pl-8 xl:pl-10"}
//               style={i > 0 ? { borderColor: COLORS.hairline } : undefined}
//             >
//               <FadeReveal delay={i * 120} distance="translate-y-10" className="group flex flex-col h-full">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-4">
//                     <span className="text-xs font-mono font-bold tracking-widest text-[#CF2D26]">{stage.id}</span>
//                     <div className="h-px w-8 bg-[#CF2D26] opacity-60 transition-all duration-500 group-hover:w-12" />
//                   </div>
//                   <div className="hidden sm:flex w-8 h-8 rounded-full border border-transparent items-center justify-center text-transparent opacity-0 -translate-x-2 transition-all duration-500 group-hover:border-[#CF2D26] group-hover:bg-[#CF2D26] group-hover:text-white group-hover:opacity-100 group-hover:translate-x-0">
//                     <ArrowRight size={14} className="transition-transform duration-500 group-hover:rotate-[-45deg]" />
//                   </div>
//                 </div>

//                 <h3
//                   className="text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors duration-500 group-hover:text-[#CF2D26]"
//                   style={{ color: COLORS.charcoal }}
//                 >
//                   {stage.title}
//                 </h3>

//                 <p className="font-serif italic text-lg mt-3 mb-8 min-h-[3.25rem]" style={{ color: COLORS.charcoalMuted }}>
//                   {stage.desc}
//                 </p>

//                 <div className="mb-8">
//                   <StageVisual index={i} title={stage.title} />
//                 </div>

//                 <ul className="space-y-3 mt-auto">
//                   {stage.capabilities.map((cap) => (
//                     <li
//                       key={cap}
//                       className="flex items-center text-xs uppercase tracking-wide opacity-70 transition-opacity duration-300 group-hover:opacity-100"
//                       style={{ color: COLORS.charcoalMuted }}
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full mr-3 border border-[#CF2D26] shrink-0 transition-colors duration-300 group-hover:bg-[#CF2D26]" />
//                       {cap}
//                     </li>
//                   ))}
//                 </ul>
//               </FadeReveal>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="mt-20 lg:mt-28 pt-8 border-t" style={{ borderColor: COLORS.hairline }}>
//           <FadeReveal delay={100} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <p className="text-sm tracking-[0.15em] uppercase font-bold" style={{ color: COLORS.charcoal }}>
//               Ideas today. Impact tomorrow.
//             </p>
//             <p className="font-serif italic text-base" style={{ color: COLORS.charcoalMuted }}>
//               Discover / Build / Launch / Scale
//             </p>
//           </FadeReveal>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HowWeBuild;