
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Code, Award, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Academy: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Its Coder Camp - Tech Academy"
        description="FOCS Academy 'Its Coder Camp' offers industry-focused training in Full Stack Development, Python, and AI/ML with 100% placement assistance in Nagpur."
        keywords="Coding Classes Nagpur, Full Stack Developer Course, Python Training, Its Coder Camp, FOCS Academy, Software Training Institute"
      />

      {/* Academy Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-purple-900 text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
            <span className="font-bold text-xs tracking-[0.2em] text-brand-200">OPERATED UNDER FOCS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            Its Coder Camp <span className="text-brand-400">.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 font-light mb-12 max-w-2xl">The Tech Academy for Future Innovators</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
            <Link to="/contact" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-500/30 hover:-translate-y-1 text-center">
              Enroll Now
            </Link>
            <Link to="/ai-labs" className="bg-white text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors hover:-translate-y-1 text-center">
              For Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white py-10 border-b border-slate-100 shadow-sm relative z-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-wrap justify-center gap-y-6 gap-x-12 text-slate-600 font-medium">
          <span className="flex items-center gap-2"><CheckCircle size={20} className="text-emerald-500" /> 500+ Students Trained</span>
          <span className="flex items-center gap-2"><CheckCircle size={20} className="text-emerald-500" /> Industry-Aligned Curriculum</span>
          <span className="flex items-center gap-2"><CheckCircle size={20} className="text-emerald-500" /> 100% Practical Learning</span>
        </div>
      </div>

      {/* Programs */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Programs</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Designed by industry experts to bridge the gap between academic theory and corporate reality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Code size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Student Training</h3>
              <p className="text-slate-600 mb-6">Intensive bootcamps on Full Stack Development (MERN), Python, and Java. Real-world project experience.</p>
              <ul className="text-sm text-slate-500 space-y-3 mb-8">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> 3-6 Month Duration</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Live Projects</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Placement Assistance</li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Faculty Development</h3>
              <p className="text-slate-600 mb-6">FDPs designed to upskill professors on the latest trends in AI, Machine Learning, and Cloud Computing.</p>
               <ul className="text-sm text-slate-500 space-y-3 mb-8">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div> 5-Day Workshops</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div> Hands-on Labs</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div> Certification</li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Tech Courses</h3>
              <p className="text-slate-600 mb-6">Specialized tracks for Generative AI, Deep Learning, and NLP. Future-proof your career.</p>
               <ul className="text-sm text-slate-500 space-y-3 mb-8">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div> Advanced Curriculum</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div> Industry Mentors</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div> Research Focus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Development */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Skill Development & Certifications</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              We don't just teach code; we teach engineering. Our skill development programs focus on soft skills, system design thinking, and agile methodologies to ensure students are ready for the corporate environment from Day 1.
            </p>
            <Link to="/contact" className="text-brand-600 font-bold hover:text-brand-700 inline-flex items-center text-lg">Download Brochure <ArrowRight className="ml-2" size={20} /></Link>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-brand-500 rounded-3xl rotate-3 opacity-10 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
              alt="Students learning" 
              className="relative rounded-3xl shadow-2xl w-full border border-gray-100"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academy;
