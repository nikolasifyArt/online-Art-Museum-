import { ArtworkItem } from '../types/Gallery';

export const artworks: ArtworkItem[] = [
  {
    id: '1',
    title: 'Solitude',
    artist: 'Emma Thompson',
    year: 2023,
    description: 'A haunting portrayal of isolation through detailed pencil work',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1024',
    position: [-4, 1.6, 0],
  },
  {
    id: '2',
    title: 'Urban Dreams',
    artist: 'Michael Chen',
    year: 2024,
    description: 'Cityscape rendered entirely in graphite',
    imageUrl: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?auto=format&fit=crop&q=80&w=1024',
    position: [0, 1.6, -4],
  },
  {
    id: '3',
    title: 'Natural Harmony',
    artist: 'Sarah Williams',
    year: 2023,
    description: 'Botanical studies in precise pencil detail',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1024',
    position: [4, 1.6, 0],
  },
];