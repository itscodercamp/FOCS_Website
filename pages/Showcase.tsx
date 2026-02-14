
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, User, School, Clock, X, Layers, ArrowRight, Loader2, Search } from 'lucide-react';
import { api, getFileUrl } from '../services/api';
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  // Lock body scroll when modal or preview is open
  useEffect(() => {
    if (selectedProject || previewUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject, previewUrl]);

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
                    src={getFileUrl(project.thumbnail)}
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
            className="fixed top-6 right-6 z-[60] bg-black/50 hover:bg-black/70 text-white backdrop-blur-md p-2.5 rounded-full transition-all shadow-lg border border-white/20 group scale-90 md:scale-100"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left: Image Card - Sticky on Desktop */}
          <div className="w-full md:w-1/2 h-[45vh] md:h-screen relative md:sticky md:top-0 bg-slate-50/50 p-4 md:p-8 lg:p-12 flex items-center justify-center">
            <div
              className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative group cursor-zoom-in border border-white/20"
              onClick={() => setPreviewUrl(getFileUrl(selectedProject.thumbnail))}
            >
              <img
                src={getFileUrl(selectedProject.thumbnail)}
                alt={selectedProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform">
                  <Search size={32} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-40"></div>

              {/* Mobile Title Overlay */}
              <div className="absolute bottom-8 left-8 right-8 text-white md:hidden">
                <div className="flex gap-2 mb-3">
                  {selectedProject.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[9px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30 uppercase tracking-widest">{tech}</span>
                  ))}
                </div>
                <h2 className="text-xl font-black leading-tight tracking-tight">{selectedProject.title}</h2>
              </div>
            </div>
          </div>

          {/* Right: Details - Scrollable */}
          <div className="w-full md:w-1/2 min-h-screen bg-white p-6 md:p-10 lg:p-14 flex flex-col">
            <div className="max-w-xl mx-auto w-full">
              <div className="hidden md:block mb-6">
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 mb-2 leading-tight tracking-tight">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="bg-slate-50 text-slate-500 text-[8px] font-bold px-2 py-0.5 rounded-md border border-slate-100 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Layers size={10} className="text-brand-500" /> Project Overview
                </h3>
                <p className="text-slate-600 leading-relaxed text-[11px] md:text-[12px] font-light">
                  {selectedProject.fullDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10 p-5 bg-slate-50/80 backdrop-blur-sm rounded-3xl border border-slate-100">
                <div className="space-y-1.5">
                  <h3 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <User size={10} className="text-brand-500" /> Developer
                  </h3>
                  <p className="font-extrabold text-slate-900 text-[12px]">{selectedProject.studentName}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{selectedProject.year} Student</p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <School size={10} className="text-brand-500" /> Institution
                  </h3>
                  <p className="font-extrabold text-slate-900 text-[12px] leading-tight">{selectedProject.college}</p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Clock size={10} className="text-brand-500" /> Duration
                  </h3>
                  <p className="font-extrabold text-slate-900 text-[12px]">{selectedProject.duration}</p>
                </div>
              </div>

              {/* Screenshots Gallery */}
              {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-4">
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {selectedProject.screenshots.map((shot, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 group cursor-zoom-in relative"
                        onClick={() => setPreviewUrl(getFileUrl(shot))}
                      >
                        <img
                          src={getFileUrl(shot)}
                          alt={`Screenshot ${i + 1}`}
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform">
                            <Search size={24} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Sticky Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 mt-auto sticky bottom-0 bg-white/95 backdrop-blur-md pb-6 md:pb-0">
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-600/10 hover:-translate-y-1 text-xs"
                  >
                    <ExternalLink size={16} /> Live Preview
                  </a>
                )}
                {selectedProject.repoLink && (
                  <a
                    href={selectedProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 border border-slate-200 hover:border-brand-200 hover:bg-brand-50/30 text-slate-600 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1 text-xs ${!selectedProject.liveLink ? 'w-full' : ''}`}
                  >
                    <Github size={16} /> View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Image Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in-rapid cursor-zoom-out"
          onClick={() => setPreviewUrl(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setPreviewUrl(null)}
          >
            <X size={32} />
          </button>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Showcase;
