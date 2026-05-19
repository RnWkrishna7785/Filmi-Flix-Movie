import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from '../models/Movie.js';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();

const moviesData = [
  {
    title: 'Dune: Part Two',
    description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfGhjyK2vdwMjbwZse29HMIvH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8NET4P7u5wlhgSEIE64t4Zq.jpg',
    genre: ['Action', 'Sci-Fi'],
    rating: 8.7,
    releaseDate: '2024-03-01',
    duration: '2h 46m',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    isCustom: true,
    cast: [
      {
        name: 'Timothée Chalamet',
        character: 'Paul Atreides',
        profilePath: 'https://image.tmdb.org/t/p/w185/BE74VqHszbWhQGf6Ccr5649Yc5.jpg',
      },
      {
        name: 'Zendaya',
        character: 'Chani',
        profilePath: 'https://image.tmdb.org/t/p/w185/y2w5G0oPzzn74Gxx7t67z873t5q.jpg',
      },
      {
        name: 'Rebecca Ferguson',
        character: 'Lady Jessica Atreides',
        profilePath: 'https://image.tmdb.org/t/p/w185/87jYskB8gB1K4688H1wzQhM6q6.jpg',
      },
    ],
  },
  {
    title: 'Oppenheimer',
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, showing the brilliance and the tragic burdens of a man who unlocked the secrets of the cosmos.",
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv2j188n1lhg07Vv525z44YhG.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fm6KqX2IOZUN5fgokr1KGZg4e0f.jpg',
    genre: ['Drama'],
    rating: 8.9,
    releaseDate: '2023-07-21',
    duration: '3h 0m',
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    isCustom: true,
    cast: [
      {
        name: 'Cillian Murphy',
        character: 'J. Robert Oppenheimer',
        profilePath: 'https://image.tmdb.org/t/p/w185/i85W5MA996166Jg67OIivUUiWHs.jpg',
      },
      {
        name: 'Emily Blunt',
        character: 'Katherine Oppenheimer',
        profilePath: 'https://image.tmdb.org/t/p/w185/n6V1B0l8bTqgJzYszP5a1Kz8F0w.jpg',
      },
      {
        name: 'Matt Damon',
        character: 'Leslie Groves',
        profilePath: 'https://image.tmdb.org/t/p/w185/elSlNgRwo5o6pq4g67436qq6.jpg',
      },
    ],
  },
  {
    title: 'Barbie',
    description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNugok5e570l264GIaso1KzpP.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ctMserH8g2Se26QLovewu4wUvsu.jpg',
    genre: ['Comedy'],
    rating: 7.2,
    releaseDate: '2023-07-21',
    duration: '1h 54m',
    trailerUrl: 'https://www.youtube.com/embed/pBk4NYhWNMM',
    isCustom: true,
    cast: [
      {
        name: 'Margot Robbie',
        character: 'Barbie',
        profilePath: 'https://image.tmdb.org/t/p/w185/pb45O4n46eZ6vM84zF8L8P6E5aW.jpg',
      },
      {
        name: 'Ryan Gosling',
        character: 'Ken',
        profilePath: 'https://image.tmdb.org/t/p/w185/lyZpyui5j6vM84zF8L8P6E5aW.jpg',
      },
    ],
  },
  {
    title: 'Deadpool & Wolverine',
    description: 'A listless Wade Wilson toils in civilian life. His days as the morally flexible mercenary, Deadpool, behind him. When his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant… reluctanter? Reluctantest?',
    poster: 'https://image.tmdb.org/t/p/w500/8cdWv6k7h2ONydfsFclw8JbiHCC.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/yD1111a4a1f11a4a1f11a4a1f11a4a.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/h8g2Se26QLovewu4wUvsu26QLov.jpg',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    rating: 8.2,
    releaseDate: '2024-07-26',
    duration: '2h 7m',
    trailerUrl: 'https://www.youtube.com/embed/73_1biulkYk',
    isCustom: true,
    cast: [
      {
        name: 'Ryan Reynolds',
        character: 'Wade Wilson / Deadpool',
        profilePath: 'https://image.tmdb.org/t/p/w185/8cdWv6k7h2ONydfsFclw8JbiHCC.jpg',
      },
      {
        name: 'Hugh Jackman',
        character: 'Logan / Wolverine',
        profilePath: 'https://image.tmdb.org/t/p/w185/5Y7VqHszbWhQGf6Ccr5649Yc5.jpg',
      },
    ],
  },
  {
    title: 'Furiosa: A Mad Max Saga',
    description: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.',
    poster: 'https://image.tmdb.org/t/p/w500/iADOw83Z1jU7w67wzoas1hi7953.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/wNAhu2jFjUvryAkx2VzZ6iV2EVL.jpg',
    genre: ['Action', 'Sci-Fi'],
    rating: 7.7,
    releaseDate: '2024-05-24',
    duration: '2h 28m',
    trailerUrl: 'https://www.youtube.com/embed/XJMuhwVlca4',
    isCustom: true,
    cast: [
      {
        name: 'Anya Taylor-Joy',
        character: 'Imperator Furiosa',
        profilePath: 'https://image.tmdb.org/t/p/w185/y2w5G0oPzzn74Gxx7t67z873t5q.jpg',
      },
      {
        name: 'Chris Hemsworth',
        character: 'Warlord Dementus',
        profilePath: 'https://image.tmdb.org/t/p/w185/BE74VqHszbWhQGf6Ccr5649Yc5.jpg',
      },
    ],
  },
];

const seedMovies = async () => {
  try {
    await connectDB();

    await Movie.deleteMany({ isCustom: true });
    console.log('🗑️ Existing custom movies deleted.');

    await Movie.insertMany(moviesData);
    console.log('✅ Seed movies inserted successfully!');

    const defaultCategories = [
      { name: 'Action', slug: 'action' },
      { name: 'Sci-Fi', slug: 'sci-fi' },
      { name: 'Drama', slug: 'drama' },
      { name: 'Comedy', slug: 'comedy' },
      { name: 'Horror', slug: 'horror' },
      { name: 'Thriller', slug: 'thriller' },
    ];

    for (const cat of defaultCategories) {
      try {
        const exists = await Category.findOne({ $or: [{ slug: cat.slug }, { name: cat.name }] });
        if (!exists) {
          await Category.create(cat);
        }
      } catch (catErr) {
        console.log(`⚠️ Category ${cat.name} already exists, skipping...`);
      }
    }
    console.log('🌱 Genres and Categories seeded successfully!');

    mongoose.connection.close();
    console.log('📡 Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedMovies();
