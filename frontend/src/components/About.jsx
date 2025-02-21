import React from "react";

import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-10 bg-[#f5f5f5]">
      <div className=" w-full lg:w-5/6 space-y-6">
        <h1 className=" text-4xl font-semibold text-[#006992] lg:text-start">
          About Us
        </h1>
        <p className="text-justify lg:text-start">
          Welcome to{" "}
          <span className="font-semibold text-[#03e9f4]">HealthEase</span>, your
          trusted partner in simplifying healthcare communication. Our mission
          is to revolutionize the way medical reports are understood and
          accessed by both doctors and patients.
        </p>
        <p className="text-justify lg:text-start">
          Using advanced{" "}
          <span className="font-semibold text-[#03e9f4]">
            Natural Language Processing (NLP)
          </span>{" "}
          technology, we provide automated summarization of complex medical
          reports. Whether you're a healthcare professional or a patient, our
          platform ensures that critical information is presented in a clear,
          concise, and accessible manner.
        </p>
        <p className="text-justify lg:text-start">Our key features include:</p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Dual-Layer Summarization:</span>{" "}
            Technical summaries for doctors and simplified versions for
            patients.
          </li>
          <li>
            <span className="font-semibold">Voice Summarization:</span> Listen
            to your medical reports for enhanced accessibility.
          </li>
          <li>
            <span className="font-semibold">Interactive Visualizations:</span>{" "}
            Turn complex data into easy-to-understand charts and graphs.
          </li>
          <li>
            <span className="font-semibold">Multilingual Support:</span> Access
            reports in multiple languages, including English and Hindi.
          </li>
          <li>
            <span className="font-semibold">AI Chatbot:</span> Get instant
            answers to your questions about medical reports.
          </li>
        </ul>
        <p className="text-lg text-gray-700">
          At <span className="font-semibold text-[#03e9f4]">HealthEase</span>,
          we are committed to making healthcare communication more efficient,
          transparent, and patient-friendly. Join us in transforming the way
          medical information is shared and understood.
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg shadow-2xl" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
