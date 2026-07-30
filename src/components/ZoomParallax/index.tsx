import styles from "./styles.module.scss";
import Picture1 from "../../../public/images/8.jpg";
import Picture2 from "../../../public/images/9.jpg";
import Picture3 from "../../../public/images/10.jpg";
import Picture4 from "../../../public/images/11.jpg";
import Picture5 from "../../../public/images/12.jpg";
import Picture6 from "../../../public/images/2.jpeg";
import Picture7 from "../../../public/images/6.jpg";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  motion,
} from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // reduce -> brak zoomu, kompozycja zostaje statyczna
  const to = (v: number) => (reduce ? 1 : v);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, to(4)]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, to(4)]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, to(5)]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, to(6)]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, to(8)]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, to(10)]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale3,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <Image
                  src={src}
                  fill
                  alt=""
                  placeholder="blur"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
