import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carrusel.css";


const Carousel = ({ days }) => {
  const [index, setIndex] = useState(0);

  // Función para formatear fecha de "2025-10-02" a "2 Octubre"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  // Avanza automáticamente cada 3 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % days.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Animaciones de entrada/salida
  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="carousel-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={days[index].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="carousel-card"
        >

          <p className="p-title-text">Fecha:<span className="span-text">{formatDate(days[index].datetime)}</span></p>
          <p className="p-title-text">Temp:<span className="span-text">{days[index].temp} C°</span></p>
          <p className="p-title-text">Max:<span className="span-text">{days[index].tempmax} C°</span></p>
          <p className="p-title-text">Min:<span className="span-text">{days[index].tempmin} C°</span></p>

        </motion.div>
      </AnimatePresence>

      {/* Botones opcionales */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + days.length) % days.length)}
        className="carousel-button carousel-button-prev"
      >
        ‹
      </button>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % days.length)}
        className="carousel-button carousel-button-next"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
