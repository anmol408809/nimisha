import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Shield, Newspaper, X, ArrowLeft } from 'lucide-react';
import CircularGallery from './CircularGallery';

// SVG path data is now only needed for the modal
const iconPaths = {
  Newspaper:
    '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 0-2-2"/><path d="M15 2h5v14h-5V2Z"/><path d="M8 6h8M8 10h8M8 14h5"/>',
  Brain:
    '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.97-3.44 2.5 2.5 0 0 1-2.02-3.28 2.5 2.5 0 0 1 2.02-3.28 2.5 2.5 0 0 1 2.97-3.44A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.97-3.44 2.5 2.5 0 0 0 2.02-3.28 2.5 2.5 0 0 0-2.02-3.28 2.5 2.5 0 0 0-2.97-3.44A2.5 2.5 0 0 0 14.5 2Z"/>',
  Shield:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
};

interface ProjectType {
  title: string;
  description: string;
  icon: React.ElementType;
  iconName: keyof typeof iconPaths;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  colors: [string, string];
}

interface GalleryItem {
  image: string;
  text: string;
  originalData: ProjectType;
}

// This function now generates the images for the new DOM-based gallery
const createGradientImage = (color1: string, color2: string, iconPath: string): string => {
  const svg = `
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};" />
          <stop offset="100%" style="stop-color:${color2};" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#grad)" />
      <g transform="translate(400, 300) scale(14)" opacity="0.15">
        <g transform-origin="center">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="30s" repeatCount="indefinite" />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>
        </g>
      </g>
      <g transform="translate(352, 252) scale(4)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const ProjectModal: React.FC<{ project: ProjectType; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div style={{ background: `linear-gradient(to right, ${project.colors[0]}, ${project.colors[1]})`}} className="p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"><X size={24} /></button>
          <div className="flex items-center gap-4">
            <project.icon className="w-12 h-12 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-white/90 text-sm">{project.description}</p>
            </div>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="text-gray-600 text-sm flex items-start">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-3 flex-shrink-0`} style={{backgroundColor: project.colors[1]}}></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
          <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary bg-gray-800 hover:bg-gray-700">
                <Github className="w-4 h-4 mr-2" />Code
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary text-white" style={{ background: `linear-gradient(to right, ${project.colors[0]}, ${project.colors[1]})`}}>
                <ExternalLink className="w-4 h-4 mr-2" />Demo
              </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsProject, setDetailsProject] = useState<ProjectType | null>(null);

  const projectsData: ProjectType[] = [
    {
      title: 'Cat vs Dog Image Prediction',
      description: 'A deep learning project using CNNs to classify images of cats and dogs with high accuracy.',
      icon: Brain,
      iconName: 'Brain',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'],
      features: ['Developed a CNN model for binary image classification', 'Preprocessed dataset with data augmentation', 'Used Keras with TensorFlow backend for model development'],
      github: 'https://github.com/Nimishabhateja/Machine-Learning.git',
      demo: 'https://github.com/Nimishabhateja/Machine-Learning.git',
      colors: ['#A855F7', '#EC4899'],
    },
    {
      title: 'Fake News Detection',
      description: 'A machine learning solution to detect fake news using NLP and classification algorithms.',
      icon: Newspaper,
      iconName: 'Newspaper',
      technologies: ['Python', 'NLP', 'Scikit-learn', 'NLTK', 'Pandas'],
      features: ['Built ML model using NLP techniques', 'Text preprocessing with tokenization and stemming', 'Achieved high accuracy in fake news detection'],
      github: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      demo: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      colors: ['#60A5FA', '#A78BFA'],
    },
    {
      title: 'Credit Card Fraud Detection',
      description: 'An advanced system for detecting fraudulent transactions using ensemble methods.',
      icon: Shield,
      iconName: 'Shield',
      technologies: ['Python', 'Random Forest', 'XGBoost', 'Pandas', 'Data Analysis'],
      features: ['Developed fraud detection model with high accuracy', 'Used ensemble methods for better performance', 'Implemented evaluation metrics and model optimization'],
      github: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      demo: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      colors: ['#4ADE80', '#60A5FA'],
    },
  ];

  const galleryItems: GalleryItem[] = projectsData.map(project => ({
    image: createGradientImage(project.colors[0], project.colors[1], iconPaths[project.iconName]),
    text: project.title,
    originalData: project,
  }));
  
  const handleItemClick = (item: ProjectType) => {
    setDetailsProject(item);
    setShowDetails(true);
  };

  const handleBackToGallery = () => {
    setShowDetails(false);
    setDetailsProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black font-sans relative mb-6">
        <style>{`.btn-primary { display: flex; flex: 1; align-items: center; justify-content: center; padding: 0.75rem 1rem; border-radius: 0.5rem; transition: all 0.2s; color: white; font-weight: 500; text-decoration: none; } .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
        </div>

        <div style={{ height: '600px', position: 'relative', marginBottom: '2rem' }}>
          <AnimatePresence mode="wait">
            {!showDetails ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%' }}
              >
                <CircularGallery
                  items={galleryItems}
                  onItemClick={handleItemClick}
                  bend={2.5}
                  textColor="#ffffff"
                  borderRadius={0.08}
                  font="bold 32px Inter, sans-serif"
                  scrollSpeed={1.8}
                  scrollEase={0.08}
                />
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                {detailsProject && (
                  <div className="max-w-4xl w-full mx-auto">
                    <ProjectDetailsCard 
                      project={detailsProject} 
                      onBack={handleBackToGallery}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// New component for displaying project details in the gallery space
const ProjectDetailsCard: React.FC<{ project: ProjectType; onBack: () => void }> = ({ project, onBack }) => {
  return (
    <div 
      className="bg-gray-800/90 backdrop-blur-sm rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl"
      style={{ 
        background: `linear-gradient(135deg, ${project.colors[0]}15, ${project.colors[1]}15)`,
        borderColor: `${project.colors[0]}50`
      }}
    >
      {/* Header */}
      <div 
        className="p-8 text-white relative"
        style={{ 
          background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})` 
        }}
      >
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-white/20 rounded-2xl">
            <project.icon className="w-12 h-12" />
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-center mb-3">{project.title}</h3>
        <p className="text-white/90 text-center text-lg leading-relaxed max-w-2xl mx-auto">
          {project.description}
        </p>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Key Features */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div 
              className="w-1 h-6 rounded-full mr-3"
              style={{ backgroundColor: project.colors[1] }}
            />
            Key Features
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div 
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: project.colors[0] }}
                />
                <span className="text-gray-300 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div 
              className="w-1 h-6 rounded-full mr-3"
              style={{ backgroundColor: project.colors[1] }}
            />
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-gray-700/50 text-gray-200 rounded-full text-sm font-medium border border-gray-600/50 hover:border-cyan-400/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-5 h-5 mr-2" />
            View Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            style={{ 
              background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})` 
            }}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;