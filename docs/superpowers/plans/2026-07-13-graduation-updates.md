# Graduation Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish two graduation-related news items and update the Leeds and SWJTU timeline entries.

**Architecture:** Keep the existing data-driven single-page React structure. Extend the three arrays in `src/App.jsx`, then add two branches to `NewsItem` for the new news types. A Node built-in test will assert the visible source content without introducing a new package.

**Tech Stack:** React 19, Vite 7, ESLint 9, Node.js built-in test runner.

---

### Task 1: Add a focused content regression test

**Files:**
- Create: `test/graduation-content.test.mjs`
- Modify: `package.json:6-12`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')

test('includes the June 2026 graduation announcements and timeline updates', () => {
  assert.match(appSource, /month: 'June',\n    year: '2026',\n    type: 'leeds-degree'/)
  assert.match(appSource, /month: 'June',\n    year: '2026',\n    type: 'thesis-award'/)
  assert.match(appSource, /B\.Sc\. in Computer Science, [First-Class Honours](/201691031_Yonghao%20Zhao_Digital_Certificate.pdf)/)
  assert.match(appSource, /Undergraduate Thesis: Enhancing Small Sample Survival Analysis/)
  assert.match(appSource, /sole award for the Computer Science and Technology programme/)
})
```

Add the test script to `package.json`:

```json
"test": "node --test"
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because `leeds-degree`, `thesis-award`, the [First-Class Honours](/201691031_Yonghao%20Zhao_Digital_Certificate.pdf) text, and the thesis experience text are not yet present in `src/App.jsx`.

### Task 2: Update graduation content in the React data and news renderer

**Files:**
- Modify: `src/App.jsx:9-74`
- Modify: `src/App.jsx:304-375`

- [ ] **Step 1: Add the two June 2026 news item records**

Prepend these records to `newsItems` so the latest announcements appear first:

```js
  {
    month: 'June',
    year: '2026',
    type: 'leeds-degree',
  },
  {
    month: 'June',
    year: '2026',
    type: 'thesis-award',
  },
```

- [ ] **Step 2: Update the education and experience records**

Change the Leeds programme string:

```js
program: 'B.Sc. in Computer Science, [First-Class Honours](/201691031_Yonghao%20Zhao_Digital_Certificate.pdf)',
```

Append this SWJTU thesis record to `experienceItems`:

```js
  {
    period: '2025 – 2026',
    institution: 'Southwest Jiaotong University',
    title:
      'Undergraduate Thesis: Enhancing Small Sample Survival Analysis of Colorectal Cancer with Transfer Learning Techniques',
    detailPrefix: 'Received the Outstanding Undergraduate Thesis Award. Advised by',
    detailName: 'Zhipeng Luo',
    detailUrl: 'https://faculty.swjtu.edu.cn/luozhipeng/en/index.htm',
    logo: '/SWJTU_logo.png',
    logoAlt: 'Southwest Jiaotong University logo',
  },
```

- [ ] **Step 3: Add the visible news content**

Add these branches within `NewsItem` after the existing news-type conditions:

```jsx
          {item.type === 'leeds-degree' ? (
            <>
              Graduated from <strong>University of Leeds</strong> with a{' '}
              <strong>B.Sc. in Computer Science with [First-Class Honours](/201691031_Yonghao%20Zhao_Digital_Certificate.pdf)</strong>.
            </>
          ) : null}
          {item.type === 'thesis-award' ? (
            <>
              Received the <strong>Outstanding Undergraduate Thesis Award</strong> from{' '}
              <strong>Southwest Jiaotong University</strong> for my undergraduate thesis.
              This was the sole award for the Computer Science and Technology programme,
              selected from approximately 80 students.
            </>
          ) : null}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`

Expected: PASS with one passing test.

### Task 3: Verify the production site

**Files:**
- Verify only: `src/App.jsx`

- [ ] **Step 1: Run static checks**

Run: `npm run lint`

Expected: exit code 0 with no lint errors.

- [ ] **Step 2: Build the production bundle**

Run: `npm run build`

Expected: Vite completes successfully and writes `dist/`.

- [ ] **Step 3: Review the focused diff**

Run: `git diff --check && git diff -- src/App.jsx package.json test/graduation-content.test.mjs`

Expected: no whitespace errors; only the planned content, test script, and regression test changed.

- [ ] **Step 4: Commit the implementation**

```bash
git add src/App.jsx package.json test/graduation-content.test.mjs
git commit -m "Update graduation news and experience"
```
