// Post-build step: writes crawler-readable static HTML (no JS needed) into dist/.
// - injects a static summary into dist/index.html #root (React replaces it on load)
// - generates dist/papers/<slug>/index.html with citation_* tags + ScholarlyArticle JSON-LD
// - generates dist/sitemap.xml
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { SITE, person, papers, profile } from './site-data.mjs'

const dist = new URL('../dist/', import.meta.url)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`
const venueLine = (p) => `${p.venue}, ${p.year}`

const personLd = {
  '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/#person`,
  name: person.name, url: `${SITE}/about/yonghao-zhao/`, image: `${SITE}/avatar.png`,
  description: person.description, jobTitle: person.jobTitle, email: `mailto:${person.email}`,
  affiliation: { '@type': 'CollegeOrUniversity', name: person.affiliation },
  alumniOf: person.alumniOf.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
  knowsAbout: person.knowsAbout,
  sameAs: [...new Set([...(person.sameAs || []), `${SITE}/`, `${SITE}/about/yonghao-zhao/`])],
}

function articleLd(p) {
  const sameAs = [...new Set([`https://doi.org/${p.doi}`, p.url, p.code, p.archive].filter(Boolean))]
  const ld = {
    '@context': 'https://schema.org', '@type': 'ScholarlyArticle',
    headline: p.title, name: p.title, url: `${SITE}/papers/${p.slug}/`,
    datePublished: p.date.replace(/\//g, '-'),
    dateModified: (p.dateModified || p.date).replace(/\//g, '-'),
    author: p.authors.map((name) => (name === person.name ? { '@id': `${SITE}/#person`, '@type': 'Person', name } : { '@type': 'Person', name })),
    identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: p.doi },
    sameAs,
    isPartOf: p.isPreprint ? undefined : { '@type': 'Periodical', name: p.venue },
    publisher: { '@type': 'Organization', name: p.publisher },
    abstract: p.abstract.map(([, t]) => t).join(' '),
    description: p.tldr,
    image: `${SITE}${p.image}`,
  }
  if (p.keywords?.length) ld.keywords = p.keywords.join(', ')
  if (p.about?.length) ld.about = p.about.map((name) => ({ '@type': 'Thing', name }))
  if (p.code) ld.codeRepository = p.code
  return ld
}

function faqLd(p) {
  if (!p.faq?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
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
  f.push(`  year = {${p.year}}`, `  doi = {${p.doi}}`, `  url = {https://doi.org/${p.doi}}`)
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

const css = `body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:820px;margin:0 auto;padding:24px 20px 64px;line-height:1.6;color:#1d1d1f;background:#fafafa}a{color:#0b5cad}h1{font-size:1.6rem;line-height:1.3}h2{font-size:1.15rem;margin-top:2rem}h3{font-size:1rem;margin-top:1.2rem}img{max-width:100%;height:auto;border-radius:12px}pre{background:#f0f0f3;padding:12px;border-radius:8px;overflow:auto;font-size:.85rem}.meta{color:#555}nav a{margin-right:14px}dt{font-weight:600;margin-top:.8rem}.scope,.answer-block,.limitations{background:#f0f4f8;border-left:4px solid #0b5cad;padding:14px 16px;border-radius:8px;margin:1rem 0}.answer-block p:last-child,.scope p:last-child{margin-bottom:0}.updated{color:#666;font-size:.85rem;margin-top:.6rem}.usecase dt,.related dt{font-weight:600;margin-top:1rem}table{width:100%;border-collapse:collapse;font-size:.92rem;margin:1rem 0}th,td{border:1px solid #ddd;padding:8px 10px;text-align:left;vertical-align:top}th{background:#f0f0f3}ol.steps{padding-left:1.2rem}ol.steps li{margin:.4rem 0}`

function paperPage(p) {
  const canonical = `${SITE}/papers/${p.slug}/`
  const desc = p.metaDescription || `${p.tldr} ${venueLine(p)}. First author: Yonghao Zhao.`
  const links = [
    [p.isPreprint ? 'Paper (bioRxiv)' : 'Paper', p.url],
    ['DOI', `https://doi.org/${p.doi}`],
    ['Code', p.code],
    ...(p.archive ? [['Archive', p.archive]] : []),
    ...(p.docs ? [['Docs', p.docs]] : []),
    ...(p.pmid ? [['PubMed', `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`]] : []),
  ]
  const keywordMeta = p.keywords?.length
    ? `\n    <meta name="keywords" content="${esc(p.keywords.join(', '))}">`
    : ''
  const faqBlock = faqLd(p)
  const updated = p.lastUpdated || p.dateModified || (p.date || '').replace(/\//g, '-')
  const updatedLine = updated ? `<p class="updated">Last updated: ${esc(updated)}</p>` : ''

  const scopeHeading = p.scope?.heading || `Who is ${p.short} for — and who is it not for?`
  const scopeBlock = p.scope
    ? `\n      <h2>${esc(scopeHeading)}</h2>\n      <div class="scope">\n        <h3>Problem</h3>\n        <p>${esc(p.scope.problem)}</p>\n        <h3>For</h3>\n        <p>${esc(p.scope.forWhom)}</p>\n        <h3>Not for</h3>\n        <p>${esc(p.scope.notForWhom)}</p>\n        ${updatedLine}\n      </div>`
    : (p.positioning
      ? `\n      <h2>What ${esc(p.short)} is for</h2>\n      <p class="scope">${esc(p.positioning)}</p>`
      : '')

  const geoBlocks = p.geoSections?.length
    ? p.geoSections.map((s) => `\n      <h2>${esc(s.heading)}</h2>\n      <div class="answer-block">\n        <p>${esc(s.body)}</p>\n        ${updatedLine}\n      </div>`).join('')
    : ''

  const useCases = (!p.geoSections?.length && p.useCases?.length)
    ? `\n      <h2>Use cases / questions this answers</h2>\n      <dl class="usecase">${p.useCases.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>`
    : ''

  const stepsHeading = p.stepsHeading || `What are the ${p.short} pipeline steps?`
  const stepsBlock = p.steps?.length
    ? `\n      <h2>${esc(stepsHeading)}</h2>\n      <div class="answer-block">\n        <ol class="steps">${p.steps.map(([t, d]) => `<li><strong>${esc(t)}.</strong> ${esc(d)}</li>`).join('')}</ol>\n        ${updatedLine}\n      </div>`
    : ''

  const compareHeading = p.comparisonTable?.heading || `How does ${p.short} compare with related methods?`
  const table = p.comparisonTable
    ? `\n      <h2>${esc(compareHeading)}</h2>\n      <div class="answer-block">\n        ${p.comparisonTable.lead ? `<p>${esc(p.comparisonTable.lead)}</p>` : ''}\n        <p class="meta">${esc(p.comparisonTable.caption)}</p>\n        <table>\n          <thead><tr>${p.comparisonTable.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>\n          <tbody>${p.comparisonTable.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>\n        </table>\n        ${updatedLine}\n      </div>`
    : ''

  const related = (!p.comparisonTable && p.relatedMethods?.length)
    ? `\n      <h2>Related methods</h2>\n      <p class="meta">Fair comparison for literature search and AI overviews — complementary tools, not ranked benchmarks.</p>\n      <dl class="related">${p.relatedMethods.map(([n, a]) => `<dt>${esc(n)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>`
    : ''

  const limitations = p.limitations?.length
    ? `\n      <h2>Limitations</h2>\n      <div class="limitations">\n        <ul>${p.limitations.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>\n        ${updatedLine}\n      </div>`
    : ''

  const keyResults = p.keyResults?.length
    ? `\n      <h2>Key results</h2>\n      <ul>${p.keyResults.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`
    : ''

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(p.short)}: ${esc(p.title.replace(/^[^:]+:\s*/, ''))} | Yonghao Zhao</title>
    <meta name="description" content="${esc(desc)}">${keywordMeta}
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
    ${faqBlock ? jsonLd(faqBlock) : ''}
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
      <p>${esc(p.tldr)}</p>${scopeBlock}${geoBlocks}${useCases}${stepsBlock}${table}${related}${keyResults}
      <h2>Abstract</h2>
      ${p.abstract.map(([h, t]) => `<p>${h ? `<strong>${esc(h)}.</strong> ` : ''}${esc(t)}</p>`).join('\n      ')}${limitations}
      <h2>Cite</h2>
      <pre>${esc(bibtex(p))}</pre>
      <h2>FAQ</h2>
      <dl>${p.faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>
      ${updatedLine}
    </article>
    <footer><p class="meta">Yonghao Zhao · Ph.D. student, Computational Bioscience, University of Colorado Anschutz · <a href="/">yonghaoz.com</a></p></footer>
  </body>
</html>
`
}

function profilePage() {
  const canonical = `${SITE}/about/yonghao-zhao/`
  const updated = profile.lastUpdated || '2026-11-06'
  const updatedLine = `<p class="updated">Last updated: ${esc(updated)}</p>`
  const faq = profile.faq || []
  const faqBlock = faq.length ? faqLd({ faq }) : null
  const personPageLd = {
    ...personLd,
    url: canonical,
    mainEntityOfPage: canonical,
  }
  const geoBlocks = (profile.geoSections || []).map((s) => `\n      <h2>${esc(s.heading)}</h2>\n      <div class="answer-block">\n        <p>${esc(s.body)}</p>\n        ${updatedLine}\n      </div>`).join('')
  const scope = profile.scope
    ? `\n      <h2>${esc(profile.scope.heading || 'Who is this profile for — and who is it not for?')}</h2>\n      <div class="scope">\n        <h3>Problem</h3>\n        <p>${esc(profile.scope.problem)}</p>\n        <h3>For</h3>\n        <p>${esc(profile.scope.forWhom)}</p>\n        <h3>Not for</h3>\n        <p>${esc(profile.scope.notForWhom)}</p>\n        ${updatedLine}\n      </div>`
    : ''
  const papersList = `\n      <h2>What papers has Yonghao Zhao published?</h2>\n      <div class="answer-block">\n        <ul>${papers.map((p) => `<li><strong>${esc(p.short)}</strong> — <a href="/papers/${p.slug}/">${esc(p.title)}</a>. <em>${esc(venueLine(p))}</em>. DOI <a href="https://doi.org/${p.doi}">${esc(p.doi)}</a>. ${esc(p.tldr)}</li>`).join('')}</ul>\n        ${updatedLine}\n      </div>`
  const links = `\n      <h2>Where can I find Yonghao Zhao online?</h2>\n      <div class="answer-block">\n        <ul>${person.sameAs.map((u) => `<li><a href="${u}">${esc(u)}</a></li>`).join('')}<li>Email: <a href="mailto:${person.email}">${esc(person.email)}</a></li><li>Site: <a href="${SITE}/">${SITE}/</a></li></ul>\n        ${updatedLine}\n      </div>`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yonghao Zhao — Computational Bioscience Ph.D. student | CU Anschutz</title>
    <meta name="description" content="${esc(profile.metaDescription || person.description)}">
    <link rel="canonical" href="${canonical}">
    <link rel="icon" type="image/png" href="/avatar.png">
    <meta property="og:type" content="profile">
    <meta property="og:title" content="Yonghao Zhao">
    <meta property="og:description" content="${esc(person.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE}/avatar.png">
    <meta name="twitter:card" content="summary">
    ${jsonLd(personPageLd)}
    ${faqBlock ? jsonLd(faqBlock) : ''}
    <style>${css}</style>
  </head>
  <body>
    <article>
      <h1>Yonghao Zhao</h1>
      <p class="meta">${esc(person.jobTitle)} · ${esc(person.affiliation)}</p>
      <p>${esc(person.description)}</p>${scope}${geoBlocks}${papersList}${links}
      <h2>FAQ</h2>
      <dl>${faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>
      ${updatedLine}
    </article>
    <footer><p class="meta">Yonghao Zhao · Ph.D. student, Computational Bioscience, University of Colorado Anschutz · ${SITE}</p></footer>
  </body>
</html>
`
}


function homeStatic() {
  return `<main class="prerender-static" style="max-width:820px;margin:0 auto;padding:24px 20px;font-family:system-ui,sans-serif;line-height:1.6">
      <h1>Yonghao Zhao</h1>
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

const aboutDir = new URL('about/yonghao-zhao/', dist)
await mkdir(aboutDir, { recursive: true })
await writeFile(new URL('index.html', aboutDir), profilePage())

const today = new Date().toISOString().slice(0, 10)
const urls = ['/', ...papers.map((p) => `/papers/${p.slug}/`), '/about/yonghao-zhao/']
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`)
console.log(`prerender: index + ${papers.length} paper pages + about + sitemap`)
