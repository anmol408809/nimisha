import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import InfiniteMenu from './InfiniteMenu';

// --- Custom Icon Components ---

// By: heroicons, for Trophy
export const IconHeroiconsTrophy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} >
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721A48.339 48.339 0 0 1 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52a6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
  </svg>
);

// By: bx, for Medal
export const IconBxMedal = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7m0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5s-5-2.243-5-5s2.243-5 5-5m-1-8H7v5.518a8.957 8.957 0 0 1 4-1.459zm6 0h-4v4.059a8.957 8.957 0 0 1 4 1.459z" />
    <path d="m10.019 15.811l-.468 2.726L12 17.25l2.449 1.287l-.468-2.726l1.982-1.932l-2.738-.398L12 11l-1.225 2.481l-2.738.398z" />
  </svg>
);

// By: mdi, for Badminton
export const IconMdiBadminton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M12.3 2c-.97.03-1.72.84-1.69 1.8c.01.24.06.47.16.7l.29.64c.04.13-.03.27-.17.31c-.09.05-.19 0-.26-.08l-.42-.55c-.33-.42-.83-.68-1.36-.69c-.97-.02-1.77.75-1.79 1.71c-.01.42.13.82.39 1.16l.42.5h.01c.08.13.05.29-.06.37c-.09.07-.21.07-.29 0L7 7.45c-.34-.26-.75-.4-1.16-.39c-.96.02-1.73.82-1.71 1.79c.01.53.27 1.03.69 1.36l.57.44c.11.1.11.26-.01.35a.23.23 0 0 1-.26.05h-.01l-.61-.28c-.23-.09-.46-.15-.7-.16c-.96-.03-1.77.73-1.8 1.7c0 .72.4 1.38 1.06 1.66l11.39 5.07l4.59-4.59l-5.07-11.39C13.69 2.39 13 1.97 12.3 2m.83 4.1c.42-.01.8.23.96.61l3.05 6.84l-3.95-3.94l-.93-2.11c-.3-.63.16-1.38.87-1.4M9.85 8.85c.27 0 .52.1.71.3l4.81 4.81c.4.38.41 1.01.03 1.41c-.4.4-1.02.41-1.44 0l-4.81-4.81a.987.987 0 0 1-.02-1.41c.19-.2.45-.3.72-.3m-2.72 3.32c.13 0 .27.04.37.09l2.13.94l3.94 3.94l-6.86-3.05c-1.02-.44-.68-1.95.42-1.92m13.15 3.87l-4.24 4.24l.85.85c.76.75 1.86 1.04 2.89.77a3.024 3.024 0 0 0 2.12-2.12c.27-1.03-.02-2.13-.77-2.89z" />
  </svg>
);

// By: heroicons, for User Group
export const IconHeroiconsUserGroup16Solid = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path d="M8 8a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m-4.844 3.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 0-2.725 1.377c-.136.287.102.58.418.58h1.449c.01-.077.025-.156.045-.237m9.691 0c.02.08.036.16.046.237h1.446c.316 0 .554-.293.417-.579a2.5 2.5 0 0 0-2.722-1.378c.374.51.653 1.09.813 1.72M14 7.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M3.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M5 13c-.552 0-1.013-.455-.876-.99a4.002 4.002 0 0 1 7.753 0c.136.535-.324.99-.877.99z" />
  </svg>
);

// By: lucide, for Bot
export const IconLucideBot = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2m16 0h2m-7-1v2m-6-2v2" />
    </g>
  </svg>
);

// By: tabler, for Drone
export const IconTablerDrone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 10h4v4h-4zm0 0L6.5 6.5M9.96 6A3.5 3.5 0 1 0 6 9.96m8 .04l3.5-3.5m.5 3.46A3.5 3.5 0 1 0 14.04 6M14 14l3.5 3.5m-3.46.5A3.5 3.5 0 1 0 18 14.04M10 14l-3.5 3.5M6 14.04A3.5 3.5 0 1 0 9.96 18" />
  </svg>
);

// By: lucide, for Crown
export const IconLucideCrown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2 4l3 12h14l3-12l-6 7l-4-7l-4 7zm3 16h14" />
    </svg>
);


// Helper to convert React icon component to data URL
const iconToDataUrl = (
  IconComponent: React.ComponentType<any>,
  color = '#3b82f6',
  size = 512
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    if (!ctx) return resolve('');

    // Create a temporary container for rendering
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px'; // Render off-screen
    document.body.appendChild(tempDiv);
    
    // Render the React component to the hidden div
    const root = ReactDOM.createRoot(tempDiv);
    root.render(
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <IconComponent
            height={`${size * 0.7}px`}
            width={`${size * 0.7}px`}
            fill={color}
            stroke={color}
            style={{color: color}}
        />
      </div>
    );
    
    // Slight delay to ensure SVG is in the DOM
    setTimeout(() => {
        const svgElement = tempDiv.querySelector('svg');
        if (!svgElement) {
            document.body.removeChild(tempDiv);
            return resolve('');
        }
        
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

        const img = new Image();
        img.onload = () => {
            // Fill background with a dark, semi-transparent color
            ctx.fillStyle = 'rgba(20, 20, 20, 0.95)';
            ctx.fillRect(0, 0, size, size);
            
            // Draw the rendered icon on top
            ctx.drawImage(img, 0, 0, size, size);
            
            // Clean up and resolve
            document.body.removeChild(tempDiv);
            resolve(canvas.toDataURL('image/png'));
        };

        img.onerror = () => {
            document.body.removeChild(tempDiv);
            resolve('');
        }

        img.src = svgDataUrl;
    }, 50);
  });
};


const Achievements = () => {
  const [menuItems, setMenuItems] = useState<Array<{
    image: string;
    link: string;
    title: string;
    description: string;
  }>>([]);

  const achievements = [
    {
      icon: IconHeroiconsTrophy,
      title: "Sports Person Of The Year (2024-25)",
      description: "Awarded by MAIT for exceptional performance in sports competitions, securing gold medals in Badminton, Arm Wrestling, and Discus Throw.",
      color: "#fbbf24",
      link: "#sports-excellence"
    },
    {
      icon: IconBxMedal,
      title: "2-Time Silver Medalist - GGSIPU",
      description: "Represented MAIT and secured silver medals in Badminton at the Annual Sports Meet of GGSIPU for two consecutive years.",
      color: "#06b6d4",
      link: "#sports-achievement"
    },
    {
      icon: IconMdiBadminton,
      title: "Delhi State & District Badminton Player",
      description: "Qualified and competed in Delhi State and District-level badminton tournaments, achieving a top 16 rank among participants.",
      color: "#8b5cf6",
      link: "#sports-recognition"
    },
    {
      icon: IconHeroiconsUserGroup16Solid,
      title: "President - Expressions Society, MAIT",
      description: "Leading a team of 50+ members, overseeing event planning and execution, and coordinating with college staff to organize successful cultural events.",
      color: "#10b981",
      link: "#leadership"
    },
    {
      icon: IconLucideBot,
      title: "Machine Learning Udemy Course",
      description: "Completed comprehensive Machine Learning course with hands-on projects and practical applications in data science and AI.",
      color: "#f97316",
      link: "#ml-course"
    },
    {
      icon: IconTablerDrone,
      title: "UAV & Drone Hands-on Bootcamp",
      description: "5-day practical training program by C-DAC Noida & MeitY covering drone technology, operations, and applications.",
      color: "#ef4444",
      link: "#drone-bootcamp"
    }
  ];

  useEffect(() => {
    const generateMenuItems = async () => {
      const items = await Promise.all(
        achievements.map(async (achievement) => ({
          image: await iconToDataUrl(achievement.icon, achievement.color),
          link: achievement.link,
          title: achievement.title,
          description: achievement.description
        }))
      );
      setMenuItems(items);
    };

    generateMenuItems();
  }, []);

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
            Achievements & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore my achievements in sports, leadership, and professional development through this interactive 3D experience.
            Drag to rotate and discover each accomplishment.
          </p>
        </div>

        {/* 3D Interactive Menu Box */}
        <div className="max-w-5xl mx-auto h-[600px] md:h-[700px] relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-black/50 backdrop-blur-sm">
          {menuItems.length > 0 ? (
            <InfiniteMenu items={menuItems} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading interactive experience...</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            <span className="text-cyan-400 font-semibold">Tip:</span> Drag to rotate • Click the arrow to learn more
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;