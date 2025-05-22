import { useRef, useState } from "react";

export const useSpotlightBorder = () => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!inputRef.current || isFocused) return;

    const rect = inputRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };
  const handleMouseEnter = () => {
    setOpacity(1);
  };
  const handleMouseLeave = () => setOpacity(0);

  return {
    inputRef,
    isFocused,
    position,
    opacity,
    handleMouseMove,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  };
};
