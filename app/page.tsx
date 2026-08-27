"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const enter = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Home() {
  const stageRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 50, size: 0, opacity: 0 });
  const current = useRef({ x: 50, y: 50, size: 0, opacity: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const smooth = 0.15;
      current.current.x += (target.current.x - current.current.x) * smooth;
      current.current.y += (target.current.y - current.current.y) * smooth;
      current.current.size += (target.current.size - current.current.size) * smooth;
      current.current.opacity += (target.current.opacity - current.current.opacity) * smooth;
      stage.style.setProperty("--lens-x", `${current.current.x}%`);
      stage.style.setProperty("--lens-y", `${current.current.y}%`);
      stage.style.setProperty("--lens-size", `${current.current.size}px`);
      stage.style.setProperty("--lens-opacity", `${current.current.opacity}`);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, []);

  const moveLens = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    target.current.x = ((event.clientX - bounds.left) / bounds.width) * 100;
    target.current.y = ((event.clientY - bounds.top) / bounds.height) * 100;
  };

  // CSS radial gradients take a radius, so 86px yields a restrained 172px desktop lens.
  const showLens = () => { target.current.size = 86; target.current.opacity = 1; };
  const hideLens = () => { target.current.size = 0; target.current.opacity = 0; };

  return (
    <main className="hero-page">
      <section className="hero" id="top">
        <div className="noise" aria-hidden="true" />
        <div className="ambient" aria-hidden="true" />
        <div className="hairline" aria-hidden="true" />
        <header className="nav">
          <a className="brand" href="#top">AETHER<span>®</span></a>
          <nav aria-label="Main navigation"><a href="#top">Profile</a><a href="#top">Edition 01</a><a href="#top">Archive</a></nav>
          <a className="nav-action" href="mailto:hello@example.com">Inquire <span>↗</span></a>
        </header>
        <motion.div className="hero-copy" initial="hidden" animate="visible">
          <motion.p className="eyebrow" variants={enter} custom={0.15}><i /> Portrait study / 01</motion.p>
          <motion.h1 variants={enter} custom={0.27}>THE ART<br />OF <em>BECOMING.</em></motion.h1>
          <motion.div className="copy-bottom" variants={enter} custom={0.41}>
            <p>Move closer to reveal another layer of the self.</p>
            <a className="text-action" href="mailto:hello@example.com">Start a dialogue <span>↗</span></a>
          </motion.div>
        </motion.div>
        <motion.div ref={stageRef} className="portrait-stage" initial={{ opacity: 0, scale: 1.018 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }} aria-label="Interactive portrait: move the pointer over the image to reveal the alternate form" tabIndex={0} onPointerMove={moveLens} onPointerEnter={showLens} onPointerLeave={hideLens} onFocus={showLens} onBlur={hideLens}>
          <div className="portrait-layer portrait-base"><Image src="/portrait-base-aligned.png" alt="Portrait of the subject" fill priority quality={100} sizes="(max-width: 700px) 100vw, 544px" /></div>
          <div className="portrait-layer portrait-spider" aria-hidden="true"><Image src="/portrait.png" alt="" fill priority quality={100} sizes="(max-width: 700px) 100vw, 544px" /></div>
        </motion.div>
        <motion.aside className="quiet-stats" initial="hidden" animate="visible" aria-label="Profile facts">
          <motion.p variants={enter} custom={0.45}>Profile / active <i /></motion.p>
          <motion.div variants={enter} custom={0.55}><small>State</small><b>01<span>/02</span></b></motion.div>
          <motion.div variants={enter} custom={0.65}><small>Mode</small><b>Dual</b></motion.div>
        </motion.aside>
        <p className="footer-note">© 2026 AETHER STUDIO <span>—</span> Interactive portrait</p>
      </section>
    </main>
  );
}
