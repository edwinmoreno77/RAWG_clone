import { useSpotlightBorder } from "../hooks/useSpotlightBorder";
import PropTypes from "prop-types";

export const SpotlightSelect = ({
  name,
  value,
  onChange,
  children,
  label,
  className = "",
  ...rest
}) => {
  const {
    inputRef,
    position,
    opacity,
    handleMouseMove,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  } = useSpotlightBorder();

  return (
    <div className="mb-2">
      {/* El label está fuera del contenedor del efecto */}
      {label && <label className="block mb-1 text-xs">{label}</label>}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          ref={inputRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`w-full p-2 rounded bg-stone-800 text-white hover:brightness-125 cursor-pointer ${className}`}
          {...rest}
        >
          {children}
        </select>
        {/* Efecto de borde para el select */}
        <div
          style={{
            border: "1.5px solid #ffffff",
            opacity: opacity,
            WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded bg-transparent transition-opacity duration-500"
        />
      </div>
    </div>
  );
};

SpotlightSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};
