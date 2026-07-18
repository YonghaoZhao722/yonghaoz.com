import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')

test('keeps the thesis award in education and combines the graduation news', () => {
  assert.match(appSource, /month: 'June',\n    year: '2026',\n    type: 'graduation'/)
  assert.match(appSource, /programPrefix: 'B\.Sc\. in Computer Science, '/)
  assert.match(appSource, /programHonours: 'First-Class Honours'/)
  assert.match(
    appSource,
    /\/201691031_Yonghao%20Zhao_Digital_Certificate\.pdf/,
  )
  assert.match(appSource, /achievement: 'Graduated with Best Bachelor Thesis'/)
  assert.doesNotMatch(appSource, /Undergraduate Thesis: Enhancing Small Sample Survival Analysis/)
  assert.match(
    appSource,
    /<strong>First-class Honours<\/strong>/,
  )
})
