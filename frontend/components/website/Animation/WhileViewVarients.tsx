import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const whileViewVarients = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.1, 0.45, 0.3, 0.98],
    },
  },
};

const ScrollAnimationComponent = () => {
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        controls.start("visible");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, lastScrollY]);

  return (
    <motion.div
      variants={whileViewVarients}
      initial="hidden"
      animate={controls}
    >
      {/* Your content here */}
    </motion.div>
  );
};

export default ScrollAnimationComponent;
