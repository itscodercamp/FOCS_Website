
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, X, ArrowRight, User, Camera, Sparkles, Tag, Users, Loader2, Search } from 'lucide-react';
import { api, getFileUrl } from '../services/api';
import SEO from '../components/SEO';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  shortDesc: string;
  fullDesc: string;
  mainImage: string;
  gallery: string[];
}

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await api.getEvents();
      if (data && Array.isArray(data) && data.length > 0) {
        setEvents(data);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Lock scroll
  useEffect(() => {
    if (selectedEvent || previewUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent, previewUrl]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Events & Workshops"
        description="Join FOCS for hackathons, faculty development programs, and AI workshops in Nagpur. Stay updated with our latest tech events."
        keywords="Tech Events Nagpur, Hackathons, FDP Generative AI, Coding Workshops, FOCS Events"
      />

      {/* Hero Section */}
      <div className="bg-dark-950 text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 border border-brand-500/30 rounded-full text-brand-300 text-sm font-semibold mb-6 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" /> FOCS Chronicles
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Events & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">Workshops</span></h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Capturing the moments where innovation meets interaction. Browse our history of successful workshops, summits, and campus initiatives.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 -mt-20 md:-mt-24 relative z-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-white" size={48} />
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-brand-900/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <img
                    src={getFileUrl(event.mainImage)}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-brand-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <Calendar size={14} className="text-brand-400" /> {event.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <MapPin size={14} className="text-brand-400" /> {event.venue.split(',')[0]}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                    {event.shortDesc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                        <Users size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{event.organizer}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border border-slate-100 shadow-xl">
            <p className="text-slate-500 text-lg">No events found. Stay tuned for upcoming updates!</p>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in no-scrollbar">
          {/* Close Button */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="fixed top-8 right-8 z-[60] bg-white/80 hover:bg-white text-slate-900 backdrop-blur-xl p-3 rounded-full transition-all shadow-2xl border border-slate-200 group scale-90 md:scale-100"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="min-h-screen flex flex-col items-center">
            {/* Immersive Header */}
            <div className="w-full h-[60vh] md:h-[75vh] relative flex items-center justify-center bg-slate-100/50 p-4 md:p-12 lg:p-20">
              <div
                className="w-full h-full max-w-7xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative group cursor-zoom-in border border-white/40"
                onClick={() => setPreviewUrl(getFileUrl(selectedEvent.mainImage))}
              >
                <img src={getFileUrl(selectedEvent.mainImage)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-xl p-5 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-all duration-500">
                    <Search size={40} />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500 border border-brand-400 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-brand-500/20">
                    <Sparkles size={14} /> {selectedEvent.category}
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">{selectedEvent.title}</h1>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="w-full max-w-7xl px-6 md:px-20 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

              {/* Sidebar: Meta Data */}
              <div className="lg:col-span-4 space-y-12">
                <div className="bg-slate-50/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-100 space-y-10 group hover:border-brand-200 transition-colors duration-500">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Calendar size={14} className="text-brand-500" /> Event Schedule
                    </h4>
                    <p className="text-[15px] font-black text-slate-900">{selectedEvent.date}</p>
                    <p className="text-[12px] text-slate-500 font-bold uppercase tracking-widest">{selectedEvent.time}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                      <MapPin size={14} className="text-brand-500" /> Location
                    </h4>
                    <p className="text-[15px] font-black text-slate-900 leading-[1.4]">{selectedEvent.venue}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                      <User size={14} className="text-brand-500" /> Organized By
                    </h4>
                    <p className="text-[15px] font-black text-slate-900">{selectedEvent.organizer}</p>
                  </div>

                  <div className="pt-8 border-t border-slate-200">
                    <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] transform hover:-translate-y-1">
                      Join Interaction <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block pt-8 px-4 opacity-50">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.5em] leading-relaxed">
                    © 2026 FOCS Chronicles • Engineering Excellence
                  </p>
                </div>
              </div>

              {/* Main Content: Description & Gallery */}
              <div className="lg:col-span-8 space-y-20">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">The Experience</h2>
                    <p className="text-slate-600 text-[14px] md:text-[16px] leading-[1.8] font-normal opacity-90 max-w-4xl">
                      {selectedEvent.fullDesc}
                    </p>
                  </div>

                  <div className="space-y-12 pt-10 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                        <Camera size={18} className="text-brand-500" /> Caught in Motion
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {selectedEvent.gallery.map((img, i) => (
                        <div
                          key={i}
                          className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group aspect-[4/3] relative cursor-zoom-in bg-slate-50"
                          onClick={() => setPreviewUrl(getFileUrl(img))}
                        >
                          <img src={getFileUrl(img)} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-xl p-4 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-all duration-500">
                              <Search size={28} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-20 border-t border-slate-100 flex flex-col items-center text-center">
                  <p className="text-slate-400 font-light text-[13px] italic mb-10 max-w-2xl leading-relaxed">
                    "FOCS Academy's chronicles are a testimony to our commitment to bridging the gap between academic brilliance and industry innovation."
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["#FOCSChronicles", "#EngineeringFuture", "#TechSummit2026"].map((tag, i) => (
                      <span key={i} className="bg-slate-50 text-slate-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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

export default Events;
