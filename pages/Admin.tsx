
import React, { useState } from 'react';
import { Layout, Calendar, CheckCircle, AlertCircle, Loader2, Briefcase } from 'lucide-react';
import { api, getFileUrl } from '../services/api';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'project' | 'event'>('project');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // --- Project Form State ---
  const [projectForm, setProjectForm] = useState({
    title: '', studentName: '', college: '', year: '', description: '',
    fullDescription: '', duration: '', techStack: '', thumbnail: '',
    screenshots: '', liveLink: '', repoLink: ''
  });

  // --- Event Form State ---
  const [eventForm, setEventForm] = useState({
    title: '', category: '', date: '', time: '', venue: '', organizer: '',
    shortDesc: '', fullDesc: '', mainImage: '', gallery: ''
  });

  // --- Vacancy Form State ---
  const [vacancyForm, setVacancyForm] = useState({
    title: '', location: '', type: '', description: '', requirements: ''
  });

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Data formatting: Convert comma-separated strings to arrays
      const payload = {
        ...projectForm,
        techStack: projectForm.techStack.split(',').map(s => s.trim()),
        screenshots: projectForm.screenshots.split(',').map(s => s.trim())
      };

      await api.createProject(payload);

      setStatus('success');
      setMessage('Project uploaded successfully!');
      setProjectForm({
        title: '', studentName: '', college: '', year: '', description: '',
        fullDescription: '', duration: '', techStack: '', thumbnail: '',
        screenshots: '', liveLink: '', repoLink: ''
      });
    } catch (error: any) {
      console.warn(error);
      setStatus('error');
      setMessage(error.message || 'Failed to upload project.');
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const payload = {
        ...eventForm,
        gallery: eventForm.gallery.split(',').map(s => s.trim())
      };

      await api.createEvent(payload);

      setStatus('success');
      setMessage('Event uploaded successfully!');
      setEventForm({
        title: '', category: '', date: '', time: '', venue: '', organizer: '',
        shortDesc: '', fullDesc: '', mainImage: '', gallery: ''
      });
    } catch (error: any) {
      console.warn(error);
      setStatus('error');
      setMessage(error.message || 'Failed to upload event.');
    }
  };

  const handleVacancySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const payload = {
        ...vacancyForm,
        requirements: vacancyForm.requirements.split(',').map(s => s.trim())
      };

      await api.createVacancy(payload);

      setStatus('success');
      setMessage('Job vacancy posted successfully!');
      setVacancyForm({
        title: '', location: '', type: '', description: '', requirements: ''
      });
    } catch (error: any) {
      console.warn(error);
      setStatus('error');
      setMessage(error.message || 'Failed to post vacancy.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Upload content to backend APIs.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-white rounded-xl shadow-sm border border-slate-200 mb-8 max-w-lg mx-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('project')}
            className={`flex-1 min-w-[120px] py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'project' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <Layout size={18} /> Projects
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`flex-1 min-w-[120px] py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'event' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <Calendar size={18} /> Events
          </button>
          <button
            onClick={() => setActiveTab('vacancy' as any)}
            className={`flex-1 min-w-[120px] py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === ('vacancy' as any) ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <Briefcase size={18} /> Vacancies
          </button>
        </div>

        {/* Status Message */}
        {status !== 'idle' && status !== 'submitting' && (
          <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${status === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
            {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold">{message}</span>
          </div>
        )}

        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-100">

          {/* --- PROJECT FORM --- */}
          {activeTab === 'project' && (
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-slate-900">New Showcase Project</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Project Title" required className="input-field" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                <input placeholder="Student Name" required className="input-field" value={projectForm.studentName} onChange={e => setProjectForm({ ...projectForm, studentName: e.target.value })} />
                <input placeholder="College Name" required className="input-field" value={projectForm.college} onChange={e => setProjectForm({ ...projectForm, college: e.target.value })} />
                <input placeholder="Year (e.g., 3rd Year)" required className="input-field" value={projectForm.year} onChange={e => setProjectForm({ ...projectForm, year: e.target.value })} />
                <input placeholder="Duration (e.g., 3 Months)" required className="input-field" value={projectForm.duration} onChange={e => setProjectForm({ ...projectForm, duration: e.target.value })} />
                <input placeholder="Tech Stack (comma separated)" required className="input-field" value={projectForm.techStack} onChange={e => setProjectForm({ ...projectForm, techStack: e.target.value })} />
                <input placeholder="Live Link (Optional)" className="input-field" value={projectForm.liveLink} onChange={e => setProjectForm({ ...projectForm, liveLink: e.target.value })} />
                <input placeholder="Repo Link (Optional)" className="input-field" value={projectForm.repoLink} onChange={e => setProjectForm({ ...projectForm, repoLink: e.target.value })} />
              </div>

              <input placeholder="Thumbnail Image URL" required className="input-field w-full" value={projectForm.thumbnail} onChange={e => setProjectForm({ ...projectForm, thumbnail: e.target.value })} />
              <input placeholder="Screenshot URLs (comma separated)" className="input-field w-full" value={projectForm.screenshots} onChange={e => setProjectForm({ ...projectForm, screenshots: e.target.value })} />

              <textarea placeholder="Short Description (Card view)" required rows={2} className="input-field w-full" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
              <textarea placeholder="Full Description (Modal view)" required rows={5} className="input-field w-full" value={projectForm.fullDescription} onChange={e => setProjectForm({ ...projectForm, fullDescription: e.target.value })} />

              <button type="submit" disabled={status === 'submitting'} className="submit-btn">
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Upload Project'}
              </button>
            </form>
          )}

          {/* --- EVENT FORM --- */}
          {activeTab === 'event' && (
            <form onSubmit={handleEventSubmit} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-slate-900">New Event / Workshop</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Event Title" required className="input-field" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} />
                <input placeholder="Category (e.g., Workshop)" required className="input-field" value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value })} />
                <input placeholder="Date" required className="input-field" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} />
                <input placeholder="Time" required className="input-field" value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} />
                <input placeholder="Venue" required className="input-field" value={eventForm.venue} onChange={e => setEventForm({ ...eventForm, venue: e.target.value })} />
                <input placeholder="Organizer" required className="input-field" value={eventForm.organizer} onChange={e => setEventForm({ ...eventForm, organizer: e.target.value })} />
              </div>

              <input placeholder="Main Image URL" required className="input-field w-full" value={eventForm.mainImage} onChange={e => setEventForm({ ...eventForm, mainImage: e.target.value })} />
              <input placeholder="Gallery URLs (comma separated)" className="input-field w-full" value={eventForm.gallery} onChange={e => setEventForm({ ...eventForm, gallery: e.target.value })} />

              <textarea placeholder="Short Description" required rows={2} className="input-field w-full" value={eventForm.shortDesc} onChange={e => setEventForm({ ...eventForm, shortDesc: e.target.value })} />
              <textarea placeholder="Full Description" required rows={5} className="input-field w-full" value={eventForm.fullDesc} onChange={e => setEventForm({ ...eventForm, fullDesc: e.target.value })} />

              <button type="submit" disabled={status === 'submitting'} className="submit-btn">
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Upload Event'}
              </button>
            </form>
          )}

          {/* --- VACANCY FORM --- */}
          {activeTab === ('vacancy' as any) && (
            <form onSubmit={handleVacancySubmit} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-slate-900">New Job Vacancy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Job Title (e.g. Senior AI Developer)" required className="input-field" value={vacancyForm.title} onChange={e => setVacancyForm({ ...vacancyForm, title: e.target.value })} />
                <input placeholder="Location (e.g. Remote, Nagpur)" required className="input-field" value={vacancyForm.location} onChange={e => setVacancyForm({ ...vacancyForm, location: e.target.value })} />
                <input placeholder="Job Type (e.g. Full-time, Intern)" required className="input-field" value={vacancyForm.type} onChange={e => setVacancyForm({ ...vacancyForm, type: e.target.value })} />
                <input placeholder="Requirements (comma separated)" required className="input-field" value={vacancyForm.requirements} onChange={e => setVacancyForm({ ...vacancyForm, requirements: e.target.value })} />
              </div>

              <textarea placeholder="Job Description" required rows={4} className="input-field w-full" value={vacancyForm.description} onChange={e => setVacancyForm({ ...vacancyForm, description: e.target.value })} />

              <button type="submit" disabled={status === 'submitting'} className="submit-btn">
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Post Vacancy'}
              </button>
            </form>
          )}

        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #6366f1;
          background-color: #fff;
        }
        .submit-btn {
          width: 100%;
          background-color: #4f46e5;
          color: white;
          font-weight: bold;
          padding: 16px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #4338ca;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
        }
        .submit-btn:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Admin;
