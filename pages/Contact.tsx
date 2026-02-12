
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { api } from '../services/api';

const Contact: React.FC = () => {
  const location = useLocation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'Business Inquiry',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto-selection of service based on URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceParam = queryParams.get('service');
    if (serviceParam) {
      setFormState(prev => ({ ...prev, type: serviceParam, message: `I am interested in ${serviceParam}. Please tell me more.` }));
    }
  }, [location]);

  const validateForm = () => {
    if (formState.name.length < 2) return "Name must be at least 2 characters.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) return "Please enter a valid email address.";
    if (formState.message.length < 10) return "Message must be at least 10 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setStatus('error');
      setErrorMessage(error);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await api.submitContact(formState);

      setStatus('success');
      setFormState({ name: '', email: '', type: 'Business Inquiry', message: '' });

      // Auto-dismiss success message
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.warn("Submission Error:", err.message);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to connect to the server. Please try again.');
    }
  };

  const inquiryOptions = [
    "Business Inquiry (General)",
    "Custom Software Development",
    "Web & Website Applications",
    "Custom Build Tools",
    "AI / ML Integration",
    "Gen AI Solutions",
    "Enterprise Solutions",
    "Academy/Training Inquiry",
    "AI Lab Partnership",
    "Careers",
    "Other"
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Contact FOCS"
        description="Get in touch with FOCS for software projects, AI consultation, or academy enrollment. Located in Nagpur, Maharashtra."
        keywords="Contact Software Company, Hire Developers Nagpur, FOCS Address, AI Consulting Contact"
      />

      <div className="bg-dark-950 text-white py-28 md:py-32 pb-32 md:pb-48">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Contact Us</h1>
          <p className="text-slate-400 text-lg md:text-xl">We'd love to hear from you. Let's start a conversation.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 -mt-24 md:-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Info Card */}
          <div className="bg-dark-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">Get in Touch</h2>
              <div className="space-y-8 md:space-y-10">
                <div className="flex items-start gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl text-brand-400 backdrop-blur-sm flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-slate-400 hover:text-white transition-colors break-all">admin@focsit.in</p>
                    <p className="text-slate-400 hover:text-white transition-colors break-all">academy@focsit.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl text-brand-400 backdrop-blur-sm flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-slate-400">+91 738 529 9597</p>
                    <p className="text-slate-400">Mon-Fri 9am to 6pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl text-brand-400 backdrop-blur-sm flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Office</h3>
                    <p className="text-slate-400">Nagpur</p>
                    <p className="text-slate-400">Maharashtra - 440034</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16 relative z-10">
              {/* Map Placeholder */}
              <div className="w-full h-40 md:h-48 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 text-sm border border-white/10">
                <span className="flex items-center gap-2"><MapPin size={16} /> Google Map Placeholder</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-xl border border-white">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Send a Message</h2>

            {/* Success Alert */}
            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3 animate-fade-in">
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-emerald-800">Message Sent Successfully!</h4>
                  <p className="text-emerald-700 text-sm">Thank you for contacting us. We will get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-fade-in">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-red-800">Submission Failed</h4>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Your Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Email Address</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@company.com"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Service / Subject</label>
                <div className="relative">
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all appearance-none"
                    disabled={status === 'submitting'}
                  >
                    {inquiryOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Message</label>
                <textarea
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                  disabled={status === 'submitting'}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20 hover:-translate-y-1"
              >
                {status === 'submitting' ? (
                  <>Sending <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
