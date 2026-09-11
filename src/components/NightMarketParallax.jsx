import React, { useEffect, useState } from 'react';

/**
 * Animated 3D Isometric Street Food Market Scene
 * "Bright, daylight 3D animation, isometric view of a bustling outdoor street food market.
 * Soft, minimal white-and-light-grey paved street, vibrant food stalls with colorful striped awnings,
 * gentle smoke rising from street food grills, subtle motion blur on stylized 3D characters,
 * modern low-poly art style, crisp pastel color palette, clean daylight studio lighting,
 * soft shadows, airy and expansive aesthetic, smooth claymation render style."
 */
export default function NightMarketParallax() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Subtle parallax response to mouse movements
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FFF9EF]"
      aria-hidden="true"
    >
      {/* 3D Isometric Street Food Market Scene Layer with camera float + mouse parallax */}
      <div 
        className="absolute -inset-6 transition-transform duration-700 ease-out will-change-transform animate-camera-float"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.06)`
        }}
      >
        <img
          src="/isometric_market_3d.jpg"
          alt="3D Isometric Street Food Market"
          className="w-full h-full object-cover object-center opacity-65 sm:opacity-75 filter saturate-[1.2] contrast-[1.05]"
          loading="eager"
        />
      </div>

      {/* Layered Animated Rising Smoke & Culinary Steam Overlays */}
      <div className="absolute inset-0">
        
        {/* BBQ Skewers Smoke Plumes (Top-Center Right Area) */}
        <div className="absolute top-[22%] left-[58%] w-16 h-28 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/80 blur-[6px] animate-smoke-1" />
          <div className="absolute bottom-3 left-[40%] w-10 h-10 rounded-full bg-amber-100/75 blur-[7px] animate-smoke-2" />
          <div className="absolute bottom-6 left-[55%] w-7 h-7 rounded-full bg-white/70 blur-[5px] animate-smoke-3" />
        </div>

        {/* Taco Truck / Grill Smoke (Center Left Area) */}
        <div className="absolute top-[28%] left-[36%] w-14 h-24 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 w-7 h-7 rounded-full bg-white/75 blur-[5px] animate-smoke-2" />
          <div className="absolute bottom-3 left-1/3 w-8 h-8 rounded-full bg-amber-50/80 blur-[6px] animate-smoke-1" />
        </div>

        {/* Noodle Box & Dim Sum Steam Wisps (Left & Far Right Area) */}
        <div className="absolute top-[36%] left-[19%] w-12 h-20 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 w-6 h-6 rounded-full bg-white/85 blur-[4px] animate-steam-1" />
          <div className="absolute bottom-3 left-1/3 w-7 h-7 rounded-full bg-emerald-50/85 blur-[5px] animate-steam-2" />
        </div>

        <div className="absolute top-[42%] right-[12%] w-12 h-20 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 w-6 h-6 rounded-full bg-white/85 blur-[4px] animate-steam-2" />
          <div className="absolute bottom-4 left-1/3 w-7 h-7 rounded-full bg-amber-50/80 blur-[5px] animate-steam-1" />
        </div>

        {/* Floating Sun Particles & Ambient Dust Specks */}
        <div className="absolute top-[15%] left-[25%] w-3 h-3 rounded-full bg-[#E68A35]/60 blur-[1px] animate-sun-particle-1" />
        <div className="absolute top-[45%] left-[48%] w-3.5 h-3.5 rounded-full bg-[#246B4A]/50 blur-[1px] animate-sun-particle-2" />
        <div className="absolute top-[30%] right-[30%] w-3 h-3 rounded-full bg-[#E68A35]/65 blur-[1px] animate-sun-particle-3" />
        <div className="absolute bottom-[25%] left-[15%] w-4 h-4 rounded-full bg-[#4F9D69]/55 blur-[1px] animate-sun-particle-1" />
        <div className="absolute bottom-[35%] right-[20%] w-3.5 h-3.5 rounded-full bg-[#E68A35]/55 blur-[1px] animate-sun-particle-2" />

        {/* Subtle Lantern Warm Glow pulses */}
        <div className="absolute top-[39%] left-[10.5%] w-12 h-12 rounded-full bg-[#E68A35]/40 blur-[10px] animate-lantern-glow" />
        <div className="absolute top-[43%] left-[14.8%] w-12 h-12 rounded-full bg-[#E68A35]/35 blur-[10px] animate-lantern-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Subtle Warm Tone Balancing (Keeps text ultra crisp while revealing 3D scene fully) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9EF]/20 via-transparent to-[#FFF9EF]/30 pointer-events-none" />
    </div>
  );
}

