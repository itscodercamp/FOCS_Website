
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cpu, Brain, Users, Award, Briefcase, Zap, Sparkles, Search, Rocket, Star, Quote } from 'lucide-react';
import HeroGlobe from '../components/HeroGlobe';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';

const techStack = [
  "Python", "TensorFlow", "React", "Node.js", "AWS", "Docker", "Kubernetes", "PyTorch",
  "Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "MongoDB", "Java", "Flutter",
  "Django", "Google Gemini AI", "Mistral AI", "Flask", "FastAPI", "SQLite3", "REST API",
  "Automation", "React Native", "Linux"
];

const trustedLeaders = [
  "Trusted Vehicles",
  "Tej Industries",
  "Impressive Events",
  "Lucky Lubricants",
  "Rahul LED",
  "Somi Collections",
  "ILMI - Islamic Learning Research Platform",
  "NexusCloud",
  "Vidhyapeet3D"
];

const testimonials = [
  {
    text: "FOCS developed our fully automated auction marketplace for used cars. The system handles complex real-time bidding flawlessly.",
    name: "Tanveer Khan",
    role: "Founder",
    company: "Trusted Vehicles"
  },
  {
    text: "Managing a state-level oil supply chain is complex. FOCS streamlined our logistics and inventory with precision.",
    name: "Sohel Khan",
    role: "CEO",
    company: "Lucky Lubricants"
  },
  {
    text: "As a leader in LED walls and screening, we needed software that matches our scale. FOCS delivered exceptional quality.",
    name: "Rahul Pawar",
    role: "Owner",
    company: "Rahul LED"
  },
  {
    text: "They transformed our event management workflows. The automation solutions provided by FOCS helped us scale Impressive Events.",
    name: "Bobby Hanwat",
    role: "Owner",
    company: "Impressive Events"
  },
  {
    text: "Our lubricant manufacturing operations required a custom solution. FOCS understood our industry needs perfectly.",
    name: "Tejaswini Urkude",
    role: "Co-founder",
    company: "Tej Industries"
  }
];

const Home: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FOCS - Future of Computer Science",
    "url": "https://focsit.in",
    "logo": "https://focsit.in/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-738-529-9597",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://facebook.com/focs",
      "https://twitter.com/focs",
      "https://linkedin.com/company/focs"
    ]
  };

  return (
    <div className="flex flex-col bg-slate-50">
      <SEO
        title="Enterprise Software Development & AI Solutions"
        description="FOCS is a leading software development company in Nagpur providing Custom Software, AI/ML Solutions, GenAI Integration, and Corporate Training."
        keywords="Software Company Nagpur, AI Solutions India, Custom Software Development, GenAI, MERN Stack, Flutter Development, Corporate Training Nagpur, Its Coder Camp"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Modern Dark Hero Section */}
      <section className="relative bg-dark-950 text-white min-h-[90vh] flex items-center overflow-hidden pt-28 md:pt-32 pb-12">
        {/* Abstract Background Effects - Deepened for better contrast */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-900/20 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-900/10 rounded-full blur-[60px] md:blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8 animate-fade-in-up max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Badge matching screenshot */}
            <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-slate-700/50 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
              <span className="text-slate-300 text-[9px] font-bold uppercase tracking-widest">Innovating Since 2021</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] md:leading-[1] tracking-tight">
              Future of <br />
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400 pb-2">Computer Science</span>
            </h1>

            <p className="text-sm md:text-lg text-slate-400 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
              We engineer enterprise-grade AI solutions and nurture the next generation of tech talent through immersive training.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <Link to="/contact" className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white px-6 py-3 rounded-full font-bold text-base transition-all shadow-lg shadow-brand-900/50 hover:-translate-y-1 flex items-center justify-center gap-2">
                Start a Project <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="bg-transparent hover:bg-white/5 border border-slate-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all hover:-translate-y-1 text-center">
                Explore Services
              </Link>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 border-t border-white/5 mt-2 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-dark-950 bg-slate-800 bg-cover shadow-lg relative z-0 hover:z-10 transition-all" style={{ backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 10})` }} role="img" aria-label="Successful Graduate Avatar"></div>
                ))}
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-dark-950 bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg relative z-10">+500</div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-bold text-lg">500+ Graduates</p>
                <p className="text-slate-500 text-sm">Placed in top tech companies</p>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Globe */}
          <div className="relative hidden lg:block h-full min-h-[500px] w-full flex items-center justify-center perspective-1000">
            {/* Decorative Elements around Globe */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-sky-500/10 rounded-full blur-[100px] opacity-40"></div>

            <div className="relative w-full">
              <HeroGlobe />

              {/* Floating Card Detail similar to screenshot but adapted for 3D */}
              <div className="absolute bottom-10 left-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 animate-float shadow-2xl max-w-xs">
                <div className="bg-brand-500/20 p-3 rounded-xl text-brand-400">
                  <Brain size={24} />
                </div>
                <div>
                  <p className="text-white font-bold">AI Powered Core</p>
                  <div className="w-32 h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-sky-400 w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Tech Stack Marquee */}
      <section className="bg-slate-900 py-10 border-t border-slate-800 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-slate-900 via-transparent to-slate-900"></div>
        <div className="flex w-[200%] animate-scroll">
          <div className="flex gap-10 md:gap-16 items-center px-8 whitespace-nowrap">
            {techStack.map((tech, i) => (
              <span key={i} className="text-lg md:text-2xl font-bold text-slate-500 hover:text-brand-400 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-10 md:gap-16 items-center px-8 whitespace-nowrap">
            {techStack.map((tech, i) => (
              <span key={`dup-${i}`} className="text-lg md:text-2xl font-bold text-slate-500 hover:text-brand-400 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-20 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em] mb-4">Who We Are</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Bridging <span className="text-gradient">Innovation</span> & <span className="text-gradient">Education</span></h3>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
            FOCS is a unique ecosystem where cutting-edge enterprise software development meets advanced technical training. Since 2021, we have been delivering high-performance AI solutions to businesses while simultaneously grooming industry-ready developers through "Its Coder Camp".
          </p>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Expertise</h2>
              <p className="text-slate-500 mt-3 text-lg font-light">Comprehensive solutions for the modern enterprise</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center text-brand-600 font-bold hover:text-brand-700 transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
              View All Services <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Code, title: "Custom Software", desc: "Tailor-made software solutions designed to meet your specific business requirements." },
              { icon: Brain, title: "AI & ML Solutions", desc: "Intelligent algorithms that automate processes and provide predictive insights." },
              { icon: Zap, title: "GenAI Integration", desc: "Leveraging Large Language Models to transform how your business operates." },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center text-slate-900 font-bold group-hover:translate-x-2 transition-transform">
                  Learn more <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
            <Link to="/services" className="inline-flex items-center text-brand-600 font-bold bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
              View All Services <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process / How We Work */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How We Work</h2>
            <p className="text-slate-500 text-lg">From concept to deployment, our process is transparent and agile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

            {[
              { icon: Search, title: "Discovery", desc: "We analyze your requirements and build a strategic roadmap." },
              { icon: Code, title: "Engineering", desc: "Agile development with bi-weekly sprints and continuous feedback." },
              { icon: Rocket, title: "Evolution", desc: "Deployment, monitoring, and continuous improvements based on data." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-xl relative z-10">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center text-white">
                    <step.icon size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-dark-950 text-white border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
          {[
            { value: "2021", label: "Founded" },
            { value: "500+", label: "Students Trained" },
            { value: "49+", label: "Enterprise Projects" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
              <p className="text-3xl md:text-6xl font-black text-white mb-2 tracking-tight">{stat.value}</p>
              <p className="text-brand-300 text-xs md:text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients / Trusted By (Marquee) */}
      <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Trusted By Industry Leaders</p>
        </div>

        {/* Infinite Scroll for Trusted Leaders */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          <div className="flex w-[200%] animate-scroll">
            <div className="flex gap-12 md:gap-20 items-center px-6 md:px-10 whitespace-nowrap">
              {trustedLeaders.map((client, i) => (
                <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  <Award className="text-brand-600" size={24} />
                  <span className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tighter">{client}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-12 md:gap-20 items-center px-6 md:px-10 whitespace-nowrap">
              {trustedLeaders.map((client, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  <Award className="text-brand-600" size={24} />
                  <span className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tighter">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Client Stories</h2>
            <p className="text-slate-500 text-lg">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] relative border border-slate-100 hover:shadow-lg transition-shadow">
                <Quote className="text-brand-200 absolute top-8 right-8" size={48} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed min-h-[5rem]">"{item.text}"</p>
                <div>
                  <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                  <p className="text-sm text-brand-600 font-semibold">{item.role}</p>
                  <p className="text-sm text-slate-500">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-brand-900 to-dark-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-500/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-600/20 rounded-full blur-[100px] -ml-32 -mb-32"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-20 gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to <span className="text-brand-400">Transform</span> Your Business?</h2>
                <p className="text-slate-300 text-lg md:text-xl font-light">Whether you need a custom AI solution or want to train your workforce, FOCS is your partner for the future.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full sm:w-auto">
                <Link to="/contact" className="bg-brand-600 hover:bg-brand-500 text-white px-10 py-5 rounded-full font-bold shadow-lg shadow-brand-600/30 text-center transition-all hover:-translate-y-1">
                  Contact Us
                </Link>
                <Link to="/academy" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-center transition-all hover:-translate-y-1">
                  Visit Academy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
