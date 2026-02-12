
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, MessageSquare, Zap, Cpu, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const GenAISolutions: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Generative AI Solutions"
        description="Transform your business with GenAI. We build RAG Chatbots, automate content, and integrate LLMs (OpenAI, Gemini) into your enterprise workflows."
        keywords="Generative AI Services, RAG Chatbots, LLM Integration, OpenAI API Developers, Gemini AI Solutions, Business Automation"
      />

      {/* GenAI Hero */}
      <section className="bg-dark-950 text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-brand-500/10 border border-brand-500/30 rounded-full text-brand-300 text-sm font-semibold mb-8 backdrop-blur-md">
              <span className="flex items-center gap-2"><Sparkles size={14} /> Next-Gen Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tight">
              Generative <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">AI Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Unlock the power of Large Language Models (LLMs) to automate content, enhance customer experience, and drive innovation in your enterprise.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact" className="bg-white text-dark-950 px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20">
                Consult an Expert <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12 md:mb-20">Core GenAI Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
              <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-500">
                <Bot size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise Integrations</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Seamlessly integrate ChatGPT, Claude, or Gemini APIs into your existing enterprise workflows securely and reliably.
                </p>
              </div>
            </div>

             <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
              <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-500">
                <Sparkles size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Automation</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Automate complex document processing, data extraction, and report generation using advanced cognitive AI models.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                <MessageSquare size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Custom LLM Chatbots</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Build context-aware RAG (Retrieval Augmented Generation) chatbots trained on your specific proprietary data.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
              <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                <Cpu size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Powered Tools</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Develop custom internal tools for code generation, marketing copy creation, and image synthesis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases CTA */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Have a specific AI idea?</h2>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
              From medical diagnosis support to automated legal contract review, we turn theoretical AI concepts into deployed production software.
            </p>
            <Link to="/contact" className="inline-block bg-dark-950 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-600 transition-colors shadow-lg hover:shadow-brand-600/30 w-full md:w-auto">
              Discuss Your Use Case
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenAISolutions;
