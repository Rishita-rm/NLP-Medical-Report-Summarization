import React from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate('/upload');
  };
  
  return (
    <div id="home" className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 text-white bg-[url('assets/img/home.png')] bg-no-repeat bg-cover bg-center opacity-90">
      <div className="relative z-10 w-full lg:w-4/5 space-y-8 text-center">
        <h1 className="text-5xl font-bold leading-tight">
          {t("homeHeadline")}
        </h1>

        <p className="text-lg">
          {t("homeSubheadline")}
        </p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={handleTryNowClick}
            className="bg-[#03e9f4] text-[#006992] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#02c4d3] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer z-20"
          >
            {t("tryNow")}
          </button>

          <ScrollLink
            to="features"
            spy={true}
            smooth={true}
            duration={500}
            className="bg-transparent border-2 border-[#03e9f4] text-[#03e9f4] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#03e9f4] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            {t("learnMore")}
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
