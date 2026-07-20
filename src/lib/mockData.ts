import { StaticImageData } from "next/image";
import m1 from "../photo movie/movie1.jpg";
import m2 from "../photo movie/movie2.jpg";
import m3 from "../photo movie/movie3.jpg";
import m4 from "../photo movie/movie4.webp";
import m5 from "../photo movie/movie5.jpg";
import m6 from "../photo movie/movie6.jpg";
import m7 from "../photo movie/movie7.jpg";

export interface Movie {
  id: string;
  title: string;
  duration: string;
  quality: string;
  poster: string | StaticImageData;
  year: string;
  type: string;
  language: string;
  genre: string;
  description: string;
  isNew?: boolean;
  episodes?: {
    id: string;
    title: string;
    duration: string;
    image: string | StaticImageData;
  }[];
}

export const featuredMovies: Movie[] = [
  {
    id: "f1",
    title: "ដុកទ័រហែកចិត្ត",
    duration: "1h 30m",
    quality: "FHD",
    poster: m1,
    year: "២០២១",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "ភ័យរន្ធត់",
    description: "រឿងរ៉ាវគួរឱ្យខ្លាចដែលកើតឡើងនៅក្នុងមន្ទីរពេទ្យ...",
    isNew: true,
  },
  {
    id: "f2",
    title: "អ្នកនិពន្ធរឿងលាក់មុខ",
    duration: "1h 43m",
    quality: "FHD",
    poster: m2,
    year: "២០២៤",
    type: "រឿងភាគ",
    language: "ខ្មែរ",
    genre: "ទិព្វ",
    description: "កុមារា Danbi ដែលស្រមៃចង់ក្លាយជាអ្នកនិពន្ធសៀវភៅកុមារ...",
    episodes: [
      { id: "e1", title: "ភាគ 1: ក្តីស្រមៃ", duration: "45m", image: m2 },
      { id: "e2", title: "ភាគ 2: ការរកឃើញ", duration: "48m", image: m3 },
      { id: "e3", title: "ភាគ 3: ភាពប្រឈម", duration: "42m", image: m4 },
      { id: "e4", title: "ភាគ 4: សៀវភៅទីមួយ", duration: "50m", image: m5 },
      { id: "e5", title: "ភាគ 5: អាថ៌កំបាំង", duration: "46m", image: m6 },
    ]
  },
  {
    id: "f3",
    title: "សង្គ្រាមអាវុធ",
    duration: "2h 15m",
    quality: "FHD",
    poster: m3,
    year: "២០២៣",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "សកម្មភាព",
    description: "ការប្រយុទ្ធដ៏ស្វិតស្វាញ...",
  },
  {
    id: "f4",
    title: "វិញ្ញាណអាឃាត",
    duration: "1h 50m",
    quality: "HD",
    poster: m4,
    year: "២០២២",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "ភ័យរន្ធត់",
    description: "ផ្ទះខ្មោចលង...",
  }
];

export const trendingMovies: Movie[] = [
  {
    id: "t1",
    title: "អ្នកនិពន្ធរឿង...",
    duration: "1h 43m",
    quality: "FHD",
    poster: m2,
    year: "២០២៤",
    type: "រឿងភាគ",
    language: "ខ្មែរ",
    genre: "ទិព្វ",
    description: "កុមារា Danbi ដែលស្រមៃចង់ក្លាយជាអ្នកនិពន្ធសៀវភៅកុមារ...",
    episodes: [
      { id: "e1", title: "ភាគ 1: ក្តីស្រមៃ", duration: "45m", image: m2 },
      { id: "e2", title: "ភាគ 2: ការរកឃើញ", duration: "48m", image: m3 },
      { id: "e3", title: "ភាគ 3: ភាពប្រឈម", duration: "42m", image: m4 },
      { id: "e4", title: "ភាគ 4: សៀវភៅទីមួយ", duration: "50m", image: m5 },
      { id: "e5", title: "ភាគ 5: អាថ៌កំបាំង", duration: "46m", image: m6 },
    ]
  },
  {
    id: "t2",
    title: "ដុកទ័រហែកចិត្ត",
    duration: "1h 30m",
    quality: "FHD",
    poster: m1,
    year: "២០២១",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "ភ័យរន្ធត់",
    description: "",
  },
  {
    id: "t3",
    title: "ខ្សែកពេជ្រដំបូល...",
    duration: "2h 02m",
    quality: "HD",
    poster: m3,
    year: "២០២៣",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "សកម្មភាព",
    description: "",
  }
];

export const mostWatchedMovies: Movie[] = [
  {
    id: "w1",
    title: "អន្ទាក់មុជឈាមស្រស់",
    duration: "2h 11m",
    quality: "FHD",
    poster: m4,
    year: "២០២៣",
    type: "សកម្មភាព",
    language: "ខ្មែរ",
    genre: "សកម្មភាព",
    description: "",
  },
  {
    id: "w2",
    title: "បាហុបាលី វគ្គ២",
    duration: "2h 24m",
    quality: "FHD",
    poster: m1,
    year: "២០១៧",
    type: "សកម្មភាព",
    language: "ខ្មែរ",
    genre: "សកម្មភាព",
    description: "",
  },
  {
    id: "w3",
    title: "បាហុបាលី",
    duration: "2h 38m",
    quality: "FHD",
    poster: m2,
    year: "២០១5",
    type: "សកម្មភាព",
    language: "ខ្មែរ",
    genre: "សកម្មភាព",
    description: "",
  }
];

export const allMoviesList: Movie[] = [
  ...trendingMovies,
  ...mostWatchedMovies,
  {
    id: "a1",
    title: "កំពូលដាវទី 13",
    duration: "2h 13m",
    quality: "FHD",
    poster: m3,
    year: "២០២២",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "សកម្មភាព",
    description: "",
  },
  {
    id: "a2",
    title: "កូនជ្រូកពាសផ្កាយ",
    duration: "1h 38m",
    quality: "FHD",
    poster: m4,
    year: "២០២៣",
    type: "កំប្លែង",
    language: "ខ្មែរ",
    genre: "កំប្លែង",
    description: "",
  },
  {
    id: "a3",
    title: "សង្គ្រាមមនុស្សយន្ត",
    duration: "2h 08m",
    quality: "FHD",
    poster: m1,
    year: "២០២៤",
    type: "វិទ្យាសាស្ត្រ",
    language: "ខ្មែរ",
    genre: "វិទ្យាសាស្ត្រ",
    description: "",
  },
  {
    id: "a4",
    title: "រាត្រីរន្ធត់",
    duration: "1h 45m",
    quality: "HD",
    poster: m5,
    year: "២០២៣",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "ភ័យរន្ធត់",
    description: "រាត្រីដ៏ស្ងាត់ជ្រងំ...",
  },
  {
    id: "a5",
    title: "ស្នេហាក្នុងក្ដីស្រមៃ",
    duration: "2h 10m",
    quality: "FHD",
    poster: m6,
    year: "២០២៤",
    type: "រឿងភាគ",
    language: "ខ្មែរ",
    genre: "មនោសញ្ចេតនា",
    description: "រឿងរ៉ាវស្នេហាដ៏ផ្អែមល្ហែម...",
  },
  {
    id: "a6",
    title: "អ្នកប្រយុទ្ធឆ្លងភព",
    duration: "2h 30m",
    quality: "FHD",
    poster: m7,
    year: "២០២២",
    type: "ភាពយន្ត",
    language: "ខ្មែរ",
    genre: "វិទ្យាសាស្ត្រ",
    description: "ការធ្វើដំណើរឆ្លងពេលវេលា...",
  }
];
