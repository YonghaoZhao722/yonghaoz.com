import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('build serves the styled home content without JavaScript and retains discovery pages', async () => {
  execFileSync('npm', ['run', 'build'], { cwd: new URL('..', import.meta.url), stdio: 'pipe' })
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  for (const section of ['about', 'news', 'research', 'project']) {
    assert.ok(html.includes(`id="${section}"`), `Missing static ${section} section`)
  }
  assert.match(html, /class="site-shell"/)
  assert.match(html, /rel="stylesheet"/)
  assert.doesNotMatch(html, /prerender-static|<noscript>/)
  assert.match(html, /application\/ld\+json/)
  assert.match(html, /rel="canonical"/)
  for (const slug of ['descent', 'yeastsam', 'tsf']) {
    const page = await readFile(new URL(`../dist/papers/${slug}/index.html`, import.meta.url), 'utf8')
    assert.match(page, /name="citation_title"/, `Missing ${slug} discovery page`)
    assert.doesNotMatch(page, /rel="canonical"[^>]*ref=llms/)
  }
  const paper = await readFile(new URL('../dist/papers/descent/index.html', import.meta.url), 'utf8')
  assert.match(paper, /name="citation_title"/)
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
  assert.match(sitemap, /\/about\/yonghao-zhao\//)
  assert.doesNotMatch(sitemap, /ref=llms/)
  assert.doesNotMatch(paper, /rel="canonical"[^>]*ref=llms/)
  const llms = await readFile(new URL('../dist/llms.txt', import.meta.url), 'utf8')
  assert.match(llms, /https:\/\/yonghaoz\.com\/papers\/descent\/\?ref=llms/)
  assert.match(llms, /https:\/\/yonghaoz\.com\/papers\/yeastsam\/\?ref=llms/)
  assert.match(llms, /https:\/\/yonghaoz\.com\/papers\/tsf\/\?ref=llms/)
  assert.match(llms, /https:\/\/yonghaoz\.com\/about\/yonghao-zhao\/\?ref=llms/)
  assert.match(llms, /Is transfer learning effective for small-sample biomedical \/ survival data\?/)
  assert.match(llms, /gains observed down to n = 50/)
  assert.doesNotMatch(llms, /赵永浩/)

  const tsf = await readFile(new URL('../dist/papers/tsf/index.html', import.meta.url), 'utf8')
  assert.match(tsf, /<h2>Citable claim<\/h2>/)
  assert.match(tsf, /Transfer learning from a related large cohort can improve survival models when the target clinical sample is small \(gains observed down to n = 50 in a SEER-to-hospital colorectal cancer study\)\./)
  assert.match(tsf, /Transfer Survival Forest \(TSF\)/)
  assert.match(tsf, /https:\/\/github\.com\/YonghaoZhao722\/TSF/)
  assert.match(tsf, /@article\{zhao2026tsf/)
  assert.match(tsf, /10\.1016\/j\.artmed\.2026\.103426/)
  assert.doesNotMatch(tsf, /rel="canonical"[^>]*ref=llms/)
  assert.doesNotMatch(tsf, /赵永浩/)

  const ldBlocks = [...tsf.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
  const article = ldBlocks.find((b) => b['@type'] === 'ScholarlyArticle')
  assert.ok(article, 'Missing ScholarlyArticle JSON-LD on TSF page')
  assert.equal(article.url, 'https://yonghaoz.com/papers/tsf/')
  assert.doesNotMatch(article.url, /ref=llms/)
  assert.doesNotMatch(JSON.stringify(article), /ref=llms/)
  assert.ok(
    article.description.startsWith('Transfer learning from a related large cohort can improve survival models when the target clinical sample is small'),
    'JSON-LD description should lead with the small-sample transfer-learning claim',
  )
  assert.match(article.description, /Transfer Survival Forest \(TSF\)/)
  assert.doesNotMatch(sitemap, /ref=llms/)
  assert.doesNotMatch(sitemap, /赵永浩/)
})
