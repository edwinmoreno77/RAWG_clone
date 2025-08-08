import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faGamepad,
  faDesktop,
  faTags,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useSpotlightBorder } from "../../../hooks/useSpotlightBorder";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Mapeo de íconos según el label
  const iconMap = {
    Year: faCalendarAlt,
    Genres: faGamepad,
    Platforms: faDesktop,
    Tags: faTags,
    Developers: faUser,
  };

  // Convertir children a opciones para el Listbox
  const options = React.Children.toArray(children).map((child) => ({
    value: child.props.value,
    label: child.props.children,
  }));

  const selectedOption = options.find((option) => option.value === value);

  // Función para manejar el cambio y emitir el evento correcto
  const handleOptionChange = (newValue) => {
    // Crear un evento sintético que simule el evento del select nativo
    const syntheticEvent = {
      target: {
        name: name,
        value: newValue,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <div className="mb-2 flex items-center justify-center">
      {label && (
        <label className="text-base p-1 me-2 text-stone-800 flex items-center gap-2">
          {/* Renderizar el ícono si existe en el mapeo */}
          {iconMap[label] && (
            <FontAwesomeIcon
              icon={iconMap[label]}
              className=" text-stone-400 hover:text-white"
            />
          )}
        </label>
      )}
      <div className="relative text-xs w-full">
        <Listbox value={value} onChange={handleOptionChange}>
          {({ open }) => (
            <>
              <Listbox.Button
                ref={inputRef}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`w-full p-2 rounded bg-stone-800 text-white hover:brightness-125 cursor-pointer flex items-center justify-between ${className}`}
                {...rest}
              >
                <span className="truncate">
                  {selectedOption ? selectedOption.label : "Seleccionar..."}
                </span>
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-stone-400"
                  />
                </motion.div>
              </Listbox.Button>

              <AnimatePresence>
                {open && (
                  <Listbox.Options
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-1 bg-stone-800 rounded-md shadow-lg border border-stone-700 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent"
                  >
                    {options.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `px-3 py-2 cursor-pointer transition-colors duration-150 ${
                            active
                              ? "bg-gradient-to-r from-lime-400 to-lime-600 text-black"
                              : "text-white"
                          } ${
                            selected
                              ? "bg-gradient-to-r from-lime-400 to-lime-600 text-black"
                              : ""
                          }`
                        }
                      >
                        {option.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </AnimatePresence>
            </>
          )}
        </Listbox>

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
