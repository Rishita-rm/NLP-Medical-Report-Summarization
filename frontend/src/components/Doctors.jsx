import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  const data = [
    {
      img: "/src/assets/img/step1.png",
      title: "Step 1: Upload Your Report",
      description:
        "Upload your medical report in PDF or text format. Our system will process it securely.",
    },
    {
      img: "/src/assets/img/step2.png",
      title: "Step 2: AI Summarization",
      description:
        "Our AI analyzes the report and generates a concise summary in easy-to-understand language.",
    },
    {
      img: "/src/assets/img/step3.png",
      title: "Step 3: Review & Visualize",
      description:
        "Review the summary and explore interactive visualizations of key medical insights.",
    },
    {
      img: "/src/assets/img/step4.png",
      title: "Step 4: Ask Questions",
      description:
        "Use our AI chatbot to ask questions and get instant answers about your report.",
    },
    {
      img: "/src/assets/img/step5.png",
      title: "Step 5: Multilingual Support",
      description:
        "Access your report summary in multiple languages, including English and Hindi.",
    },
    {
      img: "/src/assets/img/step6.png",
      title: "Step 6: Download or Share",
      description:
        "Download your summarized report or share it securely with your doctor.",
    },
  ];

  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div
      id="how-it-works" // Add this ID
      className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16"
    >
      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start text-[#006992]">
            How It Works
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Discover how our AI-powered system simplifies medical report
            summarization for you.
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Slider ref={slider} {...settings}>
          {data.map((e, index) => (
            <div
              className="h-[400px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
              key={index}
            >
              <div>
                <img
                  src={e.img}
                  alt="img"
                  className="h-56 rounded-t-xl w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center items-center p-4">
                <h1 className="font-semibold text-xl pt-4 text-center">
                  {e.title}
                </h1>
                <p className="pt-2 text-center text-gray-700">
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HowItWorks;
