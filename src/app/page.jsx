"use client";
import styles from "./page.module.scss";
import ZoomParallax from "../components/ZoomParallax/index";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Text from "../components/Text/index";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className={styles.main}>
      <Text>Parallax Zoom</Text>
      <ZoomParallax />
      <Text style={{ backgroundColor: "black", color: "white" }}>end</Text>
    </main>
  );
}
