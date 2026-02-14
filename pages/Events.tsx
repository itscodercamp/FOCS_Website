
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
          {/* Top Bar Navigation */}
          <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 px-4 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                <Tag size={20} />
              </div>
              <span className="font-bold text-slate-900 hidden md:block">{selectedEvent.title}</span>
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-full transition-colors"
            >
              Close <X size={18} />
            </button>
          </div>

          <div className="pt-20">
            {/* Header / Banner */}
            <div className="h-[40vh] md:h-[55vh] relative px-4 md:px-8 flex items-center justify-center bg-slate-50">
              <div
                className="w-full h-full max-w-6xl rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative group cursor-zoom-in"
                onClick={() => setPreviewUrl(getFileUrl(selectedEvent.mainImage))}
              >
                <img src={getFileUrl(selectedEvent.mainImage)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform">
                    <Search size={32} />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12">
                  <span className="inline-block px-4 py-1.5 bg-brand-500 text-white text-[9px] font-bold rounded-full mb-4 uppercase tracking-[0.2em]">{selectedEvent.category}</span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">{selectedEvent.title}</h1>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20">

              {/* Left Side: Meta Data */}
              <div className="lg:w-1/3 order-2 lg:order-1">
                <div className="bg-slate-50/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-100 space-y-10 sticky top-32">
                  <div className="space-y-1.5">
                    <h4 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Calendar size={12} className="text-brand-500" /> Date & Time
                    </h4>
                    <p className="text-sm font-extrabold text-slate-900">{selectedEvent.date}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{selectedEvent.time}</p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <MapPin size={12} className="text-brand-500" /> Venue
                    </h4>
                    <p className="text-sm font-extrabold text-slate-900 leading-snug">{selectedEvent.venue}</p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <User size={12} className="text-brand-500" /> Hosted By
                    </h4>
                    <p className="text-sm font-extrabold text-slate-900">{selectedEvent.organizer}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-600/10 transition-all flex items-center justify-center gap-2 text-xs">
                      Contact Organizer <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Description & Gallery */}
              <div className="lg:w-2/3 order-1 lg:order-2">
                <div className="max-w-none">
                  <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">About the Event</h2>
                  <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed mb-12 font-light">
                    {selectedEvent.fullDesc}
                  </p>

                  <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                    <Camera size={20} className="text-brand-600" /> Event Highlights
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedEvent.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 group aspect-video relative cursor-zoom-in"
                        onClick={() => setPreviewUrl(getFileUrl(img))}
                      >
                        <img src={getFileUrl(img)} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform">
                            <Search size={24} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 pt-12 border-t border-slate-100">
                  <p className="text-slate-500 italic mb-8">
                    Interested in attending our next event or hosting a workshop with us?
                    FOCS Academy frequently partners with colleges and corporate houses.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="bg-slate-100 text-slate-600 px-5 py-2 rounded-full text-sm font-bold">#FOCSEvents</span>
                    <span className="bg-slate-100 text-slate-600 px-5 py-2 rounded-full text-sm font-bold">#ItsCoderCamp</span>
                    <span className="bg-slate-100 text-slate-600 px-5 py-2 rounded-full text-sm font-bold">#TechInNagpur</span>
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
