import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')

test('includes the June 2026 graduation announcements and timeline updates', () => {
  assert.match(appSource, /month: 'June',\n    year: '2026',\n    type: 'leeds-degree'/)
  assert.match(appSource, /month: 'June',\n    year: '2026',\n    type: 'thesis-award'/)
  assert.match(appSource, /B\.Sc\. in Computer Science, First-Class Honours/)
  assert.match(appSource, /Undergraduate Thesis: Enhancing Small Sample Survival Analysis/)
  assert.match(appSource, /sole award for the Computer Science and Technology programme/)
})
