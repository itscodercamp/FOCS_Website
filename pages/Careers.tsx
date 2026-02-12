
import React, { useState } from 'react';
import { Heart, Briefcase, Smile, Coffee, MapPin, Clock, X, Upload, CheckCircle, AlertCircle, Loader2, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../services/api';

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
}

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [application, setApplication] = useState({
    name: '',
    email: '',
    resumeLink: '',
    coverLetter: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    const fetchJobs = async () => {
      const data = await api.getJobs();
      if (data && Array.isArray(data)) {
        setJobs(data);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const validate = () => {
    if (application.name.length < 2) return "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) return "Invalid email address.";
    if (application.resumeLink.length < 5) return "Please provide a link to your Resume/Portfolio.";
    return null;
  };

  const handleApply = async (e: React.FormEvent) => {
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
      await api.submitApplication({
        ...application,
        jobRole: selectedJob?.title || 'Unspecified'
      });

      setStatus('success');
      // Reset after success
      setTimeout(() => {
        setStatus('idle');
        setApplication({ name: '', email: '', resumeLink: '', coverLetter: '' });
        setSelectedJob(null); // Close modal
      }, 3000);
    } catch (err: any) {
      console.warn("Submission Error:", err.message);
      setStatus('error');
      setErrorMessage(err.message || "Application failed. Please check your connection and try again.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Careers at FOCS"
        description="Join the team building the future of AI. We are hiring Full Stack Developers, AI Engineers, and Interns in Nagpur."
        keywords="Software Jobs Nagpur, Developer Internships, AI Jobs India, Full Stack Developer Vacancy, FOCS Careers"
      />

      <div className="bg-dark-950 text-white py-28 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">Build the future with us. Explore exciting opportunities at FOCS.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 -mt-16 md:-mt-20">
        <div className="mb-16 md:mb-24">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10 md:mb-16">Why Work at FOCS?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="p-4 md:p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Heart size={28} className="md:w-8 md:h-8" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-slate-900">Great Culture</h3>
              </div>
              <div className="p-4 md:p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Briefcase size={28} className="md:w-8 md:h-8" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-slate-900">Growth</h3>
              </div>
              <div className="p-4 md:p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Coffee size={28} className="md:w-8 md:h-8" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-slate-900">Work-Life Balance</h3>
              </div>
              <div className="p-4 md:p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Smile size={28} className="md:w-8 md:h-8" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-slate-900">Fun Environment</h3>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-10">Open Positions</h2>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-600" size={48} />
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-4 md:space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-all hover:border-brand-200 gap-4 group">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-600 transition-colors text-center shadow-lg shadow-slate-900/10"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-100">
            <p className="text-slate-500 text-lg">No open positions at the moment. Check back later!</p>
          </div>
        )}
      </div>

      {/* Job Details & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedJob(null)}></div>

          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-[2rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 z-20 bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Panel: Job Details */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-slate-50">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{selectedJob.title}</h2>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">{selectedJob.type}</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">{selectedJob.location}</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">Level: Intermediate</span>
              </div>

              <div className="prose prose-slate">
                <h3 className="font-bold text-slate-900 mb-2">About the Role</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{selectedJob.description}</p>

                <h3 className="font-bold text-slate-900 mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Panel: Application Form */}
            <div className="w-full md:w-2/5 p-8 md:p-12 bg-white border-l border-slate-100 overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Apply for this role</h3>

              {status === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900 mb-2">Application Sent!</h4>
                  <p className="text-sm text-emerald-700">Good luck! We will review your profile and get back to you.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-5">
                  {status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-500 mt-0.5" />
                      <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Full Name</label>
                    <input
                      type="text"
                      value={application.name}
                      onChange={(e) => setApplication({ ...application, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-all text-sm"
                      placeholder="Jane Doe"
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email</label>
                    <input
                      type="email"
                      value={application.email}
                      onChange={(e) => setApplication({ ...application, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-all text-sm"
                      placeholder="jane@example.com"
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Resume / Portfolio Link</label>
                    <div className="relative">
                      <Upload size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        value={application.resumeLink}
                        onChange={(e) => setApplication({ ...application, resumeLink: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-all text-sm"
                        placeholder="https://linkedin.com/in/jane..."
                        disabled={status === 'submitting'}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Please provide a Google Drive or LinkedIn link.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Cover Letter (Optional)</label>
                    <textarea
                      rows={4}
                      value={application.coverLetter}
                      onChange={(e) => setApplication({ ...application, coverLetter: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-500 transition-all text-sm resize-none"
                      placeholder="Tell us why you're a good fit..."
                      disabled={status === 'submitting'}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
