import React, { useState, useEffect, useRef } from 'react';

/**
 * 5-Layer 3D Night-Market Parallax Background
 * Styled like a rainy Southeast-Asian / Indian street food lane at night.
 * 
 * Layer 1 — Sky & distant skyline (farthest, slowest parallax)
 * Layer 2 — Street & wet road with neon reflections & vehicle light-trails
 * Layer 3 — Street furniture, utility poles, tangled wires & swaying string lights
 * Layer 4 — Food stalls (right-aligned), glowing signs ("RAMEN", "SATAY", "WARUNG", "KOPI"), red lanterns & steam
 * Layer 5 — Foreground silhouettes of people & soft diagonal rain streaks
 */
export default function NightMarketParallax({ isRainActive = true, isLowPower = false }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (isLowPower) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMouseOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowPower]);

  // Compute layered 3D parallax transformation
  const getTransform = (depthMultiplier) => {
    if (isLowPower) return 'translate3d(0, 0, 0)';
    const x = (mouseOffset.x * 24 * depthMultiplier).toFixed(2);
    const y = (mouseOffset.y * 14 * depthMultiplier - scrollY * 0.05 * depthMultiplier).toFixed(2);
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050811]"
      aria-hidden="true"
    >
      {/* ------------------------------------------------------------- */}
      {/* LAYER 1: SKY & DISTANT SKYLINE (Farthest, slowest parallax: 0.15) */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 will-change-transform transition-transform duration-75"
        style={{ transform: getTransform(0.15) }}
      >
        {/* Deep navy-to-black gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030610] via-[#070d1e] to-[#0f172a]" />

        {/* Distant urban ambient glow */}
        <div className="absolute top-8 right-1/4 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-16 left-1/3 w-[400px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-24 left-10 w-[350px] h-[250px] bg-rose-600/10 rounded-full blur-[90px]" />

        {/* Slow drifting cloud/haze texture (looped) */}
        <div 
          className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.15),_transparent_70%)] animate-cloud-drift"
        />

        {/* Distant city skyline silhouette SVG with glowing window lights */}
        <svg 
          className="absolute bottom-44 w-full h-56 opacity-50" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          fill="#080e1c"
        >
          <path d="M0,320 L0,230 L30,230 L30,170 L65,170 L65,230 L100,230 L100,120 L140,120 L140,230 L180,230 L180,180 L220,180 L220,230 L290,230 L290,95 L330,95 L330,230 L400,230 L400,140 L440,140 L440,230 L510,230 L510,85 L550,85 L550,230 L630,230 L630,165 L670,165 L670,230 L740,230 L740,110 L790,110 L790,230 L880,230 L880,75 L920,75 L920,230 L1000,230 L1000,145 L1050,145 L1050,230 L1130,230 L1130,105 L1180,105 L1180,230 L1270,230 L1270,155 L1320,155 L1320,230 L1440,230 L1440,320 Z" />
          
          {/* Glowing tiny window lights in highrises */}
          <rect x="110" y="135" width="4" height="4" fill="#fbbf24" opacity="0.9" />
          <rect x="125" y="155" width="4" height="4" fill="#38bdf8" opacity="0.7" />
          <rect x="305" y="110" width="4" height="4" fill="#fbbf24" opacity="0.9" />
          <rect x="315" y="140" width="4" height="4" fill="#f43f5e" opacity="0.8" />
          <rect x="525" y="100" width="4" height="4" fill="#fbbf24" opacity="0.85" />
          <rect x="535" y="130" width="4" height="4" fill="#38bdf8" opacity="0.7" />
          <rect x="895" y="90" width="4" height="4" fill="#fbbf24" opacity="0.9" />
          <rect x="905" y="120" width="4" height="4" fill="#fbbf24" opacity="0.75" />
          <rect x="1145" y="125" width="4" height="4" fill="#38bdf8" opacity="0.8" />
        </svg>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 2: STREET & WET ROAD REFLECTIONS (Mid-back, parallax: 0.35) */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 will-change-transform transition-transform duration-75"
        style={{ transform: getTransform(0.35) }}
      >
        {/* Dark wet asphalt ground curving into distance */}
        <div className="absolute bottom-0 w-full h-88 bg-gradient-to-t from-[#04060d] via-[#070c18] to-transparent" />

        {/* Glossy wet-reflection shader ripples (Streetlights and neon puddles) */}
        <div className="absolute bottom-6 left-1/4 w-[460px] h-32 bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-transparent rounded-full blur-2xl transform -skew-x-12 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-12 right-1/3 w-[380px] h-28 bg-gradient-to-r from-rose-500/20 via-amber-400/20 to-transparent rounded-full blur-xl transform skew-x-12" />
        <div className="absolute bottom-4 right-20 w-[300px] h-24 bg-gradient-to-r from-cyan-500/20 via-teal-400/25 to-transparent rounded-full blur-xl" />

        {/* Looping passing motorbike / vehicle light trails (red & white) */}
        {!isLowPower && (
          <>
            <div className="absolute bottom-20 -left-48 w-80 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-rose-400 shadow-[0_0_15px_#ef4444] rounded-full transform -rotate-1 animate-light-trail opacity-75" />
            <div className="absolute bottom-24 -right-48 w-72 h-[2px] bg-gradient-to-l from-transparent via-amber-200 to-white shadow-[0_0_12px_#fef08a] rounded-full transform rotate-1 animate-light-trail opacity-65" style={{ animationDelay: '2.8s' }} />
          </>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 3: UTILITY POLES, WIRES & SWAYING STRING LIGHTS (Mid: 0.6) */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 will-change-transform transition-transform duration-75"
        style={{ transform: getTransform(0.6) }}
      >
        {/* Silhouetted utility poles and tangled overhead wire lines */}
        <svg className="absolute top-0 left-0 w-full h-88 opacity-70" viewBox="0 0 1440 400" preserveAspectRatio="none">
          {/* Left Pole */}
          <path d="M 90,0 L 95,380 L 85,380 Z" fill="#090f1d" />
          <path d="M 60,70 L 120,70" stroke="#090f1d" strokeWidth="4" />
          <path d="M 50,120 L 130,120" stroke="#090f1d" strokeWidth="3" />

          {/* Right Pole */}
          <path d="M 1350,0 L 1355,380 L 1345,380 Z" fill="#090f1d" />
          <path d="M 1320,90 L 1380,90" stroke="#090f1d" strokeWidth="4" />

          {/* Tangled Drooping Cable Lines */}
          <path d="M 90,70 Q 720,180 1350,90" fill="none" stroke="#0a1224" strokeWidth="2.5" />
          <path d="M 90,120 Q 680,240 1350,110" fill="none" stroke="#090f1d" strokeWidth="2" />
          <path d="M 90,95 Q 460,200 860,125" fill="none" stroke="#090f1d" strokeWidth="1.5" />
        </svg>

        {/* Hanging string-light lines with 2-3° rotation sway loop */}
        <div className="absolute top-20 left-0 w-full flex justify-around items-center px-12 origin-top animate-lantern-sway opacity-90">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-[1px] h-7 bg-slate-700/80" />
              <div 
                className={`w-3.5 h-3.5 rounded-full ${
                  i % 3 === 0 
                    ? 'bg-amber-300 shadow-[0_0_14px_#fde047]' 
                    : i % 3 === 1 
                    ? 'bg-orange-400 shadow-[0_0_14px_#fb923c]' 
                    : 'bg-rose-400 shadow-[0_0_14px_#f43f5e]'
                } animate-pulse`}
                style={{ animationDuration: `${2.2 + (i % 3) * 0.6}s`, animationDelay: `${i * 0.15}s` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 4: FOOD STALLS, NEONS ("RAMEN","SATAY","WARUNG","KOPI"), STEAM & LANTERNS (0.85) */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 will-change-transform transition-transform duration-75"
        style={{ transform: getTransform(0.85) }}
      >
        {/* Right-aligned row of wooden/tin-roofed food stalls */}
        <div className="absolute bottom-0 right-0 w-[520px] h-[390px] hidden md:block">
          
          {/* Wooden/Tin Slanted Roof Canopy */}
          <div className="absolute top-8 right-0 w-[460px] h-14 bg-gradient-to-r from-amber-950 to-stone-900 border-b-4 border-amber-600/50 rounded-tl-2xl transform -rotate-3 shadow-2xl" />
          
          {/* Warm Interior Lighting (amber/orange glow spilling outward) */}
          <div className="absolute top-18 right-6 w-[400px] h-72 bg-gradient-to-br from-amber-500/25 via-orange-600/20 to-transparent rounded-3xl blur-2xl" />

          {/* Food Stall Counter Structure */}
          <div className="absolute bottom-0 right-0 w-[420px] h-64 bg-[#091020]/95 border-t-2 border-amber-500/40 rounded-tl-3xl p-5 flex flex-col justify-between shadow-2xl">
            
            {/* Glowing Signboards in Red / Blue Neon Tones with Flicker ("RAMEN", "SATAY", "WARUNG", "KOPI") */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-2.5 py-1 bg-black/80 border border-rose-500/80 rounded-lg shadow-glow-neon animate-neon-flicker">
                <span className="text-[11px] font-black tracking-widest text-rose-400 uppercase font-mono">
                  🍜 RAMEN
                </span>
              </div>

              <div className="px-2.5 py-1 bg-black/80 border border-cyan-500/80 rounded-lg shadow-glow-teal animate-neon-flicker" style={{ animationDelay: '1.2s' }}>
                <span className="text-[11px] font-black tracking-widest text-cyan-300 uppercase font-mono">
                  🍢 SATAY
                </span>
              </div>

              <div className="px-2.5 py-1 bg-black/80 border border-amber-500/80 rounded-lg shadow-glow-amber animate-neon-flicker" style={{ animationDelay: '0.6s' }}>
                <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase font-mono">
                  WARUNG 24H
                </span>
              </div>

              <div className="px-2 py-0.5 bg-black/80 border border-purple-500/70 rounded-md shadow-sm">
                <span className="text-[10px] font-mono text-purple-300">KOPI ☕</span>
              </div>
            </div>

            {/* Empty colorful plastic stools (red/blue/yellow) in front */}
            <div className="flex space-x-5 mb-2 opacity-60">
              <div className="w-9 h-11 bg-red-600/50 rounded-t-xl border-t-2 border-red-400/50 shadow-sm" />
              <div className="w-9 h-11 bg-blue-600/50 rounded-t-xl border-t-2 border-blue-400/50 shadow-sm" />
              <div className="w-9 h-11 bg-amber-500/50 rounded-t-xl border-t-2 border-amber-300/50 shadow-sm" />
            </div>
          </div>

          {/* Hanging Red Paper Lanterns with Pendulum Sway */}
          <div className="absolute top-18 right-88 origin-top animate-lantern-sway flex flex-col items-center">
            <div className="w-0.5 h-12 bg-amber-400/70" />
            <div className="w-9 h-14 bg-gradient-to-b from-red-600 to-rose-700 rounded-2xl border border-red-400/70 shadow-[0_0_22px_#ef4444] flex items-center justify-center">
              <div className="w-4 h-7 border-y border-amber-300/50" />
            </div>
            <div className="w-1.5 h-3 bg-amber-400 rounded-full mt-0.5" />
          </div>

          {/* Rising Steam / Smoke Particles from woks/grills fading upward */}
          {!isLowPower && (
            <div className="absolute top-24 right-36 flex space-x-3 pointer-events-none">
              <div className="w-7 h-14 rounded-full bg-slate-200/20 blur-md animate-steam-rise" style={{ animationDelay: '0s' }} />
              <div className="w-9 h-18 rounded-full bg-amber-100/15 blur-md animate-steam-rise" style={{ animationDelay: '1.5s' }} />
              <div className="w-6 h-12 rounded-full bg-slate-200/20 blur-md animate-steam-rise" style={{ animationDelay: '3s' }} />
            </div>
          )}
        </div>

        {/* Left Side Small Tea & Street Food Sign */}
        <div className="absolute bottom-10 left-8 hidden lg:block">
          <div className="px-3.5 py-1.5 bg-black/80 border border-emerald-500/70 rounded-xl shadow-glow-teal animate-neon-flicker">
            <div className="flex items-center space-x-2">
              <span className="text-sm">🛡️</span>
              <span className="text-xs font-bold text-emerald-400 tracking-wider font-mono">FOOD SAFETY • 100% PURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 5: FOREGROUND SILHOUETTES & SOFT RAIN STREAKS (1.15) */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 will-change-transform transition-transform duration-75 pointer-events-none"
        style={{ transform: getTransform(1.15) }}
      >
        {/* Soft diagonal rain-streak overlay animation at low opacity */}
        {isRainActive && !isLowPower && (
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(105deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 38px)',
              backgroundSize: '130px 130px',
              animation: 'steam 2.2s linear infinite'
            }}
          />
        )}

        {/* Darkened/blurred silhouettes of people for depth cue */}
        <div className="absolute -bottom-12 left-10 w-52 h-36 bg-gradient-to-t from-[#020409] to-transparent rounded-t-full opacity-65 blur-sm hidden sm:block" />
        <div className="absolute -bottom-14 right-1/4 w-72 h-40 bg-gradient-to-t from-[#020409] to-transparent rounded-t-full opacity-55 blur-sm hidden sm:block" />
      </div>

      {/* Global Soft Vignette so foreground cards stay 100% crisp & readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_35%,_rgba(4,7,16,0.6)_100%)] pointer-events-none" />
    </div>
  );
}
