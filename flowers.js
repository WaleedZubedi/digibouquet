// ============================================================
// DigiBouquet - Flower & Asset Definitions
// Uses watercolor-style image assets for flowers
// Greenery images used as background layer
// ============================================================

const FLOWERS = [
    { id: 'rose', name: 'Rose', color: '#E06B8A', image: 'flower assests/rose-Binryhht.webp' },
    { id: 'peony', name: 'Peony', color: '#F5CBA7', image: 'flower assests/peony-BCw4kTvM.webp' },
    { id: 'tulip', name: 'Tulip', color: '#c94890', image: 'flower assests/tulip-DkVON6MI.webp' },
    { id: 'daisy', name: 'Daisy', color: '#FAFAFA', image: 'flower assests/daisy-CELBRpZ7.webp' },
    { id: 'lily', name: 'Lily', color: '#f0c0d0', image: 'flower assests/lily-Bn_fQTOU.webp' },
    { id: 'orchid', name: 'Orchid', color: '#c77dba', image: 'flower assests/orchid-DO40kC-2.webp' },
    { id: 'camellia', name: 'Camellia', color: '#e08080', image: 'flower assests/camellia-Doo1wvpa.webp' },
    { id: 'lotus', name: 'Lotus', color: '#f0a0b0', image: 'flower assests/lotus-DDF3I5iL.webp' }
];

// Greenery options (user picks one)
const GREENERY = [
    { id: 'greenery1', name: 'Leafy', image: 'flower assests/greenery 1.png' },
    { id: 'greenery2', name: 'Fern', image: 'flower assests/greenery 2.png' },
    { id: 'greenery3', name: 'Eucalyptus', image: 'flower assests/greenery 3.png' },
    { id: 'greenery4', name: 'Willow', image: 'flower assests/greenery 4.png' }
];

// Detail overlay that appears on every bouquet
const DETAIL_OVERLAY = 'flower assests/details 1.webp';

const CARD_TEMPLATES = [
    {
        id: 'classic',
        name: 'Classic Cream',
        bgStyle: 'linear-gradient(145deg, #fffaf5, #fff5f0)',
        borderColor: 'rgba(232, 108, 160, 0.15)',
        textColor: '#3a3a4a',
        accentColor: '#e86ca0',
        effect: 'none'
    },
    {
        id: 'torn-vintage',
        name: 'Torn Vintage',
        bgStyle: 'linear-gradient(145deg, #f5ead8, #ede0c8)',
        borderColor: 'rgba(160, 120, 80, 0.3)',
        textColor: '#5a4a38',
        accentColor: '#a08050',
        effect: 'torn'
    },
    {
        id: 'burnt-edge',
        name: 'Burnt Edge',
        bgStyle: 'linear-gradient(145deg, #f0e8d8, #e8dcc8)',
        borderColor: 'rgba(120, 80, 40, 0.3)',
        textColor: '#4a3a28',
        accentColor: '#8a6030',
        effect: 'burnt'
    },
    {
        id: 'rose-gold',
        name: 'Rose Gold',
        bgStyle: 'linear-gradient(145deg, #fff5f0, #fce8e0)',
        borderColor: 'rgba(200, 150, 120, 0.4)',
        textColor: '#5a3a3a',
        accentColor: '#c89878',
        effect: 'shimmer'
    },
    {
        id: 'watercolor',
        name: 'Watercolor Wash',
        bgStyle: 'linear-gradient(145deg, #f0f5ff, #e8f0ff, #f5f0ff)',
        borderColor: 'rgba(120, 140, 200, 0.2)',
        textColor: '#3a4060',
        accentColor: '#7888c0',
        effect: 'watercolor'
    },
    {
        id: 'midnight',
        name: 'Midnight',
        bgStyle: 'linear-gradient(145deg, #2a2a3a, #3a3a4a)',
        borderColor: 'rgba(200, 180, 140, 0.3)',
        textColor: '#e8e0d0',
        accentColor: '#c8b48a',
        effect: 'stars'
    },
    {
        id: 'kraft-paper',
        name: 'Kraft Card',
        bgStyle: 'linear-gradient(145deg, #d4b890, #c4a878)',
        borderColor: 'rgba(100, 70, 40, 0.3)',
        textColor: '#4a3520',
        accentColor: '#8a6030',
        effect: 'kraft'
    },
    {
        id: 'garden-party',
        name: 'Garden Party',
        bgStyle: 'linear-gradient(145deg, #f0f8f0, #e8f5e8)',
        borderColor: 'rgba(100, 160, 100, 0.2)',
        textColor: '#3a5a3a',
        accentColor: '#6aaa6a',
        effect: 'botanical'
    }
];

const BACKGROUND_TEMPLATES = [
    { id: 'soft-blush', name: 'Soft Blush', class: 'bg-soft-blush', animated: false, preview: 'linear-gradient(145deg, #fce4ec, #f8bbd0, #fce4ec)' },
    { id: 'midnight-garden', name: 'Midnight Garden', class: 'bg-midnight-garden', animated: true, preview: 'linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)' },
    { id: 'golden-hour', name: 'Golden Hour', class: 'bg-golden-hour', animated: true, preview: 'linear-gradient(145deg, #fff3e0, #ffe0b2, #ffcc80)' },
    { id: 'lavender-dream', name: 'Lavender Dream', class: 'bg-lavender-dream', animated: false, preview: 'linear-gradient(145deg, #f3e5f5, #e1bee7, #ce93d8)' },
    { id: 'spring-meadow', name: 'Spring Meadow', class: 'bg-spring-meadow', animated: true, preview: 'linear-gradient(145deg, #e8f5e9, #c8e6c9, #a5d6a7)' },
    { id: 'starlit', name: 'Starlit Night', class: 'bg-starlit', animated: true, preview: 'linear-gradient(145deg, #0d1b2a, #1b2838, #1a237e)' },
    { id: 'rose-mist', name: 'Rose Mist', class: 'bg-rose-mist', animated: true, preview: 'linear-gradient(145deg, #f8e8f0, #e8b0c8, #d4789a)' },
    { id: 'ocean-breeze', name: 'Ocean Breeze', class: 'bg-ocean-breeze', animated: true, preview: 'linear-gradient(145deg, #e0f2f1, #80cbc4, #4db6ac)' },
    { id: 'sunset-glow', name: 'Sunset Glow', class: 'bg-sunset-glow', animated: false, preview: 'linear-gradient(145deg, #fff3e0, #ffab91, #ff8a65)' },
    { id: 'cherry-blossom', name: 'Cherry Blossom', class: 'bg-cherry-blossom', animated: true, preview: 'linear-gradient(145deg, #fce4ec, #f48fb1, #f06292)' }
];
