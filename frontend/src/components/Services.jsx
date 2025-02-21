import React, { useState } from "react";
import Button from "../layouts/Button";
import { RiMicroscopeLine } from "react-icons/ri";
import ServicesCard from "../layouts/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import {
  FaStethoscope,
  FaHeadphones,
  FaGlobe,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

const Features = () => {
  const [flippedIndex, setFlippedIndex] = useState(null); // Track which card is flipped
  const [hoverTimeout, setHoverTimeout] = useState(null); // Track the hover timeout

  const features = [
    {
      icon: <FaStethoscope size={40} className="text-[#03e9f4]" />,
      title: "Dual-Layer Summarization",
      description:
        "Get technical summaries for doctors and simplified versions for patients.",
      explanation: (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/img/dual-layer.png" // Replace with your image path
            alt="Dual-Layer Summarization"
            className="w-32 h-32 mb-4"
          />
          <p className="text-gray-700 text-center">
            Our system generates two versions of the report: one for medical
            professionals with technical jargon and one for patients in simple
            language.
          </p>
        </div>
      ),
    },
    {
      icon: <FaHeadphones size={40} className="text-[#03e9f4]" />,
      title: "Voice Summarization",
      description:
        "Listen to your medical reports with our text-to-speech feature.",
      explanation: (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/img/voice-summary.png"
            alt="Voice Summarization"
            className="w-32 h-32 mb-4"
          />
          <p className="text-gray-700 text-center">
            For visually impaired users, our system converts the report summary
            into an audio format for easy listening.
          </p>
        </div>
      ),
    },
    {
      icon: <FaGlobe size={40} className="text-[#03e9f4]" />,
      title: "Multilingual Support",
      description:
        "Access reports in multiple languages, including English and Hindi.",
      explanation: (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/img/multilingual.png"
            alt="Multilingual Support"
            className="w-32 h-32 mb-4"
          />
          <p className="text-gray-700 text-center">
            Our system supports multiple languages, allowing users to read or
            listen to the report in their preferred language.
          </p>
        </div>
      ),
    },
    {
      icon: <FaRobot size={40} className="text-[#03e9f4]" />,
      title: "AI Chatbot",
      description:
        "Ask questions and get instant answers about your medical reports.",
      explanation: (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/img/ai-chatbot.png"
            alt="AI Chatbot"
            className="w-32 h-32 mb-4"
          />
          <p className="text-gray-700 text-center">
            Our AI chatbot provides instant answers to your questions about the
            report, making it easier to understand complex medical terms.
          </p>
        </div>
      ),
    },
    {
      icon: <FaChartLine size={40} className="text-[#03e9f4]" />,
      title: "Interactive Visualization",
      description: "Turn complex data into easy-to-read charts and graphs.",
      explanation: (
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/img/visualization.png"
            alt="Interactive Visualization"
            className="w-32 h-32 mb-4"
          />
          <p className="text-gray-700 text-center">
            Our system converts complex medical data into interactive charts and
            graphs for better understanding.
          </p>
        </div>
      ),
    },
  ];

  // Handle mouse enter (start timer for flip)
  const handleMouseEnter = (index) => {
    const timeout = setTimeout(() => {
      setFlippedIndex(index); // Flip the card after 2 seconds
    }, 1000);
    setHoverTimeout(timeout); // Store the timeout ID
  };

  // Handle mouse leave (reset flip and clear timeout)
  const handleMouseLeave = () => {
    setFlippedIndex(null); // Reset the flipped card
    clearTimeout(hoverTimeout); // Clear the timeout
  };

  return (
    <div
      id="features"
      className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16 bg-white"
    >
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold text-[#006992]">Our Features</h1>
          <p className="mt-2 text-lg text-gray-700">
            Discover the powerful features that make HealthEase the ultimate
            tool for medical report summarization.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative w-full h-[300px] perspective group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Front of the Card */}
              <div
                className={`absolute w-full h-full bg-[#f5f5f5] p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform ${
                  flippedIndex === index ? "rotate-y-180" : ""
                } group-hover:-translate-y-6`} // Added group-hover for pop-up effect
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#d5f2ec] p-3 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-[#006992]">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-gray-700">{feature.description}</p>
                </div>
              </div>

              {/* Back of the Card */}
              <div
                className={`absolute w-full h-full bg-[#f5f5f5] p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform rotate-y-180 ${
                  flippedIndex === index ? "rotate-y-0" : ""
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
