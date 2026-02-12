
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Gift, School, Rocket, CheckCircle, Users, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../services/api';

const AILabs: React.FC = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    if (formData.collegeName.length < 3) return "College Name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid official email.";
    if (formData.phone.length < 10) return "Please enter a valid contact number.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus('error');
      setErrorMessage(error);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await api.submitPartnership(formData);

      setStatus('success');
      setFormData({ collegeName: '', email: '', phone: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.warn("Submission Error:", err.message);
      setStatus('error');
      setErrorMessage(err.message || "Network error. Please try again later or check your connection.");
    }
  };

  return (
    <div className="bg-white">
      <SEO
        title="AI Labs for Colleges"
        description="FOCS offers 100% FREE AI Lab setup for engineering colleges. Partner with us to provide state-of-the-art AI infrastructure and curriculum."
        keywords="AI Lab Setup, College Partnership, Free Educational Lab, Engineering College MOUs, Artificial Intelligence Infrastructure"
      />

      {/* Hero */}
      <section className="bg-dark-950 text-white pt-28 md:pt-32 pb-32 md:pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-600/20 rounded-full blur-[80px] md:blur-[150px] -mr-40 -mt-40"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <span className="bg-white/5 backdrop-blur-sm text-brand-200 px-4 md:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-8 inline-block border border-white/10">
            Exclusive Initiative for Colleges
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8">
            FOCS AI Labs
          </h1>
          <p className="text-2xl md:text-3xl text-sky-400 font-bold mb-8">
            100% FREE AI Lab Setup
          </p>
          <p className="text-slate-400 max-w-3xl mx-auto mb-12 text-lg md:text-xl font-light">
            Partner with FOCS & Its Coder Camp to establish a state-of-the-art AI learning environment on your campus at zero cost.
          </p>
          <Link to="/contact" className="bg-brand-600 hover:bg-brand-500 text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-1 block sm:inline-block w-full sm:w-auto">
            Apply for Partnership
          </Link>
        </div>
      </section>

      {/* The Offer */}
      <section className="py-16 md:py-20 -mt-20 md:-mt-32 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Gift size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">0 Cost Setup</h3>
              <p className="text-slate-600 leading-relaxed">We provide the platform, curriculum, and mentorship completely free of charge.</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Laptop size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Learning Platform</h3>
              <p className="text-slate-600 leading-relaxed">Access to our proprietary AI learning tools, coding environments, and datasets.</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Rocket size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Industry Ready</h3>
              <p className="text-slate-600 leading-relaxed">Students work on real-world AI use cases, making them job-ready before graduation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Breakdown */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Partner With Us?</h2>
            <p className="text-slate-500 text-lg">A mutual growth ecosystem designed for institutions and learners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* For Colleges */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-brand-100 p-3 rounded-xl text-brand-600">
                  <School size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Colleges</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Zero Financial Burden:</strong> Complete AI lab setup at no cost to the institution, removing budget constraints.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Accreditation Support:</strong> Curriculum aligned with NAAC/NBA standards to help boost institutional rankings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Faculty Upskilling:</strong> Regular workshops and FDPs for professors on emerging AI/ML trends.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Center of Excellence:</strong> Branding recognition as a premium AI-ready campus in your region.</span>
                </li>
              </ul>
            </div>

            {/* For Students */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-sky-100 p-3 rounded-xl text-sky-600">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Students</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Live Industry Projects:</strong> Move beyond theory by working on deployed AI use-cases from our enterprise clients.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Placement Advantage:</strong> Exclusive access to placement drives and a "Certified AI Developer" badge.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Internship Opportunities:</strong> Direct entry for top performers into FOCS paid internship programs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-700 leading-relaxed"><strong>Expert Mentorship:</strong> 1-on-1 guidance from senior software engineers and AI researchers.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">What is included?</h2>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              The FOCS AI Lab is a comprehensive infrastructure and knowledge partnership. By tying up with us, your campus receives:
            </p>
            <ul className="space-y-4">
              {[
                "Access to Cloud-based AI Notebooks",
                "Pre-configured ML Environments",
                "Guest Lectures from Industry Experts",
                "Hackathons & Coding Competitions",
                "Internship Opportunities for Top Performers"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="bg-brand-100 p-2 rounded-lg text-brand-600 flex-shrink-0"><School size={20} /></div>
                  <span className="font-semibold text-slate-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-dark-900 p-8 md:p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[80px] -mt-10 -mr-10 opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Become a Partner College</h3>
                <p className="text-slate-400 mb-8">Join the league of forward-thinking institutions preparing students for the AI era.</p>

                {/* Success Alert */}
                {status === 'success' && (
                  <div className="mb-6 p-4 bg-emerald-900/50 border border-emerald-500/50 rounded-xl flex items-start gap-3">
                    <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-emerald-100">Request Sent!</h4>
                      <p className="text-emerald-200/80 text-sm">We will contact your administration office soon.</p>
                    </div>
                  </div>
                )}

                {/* Error Alert */}
                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl flex items-start gap-3">
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-red-100">Submission Failed</h4>
                      <p className="text-red-200/80 text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="College Name"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
                    disabled={status === 'submitting'}
                  />
                  <input
                    type="email"
                    placeholder="Official Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
                    disabled={status === 'submitting'}
                  />
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
                    disabled={status === 'submitting'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-600/20 mt-2 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Request Callback'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AILabs;
