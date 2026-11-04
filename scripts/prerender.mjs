// Post-build step: writes crawler-readable static HTML (no JS needed) into dist/.
// - injects a static summary into dist/index.html #root (React replaces it on load)
// - generates dist/papers/<slug>/index.html with citation_* tags + ScholarlyArticle JSON-LD
// - generates dist/sitemap.xml
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { SITE, person, papers } from './site-data.mjs'

const dist = new URL('../dist/', import.meta.url)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`
const venueLine = (p) => `${p.venue}, ${p.year}`

const personLd = {
  '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/#person`,
  name: person.name, alternateName: person.alternateName, url: `${SITE}/`, image: `${SITE}/avatar.png`,
  description: person.description, jobTitle: person.jobTitle, email: `mailto:${person.email}`,
  affiliation: { '@type': 'CollegeOrUniversity', name: person.affiliation },
  alumniOf: person.alumniOf.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
  knowsAbout: person.knowsAbout, sameAs: person.sameAs,
}

function articleLd(p) {
  return {
    '@context': 'https://schema.org', '@type': 'ScholarlyArticle',
    headline: p.title, name: p.title, url: `${SITE}/papers/${p.slug}/`,
    datePublished: p.date.replace(/\//g, '-'),
    author: p.authors.map((name) => (name === person.name ? { '@id': `${SITE}/#person`, '@type': 'Person', name } : { '@type': 'Person', name })),
    identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: p.doi },
    sameAs: [`https://doi.org/${p.doi}`, p.url],
    isPartOf: p.isPreprint ? undefined : { '@type': 'Periodical', name: p.venue },
    publisher: { '@type': 'Organization', name: p.publisher },
    abstract: p.abstract.map(([, t]) => t).join(' '),
    image: `${SITE}${p.image}`,
  }
}

function bibtex(p) {
  const key = `zhao${p.year}${p.slug}`
  const f = [`  title = {${p.title}}`, `  author = {${p.authors.map((a) => { const s = a.split(' '); return `${s.pop()}, ${s.join(' ')}` }).join(' and ')}}`]
  if (p.isPreprint) f.push(`  journal = {bioRxiv}`)
  else f.push(`  journal = {${p.venue}}`)
  if (p.volume) f.push(`  volume = {${p.volume}}`)
  if (p.issue) f.push(`  number = {${p.issue}}`)
  if (p.article) f.push(`  pages = {${p.article}}`)
  f.push(`  year = {${p.year}}`, `  doi = {${p.doi}}`)
  return `@article{${key},\n${f.join(',\n')}\n}`
}

function citationMeta(p) {
  const m = [['citation_title', p.title], ...p.authors.map((a) => ['citation_author', a]), ['citation_publication_date', p.date]]
  if (p.isPreprint) m.push(['citation_publisher', 'bioRxiv'], ['citation_journal_title', 'bioRxiv'])
  else m.push(['citation_journal_title', p.venue], ['citation_publisher', p.publisher])
  if (p.volume) m.push(['citation_volume', p.volume])
  if (p.issue) m.push(['citation_issue', p.issue])
  if (p.article) m.push(['citation_firstpage', p.article])
  m.push(['citation_doi', p.doi], ['citation_abstract_html_url', `${SITE}/papers/${p.slug}/`])
  if (p.pmid) m.push(['citation_pmid', p.pmid])
  return m.map(([k, v]) => `<meta name="${k}" content="${esc(v)}">`).join('\n    ')
}

const css = `body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:820px;margin:0 auto;padding:24px 20px 64px;line-height:1.6;color:#1d1d1f;background:#fafafa}a{color:#0b5cad}h1{font-size:1.6rem;line-height:1.3}h2{font-size:1.15rem;margin-top:2rem}img{max-width:100%;height:auto;border-radius:12px}pre{background:#f0f0f3;padding:12px;border-radius:8px;overflow:auto;font-size:.85rem}.meta{color:#555}nav a{margin-right:14px}dt{font-weight:600;margin-top:.8rem}`

function paperPage(p) {
  const canonical = `${SITE}/papers/${p.slug}/`
  const desc = `${p.tldr} ${venueLine(p)}. First author: Yonghao Zhao.`
  const links = [[p.isPreprint ? 'Paper (bioRxiv)' : 'Paper', p.url], ['DOI', `https://doi.org/${p.doi}`], ['Code', p.code], ...(p.docs ? [['Docs', p.docs]] : []), ...(p.pmid ? [['PubMed', `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`]] : [])]
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(p.short)}: ${esc(p.title.replace(/^[^:]+:\s*/, ''))} | Yonghao Zhao</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${canonical}">
    <link rel="icon" type="image/png" href="/avatar.png">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(p.title)}">
    <meta property="og:description" content="${esc(p.tldr)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE}${p.image}">
    <meta name="twitter:card" content="summary_large_image">
    ${citationMeta(p)}
    ${jsonLd(articleLd(p))}
    <style>${css}</style>
  </head>
  <body>
    <nav><a href="/">← Yonghao Zhao</a>${papers.filter((x) => x !== p).map((x) => `<a href="/papers/${x.slug}/">${esc(x.short)}</a>`).join('')}</nav>
    <article>
      <h1>${esc(p.title)}</h1>
      <p class="meta">${p.authors.map((a) => (a === person.name ? `<strong>${esc(a)}</strong>` : esc(a))).join(', ')}<br><em>${esc(venueLine(p))}</em> · DOI <a href="https://doi.org/${p.doi}">${p.doi}</a></p>
      <p>${links.map(([l, h]) => `<a href="${h}">${esc(l)}</a>`).join(' · ')}</p>
      <img src="${p.image}" alt="${esc(p.short)} overview figure">
      <h2>TL;DR</h2>
      <p>${esc(p.tldr)}</p>
      <h2>Key results</h2>
      <ul>${p.keyResults.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      <h2>Abstract</h2>
      ${p.abstract.map(([h, t]) => `<p>${h ? `<strong>${esc(h)}.</strong> ` : ''}${esc(t)}</p>`).join('\n      ')}
      <h2>Cite</h2>
      <pre>${esc(bibtex(p))}</pre>
      <h2>FAQ</h2>
      <dl>${p.faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>
    </article>
    <footer><p class="meta">Yonghao Zhao (赵永浩) · Ph.D. student, Computational Bioscience, University of Colorado Anschutz · <a href="/">yonghaoz.com</a></p></footer>
  </body>
</html>
`
}

function homeStatic() {
  return `<main class="prerender-static" style="max-width:820px;margin:0 auto;padding:24px 20px;font-family:system-ui,sans-serif;line-height:1.6">
      <h1>Yonghao Zhao (赵永浩)</h1>
      <p>${esc(person.description)}</p>
      <h2>Publications</h2>
      <ul>${papers.map((p) => `<li><a href="/papers/${p.slug}/">${esc(p.title)}</a>. ${esc(p.authors.join(', '))}. <em>${esc(venueLine(p))}</em>. ${esc(p.tldr)}</li>`).join('')}</ul>
      <p>Profiles: ${person.sameAs.map((u) => `<a href="${u}">${esc(u.replace(/^https:\/\/(www\.)?/, ''))}</a>`).join(' · ')} · <a href="mailto:${person.email}">${person.email}</a></p>
    </main>`
}

let index = await readFile(new URL('index.html', dist), 'utf8')
if (!index.includes('<div id="root"></div>')) throw new Error('root div not found')
index = index.replace('<div id="root"></div>', `<div id="root">${homeStatic()}</div>`)
index = index.replace('</head>', `  ${jsonLd(personLd)}\n  </head>`)
await writeFile(new URL('index.html', dist), index)

for (const p of papers) {
  const dir = new URL(`papers/${p.slug}/`, dist)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), paperPage(p))
}

const today = new Date().toISOString().slice(0, 10)
const urls = ['/', ...papers.map((p) => `/papers/${p.slug}/`)]
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`)
console.log(`prerender: index + ${papers.length} paper pages + sitemap`)
