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
    assert.ok(html.includes(`href="/papers/${slug}/"`), `Missing ${slug} discovery link`)
  }
  const paper = await readFile(new URL('../dist/papers/descent/index.html', import.meta.url), 'utf8')
  assert.match(paper, /name="citation_title"/)
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
  assert.match(sitemap, /\/about\/yonghao-zhao\//)
})
