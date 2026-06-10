import { SourceConfig } from './types.ts';

export const SOURCES: SourceConfig[] = [
  new SourceConfig({
    name:"TCS Success Stories",
    type:"rss",
    url:"https://www.deleguescommerciaux.gc.ca/en/about-us/success-stories/?feed=rss2"
  }),
  new SourceConfig({
    name: 'How we made it in Africa',
    type: 'rss',
    url: 'https://www.howwemadeitinafrica.com/feed/',
  }),
  new SourceConfig({
    name: 'Disrupt Africa',
    type: 'rss',
    url: 'https://disruptafrica.com/feed/',
  }),
  new SourceConfig({
    name: 'Africa.com',
    type: 'rss',
    url: 'https://www.africa.com/latest-news/feed/',
  }),
  new SourceConfig({
    name: 'AllAfrica Business',
    type: 'rss',
    url: 'https://allafrica.com/business/',
  }),
  new SourceConfig({
    name: 'Standard Media Kenya Business',
    type: 'rss',
    url: 'https://www.standardmedia.co.ke/rss/business.php',
  }),
  new SourceConfig({
    name: 'African Development Bank',
    type: 'rss',
    url: 'https://www.afdb.org/en/news-and-events/rss',
  }),
];


export const CANADA_KEYWORDS = [
  "canada", "canadian", "toronto", "vancouver", "montreal",
  "calgary", "ottawa", "british columbia", "quebec", "alberta",
  "canadian company", "canadian investor", "canadian-led",
  "trade commissioner service", "canada's", "canadian venture",
];

export const FINANCING_KEYWORDS = [
  'equity',
  'venture',
  'series a',
  'series b',
  'series c',
  'seed round',
  'pre-seed',
  'angel',
  'funding round',
  'grant',
  'blended finance',
  'impact investment',
  'direct investment',
  'stake',
  'acquisition of',
  'buyout',
  'mezzanine',
  'first-loss',
  'patient capital',
  'convertible note',
  'invests in',
  'investment',
  'fundraise',
  'raises',
];

export const SME_KEYWORDS = [
  'sme',
  'small business',
  'startup',
  'entrepreneur',
  'micro-enterprise',
  'smallholder',
  'informal',
  'owner',
  'founder',
  'tech start',
  'agri-tech',
  'fintech',
  'health-tech',
  'women-led',
  'youth-led',
  'local company',
  'local manufacturer',
  'cooperative',
];

export const AFRICA_KEYWORDS = [
  'africa',
  'african',
  'nigeria',
  'kenya',
  'south africa',
  'ghana',
  'rwanda',
  'uganda',
  'tanzania',
  'ethiopia',
  'zambia',
  'mozambique',
  "côte d'ivoire",
  'senegal',
  'drc',
  'congo',
  'botswana',
  'malawi',
  'namibia',
  'zimbabwe',
  'mauritius',
  'egypt',
  'morocco',
  'tunisia',
];

export const DEBT_EXCLUDE = [
  'loan',
  'debt',
  'bond',
  'credit facility',
  'commercial paper',
  'treasury',
  'sovereign',
  'eurobond',
];
