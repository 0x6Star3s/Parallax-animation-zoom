"use client";
import ZoomParallax from "../components/ZoomParallax/index";
import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Text from "../components/Text/index";
import ParallaxColumns from "../components/ParallaxColumns/index";
import HorizontalScroll from "../components/HorizontalScroll/index";

export default function Home() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis();
    let id: number;

    function raf(time: number) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      {/* ponytail: scaleX na MotionValue -> pasek animuje się poza Reactem, bez rerenderów */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "red",
          zIndex: 10,
        }}
      />
      <Text>Parallax Zoom</Text>
      <ZoomParallax />
      <Text>Parallax Columns</Text>
      <ParallaxColumns />
      <Text>Horizontal Scroll</Text>
      <HorizontalScroll />
      <Text style={{ backgroundColor: "black", color: "white" }}>end</Text>
    </main>
  );
}
