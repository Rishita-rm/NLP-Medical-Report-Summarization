import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const { user, logout } = useAuth();

  const translations = {
    en: {
      healthEase: "HealthEase",
      home: "Home",
      features: "Features",
      howItWorks: "How It Works",
      healthTips: "Health Tips",
      about: "About",
      login: "Login"
    },
    es: {
      healthEase: "HealthEase",
      home: "Inicio",
      features: "Características",
      howItWorks: "Cómo Funciona",
      healthTips: "Consejos de Salud",
      about: "Acerca de",
      login: "Iniciar Sesión"
    },
    fr: {
      healthEase: "HealthEase",
      home: "Accueil",
      features: "Fonctionnalités",
      howItWorks: "Comment ça Marche",
      healthTips: "Conseils Santé",
      about: "À Propos",
      login: "Connexion"
    },
  };

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    closeMenu();
  };

  const handleSetActive = (to) => {
    setActiveTab(to);
  };

  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const NavItem = ({ to, children }) => {
    if (isHomePage) {
      return (
        <ScrollLink
          to={to}
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
          className={`text-xl font-medium cursor-pointer transition-all duration-300 px-4 py-2 rounded-lg
            ${activeTab === to 
              ? 'text-[#03e9f4] font-bold' 
              : 'hover:text-[#03e9f4]'}`}
          onClick={() => {
            closeMenu();
            handleSetActive(to);
          }}
          onSetActive={() => handleSetActive(to)}
        >
          {children}
        </ScrollLink>
      );
    }
    return (
      <Link
        to={`/#${to}`}
        className="text-xl font-medium hover:text-[#03e9f4] transition-all duration-300 px-4 py-2 rounded-lg"
        onClick={closeMenu}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="fixed w-full z-10 text-white">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <Link to="/" className="flex flex-row items-center cursor-pointer">
            <h1 className="text-4xl font-bold">{t("healthEase")}</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row items-center gap-8">
            <NavItem to="home">{t("home")}</NavItem>
            <NavItem to="features">{t("features")}</NavItem>
            <NavItem to="how-it-works">{t("howItWorks")}</NavItem>
            <NavItem to="health-tips">{t("healthTips")}</NavItem>
            <NavItem to="about">{t("about")}</NavItem>

            {/* Login Button */}
            {user && (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 hover:text-[#03e9f4] transition-all">
                  <AiOutlineUser className="text-xl" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Language Switcher */}
            <div className="relative group ml-2">
              <button className="flex items-center gap-2 hover:text-[#03e9f4] transition-all p-2 rounded-lg text-xl">
                <BiGlobe className="text-2xl" />
                <span>{language.toUpperCase()}</span>
              </button>
              <div className="absolute hidden group-hover:block right-0 top-full pt-2">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden w-48">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'es', label: 'Español' },
                    { code: 'fr', label: 'Français' },
                    { code: 'hi', label: 'हिंदी' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors
                        ${language === lang.code 
                          ? 'text-[#03e9f4] font-medium bg-gray-50' 
                          : 'text-gray-700'}`}
                    >
                      <span className="ml-2">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={handleChange} className="p-2">
              {menu ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-20 font-semibold text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <NavItem to="home">{t("home")}</NavItem>
          <NavItem to="features">{t("features")}</NavItem>
          <NavItem to="how-it-works">{t("howItWorks")}</NavItem>
          <NavItem to="doctors">{t("doctors")}</NavItem>
          <NavItem to="health-tips">{t("healthTips")}</NavItem>
          <NavItem to="about">{t("about")}</NavItem>

          {/* Login Button for Mobile */}
          {user && (
            <div className="flex flex-col gap-4">
              <Link to="/profile" className="hover:text-[#03e9f4] transition-all">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 mx-auto w-32 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          )}
          
          {/* Mobile Language Switcher */}
          <div className="flex flex-col items-center gap-4 pt-6">
            <div className="flex items-center gap-2 text-xl">
              <BiGlobe className="text-2xl" />
              <span>Language</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {[
                { code: 'en', label: 'EN' },
                { code: 'es', label: 'ES' },
                { code: 'fr', label: 'FR' },
                { code: 'hi', label: 'HI' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-6 py-2 rounded-lg text-lg transition-all duration-300 ${
                    language === lang.code 
                      ? 'bg-[#03e9f4] text-white' 
                      : 'hover:text-[#03e9f4] border border-[#03e9f4]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showForm && <Contact closeForm={closeForm} />}
    </div>
  );
};

export default Navbar;