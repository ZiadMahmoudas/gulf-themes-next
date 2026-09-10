const unsplash = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const editorialImages = {
  hero: unsplash("photo-1498050108023-c5249f4df085", 1800),
  studio: unsplash("photo-1460925895917-afdab827c52f", 1600),
  code: unsplash("photo-1555066931-4365d14bab8c", 1400),
  laptop: unsplash("photo-1516321318423-f06f85e504b3", 1400),
  desk: unsplash("photo-1522202176988-66273c2fd55f", 1400),
  ui: unsplash("photo-1559028012-481c04fa702d", 1400),
};

const articlePool = [
  editorialImages.studio,
  editorialImages.code,
  editorialImages.laptop,
  editorialImages.ui,
  editorialImages.desk,
  editorialImages.hero,
];

const themePool = [
  unsplash("photo-1441986300917-64674bd600d8", 1500),
  unsplash("photo-1524758631624-e2822e304c36", 1500),
  unsplash("photo-1497366754035-f200968a6e72", 1500),
];

const pluginPool = [
  editorialImages.code,
  editorialImages.ui,
  editorialImages.laptop,
];

function stableIndex(value: string, length: number) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash % length;
}

export function articleImage(slug: string, image?: string | null) {
  return image?.trim() || articlePool[stableIndex(slug, articlePool.length)];
}

export function themeImage(slug: string, image?: string | null) {
  return image?.trim() || themePool[stableIndex(slug, themePool.length)];
}

export function pluginImage(slug: string, image?: string | null) {
  return image?.trim() || pluginPool[stableIndex(slug, pluginPool.length)];
}
