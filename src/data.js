const clothingTemplates = {
    warm: {
        outfits: [
            { id: 1, name: 'Frescura Tropical', image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=400', desc: 'Linos, colores claros y sandalias.' },
            { id: 2, name: 'Exploración Diurna', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400', desc: 'Shorts cómodos y zapatillas transpirables.' }
        ],
        checklist: [
            { id: 1, text: 'Protector solar', checked: false },
            { id: 2, text: 'Gafas de sol', checked: false },
            { id: 3, text: 'Traje de baño', checked: false },
            { id: 4, text: 'Sombrero', checked: false }
        ]
    },
    cold: {
        outfits: [
            { id: 1, name: 'Abrigo Urbano', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', desc: 'Tapado, bufanda y botas.' },
            { id: 2, name: 'Capas Inteligentes', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', desc: 'Térmica, sweater y campera rompevientos.' }
        ],
        checklist: [
            { id: 1, text: 'Guantes', checked: false },
            { id: 2, text: 'Bufanda', checked: false },
            { id: 3, text: 'Botas impermeables', checked: false },
            { id: 4, text: 'Labial hidratante', checked: false }
        ]
    }
};

const genericPlaces = (country) => [
    { id: 1, time: 'Mañana', name: `Centro Histórico de ${country}`, desc: 'Caminata por los puntos emblemáticos.', visited: false },
    { id: 2, time: 'Tarde', name: `Museo Nacional`, desc: 'Inmersión en la cultura local.', visited: false },
    { id: 3, time: 'Noche', name: `Cena Tradicional`, desc: 'Probando los sabores típicos.', visited: false }
];

const genericRestaurants = (country) => [
    { id: 1, name: `Bistró Central`, address: 'Calle Principal 123', dress: 'Casual', desc: 'El lugar más recomendado por locales.', visited: false },
    { id: 2, name: `Terraza Real`, address: 'Plaza Mayor 45', dress: 'Elegante', desc: 'Vistas increíbles y comida de autor.', visited: false }
];

export const destinationCatalog = [
    {
        destination: 'Uruguay',
        defaultName: 'Aventura en Uruguay',
        image: 'https://images.unsplash.com/photo-1598981457915-aea220950616?w=800',
        clothing: clothingTemplates.warm,
        places: genericPlaces('Uruguay'),
        restaurants: genericRestaurants('Uruguay'),
        description: { climate: 'Templado.', culture: 'Mate y calidez.', tips: 'Usá tarjeta.', highlights: 'La Rambla.' }
    },
    {
        destination: 'Portugal',
        defaultName: 'Descubriendo Portugal',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
        clothing: clothingTemplates.warm,
        places: genericPlaces('Portugal'),
        restaurants: genericRestaurants('Portugal'),
        description: { climate: 'Mediterráneo.', culture: 'Azulejos y fados.', tips: 'Caminá Alfama.', highlights: 'Sintra.' }
    },
    {
        destination: 'España',
        defaultName: 'España Inolvidable',
        image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800',
        clothing: clothingTemplates.warm,
        places: genericPlaces('España'),
        restaurants: genericRestaurants('España'),
        description: { climate: 'Sol constante.', culture: 'Tapas y fiesta.', tips: 'Cena tarde.', highlights: 'Gaudí.' }
    },
    {
        destination: 'Italia',
        defaultName: 'Dolce Vita en Italia',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
        clothing: clothingTemplates.warm,
        places: genericPlaces('Italia'),
        restaurants: genericRestaurants('Italia'),
        description: { climate: 'Cálido.', culture: 'Arte y pasta.', tips: 'No pidas cappuccino tarde.', highlights: 'El Coliseo.' }
    },
    {
        destination: 'Grecia',
        defaultName: 'Odisea en Grecia',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
        clothing: clothingTemplates.warm,
        places: genericPlaces('Grecia'),
        restaurants: genericRestaurants('Grecia'),
        description: { climate: 'Caluroso.', culture: 'Mitología y mar.', tips: 'Ferries a tiempo.', highlights: 'Santorini.' }
    },
    {
        destination: 'Japón',
        defaultName: 'Maravillas de Japón',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
        clothing: clothingTemplates.warm,
        places: genericPlaces('Japón'),
        restaurants: genericRestaurants('Japón'),
        description: { climate: 'Variable.', culture: 'Respeto y neón.', tips: 'JR Pass esencial.', highlights: 'Kyoto.' }
    },
    { destination: 'Francia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800' },
    { destination: 'Alemania', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800' },
    { destination: 'Reino Unido', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800' },
    { destination: 'Holanda', image: 'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=800' },
    { destination: 'Bélgica', image: 'https://images.unsplash.com/photo-1568512125667-873b0a793a38?w=800' },
    { destination: 'Suiza', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800' },
    { destination: 'Austria', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800' },
    { destination: 'Suecia', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800' },
    { destination: 'Noruega', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800' },
    { destination: 'Dinamarca', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800' },
    { destination: 'Islandia', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800' },
    { destination: 'Croacia', image: 'https://images.unsplash.com/photo-1555990540-02a2063a1de7?w=800' },
    { destination: 'República Checa', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800' },
    { destination: 'Hungría', image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800' },
    { destination: 'Polonia', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800' },
    { destination: 'Turquía', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800' },
    { destination: 'Egipto', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a7447?w=800' },
    { destination: 'Marruecos', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800' },
    { destination: 'Sudáfrica', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800' },
    { destination: 'Kenia', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800' },
    { destination: 'Tailandia', image: 'https://images.unsplash.com/photo-1528181304800-2f140819898f?w=800' },
    { destination: 'Vietnam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800' },
    { destination: 'Indonesia', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800' },
    { destination: 'Singapur', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800' },
    { destination: 'Corea del Sur', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800' },
    { destination: 'Australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800' },
    { destination: 'Nueva Zelanda', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800' },
    { destination: 'Estados Unidos', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800' },
    { destination: 'Canadá', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800' },
    { destination: 'México', image: 'https://images.unsplash.com/photo-1518105779142-d975fb23a9db?w=800' },
    { destination: 'Colombia', image: 'https://images.unsplash.com/photo-1583351619272-c5f9a691f11c?w=800' },
    { destination: 'Perú', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800' },
    { destination: 'Brasil', image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800' },
    { destination: 'Argentina', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce193b?w=800' },
    { destination: 'Chile', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800' },
    { destination: 'Ecuador', image: 'https://images.unsplash.com/photo-1590402444816-0f283ca1593e?w=800' },
    { destination: 'Costa Rica', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800' },
    { destination: 'Panamá', image: 'https://images.unsplash.com/photo-1588661803408-724bc2498522?w=800' },
    { destination: 'Cuba', image: 'https://images.unsplash.com/photo-1500051638674-bb996a0c279c?w=800' },
    { destination: 'República Dominicana', image: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800' }
].map(d => ({
    ...d,
    defaultName: d.defaultName || `Aventura en ${d.destination}`,
    clothing: d.clothing || (['Islandia', 'Noruega', 'Suecia', 'Suiza', 'Austria'].includes(d.destination) ? clothingTemplates.cold : clothingTemplates.warm),
    places: d.places || genericPlaces(d.destination),
    restaurants: d.restaurants || genericRestaurants(d.destination),
    description: d.description || {
        climate: 'Información general sobre el clima, recomendado revisar temporalidad.',
        culture: `Inmersión en las tradiciones de ${d.destination}.`,
        tips: 'Explorá como un local.',
        highlights: 'Vistas memorables y puntos icónicos.'
    }
}));
