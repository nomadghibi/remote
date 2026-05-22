
import { createWriteStream } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { locations } from './src/data/locations.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Define all the static routes for the site
const staticRoutes = [
  '/',
  '/diagnose-my-issue',
  '/price-estimator',
  '/quick-tech-help',
  '/rustdesk-support',
  '/residential-services',
  '/residential-support/pc-laptop-repairs',
  '/residential-support/virus-malware-removal',
  '/residential-support/software-troubleshooting',
  '/residential-support/data-recovery',
  '/residential-support/network-setup-support',
  '/residential-support/remote-support',
  '/residential-support/cloud-consulting',
  '/residential-support/tech-consultation',
  '/residential-support/computer-training',
  '/residential-support/home-office-setup',
  '/residential-support/backup-data-protection',
  '/residential-support/cybersecurity-home',
  '/residential-support/computer-repair',
  '/residential-support/wifi-internet-help',
  '/residential-support/email-printer-software',
  '/residential-support/pc-tune-up',
  '/residential-support/data-backup-transfer',
  '/residential-support/new-computer-setup',
  '/residential-support/senior-tech-help',
  '/business-services',
  '/business-solutions/it-consulting',
  '/business-solutions/network-setup',
  '/business-solutions/managed-it-services',
  '/business-solutions/data-recovery',
  '/business-solutions/cloud-solutions',
  '/business-solutions/cybersecurity',
  '/business-solutions/it-support',
  '/business-solutions/business-continuity',
  '/business-solutions/computer-training',
  '/business-solutions/digital-transformation',
  '/business-solutions/technical-support-maintenance',
  '/business-solutions/website-development',
  '/business-solutions/remote-help-desk',
  '/business-solutions/microsoft-365-support',
  '/business-solutions/user-device-management',
  '/business-solutions/backup-recovery-support',
  '/business-solutions/network-remote-access',
  '/services',
  '/contact',
  '/how-to',
  '/how-to/fix-broken-screen',
  '/how-to/know-your-computer-has-virus',
  '/how-to/setup-network',
  '/how-to/recover-data',
  '/how-to/use-remote-support',
  '/how-to/improve-performance',
  '/how-to/be-safe-online',
  '/how-to/set-up-email',
  '/blog',
  '/blog/computer-repair-palm-bay-fl-guide',
  '/blog/computer-repair-melbourne-fl-guide',
  '/blog/what-is-remote-computer-support',
  '/blog/remote-it-support-vs-on-site-it',
  '/blog/5-signs-you-need-remote-tech-support',
  '/blog/how-to-choose-remote-it-support-company-usa',
  '/blog/is-remote-computer-repair-safe',
  '/blog/computer-repairs-near-you-palm-bay-melbourne-guide',
  '/blog/ai-trends-2026-what-businesses-should-do-next',
  '/blog/5-tips-to-keep-your-computer-running-smoothly',
  '/blog/how-to-protect-your-computer-from-malware',
  '/blog/the-benefits-of-regular-data-backup',
  '/blog/seo-tips-for-your-tech-website',
  '/blog/optimizing-your-site-speed-for-better-performance',
  '/blog/creating-quality-content-for-better-seo',
  '/blog/essential-it-support-tips-for-small-businesses',
  '/blog/how-to-secure-your-business-network',
  '/blog/top-remote-it-support-tools-2024',
  '/blog/improving-personal-computer-performance',
  '/blog/role-of-it-consulting-in-business-growth',
  '/blog/best-practices-for-data-recovery-and-backup',
  '/blog/how-to-be-safe-online',
  '/blog/the-future-of-ai',
  '/blog/how-chatgpt-is-transforming-customer-support',
  '/book-service',
  '/subscribe',
  '/service-areas',
  '/pricing',
  '/about-us',
];

const locationRoutes = locations.map((location) => `/tech-support/${location.slug}`);
const locationServiceRoutes = [
  '/tech-support/palm-bay-fl/computer-repair',
  '/tech-support/melbourne-fl/computer-repair',
];
const allRoutes = [...new Set([...staticRoutes, ...locationRoutes, ...locationServiceRoutes])];

const getPriority = (route) => {
  if (route === '/') return 1.0;
  if (
    route === '/residential-services'
    || route === '/business-services'
    || route === '/pricing'
    || route === '/rustdesk-support'
    || route === '/contact'
    || route === '/service-areas'
  ) {
    return 0.9;
  }
  if (route.startsWith('/tech-support/')) return 0.9;
  if (route === '/blog' || route.startsWith('/blog/')) return 0.7;
  if (route.startsWith('/how-to/')) return 0.7;
  return 0.8;
};

// Transform static routes into sitemap entries
const links = allRoutes.map((route) => ({
  url: route,
  changefreq: route === '/' ? 'daily' : 'weekly',
  priority: getPriority(route),
}));

const sitemapPath = resolve(__dirname, 'public', 'sitemap.xml');

const sitemapStream = new SitemapStream({ hostname: 'https://24x7techoncall.com' });
const writeStream = createWriteStream(sitemapPath);

sitemapStream.pipe(writeStream);

links.forEach((link) => sitemapStream.write(link));
sitemapStream.end();

streamToPromise(sitemapStream).then(() => {
  console.log('Sitemap successfully created!');
}).catch((err) => {
  console.error('Error generating sitemap', err);
});
