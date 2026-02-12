
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Layout, Wrench, Brain, Database, Server, 
  Check, ArrowRight, X, ChevronRight, Star, 
  Zap, Clock, Shield, Cpu, Layers, GitBranch, Rocket 
} from 'lucide-react';
import SEO from '../components/SEO';

interface ProcessStep {
  title: string;
  desc: string;
}

interface ServiceData {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  tagline: string;
  fullDescription: string;
  fastDelivery: {
    enabled: boolean;
    tag: string;
    desc: string;
  };
  processSteps: ProcessStep[];
  technologies: string[];
  deliverables: string[];
  benefits: string[];
}

const servicesList: ServiceData[] = [
  {
    id: "custom-software",
    icon: Code,
    title: "Custom Software Development",
    shortDesc: "End-to-end software development tailored to your unique business processes.",
    tagline: "Engineering Your Competitive Advantage",
    fullDescription: "We don't just write code; we architect digital ecosystems. Whether you need a complex internal ERP, a SaaS platform, or a high-frequency trading system, our team manages the entire lifecycle. We focus on 'Clean Architecture' principles to ensure your software is scalable, maintainable, and testable from Day 1.",
    fastDelivery: {
      enabled: true,
      tag: "MVP in 7-14 Days",
      desc: "For startups and urgent internal tools, we utilize our proprietary 'FOCS-Core' boilerplate to launch a functional Minimum Viable Product (MVP) with authentication, database, and basic UI in under two weeks."
    },
    processSteps: [
      { title: "Discovery & Blueprinting", desc: "We map your business logic to technical requirements, creating a comprehensive SRS document." },
      { title: "Architecture Design", desc: "Selecting the right stack (Monolith vs Microservices) based on load and scalability needs." },
      { title: "Agile Sprints", desc: "2-week development cycles with continuous delivery and feedback loops." },
      { title: "Automated QA", desc: "Rigorous unit, integration, and end-to-end testing pipelines." },
      { title: "Deployment & Scale", desc: "CI/CD setup on AWS/Azure with auto-scaling configurations." }
    ],
    technologies: ["Python", "Node.js", "GoLang", "PostgreSQL", "Docker", "Kubernetes", "AWS Lambda"],
    deliverables: [
      "Requirement Analysis & Feasibility Report",
      "High-Fidelity UI/UX Designs",
      "Full Source Code Ownership",
      "QA & Automated Testing Suites",
      "Deployment & CI/CD Setup",
      "3 Months Hyper-Care Support"
    ],
    benefits: ["Scalable Architecture", "Bank-Grade Security", "Zero Vendor Lock-in"],
  },
  {
    id: "web-apps",
    icon: Layout,
    title: "Web & Website Applications",
    shortDesc: "Responsive, high-performance web applications built with modern frameworks.",
    tagline: "Pixel-Perfect. Lightning Fast. SEO Ready.",
    fullDescription: "In the digital age, speed is currency. We create lightning-fast, SEO-optimized web experiences using Next.js and React. From corporate websites to complex progressive web apps (PWAs) that work offline, we ensure your digital presence is mobile-first, accessible (WCAG 2.1), and engineered to convert visitors into customers.",
    fastDelivery: {
      enabled: true,
      tag: "Live in 7 Days",
      desc: "Need a high-converting corporate site or landing page? Our 'Rapid-Web' protocol allows us to design, develop, and deploy a fully responsive, CMS-backed website in just one week."
    },
    processSteps: [
      { title: "UX/UI Prototyping", desc: "Wireframing user journeys and high-fidelity clickable prototypes in Figma." },
      { title: "Frontend Engineering", desc: "Component-based development using React/Next.js for reusability." },
      { title: "CMS Integration", desc: "Connecting Headless CMS (Sanity/Strapi) for easy content management." },
      { title: "Performance Tuning", desc: "Achieving 90+ Google Lighthouse scores via image optimization and caching." },
      { title: "SEO Injection", desc: "Schema markup, meta-tag automation, and sitemap generation." }
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sanity.io", "Vercel", "Redis"],
    deliverables: [
      "Responsive React/Next.js Frontend",
      "Headless CMS Integration",
      "SEO & Performance Optimization",
      "Interactive Admin Dashboards",
      "Google Analytics 4 Setup",
      "GDPR Compliance Modules"
    ],
    benefits: ["99.9% Uptime", "Mobile First Design", "PWA Offline Capabilities"],
  },
  {
    id: "custom-tools",
    icon: Wrench,
    title: "Custom Build Tools",
    shortDesc: "Internal tools and automation scripts to streamline your operations.",
    tagline: "Automate the Boring Stuff.",
    fullDescription: "Your team shouldn't be doing data entry in 2024. We engineer custom CLI tools, browser extensions, and internal dashboards that automate data scraping, report generation, and system maintenance. We bridge the gap between your disconnected software (e.g., connecting your CRM to your Accounting software).",
    fastDelivery: {
      enabled: true,
      tag: "Script to Prod: 48 Hours",
      desc: "For specific automation tasks (e.g., Excel to Database migration scripts), we can deliver tested executables in as little as 2 days."
    },
    processSteps: [
      { title: "Workflow Audit", desc: "We sit with your team to identify bottlenecks and repetitive manual tasks." },
      { title: "Scripting Strategy", desc: "Deciding between a simple Python script, a CLI tool, or a full dashboard." },
      { title: "Development", desc: "Rapid coding of the automation logic with error handling." },
      { title: "Integration", desc: "Hooking into APIs (Slack, Gmail, Trello, Salesforce)." },
      { title: "Handover", desc: "Providing documentation and .exe files for non-technical staff." }
    ],
    technologies: ["Python", "Selenium", "Puppeteer", "Electron", "Bash/Shell", "Pandas", "Cron Jobs"],
    deliverables: [
      "Custom CLI Tools / Executables",
      "Process Automation Scripts",
      "Data Migration Utilities",
      "Internal Operations Dashboards",
      "API Connectors & Webhooks",
      "User Manuals"
    ],
    benefits: ["Reduce Man-hours by 80%", "Eliminate Human Error", "Seamless Workflow Integration"],
  },
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI / ML Integration",
    shortDesc: "Embedding intelligence into your existing systems for predictive analytics.",
    tagline: "Data is the New Oil. We Build the Refinery.",
    fullDescription: "Move beyond basic reporting. We train and deploy machine learning models that integrate directly into your existing software stack. Capabilities include Recommendation Engines (like Netflix), Computer Vision (for quality control), and Predictive Forecasting (for inventory/sales). We handle the full MLOps pipeline.",
    fastDelivery: {
      enabled: false,
      tag: "Standard Timeline",
      desc: "Due to the complexity of model training and data cleaning, ML projects typically require 4-8 weeks for high accuracy results."
    },
    processSteps: [
      { title: "Data Assessment", desc: "Evaluating the quality, volume, and cleanliness of your historical data." },
      { title: "Preprocessing", desc: "ETL pipelines to clean, normalize, and label data." },
      { title: "Model Selection", desc: "Choosing algorithms (Regression, CNN, XGBoost) fit for the problem." },
      { title: "Training & Tuning", desc: "Iterative training on GPUs to maximize accuracy/F1-scores." },
      { title: "Deployment (MLOps)", desc: "Exposing the model via REST API for real-time inference." }
    ],
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "FastAPI", "MLflow", "AWS SageMaker"],
    deliverables: [
      "Data Cleaning & Preprocessing Pipelines",
      "Custom Trained Models (.h5/.pkl)",
      "API Wrapper for Model Inference",
      "Integration with Existing Apps",
      "Performance Metrics Dashboard",
      "Model Retraining Pipeline"
    ],
    benefits: ["Data-driven Insights", "Automated Decision Making", "Pattern Recognition"],
  },
  {
    id: "gen-ai",
    icon: Database,
    title: "Gen AI Solutions",
    shortDesc: "Advanced Generative AI implementations for chatbots and semantic search.",
    tagline: "Talk to Your Data.",
    fullDescription: "Transform your business with Large Language Models. We implement RAG (Retrieval Augmented Generation) pipelines that allow you to 'chat' with your company's PDFs, databases, and emails securely. We also fine-tune open-source models (Llama 3, Mistral) for specific domain expertise, ensuring data privacy.",
    fastDelivery: {
      enabled: true,
      tag: "Chatbot in 5 Days",
      desc: "We can deploy a custom RAG-based chatbot trained on your company documentation (up to 500 pages) within a single business week."
    },
    processSteps: [
      { title: "Knowledge Ingestion", desc: "Parsing PDFs, Docs, and SQL databases into text chunks." },
      { title: "Vector Embeddings", desc: "Storing data in Vector Databases (Pinecone/Milvus) for semantic search." },
      { title: "Prompt Engineering", desc: "Designing system prompts to control tone, accuracy, and hallucinations." },
      { title: "UI Integration", desc: "Building the chat interface or integrating with Slack/Teams." },
      { title: "Guardrails", desc: "Implementing filters to prevent unsafe or irrelevant responses." }
    ],
    technologies: ["OpenAI API", "LangChain", "LlamaIndex", "Pinecone", "HuggingFace", "Streamlit", "Python"],
    deliverables: [
      "RAG Pipeline Setup",
      "Vector Database Integration",
      "Prompt Engineering Library",
      "Context-Aware Chat Interfaces",
      "Fine-tuned LLM Models",
      "Safety & Hallucination Guardrails"
    ],
    benefits: ["Instant Information Retrieval", "24/7 Customer Support", "Automated Content Gen"],
  },
  {
    id: "enterprise",
    icon: Server,
    title: "Enterprise Solutions",
    shortDesc: "Large-scale ERP, CRM, and SCM systems designed for reliability.",
    tagline: "Mission-Critical Software at Scale.",
    fullDescription: "For large organizations, downtime is not an option. We design distributed microservices architectures that can handle high concurrency and complex business logic. From supply chain management to multi-tenant SaaS platforms, we build systems that grow with you.",
    fastDelivery: {
      enabled: false,
      tag: "Phased Rollout",
      desc: "Enterprise systems are rolled out in phases. We typically deliver the Core Module in 4-6 weeks, with subsequent modules following bi-weekly."
    },
    processSteps: [
      { title: "Domain Driven Design", desc: "Modeling software to match the complexity of your real-world business domains." },
      { title: "Database Normalization", desc: "Designing efficient schemas for millions of records." },
      { title: "Security Audit", desc: "Implementing OAuth2, RBAC, and encryption at rest/transit." },
      { title: "Load Testing", desc: "Simulating thousands of concurrent users to ensure stability." },
      { title: "Legacy Migration", desc: "Safely moving data from old systems to the new architecture." }
    ],
    technologies: ["Java Spring Boot", ".NET Core", "Kubernetes", "Kafka", "Redis", "Elasticsearch", "Azure"],
    deliverables: [
      "Microservices Architecture Design",
      "Database Schema Optimization",
      "Load Balancing & Auto-scaling",
      "Legacy System Migration Plan",
      "Role-Based Access Control (RBAC)",
      "Comprehensive Audit Logging"
    ],
    benefits: ["High Availability (99.99%)", "Legacy Modernization", "Global Scalability"],
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const navigate = useNavigate();

  const handleConsult = (serviceTitle: string) => {
    navigate(`/contact?service=${encodeURIComponent(serviceTitle)}`);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedService]);

  return (
    <div className="bg-slate-50 min-h-screen">
       <SEO 
         title="Software Development Services"
         description="Explore our range of services including Custom Software, Web App Development, AI/ML Integration, and Enterprise ERP Solutions."
         keywords="Web Development, Software Services, AI Integration, Enterprise ERP, Mobile Apps, GenAI Services"
       />

       {/* Page Header */}
       <div className="bg-dark-950 text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-900/30 rounded-full blur-[80px] md:blur-[120px] -mr-20 -mt-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <span className="text-brand-400 font-bold tracking-widest uppercase text-xs mb-4 block">What We Do</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Our Services</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">Delivering engineering excellence through cutting-edge technology.</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 -mt-16 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 border border-white flex flex-col group hover:-translate-y-2 relative overflow-hidden">
              {service.fastDelivery.enabled && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Fast Track Available
                </div>
              )}
              
              <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-8 flex-grow leading-relaxed line-clamp-3">{service.shortDesc}</p>
              
              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Key Benefits</h4>
                <ul className="space-y-3">
                  {service.benefits.slice(0,3).map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 min-w-[20px] flex items-center justify-center"><Check size={12} /></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setSelectedService(service)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all duration-300"
              >
                View Full Details <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Service Detail Overlay */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in no-scrollbar">
          {/* Top Bar Navigation */}
          <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 px-4 py-4 flex justify-between items-center shadow-sm">
             <div className="flex items-center gap-3">
                <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                   <selectedService.icon size={20} />
                </div>
                <span className="font-bold text-slate-900 hidden md:block">{selectedService.title}</span>
             </div>
             <button 
               onClick={() => setSelectedService(null)}
               className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
             >
               Close <X size={18} />
             </button>
          </div>

          {/* Detailed Content Container */}
          <div className="pt-20 pb-20">
            
            {/* 1. Hero Section */}
            <div className="bg-dark-950 text-white py-20 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-brand-900/40 to-transparent"></div>
               
               <div className="container mx-auto px-4 md:px-6 relative z-10">
                 <div className="max-w-4xl">
                   <div className="inline-flex items-center gap-2 border border-brand-500/50 bg-brand-500/10 px-4 py-1.5 rounded-full text-brand-300 text-sm font-bold uppercase tracking-widest mb-6">
                      <Star size={14} className="fill-brand-300" /> Premium Service
                   </div>
                   <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">{selectedService.tagline}</h1>
                   <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
                     {selectedService.fullDescription}
                   </p>
                 </div>
               </div>
            </div>

            {/* 2. Rapid Delivery Section (If Enabled) */}
            {selectedService.fastDelivery.enabled && (
               <div className="bg-emerald-50 border-y border-emerald-100 py-12">
                  <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                        <Rocket size={32} />
                     </div>
                     <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
                           Need it fast? <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm uppercase tracking-wide">{selectedService.fastDelivery.tag}</span>
                        </h3>
                        <p className="text-emerald-800/80 text-lg leading-relaxed">
                           {selectedService.fastDelivery.desc}
                        </p>
                     </div>
                     <button onClick={() => handleConsult(`${selectedService.title} (Fast Track)`)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 whitespace-nowrap">
                        Start Rapid Sprint
                     </button>
                  </div>
               </div>
            )}

            {/* 3. The Engineering Process */}
            <div className="py-20 bg-white">
               <div className="container mx-auto px-4 md:px-6">
                  <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
                     <Layers className="text-brand-600" /> How We Build It
                  </h2>
                  <div className="relative">
                     {/* Line connecting steps */}
                     <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
                     
                     <div className="space-y-12">
                        {selectedService.processSteps.map((step, idx) => (
                           <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
                              <div className="hidden md:flex flex-col items-center">
                                 <div className="w-16 h-16 rounded-full bg-white border-4 border-brand-50 text-brand-600 font-black text-xl flex items-center justify-center z-10 shadow-sm">
                                    {idx + 1}
                                 </div>
                              </div>
                              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex-grow hover:shadow-lg transition-shadow">
                                 <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 md:block">
                                    <span className="md:hidden bg-brand-100 text-brand-600 w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-2">{idx + 1}</span>
                                    {step.title}
                                 </h3>
                                 <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* 4. Tech Stack & Deliverables Grid */}
            <div className="py-20 bg-slate-50 border-y border-slate-200">
               <div className="container mx-auto px-4 md:px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     
                     {/* Tech Stack */}
                     <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                           <Cpu className="text-brand-600" /> Technologies Used
                        </h2>
                        <div className="flex flex-wrap gap-3">
                           {selectedService.technologies.map((tech, i) => (
                              <span key={i} className="bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-semibold shadow-sm hover:border-brand-500 hover:text-brand-600 transition-colors cursor-default">
                                 {tech}
                              </span>
                           ))}
                        </div>
                     </div>

                     {/* Deliverables */}
                     <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                           <GitBranch className="text-brand-600" /> What You Get
                        </h2>
                        <ul className="grid grid-cols-1 gap-4">
                           {selectedService.deliverables.map((item, i) => (
                              <li key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200">
                                 <Check className="text-brand-500 mt-1 flex-shrink-0" size={18} />
                                 <span className="font-medium text-slate-700">{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {/* 5. Bottom CTA */}
            <div className="container mx-auto px-4 md:px-6 mt-20">
               <div className="bg-dark-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                  
                  <div className="relative z-10 max-w-2xl mx-auto">
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to scale?</h2>
                     <p className="text-slate-400 text-lg mb-10">
                        Let's turn your requirements into deployed software. Book a free consultation with our Lead Architect today.
                     </p>
                     <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                           onClick={() => handleConsult(selectedService.title)}
                           className="bg-brand-600 hover:bg-brand-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-600/30 transition-transform hover:-translate-y-1"
                        >
                           Enquire About Project
                        </button>
                        <button 
                           onClick={() => setSelectedService(null)}
                           className="bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 px-10 py-4 rounded-xl font-bold text-lg transition-colors"
                        >
                           Back to Services
                        </button>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
