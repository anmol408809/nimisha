import { useEffect, useState } from 'react';
import { 
  Code, Database, Brain, Users, Wrench, TrendingUp,
  // Programming Languages
  FileCode2, Globe, Braces, Hash,
  // AI & Machine Learning  
  Bot, Cpu, BarChart3, Calculator,
  // Data Tools
  PieChart, BarChart, Cloud, GitBranch,
  // Leadership & Strategy
  Crown, Target, Lightbulb, MessageSquare,
  // Development Tools
  Container, CloudCog, Settings, Workflow,
  // Business Intelligence
  LineChart, Gauge, Zap, DollarSign
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 90, icon: FileCode2 },
        { name: "SQL", level: 85, icon: Database },
        { name: "HTML/CSS", level: 80, icon: Globe },
        { name: "JavaScript", level: 75, icon: Braces }
      ],
      description: "Core programming languages with expertise in Python for data science, SQL for database management, and modern web technologies.",
      color: "#06b6d4"
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      skills: [
        { name: "TensorFlow", level: 85, icon: Bot },
        { name: "Scikit-Learn", level: 90, icon: Cpu },
        { name: "Pandas", level: 95, icon: BarChart3 },
        { name: "NumPy", level: 90, icon: Calculator }
      ],
      description: "Advanced machine learning frameworks and data science libraries for building intelligent systems and data analysis.",
      color: "#8b5cf6"
    },
    {
      title: "Data Tools",
      icon: Database,
      skills: [
        { name: "Tableau", level: 85, icon: PieChart },
        { name: "Power BI", level: 80, icon: BarChart },
        { name: "Databricks", level: 75, icon: Cloud },
        { name: "Git/GitHub", level: 90, icon: GitBranch }
      ],
      description: "Professional data visualization tools and platforms for creating compelling dashboards and interactive analytics.",
      color: "#10b981"
    },
    {
      title: "Leadership & Strategy",
      icon: Users,
      skills: [
        { name: "Team Management", level: 95, icon: Crown },
        { name: "Strategic Planning", level: 90, icon: Target },
        { name: "Decision Making", level: 85, icon: Lightbulb },
        { name: "Stakeholder Communication", level: 90, icon: MessageSquare }
      ],
      description: "Executive leadership skills focused on driving innovation, managing cross-functional teams, and strategic decision making.",
      color: "#f59e0b"
    },
    {
      title: "Development Tools",
      icon: Wrench,
      skills: [
        { name: "Docker", level: 80, icon: Container },
        { name: "AWS", level: 75, icon: CloudCog },
        { name: "Kubernetes", level: 70, icon: Settings },
        { name: "CI/CD", level: 85, icon: Workflow }
      ],
      description: "Modern development and deployment tools for scalable application development and cloud infrastructure management.",
      color: "#ef4444"
    },
    {
      title: "Business Intelligence",
      icon: TrendingUp,
      skills: [
        { name: "Data Analytics", level: 95, icon: LineChart },
        { name: "KPI Development", level: 90, icon: Gauge },
        { name: "Process Optimization", level: 85, icon: Zap },
        { name: "ROI Analysis", level: 88, icon: DollarSign }
      ],
      description: "Strategic business intelligence capabilities for data-driven decision making and performance optimization.",
      color: "#8b5cf6"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [skillCategories.length]);

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my technical skills and professional expertise through this interactive showcase. 
            Click on different categories to discover areas of specialization.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
        </div>

        {/* Interactive Skills Showcase */}
        <div className="max-w-6xl mx-auto">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === index
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{category.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Display */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Category Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {(() => {
                    const IconComponent = skillCategories[activeCategory].icon;
                    return (
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${skillCategories[activeCategory].color}20` }}
                      >
                        <IconComponent 
                          size={32} 
                          style={{ color: skillCategories[activeCategory].color }}
                        />
                      </div>
                    );
                  })()}
                  <h3 
                    className="text-3xl font-bold"
                    style={{ color: skillCategories[activeCategory].color }}
                  >
                    {skillCategories[activeCategory].title}
                  </h3>
                </div>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {skillCategories[activeCategory].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skillCategories[activeCategory].skills.map((skill, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700 hover:border-cyan-500/50 transition-colors duration-200"
                    >
                      <skill.icon size={16} style={{ color: skillCategories[activeCategory].color }} />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Progress */}
              <div className="space-y-6">
                {skillCategories[activeCategory].skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <skill.icon size={20} style={{ color: skillCategories[activeCategory].color }} />
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].color}80)`,
                          transitionDelay: `${i * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Overview Grid */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    activeCategory === index
                      ? 'border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'border-gray-700/50 hover:border-gray-600/50'
                  }`}
                  style={{ 
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <IconComponent 
                      size={24} 
                      style={{ color: category.color }}
                    />
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: category.color }}
                  >
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    {category.skills.length} skills • Avg {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {category.skills.slice(0, 4).map((skill, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}15` }}
                        title={skill.name}
                      >
                        <skill.icon size={12} style={{ color: category.color, opacity: 0.8 }} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 mb-6">
            Ready to discuss how these skills can benefit your next project?
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
            Let's Connect
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;