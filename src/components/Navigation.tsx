import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, FolderOpen, Award, Wrench, Mail } from 'lucide-react';
import Dock from './Dock';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    // ✨ FIX: Set the active section immediately for instant feedback
    setActiveSection(sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const dockItems = navItems.map((item) => ({
    icon: <item.icon size={18} />,
    label: item.label,
    onClick: () => scrollToSection(item.id),
    className: activeSection === item.id ? 'dock-item-active' : '',
  }));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navigation Container */}
      <div className="w-full px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Transparent rounded container */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <div className="text-lg font-semibold text-white">
                NB
              </div>
            </div>

            {/* Desktop Navigation - Dock Style */}
            <div className="hidden md:block">
              <Dock 
                items={dockItems}
                panelHeight={40}
                baseItemSize={32}
                magnification={48}
                distance={150}
                className="navbar-dock-transparent"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-white/80 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 mx-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl flex items-center gap-3 ${
                      activeSection === item.id 
                        ? 'text-white bg-gradient-to-r from-cyan-400 to-pink-300' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar-dock-transparent .dock-panel {
          background: transparent !important;
          border: none !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
        }
        
        .navbar-dock-transparent .dock-item {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(8px) !important;
          transition: all 0.3s ease !important;
        }
        
        .navbar-dock-transparent .dock-item:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        
        .navbar-dock-transparent .dock-item-active {
          background: linear-gradient(135deg, rgb(34, 211, 238), rgb(251, 182, 206)) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
        }
        
        .dock-item-active {
          background: linear-gradient(135deg, rgb(34, 211, 238), rgb(251, 182, 206)) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
        }
        
        .navbar-dock-transparent .dock-icon {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .navbar-dock-transparent .dock-item:hover .dock-icon {
          color: white !important;
        }
        
        .navbar-dock-transparent .dock-item-active .dock-icon {
          color: white !important;
        }
        
        .navbar-dock-transparent .dock-label {
          background: rgba(0, 0, 0, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;