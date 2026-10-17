// Official Workshop Posters (Cropped directly from reference graphics)
import soundHealingPoster from '../assets/workshops/poster-sound-healing.png';
import sujithPoster from '../assets/workshops/poster-sujith.png';
import pavithraPoster from '../assets/workshops/poster-pavithra.png';
import ishwaryaPoster from '../assets/workshops/poster-ishwarya.png';

// Avatar Images
import avatarGuest from '../assets/workshops/avatar-guest.png';
import avatarSujith from '../assets/workshops/avatar-sujith.png';
import avatarPavithra from '../assets/workshops/avatar-pavithra.png';
import avatarIshwarya from '../assets/workshops/avatar-ishwarya.png';

// Fallback / legacy images
import semiclassicalPosterImg from '../assets/poster-semiclassical.webp';
import yuvraajAvatarImg from '../assets/Our-Story-1.jpg';
import aerialPosterImg from '../assets/aerial-workshop-poster.webp';
import studioHeroImg from '../assets/Right-side-hero.jpg';

export const workshopsData = [
  {
    id: 'sound-healing-workshop',
    title: 'SOUND HEALING WORKSHOP',
    subtitle: 'A deep relaxing experience. Let the sound bring you back.',
    instructor: 'Guest facilitators',
    instructorDisplay: 'Sound healing facilitators',
    instructorRole: 'Certified Sound Healing Practitioners',
    instructorImage: avatarGuest,
    image: soundHealingPoster,
    category: 'Wellness',
    type: 'Wellness',
    status: 'Upcoming',
    badgeText: 'TOMORROW',
    badgeVariant: 'tomorrow', // orange badge
    date: 'Sat, 17 Oct',
    dateFull: 'Saturday, 17 Oct 2026',
    dateRaw: '2026-10-17',
    dayNumber: 17,
    monthAbbr: 'OCT',
    time: '11:00 AM – 12:30 PM',
    timeOfDay: 'Morning',
    duration: '1.5 hours',
    location: 'Valasaravakkam (Main Studio)',
    venueName: 'RB Dance Court, Valasaravakkam (Court 1)',
    address: "Yuvraaj's Dance School • 116A, Chowdry Nagar Main Rd, Valasaravakkam, Chennai 600087",
    contactPhone: '+91 96555 51055',
    pricing: {
      entry: 799,
      earlyBird: 799,
      regular: 799,
      currency: '₹',
      label: 'Single entry',
      sublabel: 'Includes bowls and mats',
    },
    about:
      "A guided sound bath using singing bowls, held in our calm Court 1 space. You lie down or sit comfortably while the facilitators play layered tones around you, slowing the breath and quieting the mind.\n\nDesigned to break the week's mental stress, this session needs no experience. Just come in comfortable clothing and settle in.",
    learn: [
      'Guided breath settling',
      'Immersive singing-bowl sound bath',
      'Stillness and relaxation',
      'Simple practices to take home',
    ],
    whoShouldAttend: 'Adults and teens looking to unwind. No experience needed.',
    whatToBring: [
      'Comfortable, loose clothing',
      'A water bottle',
      'A light shawl if you get cold easily',
    ],
    instructorBio:
      'Sound healing practitioners working with singing bowls. Full facilitator profile to be added.',
    facilities: 'Wooden floor • Full AC • 5.1 sound',
  },
  {
    id: 'choreography-workshop-sujith',
    title: 'CHOREOGRAPHY WORKSHOP',
    subtitle: 'High-Energy Commercial Choreography Intensive',
    instructor: 'Sujith',
    instructorDisplay: 'Sujith',
    instructorRole: 'Celebrity Choreographer & Commercial Dancer',
    instructorImage: avatarSujith,
    image: sujithPoster,
    category: 'Choreography',
    type: 'Choreography',
    status: 'Upcoming',
    badgeText: 'IN 2 DAYS',
    badgeVariant: 'in2days', // orange badge
    date: 'Sun, 18 Oct',
    dateFull: 'Sunday, 18 Oct 2026',
    dateRaw: '2026-10-18',
    dayNumber: 18,
    monthAbbr: 'OCT',
    time: '2:00 PM – 4:00 PM',
    timeOfDay: 'Afternoon',
    duration: '2 Hours Intensive',
    location: 'Valasaravakkam (Main Studio)',
    venueName: 'RB Dance Court, Valasaravakkam',
    address: "Yuvraaj's Dance School • 116A, Chowdry Nagar Main Rd, Valasaravakkam, Chennai 600087",
    contactPhone: '+91 96555 51055',
    pricing: {
      entry: 699,
      earlyBird: 699,
      regular: 799,
      currency: '₹',
      label: 'Early bird slot',
      sublabel: 'Standard second slot is ₹799',
    },
    about:
      'Master high-energy cinematic choreography, sharp grooving textures, and musicality with celebrity choreographer Sujith. Learn camera-ready formations and stage presence techniques.',
    learn: [
      'Step-by-step breakdown of Sujith signature commercial routine',
      'Sharp groove isolations and musical syncopation drills',
      'Personal dynamic performance correction',
      'High-definition camera-ready group & solo reel recording',
    ],
    whoShouldAttend: 'Open for all dance enthusiasts, reels creators, and performers.',
    whatToBring: [
      'Comfortable sneaker dance shoes',
      'Energetic dance wear',
      'Hydration bottle and towel',
    ],
    instructorBio:
      'Sujith is a renowned choreographer and movement director known for high-octane commercial routines and viral music video performances.',
    facilities: 'Wooden floor • Full AC • 5.1 sound',
  },
  {
    id: 'choreography-workshop-pavithra',
    title: 'CHOREOGRAPHY WORKSHOP',
    subtitle: 'Feminine Lyrical & Cinematic Grace Intensive',
    instructor: 'Pavithra',
    instructorDisplay: 'Pavithra',
    song: 'Kalyani song',
    instructorRole: 'Celebrity Dancer & Choreographer',
    instructorImage: avatarPavithra,
    image: pavithraPoster,
    category: 'Choreography',
    type: 'Choreography',
    status: 'Upcoming',
    badgeText: 'BOOKING OPEN',
    badgeVariant: 'open', // green badge
    date: 'Sun, 25 Oct',
    dateFull: 'Sunday, 25 Oct 2026',
    dateRaw: '2026-10-25',
    dayNumber: 25,
    monthAbbr: 'OCT',
    time: '2:00 PM – 4:00 PM',
    timeOfDay: 'Afternoon',
    duration: '2 Hours Intensive',
    location: 'Valasaravakkam (Main Studio)',
    venueName: 'RB Dance Court, Valasaravakkam',
    address: "Yuvraaj's Dance School • 116A, Chowdry Nagar Main Rd, Valasaravakkam, Chennai 600087",
    contactPhone: '+91 96555 51055',
    pricing: {
      entry: 699,
      earlyBird: 699,
      regular: 799,
      currency: '₹',
      label: 'Early bird slot',
      sublabel: 'Standard second slot is ₹799',
    },
    about:
      'Immerse yourself in Pavithra’s viral choreography piece for the popular Kalyani Song. Focus on feminine posture, expressive abhinaya, lyrical transitions, and delicate hand accents.',
    learn: [
      'Full choreography breakdown of viral Kalyani song routine',
      'Expressive eye coordination and fluid neck & arm textures',
      'Cinematic framing and reel recording staging',
      'Personalized performance styling tips from Pavithra',
    ],
    whoShouldAttend: 'Intermediate and expressive dancers aiming for graceful cinematic mastery.',
    whatToBring: [
      'Comfortable semi-ethnic or lyrical dance wear',
      'Barefoot or lyrical dance socks',
      'Water bottle',
    ],
    instructorBio:
      'Pavithra is an acclaimed viral dancer and creator known for bringing lyrical grace and emotive cinematic beauty to modern Indian choreography.',
    facilities: 'Wooden floor • Full AC • 5.1 sound',
  },
  {
    id: 'choreography-workshop-ishwarya',
    title: 'CHOREOGRAPHY WORKSHOP',
    subtitle: 'Commercial & Cinematic Choreography Intensive',
    instructor: 'Ishwarya',
    instructorDisplay: 'Ishwarya Balabharthy',
    instructorRole: 'Celebrity Choreographer & Movement Artist',
    instructorImage: avatarIshwarya,
    image: ishwaryaPoster,
    category: 'Choreography',
    type: 'Choreography',
    status: 'Upcoming',
    badgeText: 'BOOKING OPEN',
    badgeVariant: 'open', // green badge
    date: 'Sun, 1 Nov',
    dateFull: 'Sunday, 1 Nov 2026',
    dateRaw: '2026-11-01',
    dayNumber: 1,
    monthAbbr: 'NOV',
    time: '11:00 AM – 1:00 PM',
    timeOfDay: 'Morning',
    duration: '2 Hours Intensive',
    location: 'Valasaravakkam (Main Studio)',
    venueName: 'RB Dance Court, Valasaravakkam',
    address: "Yuvraaj's Dance School • 116A, Chowdry Nagar Main Rd, Valasaravakkam, Chennai 600087",
    contactPhone: '+91 96555 51055',
    pricing: {
      entry: 699,
      earlyBird: 699,
      regular: 799,
      currency: '₹',
      label: 'Early bird slot',
      sublabel: 'Standard second slot is ₹799',
    },
    about:
      'Join celebrity choreographer Ishwarya Balabharthy for an exclusive 2-hour intensive Choreography Workshop at Rhythmic Beat Dance Court. Master infectious musical grooves, expressive performance dynamics, camera-ready transitions, and precision footwork designed for viral reels and stage mastery.',
    learn: [
      'Comprehensive step-by-step breakdown of signature viral routine',
      'Personalized correction on performance textures & musicality',
      'High-definition cinematic video reel recording included',
      'Certificate of Workshop Completion signed by Ishwarya & Guru Yuvraaj Jayakumar',
    ],
    whoShouldAttend: 'Open for all (beginners to advanced dancers).',
    whatToBring: [
      'Comfortable studio sneakers',
      'Breathable athletic wear',
      'Water bottle',
    ],
    instructorBio:
      'Ishwarya Balabharthy is a senior choreographer at RBDC and popular film choreography creator with extensive masterclass mentorship.',
    facilities: 'Wooden floor • Full AC • 5.1 sound',
  },
  {
    id: 'semiclassical-masterclass-yuvraaj',
    title: 'SEMICLASSICAL MASTERCLASS',
    subtitle: 'Signature Expressive & Footwork Intensive',
    instructor: 'Guru Yuvraaj',
    instructorDisplay: 'Guru Yuvraaj Jayakumar',
    instructorRole: 'Founder & Artistic Director, RBDC',
    instructorImage: yuvraajAvatarImg,
    image: semiclassicalPosterImg,
    category: 'Semiclassical',
    type: 'Choreography',
    status: 'Upcoming',
    badgeText: 'DIRECTOR INTENSIVE',
    badgeVariant: 'open',
    date: 'Sun, 15 Nov',
    dateFull: 'Sunday, 15 Nov 2026',
    dateRaw: '2026-11-15',
    dayNumber: 15,
    monthAbbr: 'NOV',
    time: '10:00 AM – 1:00 PM',
    timeOfDay: 'Morning',
    duration: '3 Hours Master Series',
    location: 'Valasaravakkam (Main Studio)',
    venueName: 'RB Dance Court, Valasaravakkam',
    address: 'No. 37, Narmatha Street, Palaniyappa Nagar, Valasaravakkam, Chennai - 600087',
    contactPhone: '+91 96555 51055',
    pricing: {
      entry: 899,
      earlyBird: 899,
      regular: 999,
      currency: '₹',
      label: 'Early bird slot',
      sublabel: 'Standard admission is ₹999',
    },
    about:
      'Immerse yourself in Master Yuvraaj Jayakumar’s signature blend of Indian classical mudras and fluid contemporary footwork. Discover the nuances of abhinaya, lyrical emotion, and lightning-fast rhythmic syncopations.',
    learn: [
      'Nuanced abhinaya training and expressive storytelling techniques',
      'Complex tatkar and fast footwork coordination exercises',
      'Stage presence coaching by Guru Yuvraaj Jayakumar',
    ],
    whoShouldAttend: 'Intermediate & Advanced classical/contemporary dancers.',
    whatToBring: ['Comfortable classical dance practice attire', 'Ankle bells if available', 'Water bottle'],
    instructorBio: 'Founder & artistic director of RBDC with 20+ years of stage and film excellence.',
    facilities: 'Wooden floor • Full AC • 5.1 sound',
  },
  {
    id: 'aerial-silk-acro-fluidity',
    title: 'AERIAL SILK WORKSHOP',
    subtitle: 'Suspension, Inversions & Aerial Conditioning',
    instructor: 'National Aerial Faculty',
    instructorDisplay: 'National Aerial Faculty & RBDC Riggers',
    instructorRole: 'Certified Aerial Artists & Riggers',
    instructorImage: studioHeroImg,
    image: aerialPosterImg,
    category: 'Aerial & Contemporary',
    type: 'Wellness',
    status: 'Upcoming',
    badgeText: 'CERTIFIED RIGGING',
    badgeVariant: 'open',
    date: 'Sun, 22 Nov',
    dateFull: 'Sunday, 22 Nov 2026',
    dateRaw: '2026-11-22',
    dayNumber: 22,
    monthAbbr: 'NOV',
    time: '4:00 PM – 7:00 PM',
    timeOfDay: 'Afternoon',
    duration: '3 Hours Workshop',
    location: 'Kolapakkam Branch',
    venueName: 'Kolapakkam High-Ceiling Arena',
    address: 'No. 03, Anna Salai, Padmavathi Nagar, Kolapakkam, Chennai - 600128',
    contactPhone: '+91 99441 26125',
    pricing: {
      entry: 1199,
      earlyBird: 1199,
      regular: 1499,
      currency: '₹',
      label: 'Early bird pass',
      sublabel: 'Standard admission is ₹1,499',
    },
    about:
      'Learn the art of graceful flight and body suspension. Certified aerialists guide you through core conditioning, foot wraps, hammock drops, inversions, and lyrical aerial poses with certified safety crash mats.',
    learn: [
      'Safety fundamentals, knot locking, and grip conditioning',
      'Beginner-friendly drops, climbing techniques, and aerial hammocks',
      'Full spotting assistance by licensed aerial riggers',
    ],
    whoShouldAttend: 'All levels interested in aerial strength and suspension flight.',
    whatToBring: ['Fitted leggings/track pants without zips', 'Sleeved t-shirt', 'Water bottle'],
    instructorBio: 'Licensed acrobats and national rigging specialists.',
    facilities: 'High ceiling arena • Certified safety harnesses • Crash mats',
  },
];

// Helper to get workshop by ID with alias fallback
export const getWorkshopById = (id) => {
  if (!id) return workshopsData[0];
  const clean = id.toLowerCase().replace(/-workshop$/, '').trim();
  return (
    workshopsData.find((w) => w.id === id) ||
    workshopsData.find((w) => w.id.toLowerCase().replace(/-workshop$/, '') === clean) ||
    workshopsData.find((w) => w.id.toLowerCase().includes(clean)) ||
    workshopsData[0]
  );
};

// Helper to get next upcoming workshop
export const getNextUpcomingWorkshop = () => {
  return (
    workshopsData.find((w) => w.status === 'Upcoming') ||
    workshopsData[0]
  );
};

export default workshopsData;
