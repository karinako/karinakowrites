const WORDS_PER_MINUTE = 200;

export function readingTime(wordCount) {
  if (!wordCount || wordCount <= 0) return null;
  return `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} min read`;
}

export const writingPieces = [
  {
    slug: 'Blood-We-Cannot-Wash-Away',
    title: 'Blood We Cannot Wash Away',
    excerpt: 'Every time she was about to gut a fish, she first whacked the fish\'s head with the side of the knife blade to stun it. She said it was less cruel that way. Then she sliced their throat in between the gills.',
    publication: 'Strange Horizons',
    date: '2021-12',
    year: '2021',
    genre: 'Short Story',
    href: 'https://strangehorizons.com/wordpress/issue/20-december-2021/',
    wordCount: 3899,
    featured: true,
  },
  {
    slug: 'An-August-for-my-July-mother',
    title: 'An August for my July Mother',
    excerpt: 'My mother would like a man who didn\'t let his supplements expire. A man who looked after himself so that he could look after her. She would approve of how he was heating his dinner in a bowl covered with a plate. She\'d often said this minimises the radiation in food.',
    publication: 'Island',
    date: '2021-08',
    year: '2021',
    genre: 'Short Story',
    href: 'https://islandmag.com/read/an-august-for-my-july-mother-by-karina-ko',
    wordCount: 1385,
    featured: true,
  },
  {
    slug: 'Things-I-Used-to-Believe',
    title: 'Things I Used to Believe',
    excerpt: 'Winner of the 2018 Deborah Cass Prize',
    publication: 'Mascara Literary Review',
    date: '2019-03',
    year: '2019',
    genre: 'Short Story',
    href: 'https://www.mascarareview.com/things-i-used-to-believe-by-karina-ko/',
    wordCount: 1246,
    featured: true,
  },
];
