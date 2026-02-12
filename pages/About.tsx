
import React from 'react';
import { Target, Eye, Flag, CheckCircle, Users, Zap, Globe, Cpu, ArrowRight, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="About Us - FOCS"
        description="FOCS (Future of Computer Science) is an innovation lab and software company in Nagpur, India, bridging the gap between academic CS and industrial engineering since 2021."
        keywords="About FOCS, Software Company Nagpur, Tech Team, Vision Mission, AI Engineers, FOCS History"
      />

      {/* Hero Section */}
      <section className="relative bg-dark-950 text-white pt-28 md:pt-32 pb-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-900/20 rounded-full blur-[80px] md:blur-[120px] translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-900/10 rounded-full blur-[60px] md:blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span className="text-brand-100 text-xs font-bold uppercase tracking-widest">Since 2021</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            We Are Architects of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-400 to-brand-400 animate-gradient-x">Digital Intelligence</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            FOCS is more than a software company. We are an innovation lab, an educational institute, and a strategic partner for enterprises ready to embrace the future.
          </p>
        </div>
      </section>

      {/* The Story / Introduction */}
      <section className="py-16 md:py-24 bg-white relative -mt-20 z-20 rounded-t-[3rem]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-100 to-sky-100 rounded-[2.5rem] rotate-2 opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="FOCS Team Collaboration" 
                className="relative z-10 rounded-3xl shadow-2xl w-full object-cover h-64 md:h-[500px]"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden md:block border border-slate-100">
                <p className="text-brand-600 font-bold text-lg mb-1">Our Philosophy</p>
                <p className="text-slate-600 text-sm">"Code is not just syntax; it's the language of problem-solving."</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Journey</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  FOCS (Future of Computer Science) was founded in 2021 with a rebellious idea: that the gap between academic computer science and industrial software engineering was too wide, and someone needed to build a bridge.
                </p>
                <p>
                  What began as a small collective of passionate engineers in Nagpur has evolved into a full-scale technology consultancy. We realized that to build the best software, we needed the best talent. Instead of just hunting for it, we decided to create it.
                </p>
                <p>
                  Today, FOCS operates on a unique hybrid model. Our <strong>Enterprise Division</strong> delivers high-stakes AI and software solutions for clients in logistics, manufacturing, and retail. Simultaneously, our <strong>Academy Division</strong> (Its Coder Camp) acts as a talent foundry, training the next generation of engineers who often join our own ranks.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-10 border-t border-slate-100 pt-8 text-center md:text-left">
                <div>
                  <p className="text-2xl md:text-3xl font-black text-brand-600">49+</p>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold uppercase mt-1">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black text-brand-600">500+</p>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold uppercase mt-1">Talents Trained</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black text-brand-600">3+</p>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold uppercase mt-1">Global Markets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values - Redesigned */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Driven by Purpose</h2>
            <p className="text-slate-500 text-lg">Our core beliefs shape every line of code we write and every student we teach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the global nexus where cutting-edge AI technology meets human ingenuity, creating a future where software empowers every aspect of life and business.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To democratize access to enterprise-grade AI solutions for businesses of all sizes, while nurturing a diverse, highly-skilled workforce capable of solving tomorrow's problems today.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Flag size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Core Values</h3>
              <ul className="space-y-4">
                {[
                  "Innovation over Imitation",
                  "Transparency in Process",
                  "Obsession with Quality",
                  "Lifelong Learning"
                ].map((val, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The FOCS Difference */}
      <section className="py-16 md:py-24 bg-dark-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">The FOCS Difference</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                In a crowded market of software vendors, we stand out because we are engineers at heart. We don't just use tools; we build them. We don't just follow trends; we teach them.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0 border border-brand-500/30">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-First DNA</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      We don't bolt AI onto existing systems as an afterthought. We design architectures where AI is the central nervous system, driving automation and insights from day one.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 border border-sky-500/30">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">The Talent Advantage</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Through "Its Coder Camp", we have continuous access to the brightest young minds. This allows us to scale teams rapidly with developers who are trained in our specific methodologies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Global Standards, Local Roots</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Based in Nagpur, the heart of India, we bring world-class engineering standards to a cost-effective model, serving clients from the US to the UAE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4 translate-y-8">
                   <div className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700">
                     <Code className="text-brand-400 mb-4" size={32} />
                     <div className="h-2 w-16 bg-slate-600 rounded-full mb-2"></div>
                     <div className="h-2 w-24 bg-slate-700 rounded-full"></div>
                   </div>
                   <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 h-32 md:h-48 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                 </div>
                 <div className="space-y-4">
                   <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 h-32 md:h-48 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                   <div className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700">
                     <Zap className="text-yellow-400 mb-4" size={32} />
                     <div className="h-2 w-16 bg-slate-600 rounded-full mb-2"></div>
                     <div className="h-2 w-24 bg-slate-700 rounded-full"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Culture Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Life at FOCS</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We work hard, we learn fast, and we celebrate our wins together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Strategy Meeting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl">Collaborative Workspaces</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl hidden md:block">
              <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1000&auto=format&fit=crop" alt="Team Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative group overflow-hidden rounded-3xl hidden md:block">
               <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" alt="Work Culture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl">
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" alt="Learning" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl">Continuous Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="bg-brand-600 rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-900/20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to start your journey with us?</h2>
                <p className="text-brand-100 text-lg md:text-xl mb-12">Whether you're a business looking for transformation or a developer looking for growth.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/contact" className="bg-white text-brand-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg">
                    Work With Us
                  </Link>
                  <Link to="/careers" className="bg-brand-700 text-white border border-brand-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-800 transition-colors">
                    Join Our Team
                  </Link>
                </div>
              </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
