
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, X, ArrowRight, User, Camera, Sparkles, Tag, Users, Loader2 } from 'lucide-react';
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
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

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
            <div className="h-[40vh] md:h-[60vh] relative">
              <img src={getFileUrl(selectedEvent.mainImage)} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>
              <div className="absolute bottom-10 left-0 w-full">
                <div className="container mx-auto px-4 md:px-6">
                  <span className="inline-block px-4 py-1.5 bg-brand-500 text-white text-[10px] font-bold rounded-full mb-4 uppercase tracking-widest">{selectedEvent.category}</span>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-none">{selectedEvent.title}</h1>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20">

              {/* Left Side: Meta Data */}
              <div className="lg:w-1/3 order-2 lg:order-1">
                <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 space-y-10 sticky top-32">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar size={14} className="text-brand-500" /> Date & Time
                    </h4>
                    <p className="text-lg font-bold text-slate-900">{selectedEvent.date}</p>
                    <p className="text-slate-500">{selectedEvent.time}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <MapPin size={14} className="text-brand-500" /> Venue
                    </h4>
                    <p className="text-lg font-bold text-slate-900">{selectedEvent.venue}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <User size={14} className="text-brand-500" /> Hosted By
                    </h4>
                    <p className="text-lg font-bold text-slate-900">{selectedEvent.organizer}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-brand-600/20 transition-all flex items-center justify-center gap-2">
                      Contact Organizer <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Description & Gallery */}
              <div className="lg:w-2/3 order-1 lg:order-2">
                <div className="prose prose-lg prose-slate max-w-none">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Event</h2>
                  <p className="text-slate-600 text-xl leading-relaxed mb-12">
                    {selectedEvent.fullDesc}
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <Camera className="text-brand-600" /> Event Highlights
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedEvent.gallery.map((img, i) => (
                      <div key={i} className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 group aspect-video">
                        <img src={getFileUrl(img)} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
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
    </div>
  );
};

export default Events;
