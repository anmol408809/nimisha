import { Briefcase, Calendar, MapPin } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const Experience = () => {
  const experiences = [
    {
      title: "Data Science & AI/ML Intern",
      company: "Ybi Foundation",
      location: "Remote",
      period: "July 2024 - August 2024",
      current: false,
      description: [
        "Completed a 2-week intensive internship focused on Data Science and AI/ML fundamentals.",
        "Actively engaged in hands-on projects applying machine learning techniques for real-world problem solving.",
        "Demonstrated strong dedication, rapid learning, and professional conduct in executing assigned tasks.",
        "Gained exposure to model training workflows, data preprocessing, and supervised learning methods."
      ],
      color: "blue"
    },
    {
      title: "AI/ML Intern",
      company: "Brainwave Matrix Solutions",
      location: "Remote",
      period: "August 2024 - September 2024",
      current: false,
      description: [
        "Conducted data pre-processing, feature engineering, and model evaluation to optimize performance.",
        "Utilized Python, Pandas, Scikit-learn, and TensorFlow for building, training, and evaluating models.",
        "Developed and implemented machine learning models for credit card fraud detection using supervised learning techniques.",
        "Collaborated on diabetes detection projects, leveraging classification models such as Logistic Regression and Decision Trees."
      ],
      color: "purple"
    },
    {
      title: "Data & AI Intern",
      company: "Guardian Life",
      location: "Remote",
      period: "April 2025 - November 2025",
      current: true,
      description: [
        "Working on the Premium Persistency project, optimizing 9 data workflows previously built in Alteryx.",
        "Migrating Alteryx workflows to Python scripts using Databricks for automation and efficiency.",
        "Integrating data from multiple sources and creating Tableau dashboards for visualization.",
        "Reduced reporting time from 5-8 days to 1-2 days through workflow automation.",
        "Collaborating with teams to ensure accurate, scalable, and efficient data pipelines."
      ],
      color: "cyan"
    },
    {
      title: "Looking Forward",
      company: "Future Collaborations & Innovations",
      location: "Global Opportunities",
      period: "2025 & Beyond",
      current: false,
      description: [
        "Eager to tackle complex challenges using machine learning and data-driven strategies.",
        "Committed to lifelong learning and staying at the forefront of emerging AI technologies.",
        "Seeking to join a team where I can contribute to impactful, large-scale projects.",
        "Open to connecting with peers, mentors, and leaders in the technology industry."
      ],
      color: "green"
    }
  ];

  return (
    <section id="experience" className="bg-gray-900">
      <div className="container mx-auto px-6 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
        </div>
      </div>
      
      <ScrollStack
        itemDistance={200}
        itemScale={0.05}
        itemStackDistance={40}
        stackPosition="15%"
        scaleEndPosition="10%"
        baseScale={0.88}
        rotationAmount={1}
        blurAmount={0.5}
      >
        {experiences.map((exp, index) => (
          <ScrollStackItem
            key={index}
            itemClassName={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-${exp.color}-500/30 hover:border-${exp.color}-500/50 transition-all duration-300 w-full max-w-3xl mx-auto`}
          >
            <div className="flex flex-col p-8">
              {exp.current && (
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                    Current
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-3 bg-${exp.color}-500/20 rounded-lg border border-${exp.color}-500/30`}>
                  <Briefcase className={`w-6 h-6 text-${exp.color}-400`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <h4 className={`text-lg lg:text-xl font-semibold text-${exp.color}-400 mb-3`}>{exp.company}</h4>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <div className={`w-2 h-2 rounded-full bg-${exp.color}-400 mt-1.5 mr-4 flex-shrink-0`} />
                      <span className="leading-relaxed text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default Experience;