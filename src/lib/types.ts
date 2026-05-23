export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  author: string;
  published_at: string;
  read_minutes: number;
  image_url: string | null;
  is_featured: boolean;
  body: string | null;
  body_html?: string | null;
};
