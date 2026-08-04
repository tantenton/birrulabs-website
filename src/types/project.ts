export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'cloud' | 'ai' | 'other';
  imageUrl: string;
  tags: string[];
  launchDate: string;
  featured: boolean;
}
