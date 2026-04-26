// StudyBoost service worker — offline-first for the cached static shell + JS
// chunks + content JSON. The site is supposed to work fully offline once the
// user has visited it online; bugs in either the precache list or the fetch
// strategy break that promise. Bump the version any time this file changes
// so users get the new behavior on their next visit.
const CACHE_NAME = 'studyboost-v8';
const BASE = self.registration.scope; // ends with `/studyboost-app/`

// Pages to precache for offline access. ALL with trailing slash to match
// trailingSlash: true Next config — without the slash, GitHub Pages 404s
// on /assessment but serves /assessment/, and the cache lookup misses too.
const PRECACHE_PAGES = [
  '',
  'assessment/', 'assessment/lessons/', 'smart-review/', 'smart-practice/',
  'flashcard-mode/', 'flashcards/', 'flashcard-review/',
  'cornell-notes/', 'notes/', 'mind-map/', 'color-notes/',
  'quiz/', 'practice-test/', 'pomodoro/',
  'progress-report/', 'progress-dashboard/', 'parent-view/', 'parent-dashboard/',
  'streaks/', 'spaced-repetition/', 'daily-challenge/', 'daily-practice/',
  'study-timer/', 'study-music/', 'review-session/',
  'code-editor/', 'interactive-diagrams/', 'classroom/', 'mastery-challenge/',
  'achievements/', 'worked-examples/', 'listen/', 'mastery/',
  'score-tracker/', 'study-plan/', 'mistake-analysis/', 'mistake-patterns/',
  'mistakes/', 'college-calculator/', 'homework/', 'settings/', 'warmup/',
  'share-progress/', 'deep-dives/', 'proofs/', 'lesson-theater/', 'methodology/',
  'cost/', 'about/', 'accessibility/', 'content-audit/', 'provenance/',
  'zero-cost/', 'report/', 'languages/', 'videos/', 'math/', 'chat/',
  'essay/', 'summarizer/', 'planner/', 'goals/', 'habits/', 'journal/',
  'focus-log/', 'reading-list/', 'paraphrase/', 'translate/', 'feedback/',
  'gpa/', 'graph/', 'graphing-calc/', 'matrix/', 'probability/',
  'speed-math/', 'typing/', 'crossword/', 'vocab/', 'vocab-drill/',
  'spelling/', 'spelling-practice/', 'pronunciation/', 'conjugation/',
  'idioms/', 'grammar/', 'argument/', 'cause-effect/', 'fallacies/', 'bias/',
  'debate/', 'rhetoric/', 'feynman/', 'eli5/', 'eliminator/',
  'card-match/', 'crafted-practice/', 'sat-prep/',
  'free-sat-practice/', 'free-act-practice/', 'free-gre-prep/',
  'free-lsat-prep/', 'free-ap-practice/', 'exam-tracks/', 'exam-countdown/',
  'exam-simulator/',
];

// Content JSON files served from /content/. Without these, every tool that
// reads a course or lesson via dataLoaders.ts will throw offline. There are
// ~113 files; precache the most-load-bearing ones (curriculum, deepDives,
// videoLessons, handCraftedQuestions). The rest are cached on first fetch.
const PRECACHE_CONTENT = [
  'content/curriculum.json',
  'content/deepDives.json',
  'content/videoLessons.json',
  'content/handCraftedQuestions.json',
];

const PRECACHE_OTHER = [
  'favicon.svg',
  'manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled([
        ...PRECACHE_PAGES.map((url) => cache.add(BASE + url).catch(() => {})),
        ...PRECACHE_CONTENT.map((url) => cache.add(BASE + url).catch(() => {})),
        ...PRECACHE_OTHER.map((url) => cache.add(BASE + url).catch(() => {})),
      ]);
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

// Fetch strategy:
//   - Skip non-GET, chrome-extension, Gemini API
//   - /_next/static/  → cache-first (immutable hashed assets)
//   - /content/*.json → stale-while-revalidate (data updates with deploys)
//   - HTML navigation → network-first, fall back to cached page, fall back to /
//   - Anything else  → network-first, fall back to cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;
  if (url.startsWith('chrome-extension://')) return;
  if (url.includes('generativelanguage.googleapis.com')) return;

  // Cache-first for hashed static assets
  if (url.includes('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return res;
        }).catch(() => new Response('', { status: 408 }));
      }),
    );
    return;
  }

  // Stale-while-revalidate for content JSON
  if (url.includes('/content/') && url.endsWith('.json')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const networkPromise = fetch(event.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return res;
        }).catch(() => null);
        return cached || networkPromise || new Response('{}', { headers: { 'Content-Type': 'application/json' } });
      }),
    );
    return;
  }

  // Network-first for everything else (including HTML)
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match(BASE).then((home) => {
              if (home) return home;
              return new Response(
                '<!doctype html><html><head><meta charset="utf-8"><title>Offline</title></head><body style="font-family:system-ui;text-align:center;padding:4rem;background:#fafafa"><h1 style="margin:0;font-size:2rem;color:#101828">You\'re offline</h1><p style="margin:1rem 0;color:#6a7282">This page wasn\'t cached for offline use.</p><p style="margin:1rem 0;color:#6a7282">Pages you\'ve visited online before should still work.</p><button onclick="location.reload()" style="margin-top:1rem;padding:0.75rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6366f1);color:white;border:none;border-radius:0.5rem;cursor:pointer;font-size:1rem">Try Again</button></body></html>',
                { headers: { 'Content-Type': 'text/html' } },
              );
            });
          }
          return new Response('', { status: 408 });
        });
      }),
  );
});
