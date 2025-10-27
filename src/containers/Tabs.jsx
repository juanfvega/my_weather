import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Weather from "./Weather.jsx";
import Forecast from "./Forecast.jsx";
import "./Tabs.css";
import CountrySelect from "./CountrySelect.jsx";
import About from "../components/About.jsx";

export default function Tabs({ weatherData }) {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "tab1", label: "Clima actual", content: <Weather {...weatherData} /> },
    { id: "tab2", label: "15 días", content: <Forecast {...weatherData} /> },
    { id: "tab3", label: "Search by Country", content: <CountrySelect /> },
    { id: "tab4", label: "About", content: <About /> },
  ];

  return (
    <div className="tabs-container">
      {/* Cabecera de pestañas */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="tab-underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Contenido de pestañas */}
      <div className="tabs-content">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  className="tab-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
