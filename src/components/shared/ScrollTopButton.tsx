"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Tooltip } from "@nextui-org/tooltip";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Tooltip content="Scroll to Top">
      <button
        onClick={scrollToTop}
        className={
          isVisible
            ? "fixed bottom-4 right-4 z-50 shadow-lg rounded-full p-4 bg-primary text-gray-200"
            : "hidden"
        }
      >
        <FaArrowUp />
      </button>
    </Tooltip>
  );
};

export default ScrollToTopButton;
