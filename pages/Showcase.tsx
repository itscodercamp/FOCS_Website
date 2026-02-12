
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, User, School, Clock, X, Layers, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import SEO from '../components/SEO';

interface Project {
  id: string;
  title: string;
  studentName: string;
  college: string;
  year: string;
  description: string;
  fullDescription: string;
  duration: string;
  techStack: string[];
  thumbnail: string;
  screenshots: string[];
  liveLink?: string;
  repoLink?: string;
}

const Showcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await api.getProjects();
      if (data && Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Student Project Showcase"
        description="Explore innovative projects built by students of FOCS Academy. From AI apps to Full Stack platforms, see the future of tech."
        keywords="Student Projects, Coding Bootcamp Projects, Flutter Apps, MERN Stack Projects, FOCS Academy Showcase"
      />

      {/* Hero Section */}
      <div className="bg-dark-950 text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-brand-500/10 border border-brand-500/30 rounded-full text-brand-300 text-sm font-semibold mb-6 backdrop-blur-md">
            Its Coder Camp
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">Showcase</span></h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Highlighting exceptional projects built by our students. From concept to code, witness the future of engineering.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 -mt-20 md:-mt-24 relative z-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-white" size={48} />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-brand-900/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Thumbnail */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/30">
                      {project.techStack?.[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">{project.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{project.studentName}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">{project.college}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[2rem] text-center border border-slate-100 shadow-xl">
            <p className="text-slate-500 text-lg">No projects showcased yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Full Screen Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in overflow-y-auto flex flex-col md:flex-row">
          {/* Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="fixed top-6 right-6 z-50 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md p-3 rounded-full transition-all shadow-lg border border-white/20 group"
          >
            <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left: Image / Gallery - Sticky on Desktop */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative md:sticky md:top-0 bg-slate-100">
            <img
              src={selectedProject.thumbnail}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5"></div>

            {/* Mobile Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white md:hidden">
              <div className="flex gap-2 mb-2">
                {selectedProject.techStack.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/30">{tech}</span>
                ))}
              </div>
              <h2 className="text-3xl font-bold leading-tight">{selectedProject.title}</h2>
            </div>
          </div>

          {/* Right: Details - Scrollable */}
          <div className="w-full md:w-1/2 min-h-screen bg-white p-8 md:p-20 flex flex-col">
            <div className="max-w-xl mx-auto w-full">
              <div className="hidden md:block mb-8">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-lg prose-slate mb-12">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers size={16} /> Project Overview
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedProject.fullDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <User size={14} /> Developer
                  </h3>
                  <p className="font-bold text-slate-900 text-lg">{selectedProject.studentName}</p>
                  <p className="text-sm text-slate-500">{selectedProject.year} Student</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <School size={14} /> Institution
                  </h3>
                  <p className="font-bold text-slate-900 text-lg">{selectedProject.college}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Clock size={14} /> Duration
                  </h3>
                  <p className="font-bold text-slate-900 text-lg">{selectedProject.duration}</p>
                </div>
              </div>

              {/* Screenshots */}
              {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Project Gallery
                  </h3>
                  <div className="space-y-6">
                    {selectedProject.screenshots.map((shot, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                        <img src={shot} alt="Screenshot" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100 mt-auto sticky bottom-0 bg-white/95 backdrop-blur-sm pb-8 md:pb-0">
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-600/20 hover:-translate-y-1"
                  >
                    <ExternalLink size={20} /> Live Preview
                  </a>
                )}
                {selectedProject.repoLink && (
                  <a
                    href={selectedProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 ${!selectedProject.liveLink ? 'w-full' : ''}`}
                  >
                    <Github size={20} /> View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showcase;
