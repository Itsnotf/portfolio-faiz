// Tells Bing (which feeds ChatGPT search) and other IndexNow engines about every URL in the live sitemap.
// Run after each deploy: NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run indexnow
const KEY = '79bb04d0197374739b0129cae233badc'; // public by design: https://www.indexnow.org/documentation
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
if (!site || site.includes('example.com')) {
  console.error('Set NEXT_PUBLIC_SITE_URL to the live domain first.');
  process.exit(1);
}

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) {
  console.error('No URLs found in the sitemap.');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
