import bollywoodImg from '../assets/imgi_9_image.webp';
import hiphopImg from '../assets/imgi_28_image.webp';
import contemporaryImg from '../assets/imgi_34_image.webp';
import classicalImg from '../assets/imgi_40_image.webp';
import zumbaImg from '../assets/imgi_49_image.webp';
import kidsImg from '../assets/imgi_66_image.webp';

export const stylesSectionData = {
  label: "MOVEMENT DISCIPLINES",
  headline: "Crafted for passion, stage, and stamina.",
  lede: "Whether mastering dynamic street isolations or exploring classical grace, each program is developed under master syllabus structures with personalized trainer feedback.",
  dragHint: "Drag or use the arrow keys to cycle cards",
  cards: [
    {
      id: "bollywood",
      name: "Bollywood",
      tag: "FREESTYLE & COMMERCIAL",
      summary: "Signature high-energy choreography merging Indian cinema expressions, folk vitality, and contemporary beats.",
      image: bollywoodImg,
      details: {
        intensity: "High Energy",
        focus: "Rhythm & Expression",
        mentor: "Yuvraaj Master & Core Faculty",
      },
    },
    {
      id: "hip-hop",
      name: "Hip-Hop",
      tag: "URBAN & STREET FOUNDATIONS",
      summary: "Popping, locking, tutting, and breaking with an authentic street groove and crisp musical isolation training.",
      image: hiphopImg,
      details: {
        intensity: "Dynamic Cardio",
        focus: "Grooves & Isolations",
        mentor: "Urban Crew Instructors",
      },
    },
    {
      id: "contemporary",
      name: "Contemporary",
      tag: "LYRICAL & MODERN FLOORWORK",
      summary: "Emotional floor transitions, suspended leaps, breath synchronization, and expansive storytelling choreography.",
      image: contemporaryImg,
      details: {
        intensity: "Technical & Fluid",
        focus: "Balance & Extension",
        mentor: "Contemporary Guild",
      },
    },
    {
      id: "classical",
      name: "Classical & Folk",
      tag: "BHARATANATYAM & TRADITIONAL",
      summary: "Adavus, mudras, Aramandi postures, and rhythmic jathis rooted in centuries of classical temple discipline.",
      image: classicalImg,
      details: {
        intensity: "Technical Rigor",
        focus: "Posture & Mudras",
        mentor: "National Awardee Mentors",
      },
    },
    {
      id: "zumba",
      name: "Zumba & Fitness",
      tag: "CARDIO & 'ONLY DIVAS' BATCH",
      summary: "High-octane Latin and global dance cardio, including our exclusive morning women's fitness batches.",
      image: zumbaImg,
      details: {
        intensity: "Maximum Cardio",
        focus: "Stamina & Tone",
        mentor: "Certified Zumba Trainers",
      },
    },
    {
      id: "kids",
      name: "Kids Batch",
      tag: "FOUNDATIONS & GYMNASTICS",
      summary: "Playful coordination, fundamental musicality, agility, and motor control for our youngest future performers.",
      image: kidsImg,
      details: {
        intensity: "Joyful & Structured",
        focus: "Agility & Confidence",
        mentor: "Junior Creative Faculty",
      },
    },
  ],
};
