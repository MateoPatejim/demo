import { useState, useMemo, useEffect } from 'react';
import {
  Plane, MapPin, Utensils, Shirt, FileText, Plus, ArrowLeft,
  Check, X, ChevronRight, Globe, Calendar, Luggage, Sun, Cloud,
  MapPinned, Star, Clock, Coffee, Search, RefreshCw
} from 'lucide-react';
import { destinationCatalog } from './data';

// ─── COMPONENTS ─────────────────────────────────────────────────────────────────

function App() {
  const [trips, setTrips] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const [newTrip, setNewTrip] = useState({ name: '', destination: '', date: '' });
  const [newClothingItem, setNewClothingItem] = useState('');
  const [slideDirection, setSlideDirection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomSuggestions, setRandomSuggestions] = useState([]);

  useEffect(() => {
    if (showNewTripModal) {
      refreshSuggestions();
    } else {
      setSearchQuery('');
    }
  }, [showNewTripModal]);

  const refreshSuggestions = () => {
    const shuffled = [...destinationCatalog].sort(() => 0.5 - Math.random());
    setRandomSuggestions(shuffled.slice(0, 6));
  };

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return destinationCatalog.filter(d =>
      d.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const navigateTo = (view, trip = null, section = null) => {
    setSlideDirection('animate-slideIn');
    setCurrentView(view);
    if (trip !== null) setSelectedTrip(trip);
    if (section !== null) setSelectedSection(section);
    setTimeout(() => setSlideDirection(''), 300);
  };

  const goBack = () => {
    setSlideDirection('animate-slideOut');
    if (currentView === 'section') {
      setCurrentView('detail');
      setSelectedSection(null);
    } else if (currentView === 'detail') {
      setCurrentView('home');
      setSelectedTrip(null);
    }
    setTimeout(() => setSlideDirection(''), 300);
  };

  const handleSelectDestination = (dest) => {
    const template = destinationCatalog.find(d => d.destination === dest);
    if (template) {
      setNewTrip(p => ({ ...p, destination: dest, name: template.defaultName }));
    }
  };

  const handleCreateTrip = () => {
    if (!newTrip.destination || !newTrip.date) return;
    const template = destinationCatalog.find(d => d.destination === newTrip.destination);
    if (!template) return;
    const trip = {
      id: Date.now(),
      name: newTrip.name || template.defaultName,
      destination: template.destination,
      date: newTrip.date,
      image: template.image,
      clothing: JSON.parse(JSON.stringify(template.clothing)),
      places: JSON.parse(JSON.stringify(template.places)),
      restaurants: JSON.parse(JSON.stringify(template.restaurants)),
      description: { ...template.description },
    };
    setTrips(prev => [...prev, trip]);
    setNewTrip({ name: '', destination: '', date: '' });
    setShowNewTripModal(false);
  };

  const toggleChecklistItem = (tripId, itemId) => {
    setTrips(prev => prev.map(t =>
      t.id === tripId ? {
        ...t, clothing: {
          ...t.clothing,
          checklist: t.clothing.checklist.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        }
      } : t
    ));
  };

  const addClothingItem = (tripId) => {
    if (!newClothingItem.trim()) return;
    setTrips(prev => prev.map(t =>
      t.id === tripId ? {
        ...t, clothing: {
          ...t.clothing,
          checklist: [...t.clothing.checklist, { id: Date.now(), text: newClothingItem.trim(), checked: false }]
        }
      } : t
    ));
    setNewClothingItem('');
  };

  const togglePlaceVisited = (tripId, placeId) => {
    setTrips(prev => prev.map(t =>
      t.id === tripId ? {
        ...t, places: t.places.map(p =>
          p.id === placeId ? { ...p, visited: !p.visited } : p
        )
      } : t
    ));
  };

  const toggleRestaurantVisited = (tripId, restaurantId) => {
    setTrips(prev => prev.map(t =>
      t.id === tripId ? {
        ...t, restaurants: t.restaurants.map(r =>
          r.id === restaurantId ? { ...r, visited: !r.visited } : r
        )
      } : t
    ));
  };

  const trip = selectedTrip !== null ? trips.find(t => t.id === selectedTrip) : null;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 max-w-md mx-auto relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(-30%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .animate-slideOut { animation: slideOut 0.3s ease-out; }
        .animate-fadeUp { animation: fadeUp 0.4s ease-out both; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out both; }
      `}</style>

      {/* ═══ HOME VIEW ═══ */}
      {currentView === 'home' && (
        <div className="min-h-screen pb-24">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tus Viajes</h1>
                <p className="text-xs text-slate-400 mt-0.5">{trips.length > 0 ? `${trips.length} aventura${trips.length > 1 ? 's' : ''} planeada${trips.length > 1 ? 's' : ''}` : 'Planificá tu próxima aventura'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Trip Cards */}
          <div className="px-4 pt-4 space-y-4">
            {/* Empty State */}
            {trips.length === 0 && (
              <div className="animate-fadeUp flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-5">
                  <Plane className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">¡Empezá a planear!</h3>
                <p className="text-sm text-slate-400 mt-2 max-w-xs">Agregá tu primer viaje eligiendo uno de nuestros destinos disponibles.</p>
                <button
                  onClick={() => setShowNewTripModal(true)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl active:scale-[0.97] transition-all"
                >
                  <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Crear mi primer viaje</span>
                </button>
              </div>
            )}

            {trips.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => navigateTo('detail', t.id)}
                className="animate-fadeUp cursor-pointer group"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-slate-200/80 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={t.image}
                    alt={t.destination}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{t.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-white/80 text-xs">
                        <MapPin className="w-3 h-3" /> {t.destination}
                      </span>
                      <span className="flex items-center gap-1 text-white/80 text-xs">
                        <Calendar className="w-3 h-3" /> {formatDate(t.date)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full p-2">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}

            {/* "Nuevo Viaje" card at bottom of list */}
            {trips.length > 0 && (
              <div
                onClick={() => setShowNewTripModal(true)}
                className="animate-fadeUp cursor-pointer group"
                style={{ animationDelay: `${trips.length * 0.07}s` }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md shadow-slate-200/60 hover:shadow-lg hover:shadow-blue-200/40 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border-2 border-dashed border-blue-200 h-24 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">Nuevo Viaje</p>
                    <p className="text-xs text-slate-400">Elegí tu próximo destino</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FAB */}
          <button
            onClick={() => setShowNewTripModal(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
          >
            <Plus className="w-7 h-7 text-white" />
          </button>

          {/* New Trip Modal */}
          {showNewTripModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setShowNewTripModal(false)}>
              <div
                className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slideIn"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />
                <h2 className="text-xl font-bold text-slate-800 mb-1">Nuevo Viaje</h2>
                <p className="text-sm text-slate-400 mb-4">Elegí un destino para cargar toda la info</p>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscá un país (ej: Vietnam, Canadá...)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-400 outline-none text-sm transition-all"
                  />
                </div>

                {/* Destination selection area */}
                <div className="max-h-[30vh] overflow-y-auto pr-1">
                  {searchQuery.trim() === '' ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sugerencias</label>
                        <button onClick={refreshSuggestions} className="text-blue-500 p-1 hover:bg-blue-50 rounded-lg transition-colors">
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {randomSuggestions.map(d => (
                          <button
                            key={d.destination}
                            onClick={() => handleSelectDestination(d.destination)}
                            className={`relative rounded-xl overflow-hidden h-16 group transition-all ${newTrip.destination === d.destination
                              ? 'ring-2 ring-blue-500 ring-offset-2 scale-[1.02]'
                              : 'hover:scale-[1.03] opacity-80 hover:opacity-100'
                              }`}
                          >
                            <img src={d.image} alt={d.destination} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40" />
                            <span className="absolute inset-x-1 bottom-1 text-white font-bold text-[10px] truncate">{d.destination}</span>
                            {newTrip.destination === d.destination && (
                              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Resultados</label>
                      {filteredDestinations.length > 0 ? (
                        <div className="space-y-2">
                          {filteredDestinations.map(d => (
                            <button
                              key={d.destination}
                              onClick={() => handleSelectDestination(d.destination)}
                              className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all ${newTrip.destination === d.destination
                                ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400'
                                : 'bg-white border-slate-100 hover:border-slate-300'
                                }`}
                            >
                              <img src={d.image} alt={d.destination} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-semibold text-slate-700 text-sm">{d.destination}</span>
                              {newTrip.destination === d.destination && <Check className="w-4 h-4 text-blue-500 ml-auto" />}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-4">No encontramos ese destino, ¡pero podés elegir otro!</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nombre del viaje</label>
                    <input
                      type="text"
                      value={newTrip.name}
                      onChange={e => setNewTrip(p => ({ ...p, name: e.target.value }))}
                      placeholder={newTrip.destination ? `Ej: Mi viaje a ${newTrip.destination}` : 'Primero elegí un destino'}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fecha del viaje</label>
                    <input
                      type="date"
                      value={newTrip.date}
                      onChange={e => setNewTrip(p => ({ ...p, date: e.target.value }))}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowNewTripModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateTrip}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl active:scale-[0.98] transition-all"
                  >
                    Crear Viaje
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ DETAIL VIEW ═══ */}
      {currentView === 'detail' && trip && (
        <div className={`min-h-screen ${slideDirection}`}>
          {/* Hero */}
          <div className="relative h-56">
            <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <button
              onClick={goBack}
              className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h1 className="text-white text-2xl font-bold">{trip.name}</h1>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <MapPin className="w-3.5 h-3.5" /> {trip.destination}
                </span>
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <Calendar className="w-3.5 h-3.5" /> {formatDate(trip.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="px-4 -mt-5 relative z-10 pb-8">
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'clothing', label: 'Vestimenta', icon: Shirt, color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/25' },
                { key: 'places', label: 'Lugares', icon: MapPinned, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25' },
                { key: 'restaurants', label: 'Restaurantes', icon: Utensils, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/25' },
                { key: 'description', label: 'Descripción', icon: FileText, color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/25' },
              ].map((section, idx) => (
                <button
                  key={section.key}
                  onClick={() => navigateTo('section', null, section.key)}
                  className={`animate-fadeUp bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.97] text-left group`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} ${section.shadow} shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{section.label}</p>
                  <ChevronRight className="w-4 h-4 text-slate-300 mt-1 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SECTION VIEW ═══ */}
      {currentView === 'section' && trip && (
        <div className={`min-h-screen bg-white ${slideDirection}`}>
          {/* Section Header */}
          <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-100">
            <div className="px-4 py-3.5 flex items-center gap-3">
              <button
                onClick={goBack}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4.5 h-4.5 text-slate-600" />
              </button>
              <div>
                <h2 className="font-bold text-slate-800">
                  {selectedSection === 'clothing' && 'Vestimenta'}
                  {selectedSection === 'places' && 'Lugares de Interés'}
                  {selectedSection === 'restaurants' && 'Restaurantes'}
                  {selectedSection === 'description' && 'Descripción'}
                </h2>
                <p className="text-xs text-slate-400">{trip.destination}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 pb-10">
            {/* ── CLOTHING SECTION ── */}
            {selectedSection === 'clothing' && (
              <div className="space-y-6">
                {/* Outfits */}
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" /> Outfits Recomendados
                  </h3>
                  <div className="space-y-3">
                    {trip.clothing.outfits.map((outfit, idx) => (
                      <div key={outfit.id} className="animate-fadeUp flex gap-3 bg-slate-50 rounded-2xl overflow-hidden" style={{ animationDelay: `${idx * 0.06}s` }}>
                        <img
                          src={outfit.image}
                          alt={outfit.name}
                          className="w-24 h-28 object-cover flex-shrink-0"
                        />
                        <div className="py-3 pr-3 flex flex-col justify-center">
                          <p className="font-semibold text-slate-800 text-sm">{outfit.name}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{outfit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-blue-500" /> Checklist de Equipaje
                  </h3>
                  <div className="bg-slate-50 rounded-2xl overflow-hidden divide-y divide-slate-100">
                    {trip.clothing.checklist.map(item => (
                      <label key={item.id} className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-slate-100/50 transition-colors">
                        <div
                          onClick={() => toggleChecklistItem(trip.id, item.id)}
                          className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${item.checked
                            ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-400 shadow-sm shadow-emerald-300/50'
                            : 'border-slate-300 hover:border-blue-400'
                            }`}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-sm ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{item.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Add custom item */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newClothingItem}
                    onChange={e => setNewClothingItem(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addClothingItem(trip.id)}
                    placeholder="Añadir prenda personalizada..."
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
                  />
                  <button
                    onClick={() => addClothingItem(trip.id)}
                    className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl active:scale-95 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── PLACES SECTION ── */}
            {selectedSection === 'places' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" /> Itinerario Sugerido
                </h3>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 to-purple-400 rounded-full" />
                  <div className="space-y-4">
                    {trip.places.map((place, idx) => (
                      <div key={place.id} className="animate-fadeUp relative flex gap-4" style={{ animationDelay: `${idx * 0.08}s` }}>
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            onClick={() => togglePlaceVisited(trip.id, place.id)}
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${place.visited
                              ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-400 shadow-md shadow-emerald-300/40'
                              : 'bg-white border-slate-300 hover:border-blue-400 shadow-sm'
                              }`}
                          >
                            {place.visited ? <Check className="w-4 h-4 text-white" strokeWidth={3} /> : <MapPin className="w-3.5 h-3.5 text-slate-400" />}
                          </div>
                        </div>
                        <div className={`flex-1 bg-slate-50 rounded-2xl p-4 ${place.visited ? 'opacity-60' : ''}`}>
                          <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{place.time}</span>
                          <h4 className={`font-semibold text-slate-800 mt-1 ${place.visited ? 'line-through' : ''}`}>{place.name}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{place.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Ver en Mapa</p>
                    <p className="text-xs text-slate-500 mt-0.5">Explorar ubicaciones de {trip.destination}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                </div>
              </div>
            )}

            {/* ── RESTAURANTS SECTION ── */}
            {selectedSection === 'restaurants' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-500" /> Restaurantes Recomendados
                </h3>
                {trip.restaurants.map((rest, idx) => (
                  <div key={rest.id} className="animate-fadeUp bg-slate-50 rounded-2xl p-4 space-y-3" style={{ animationDelay: `${idx * 0.08}s` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-bold text-slate-800 ${rest.visited ? 'line-through opacity-60' : ''}`}>{rest.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {rest.address}
                        </p>
                      </div>
                      <div
                        onClick={() => toggleRestaurantVisited(trip.id, rest.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer flex-shrink-0 transition-all ${rest.visited
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-400 shadow-sm shadow-emerald-300/40'
                          : 'border-slate-300 hover:border-blue-400'
                          }`}
                      >
                        {rest.visited && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${rest.dress === 'Casual' ? 'bg-green-100 text-green-700' :
                        rest.dress === 'Smart Casual' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                        {rest.dress}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{rest.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── DESCRIPTION SECTION ── */}
            {selectedSection === 'description' && (
              <div className="space-y-5">
                {[
                  { icon: Sun, title: 'Clima', text: trip.description.climate, color: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/25', bg: 'bg-amber-50' },
                  { icon: Globe, title: 'Cultura', text: trip.description.culture, color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/25', bg: 'bg-violet-50' },
                  { icon: Star, title: 'Tips', text: trip.description.tips, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/25', bg: 'bg-blue-50' },
                  { icon: MapPinned, title: 'Highlights', text: trip.description.highlights, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25', bg: 'bg-emerald-50' },
                ].map((sec, idx) => (
                  <div key={sec.title} className={`animate-fadeUp ${sec.bg} rounded-2xl p-5 border border-slate-100`} style={{ animationDelay: `${idx * 0.08}s` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${sec.color} ${sec.shadow} shadow-md flex items-center justify-center`}>
                        <sec.icon className="w-4.5 h-4.5 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-800">{sec.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{sec.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
