import bharatanatyamFig from '../assets/disciplines/bharatanatyam-hd.svg';
import bharatanatyamPng from '../assets/disciplines/bharatanatyam-hd.png';
import bharatanatyamTile from '../assets/disciplines/bharatanatyam-tile.png';

import westerndanceFig from '../assets/disciplines/westerndance-hd.svg';
import westerndancePng from '../assets/disciplines/westerndance-hd.png';
import westerndanceTile from '../assets/disciplines/westerndance-tile.png';

import zumbaFig from '../assets/disciplines/zumba-hd.svg';
import zumbaPng from '../assets/disciplines/zumba-hd.png';
import zumbaTile from '../assets/disciplines/zumba-tile.png';

import yogaFig from '../assets/disciplines/yoga-hd.svg';
import yogaPng from '../assets/disciplines/yoga-hd.png';
import yogaTile from '../assets/disciplines/yoga-tile.png';

import aerialyogaFig from '../assets/disciplines/aerialyoga-hd.svg';
import aerialyogaPng from '../assets/disciplines/aerialyoga-hd.png';
import aerialyogaTile from '../assets/disciplines/aerialyoga-tile.png';

import bungeeworkoutFig from '../assets/disciplines/bungeeworkout-hd.svg';
import bungeeworkoutPng from '../assets/disciplines/bungeeworkout-hd.png';
import bungeeworkoutTile from '../assets/disciplines/bungeeworkout-tile.png';

import gymnasticsFig from '../assets/disciplines/gymnastics-hd.svg';
import gymnasticsPng from '../assets/disciplines/gymnastics-hd.png';
import gymnasticsTile from '../assets/disciplines/gymnastics-tile.png';

import kalaripayattuFig from '../assets/disciplines/kalaripayattu-hd.svg';
import kalaripayattuPng from '../assets/disciplines/kalaripayattu-hd.png';
import kalaripayattuTile from '../assets/disciplines/kalaripayattu-tile.png';

export const DISCIPLINES = {
  bharatanatyam: {
    id: 'bharatanatyam',
    name: 'Bharata Natyam',
    tagline: 'Classical Heritage & Expressions',
    figure: bharatanatyamFig,
    figurePng: bharatanatyamPng,
    tile: bharatanatyamTile,
    themeColor: '#145A96', // Primary Blue
    accentColor: '#F28C28',
    bg: 'blue',
  },
  westerndance: {
    id: 'westerndance',
    name: 'Western Dance',
    tagline: 'Hip-Hop, Freestyle & Urban Grooves',
    figure: westerndanceFig,
    figurePng: westerndancePng,
    tile: westerndanceTile,
    themeColor: '#F28C28', // Accent Orange
    accentColor: '#145A96',
    bg: 'orange',
  },
  zumba: {
    id: 'zumba',
    name: 'Zumba',
    tagline: 'High-Energy Cardio & Latin Rhythms',
    figure: zumbaFig,
    figurePng: zumbaPng,
    tile: zumbaTile,
    themeColor: '#145A96',
    accentColor: '#F28C28',
    bg: 'blue',
  },
  yoga: {
    id: 'yoga',
    name: 'Yoga',
    tagline: 'Mind-Body Asanas, Balance & Flexibility',
    figure: yogaFig,
    figurePng: yogaPng,
    tile: yogaTile,
    themeColor: '#F28C28',
    accentColor: '#145A96',
    bg: 'orange',
  },
  aerialyoga: {
    id: 'aerialyoga',
    name: 'Aerial Yoga',
    tagline: 'Anti-Gravity Silk Suspension & Core Flow',
    figure: aerialyogaFig,
    figurePng: aerialyogaPng,
    tile: aerialyogaTile,
    themeColor: '#145A96',
    accentColor: '#F28C28',
    bg: 'blue',
  },
  bungeeworkout: {
    id: 'bungeeworkout',
    name: 'Bungee Workout',
    tagline: 'Defy Gravity with Dynamic Aerial Bounds',
    figure: bungeeworkoutFig,
    figurePng: bungeeworkoutPng,
    tile: bungeeworkoutTile,
    themeColor: '#F28C28',
    accentColor: '#145A96',
    bg: 'orange',
  },
  gymnastics: {
    id: 'gymnastics',
    name: 'Gymnastics',
    tagline: 'Acrobatic Precision, Flips & Body Control',
    figure: gymnasticsFig,
    figurePng: gymnasticsPng,
    tile: gymnasticsTile,
    themeColor: '#145A96',
    accentColor: '#F28C28',
    bg: 'blue',
  },
  kalaripayattu: {
    id: 'kalaripayattu',
    name: 'Kalaripayattu',
    tagline: 'Ancient Indian Martial Movement & Postures',
    figure: kalaripayattuFig,
    figurePng: kalaripayattuPng,
    tile: kalaripayattuTile,
    themeColor: '#F28C28',
    accentColor: '#145A96',
    bg: 'orange',
  },
};

export const DISCIPLINES_LIST = Object.values(DISCIPLINES);
