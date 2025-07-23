import Iridescence from './Iridescence';
import { ChevronDown } from 'lucide-react';
import TextType from './TextType';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Iridescence Background */}
      <div className="absolute inset-0 z-0">
        <Iridescence
          color={[0.5, 0.6, 0.8]}
          mouseReact={true}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/05 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-3 animate-pulse" style={{
            background: 'linear-gradient(to right, rgba(103, 232, 249, 0.7), white, rgba(249, 168, 212, 0.7))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            NIMISHA BHATEJA
          </h1>
          
          {/* Styled DIV for the line */}
          <div 
            className="h-1.5 w-32 mx-auto mb-8 rounded-full"
            style={{
              background: 'linear-gradient(to right, rgba(103, 232, 249, 0.7), white, rgba(249, 168, 212, 0.7))'
            }}
          />

          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            AI/ML Engineer & Data Scientist
          </p>
          <div className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            <TextType
              text="Final-year Computer Science student specializing in Artificial Intelligence and Machine Learning, with hands-on experience in data visualization and predictive modeling."
              typingSpeed={30}
              initialDelay={1000}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-cyan-400"
              className="inline"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-cyan-400/70 via-white/20 to-purple-400/70 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Get In Touch
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-cyan-400 animate-bounce hover:text-purple-400 transition-colors"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;