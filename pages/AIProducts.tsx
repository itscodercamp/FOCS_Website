
import React from 'react';
import { Layers, Activity, Lock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const products = [
  {
    name: "DocuSense AI",
    desc: "Intelligent document processing engine for finance and legal sectors. Extracts entities, summarizes clauses, and flags risks automatically.",
    industry: "Legal & Fintech",
    status: "Live",
    icon: Layers
  },
  {
    name: "RetailMind",
    desc: "Predictive inventory management and demand forecasting tool powered by machine learning algorithms.",
    industry: "Retail & E-commerce",
    status: "Beta",
    icon: Activity
  },
  {
    name: "SecureGuard",
    desc: "AI-driven anomaly detection system for cybersecurity logs to identify threats in real-time.",
    industry: "Cybersecurity",
    status: "In Development",
    icon: Lock
  }
];

const AIProducts: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="AI Products"
        description="Discover proprietary AI products by FOCS: DocuSense (Document AI), RetailMind (Inventory ML), and SecureGuard (Cybersecurity AI)."
        keywords="AI Products, Document Processing AI, Retail Machine Learning, Cybersecurity AI, SaaS Products"
      />

      <div className="bg-dark-950 text-white py-28 md:py-32 pb-32 md:pb-48">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">AI Products</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">Our suite of proprietary AI tools built for industry challenges.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-24 -mt-20 md:-mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-white hover:border-brand-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <product.icon size={200} className="text-brand-900" />
              </div>
              
              <div className="mb-8 inline-block px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                {product.status}
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h3>
              <p className="text-brand-600 text-sm font-bold mb-6 uppercase tracking-wide">{product.industry}</p>
              <p className="text-slate-600 mb-10 leading-relaxed min-h-[5rem]">{product.desc}</p>
              
              <button className="flex items-center text-slate-900 font-bold hover:text-brand-600 transition-colors group-hover:translate-x-2 transform duration-300">
                Request Demo <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIProducts;
