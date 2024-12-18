export interface ArtworkItem {
  id: string;
  title: string;
  artist: string;
  year: number;
  description: string;
  imageUrl: string;
  position: [number, number, number];
}