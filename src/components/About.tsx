import { User } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-36">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Profile Summary */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Profile Summary</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I am a final-year B.Tech Computer Science student at Maharaja Agrasen Institute of Technology (MAIT), 
                currently focused on honing my skills in Artificial Intelligence and machine learning. Alongside, 
                I have gained hands-on experience with data visualization tools.
              </p>
              <br />
              <p className="text-gray-300 leading-relaxed mt-4">
                Beyond academics, I have represented Delhi at both district and state levels in Badminton. 
                I also serve as the President of my college's cultural art society, where I lead and coordinate 
                various creative and organizational initiatives.
              </p>
            </div>
          </div>

          {/* Right Side - CardSwap with Education */}
          <div className="flex justify-center">
            <div style={{ height: '500px', position: 'relative' }}>
              <CardSwap
                width={350}
                height={400}
                cardDistance={40}
                verticalDistance={50}
                delay={4000}
                pauseOnHover={true}
                easing="elastic"
              >
                <Card>
                  <h3>10th Grade</h3>
                  <h4>N.K. Bagrodia Public School</h4>
                  <p className="date-info">March 2020</p>
                  <p className="grade-info">Percentage: 95.2%</p>
                  <p>Completed secondary education with excellent academic performance, laying a strong foundation for future studies.</p>
                </Card>
                
                <Card>
                  <h3>12th Grade</h3>
                  <h4>N.K. Bagrodia Public School</h4>
                  <p className="date-info">March 2022</p>
                  <p className="grade-info">Percentage: 95.2%</p>
                  <p>Completed higher secondary education with focus on Science stream, preparing for engineering studies.</p>
                </Card>
                
                <Card>
                  <h3>B.Tech CSE</h3>
                  <h4>Maharaja Agrasen Institute Of Technology</h4>
                  <p className="date-info">November 2022 - Present</p>
                  <p className="grade-info">Current GPA: 9.4/10</p>
                  <p>Pursuing Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning.</p>
                </Card>
                
                <Card>
                  <h3>Beyond Academics</h3>
                  <h4>Sports & Leadership</h4>
                  <p className="school-info">Badminton Representative</p>
                  <p className="grade-info">District & State Level</p>
                  <p>Represented Delhi in Badminton competitions and currently serving as President of college's cultural art society.</p>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;