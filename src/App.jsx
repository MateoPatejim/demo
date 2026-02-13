import { useState } from 'react';
import {
  Plane, MapPin, Utensils, Shirt, FileText, Plus, ArrowLeft,
  Check, X, ChevronRight, Globe, Calendar, Luggage, Sun, Cloud,
  MapPinned, Star, Clock, Coffee
} from 'lucide-react';

// ─── DESTINATION CATALOG (Templates) ────────────────────────────────────────────

const destinationCatalog = [
  {
    destination: 'Uruguay',
    defaultName: 'Aventura en Uruguay',
    image: 'https://images.unsplash.com/photo-1598981457915-aea220950616?w=800&q=80',
    clothing: {
      outfits: [
        { id: 1, name: 'Look Playero', image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=400&q=80', desc: 'Bermudas, remera liviana y ojotas' },
        { id: 2, name: 'Paseo Urbano', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80', desc: 'Jeans, camisa y zapatillas cómodas' },
        { id: 3, name: 'Noche de Tango', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', desc: 'Pantalón de vestir, camisa y zapatos' },
      ],
      checklist: [
        { id: 1, text: 'Protector solar SPF 50', checked: false },
        { id: 2, text: 'Traje de baño', checked: false },
        { id: 3, text: 'Sombrero / Gorra', checked: false },
        { id: 4, text: 'Lentes de sol', checked: false },
        { id: 5, text: 'Sandalias', checked: false },
        { id: 6, text: 'Ropa liviana de algodón', checked: false },
      ]
    },
    places: [
      { id: 1, time: 'Mañana', name: 'Playa Pocitos', desc: 'Icónica playa de Montevideo con paseo costanero', visited: false },
      { id: 2, time: 'Mediodía', name: 'Mercado del Puerto', desc: 'Tradicional mercado gastronómico con parrillas', visited: false },
      { id: 3, time: 'Tarde', name: 'Ciudad Vieja', desc: 'Barrio histórico con arquitectura colonial', visited: false },
      { id: 4, time: 'Atardecer', name: 'Rambla de Montevideo', desc: 'Paseo costero de 22km con vistas al Río de la Plata', visited: false },
    ],
    restaurants: [
      { id: 1, name: 'El Palenque', address: 'Mercado del Puerto, Montevideo', dress: 'Casual', desc: 'Parrilla tradicional. Pedir el asado de tira y la pamplona.', visited: false },
      { id: 2, name: 'La Perdiz', address: 'Punta del Este', dress: 'Smart Casual', desc: 'Cocina de autor uruguaya. Probar el cordero patagónico.', visited: false },
      { id: 3, name: 'Café Roldós', address: 'Ciudad Vieja, Montevideo', dress: 'Casual', desc: 'Histórico café. El cortado y los bizcochos son imperdibles.', visited: false },
    ],
    description: {
      climate: 'Clima subtropical húmedo. Veranos cálidos (25-35°C) e inviernos templados (10-18°C). Llevar protector solar y ropa fresca en verano.',
      culture: 'Uruguay es conocido por su calidez y tranquilidad. La cultura del mate es central en la vida cotidiana. El tango y el candombe son expresiones culturales fuertes.',
      tips: 'La moneda es el peso uruguayo. Se acepta tarjeta en casi todos lados. Los uruguayos cenan tarde (después de las 21h). El wifi es excelente en todo el país.',
      highlights: 'No te pierdas un atardecer en la Rambla, una visita a Colonia del Sacramento (Patrimonio UNESCO) y un asado tradicional con amigos.'
    }
  },
  {
    destination: 'Portugal',
    defaultName: 'Descubriendo Portugal',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
    clothing: {
      outfits: [
        { id: 1, name: 'Explorador Urbano', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80', desc: 'Zapatillas cómodas, pantalón chino y camisa' },
        { id: 2, name: 'Playa del Algarve', image: 'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=400&q=80', desc: 'Bañador, camiseta y sandalias' },
        { id: 3, name: 'Noche en Lisboa', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80', desc: 'Look elegante casual para los bares de Bairro Alto' },
      ],
      checklist: [
        { id: 1, text: 'Calzado cómodo para adoquines', checked: false },
        { id: 2, text: 'Adaptador de enchufe europeo', checked: false },
        { id: 3, text: 'Chaqueta ligera', checked: false },
        { id: 4, text: 'Protector solar', checked: false },
        { id: 5, text: 'Cámara de fotos', checked: false },
      ]
    },
    places: [
      { id: 1, time: 'Mañana', name: 'Torre de Belém', desc: 'Icónica torre del siglo XVI, Patrimonio Mundial', visited: false },
      { id: 2, time: 'Mediodía', name: 'Pastéis de Belém', desc: 'Probar los famosos pasteles de nata originales', visited: false },
      { id: 3, time: 'Tarde', name: 'Barrio de Alfama', desc: 'Callejuelas medievales con vistas al Tajo', visited: false },
      { id: 4, time: 'Noche', name: 'Bairro Alto', desc: 'Vida nocturna y restaurantes con fado en vivo', visited: false },
    ],
    restaurants: [
      { id: 1, name: 'Time Out Market', address: 'Cais do Sodré, Lisboa', dress: 'Casual', desc: 'Mercado gourmet con lo mejor de la gastronomía portuguesa. Probar el bacalao.', visited: false },
      { id: 2, name: 'Cervejaria Ramiro', address: 'Av. Almirante Reis, Lisboa', dress: 'Casual', desc: 'Mariscos frescos espectaculares. El steak sandwich de postre es obligatorio.', visited: false },
      { id: 3, name: 'Belcanto', address: 'Largo de São Carlos, Lisboa', dress: 'Elegante', desc: 'Restaurante con 2 estrellas Michelin del chef José Avillez.', visited: false },
    ],
    description: {
      climate: 'Clima mediterráneo. Veranos secos y calurosos (25-35°C), inviernos suaves (8-15°C). Mayo es ideal con temperaturas agradables.',
      culture: 'El fado es el alma musical de Portugal. La azulejería es arte callejero centenario. Los portugueses son hospitalarios y orgullosos de su gastronomía.',
      tips: 'Usa la tarjeta Viva Viagem para el transporte. Los tranvías son icónicos pero llenos; madruga. El café (bica) cuesta ~€0.70.',
      highlights: 'Imperdibles: Sintra y sus palacios de cuento, el Ponte 25 de Abril, un show de fado en Alfama y los atardeceres desde el Mirador de Santa Luzia.'
    }
  },
  {
    destination: 'España',
    defaultName: 'España Inolvidable',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80',
    clothing: {
      outfits: [
        { id: 1, name: 'Tapeo por Madrid', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&q=80', desc: 'Look casual chic: vaqueros, blusa y botines' },
        { id: 2, name: 'Playa Barceloneta', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80', desc: 'Bañador, pareo y chanclas' },
        { id: 3, name: 'Noche Flamenca', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', desc: 'Vestido o pantalón elegante con zapatos cómodos' },
      ],
      checklist: [
        { id: 1, text: 'Abanico para el calor', checked: false },
        { id: 2, text: 'Calzado para caminar mucho', checked: false },
        { id: 3, text: 'Protector solar fuerte', checked: false },
        { id: 4, text: 'Gafas de sol', checked: false },
        { id: 5, text: 'Botella reutilizable', checked: false },
        { id: 6, text: 'Vestimenta elegante para cena', checked: false },
      ]
    },
    places: [
      { id: 1, time: 'Mañana', name: 'La Sagrada Familia', desc: 'Obra maestra de Gaudí en Barcelona, reservar entrada', visited: false },
      { id: 2, time: 'Mediodía', name: 'La Boquería', desc: 'Mercado emblemático con productos frescos y tapas', visited: false },
      { id: 3, time: 'Tarde', name: 'Parque Güell', desc: 'Jardines mosaico de Gaudí con vistas panorámicas', visited: false },
      { id: 4, time: 'Noche', name: 'Tablao Flamenco', desc: 'Show de flamenco auténtico en el barrio gótico', visited: false },
    ],
    restaurants: [
      { id: 1, name: 'El Xampanyet', address: 'Barrio Born, Barcelona', dress: 'Casual', desc: 'Tapas catalanas tradicionales. Las anchoas y el cava de la casa son legendarios.', visited: false },
      { id: 2, name: 'Sobrino de Botín', address: 'Calle Cuchilleros, Madrid', dress: 'Smart Casual', desc: 'Restaurante más antiguo del mundo (1725). El cochinillo asado es sublime.', visited: false },
      { id: 3, name: 'Tickets Bar', address: 'Av. Paral·lel, Barcelona', dress: 'Smart Casual', desc: 'Tapas creativas de los hermanos Adrià. Reservar con meses de antelación.', visited: false },
    ],
    description: {
      climate: 'Veranos calurosos (30-40°C), especialmente en el sur. Barcelona tiene brisa marina. La siesta (14-17h) es real; muchas tiendas cierran.',
      culture: 'España vive intensamente: flamenco, fútbol, tapas y fiestas. La sobremesa (charla después de comer) es sagrada. No tengas prisa.',
      tips: 'La cena empieza a las 21-22h. Las tapas se piden de a poco. El "menú del día" (almuerzo) es excelente relación calidad-precio (~€12-15).',
      highlights: 'Barcelona: Gaudí y playas. Madrid: Prado y tapas en La Latina. Sevilla: Flamenco y la Giralda. Granada: La Alhambra al atardecer.'
    }
  },
  {
    destination: 'Italia',
    defaultName: 'Dolce Vita en Italia',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
    clothing: {
      outfits: [
        { id: 1, name: 'Paseo por Roma', image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=400&q=80', desc: 'Vestido veraniego o lino con zapatos cómodos' },
        { id: 2, name: 'Costa Amalfitana', image: 'https://images.unsplash.com/photo-1469307517101-0b99d8fb0c33?w=400&q=80', desc: 'Look playero mediterráneo con sombrero de paja' },
        { id: 3, name: 'Cena en Trastevere', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', desc: 'Elegante pero desenfadado: estilo italiano' },
      ],
      checklist: [
        { id: 1, text: 'Ropa que cubra hombros (iglesias)', checked: false },
        { id: 2, text: 'Zapatos cómodos para adoquines', checked: false },
        { id: 3, text: 'Protector solar', checked: false },
        { id: 4, text: 'Pañuelo para cubrir hombros', checked: false },
        { id: 5, text: 'Gafas de sol estilo italiano', checked: false },
      ]
    },
    places: [
      { id: 1, time: 'Mañana', name: 'Coliseo Romano', desc: 'Anfiteatro icónico del año 80 d.C. Reservar skip-the-line', visited: false },
      { id: 2, time: 'Mediodía', name: 'Fontana di Trevi', desc: 'Lanzar una moneda y pedir un deseo', visited: false },
      { id: 3, time: 'Tarde', name: 'Vaticano', desc: 'Capilla Sixtina y Plaza de San Pedro', visited: false },
      { id: 4, time: 'Noche', name: 'Trastevere', desc: 'Barrio bohemio con las mejores trattorias', visited: false },
    ],
    restaurants: [
      { id: 1, name: 'Da Enzo al 29', address: 'Trastevere, Roma', dress: 'Casual', desc: 'Trattoria auténtica. La cacio e pepe y la carbonara son divinas. Llegar temprano.', visited: false },
      { id: 2, name: 'Pizzeria Da Michele', address: 'Via Sersale, Nápoles', dress: 'Casual', desc: 'Solo margherita o marinara. La pizza más famosa de Italia (~€5).', visited: false },
      { id: 3, name: 'Osteria Francescana', address: 'Via Stella, Módena', dress: 'Elegante', desc: 'Del chef Massimo Bottura, 3 estrellas Michelin. Reservar con mucho tiempo.', visited: false },
    ],
    description: {
      climate: 'Veranos calurosos (28-35°C). Roma y el sur son especialmente cálidos en julio-agosto. Las mañanas son ideales para visitar.',
      culture: 'Italia es arte, historia y gastronomía. No pidas cappuccino después del mediodía (regla local). "La passeggiata" (paseo vespertino) es tradición.',
      tips: 'El "coperto" (cubierto) se cobra en restaurantes (~€2-3). El café se toma en la barra (más barato). Los museos suelen cerrar los lunes.',
      highlights: 'Roma: Historia en cada esquina. Florencia: El David y el Ponte Vecchio. Venecia: Góndolas y San Marcos. Costa Amalfitana: Paisajes de ensueño.'
    }
  },
  {
    destination: 'Grecia',
    defaultName: 'Odisea en Grecia',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
    clothing: {
      outfits: [
        { id: 1, name: 'Isla Griega', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=400&q=80', desc: 'Todo blanco y azul: vestido fluido y sandalias' },
        { id: 2, name: 'Explorador de Ruinas', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', desc: 'Shorts, camiseta transpirable y calzado deportivo' },
        { id: 3, name: 'Cena en Santorini', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80', desc: 'Look mediterráneo elegante para la puesta de sol' },
      ],
      checklist: [
        { id: 1, text: 'Protector solar resistente al agua', checked: false },
        { id: 2, text: 'Snorkel', checked: false },
        { id: 3, text: 'Ropa ultraliviana', checked: false },
        { id: 4, text: 'Sandalias de agua', checked: false },
        { id: 5, text: 'Sombrero de ala ancha', checked: false },
      ]
    },
    places: [
      { id: 1, time: 'Mañana', name: 'Acrópolis de Atenas', desc: 'El Partenón y templos del siglo V a.C.', visited: false },
      { id: 2, time: 'Mediodía', name: 'Plaka', desc: 'Barrio antiguo al pie de la Acrópolis con tabernas', visited: false },
      { id: 3, time: 'Tarde', name: 'Oia, Santorini', desc: 'Pueblo de cúpulas azules y casas blancas', visited: false },
      { id: 4, time: 'Atardecer', name: 'Caldera de Santorini', desc: 'El atardecer más fotografiado del mundo', visited: false },
    ],
    restaurants: [
      { id: 1, name: 'Ammoudi Fish Tavern', address: 'Oia, Santorini', dress: 'Casual', desc: 'Pescado fresco junto al mar. Bajar los 300 escalones vale la pena.', visited: false },
      { id: 2, name: 'Funky Gourmet', address: 'Atenas', dress: 'Elegante', desc: 'Cocina griega molecular con 2 estrellas Michelin. Menú degustación imperdible.', visited: false },
      { id: 3, name: 'To Kati Allo', address: 'Mykonos', dress: 'Casual', desc: 'Gyros y souvlaki legendarios. Simple pero perfecto.', visited: false },
    ],
    description: {
      climate: 'Veranos secos y calurosos (30-40°C). Las islas tienen brisa que alivia. Agosto es temporada alta; reservar todo con anticipación.',
      culture: 'Grecia es la cuna de la civilización occidental. La hospitalidad (filoxenia) es valor fundamental. Las cenas son largas y compartidas.',
      tips: 'Los ferries conectan las islas pero llénate con tiempo. En las tabernas, los platos se comparten. El ouzo se bebe con agua y meze.',
      highlights: 'Atenas: Acrópolis al amanecer. Santorini: Puestas de sol épicas. Mykonos: Playas y vida nocturna. Creta: Gastronomía y ruinas minoicas.'
    }
  },
  {
    destination: 'Japón',
    defaultName: 'Maravillas de Japón',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    clothing: {
      outfits: [
        { id: 1, name: 'Templos de Kyoto', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', desc: 'Ropa modesta y cómoda, zapatos fáciles de quitar' },
        { id: 2, name: 'Tokyo Street Style', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80', desc: 'Look urbano moderno: estilo Harajuku' },
        { id: 3, name: 'Cena Kaiseki', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=400&q=80', desc: 'Elegante y sobrio: la elegancia japonesa es minimalista' },
      ],
      checklist: [
        { id: 1, text: 'Paraguas compacto', checked: false },
        { id: 2, text: 'Zapatos sin cordones (templos)', checked: false },
        { id: 3, text: 'Ropa en capas', checked: false },
        { id: 4, text: 'Pañuelo de mano (no hay secadores)', checked: false },
        { id: 5, text: 'Riñonera o bolso seguro', checked: false },
        { id: 6, text: 'Adaptador eléctrico tipo A', checked: false },
      ]
    },
    places: [
      { id: 1, time: 'Mañana', name: 'Templo Senso-ji', desc: 'Templo budista más antiguo de Tokio en Asakusa', visited: false },
      { id: 2, time: 'Mediodía', name: 'Shibuya Crossing', desc: 'El cruce peatonal más famoso del mundo', visited: false },
      { id: 3, time: 'Tarde', name: 'Fushimi Inari', desc: 'Miles de torii rojos en Kyoto', visited: false },
      { id: 4, time: 'Noche', name: 'Dotonbori, Osaka', desc: 'Luces de neón y la mejor street food de Japón', visited: false },
    ],
    restaurants: [
      { id: 1, name: 'Ichiran Ramen', address: 'Shibuya, Tokio', dress: 'Casual', desc: 'Ramen tonkotsu en cabinas individuales. Personaliza tu caldo con el formulario.', visited: false },
      { id: 2, name: 'Sukiyabashi Jiro', address: 'Ginza, Tokio', dress: 'Elegante', desc: 'El sushi más famoso del mundo (documental "Jiro Dreams of Sushi"). Reservar imposible.', visited: false },
      { id: 3, name: 'Kichi Kichi', address: 'Kyoto', dress: 'Smart Casual', desc: 'Omurice (arroz con omelette) teatral. El chef hace un show al servirlo.', visited: false },
    ],
    description: {
      climate: 'Septiembre: fin del verano, agradable (22-28°C). Posibles tifones. Otoño temprano con follaje comenzando a cambiar.',
      culture: 'Japón combina tradición milenaria con tecnología de punta. La puntualidad es sagrada. El respeto y las reverencias son fundamentales.',
      tips: 'Japón es cash-heavy: lleva yenes. El Japan Rail Pass es esencial para el Shinkansen. Los konbini (7-Eleven) tienen comida increíble 24/7.',
      highlights: 'Tokio: Shibuya, Akihabara y Shinjuku. Kyoto: Templos dorados y geishas. Osaka: Capital gastronómica. Hiroshima: Parque Memorial de la Paz.'
    }
  }
];

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
                <p className="text-sm text-slate-400 mb-5">Elegí un destino para cargar toda la info</p>

                {/* Destination selector grid */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Destino</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {destinationCatalog.map(d => (
                      <button
                        key={d.destination}
                        onClick={() => handleSelectDestination(d.destination)}
                        className={`relative rounded-xl overflow-hidden h-20 group transition-all ${newTrip.destination === d.destination
                            ? 'ring-2 ring-blue-500 ring-offset-2 scale-[1.02]'
                            : 'hover:scale-[1.03] opacity-80 hover:opacity-100'
                          }`}
                      >
                        <img src={d.image} alt={d.destination} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                        <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xs">{d.destination}</span>
                        {newTrip.destination === d.destination && (
                          <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre del viaje</label>
                    <input
                      type="text"
                      value={newTrip.name}
                      onChange={e => setNewTrip(p => ({ ...p, name: e.target.value }))}
                      placeholder={newTrip.destination ? `Ej: Mi viaje a ${newTrip.destination}` : 'Primero elegí un destino'}
                      className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha del viaje</label>
                    <input
                      type="date"
                      value={newTrip.date}
                      onChange={e => setNewTrip(p => ({ ...p, date: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
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
