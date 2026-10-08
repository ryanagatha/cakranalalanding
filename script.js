document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const languageButtons = document.querySelectorAll('[data-language]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
const typedWord = document.querySelector('.hero-typed-word');
const heroSlides = [...document.querySelectorAll('.hero-slide')];
const slideCount = document.querySelector('.slide-count');
let activeLanguage = 'id';
let userPaused = motionQuery.matches;
let typeTimer = 0;
let wordIndex = 0;
let characterIndex = 0;
let deleting = false;
const wordSets = { id: ['algoritma.', 'pengaruhnya.', 'dampaknya.'], en: ['algorithms.', 'influence.', 'impact.'] };
const translations = [...document.querySelectorAll('[data-en]')].map(element => ({element, id: element.innerHTML, en: element.dataset.en}));
const altTranslations = [...document.querySelectorAll('[data-alt-en]')].map(element => ({element, id: element.alt, en: element.dataset.altEn}));

function setMenuOpen(open) {
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', activeLanguage === 'id' ? (open ? 'Tutup menu' : 'Buka menu') : (open ? 'Close menu' : 'Open menu'));
}
menuButton.addEventListener('click', () => setMenuOpen(!navigation.classList.contains('open')));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) setMenuOpen(false);
});

function showSlide(index) {
  heroSlides.forEach((slide, position) => slide.classList.toggle('is-active', index === position));
  slideCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`;
}
function typeWord() {
  if (userPaused || document.hidden) return;
  const word = wordSets[activeLanguage][wordIndex];
  typedWord.textContent = word.slice(0, characterIndex);
  let delay = deleting ? 55 : 95;
  if (!deleting && characterIndex < word.length) characterIndex++;
  else if (!deleting) { deleting = true; delay = 1650; }
  else if (characterIndex > 0) characterIndex--;
  else {
    deleting = false;
    wordIndex = (wordIndex + 1) % wordSets[activeLanguage].length;
    showSlide(wordIndex);
    delay = 220;
  }
  typeTimer = window.setTimeout(typeWord, delay);
}
function syncMotion() {
  window.clearTimeout(typeTimer);
  document.body.classList.toggle('motion-paused', userPaused);
  motionButton.setAttribute('aria-pressed', String(userPaused));
  motionButton.setAttribute('aria-label', activeLanguage === 'id' ? (userPaused ? 'Lanjutkan animasi' : 'Jeda animasi') : (userPaused ? 'Resume animation' : 'Pause animation'));
  motionButton.querySelector('path').setAttribute('d', userPaused ? 'M7 4l8 6-8 6Z' : 'M7 5v10M13 5v10');
  if (userPaused) {
    typedWord.textContent = wordSets[activeLanguage][wordIndex];
    characterIndex = wordSets[activeLanguage][wordIndex].length;
    deleting = false;
  } else if (!document.hidden) typeTimer = window.setTimeout(typeWord, 100);
  window.dispatchEvent(new Event('site-motion-change'));
}
motionButton.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
motionQuery.addEventListener('change', event => { userPaused = event.matches; syncMotion(); });
document.addEventListener('visibilitychange', syncMotion);

function applyLanguage(language) {
  activeLanguage = language;
  document.documentElement.lang = language;
  translations.forEach(target => { target.element.innerHTML = target[language]; });
  altTranslations.forEach(target => { target.element.alt = target[language]; });
  languageButtons.forEach(button => {
    const selected = button.dataset.language === language;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.title = language === 'id' ? 'Institut Cakra Nala — Algoritma, Nalar, dan Masyarakat' : 'Institut Cakra Nala — Algorithms, Judgment, and Society';
  document.querySelector('meta[name="description"]').content = language === 'id'
    ? 'Institut Cakra Nala — pusat kajian ketahanan kognitif dan etika algoritma. Mengkaji pengaruh algoritma pada informasi, keputusan, dan kehidupan masyarakat.'
    : 'Institut Cakra Nala — a center for cognitive resilience and algorithmic ethics. Exploring how algorithms shape information, decisions, and everyday life.';
  navigation.setAttribute('aria-label', language === 'id' ? 'Navigasi utama' : 'Main navigation');
  setMenuOpen(false);
  wordIndex = 0;
  characterIndex = 0;
  deleting = false;
  typedWord.textContent = wordSets[language][0];
  showSlide(0);
  syncMotion();
}
languageButtons.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language)));

// Stagger the content within each section; keep the section itself stable.
const sectionMotion = new Map();
const motionSelector = [
  '.hero-panel > .eyebrow', '.hero-panel > h2', '.panel-description', '.about-note', '.hero-panel > .text-link',
  '.feed-heading > div', '.algorithm-panel', '.perspective-list article',
  '.manifesto-kicker', '.manifesto-copy > p', '.manifesto-copy > h2',
  '.generation-intro > .eyebrow', '.generation-intro > h2', '.generation-intro > p:not(.eyebrow)',
  '.generation-roles article', '.story-gallery figure', '.section-heading', '.movement-card',
  '.impact-copy > .eyebrow', '.impact-copy > h2', '.impact-copy > p:not(.eyebrow)', '.impact-copy > a',
  '.certification-outcome', '.impact-stats > div', '.final-cta > *'
].join(', ');
const motionTargets = [...document.querySelectorAll('main > section:not(.hero)')].flatMap(section => {
  const targets = [...section.querySelectorAll(motionSelector)];
  sectionMotion.set(section, targets);
  targets.forEach((element, index) => {
    element.dataset.motion = element.matches('.algorithm-panel, .story-gallery figure, .movement-card') ? 'image' : 'rise';
    element.style.setProperty('--motion-delay', `${(index % 3) * 85}ms`);
  });
  return targets;
});
if ('IntersectionObserver' in window) {
  const contentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('motion-visible');
    });
  }, {rootMargin: '0px 0px -5%', threshold: .08});
  motionTargets.forEach(element => contentObserver.observe(element));
  // Ambient animation can be paused without concealing page content.
  window.addEventListener('site-motion-change', () => {
    if (userPaused) motionTargets.forEach(element => element.classList.add('motion-visible'));
  });
  const navLinks = [...navigation.querySelectorAll('a')];
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-12% 0px -65%', threshold: 0});
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) navObserver.observe(section);
  });
}

if (!('IntersectionObserver' in window)) motionTargets.forEach(element => element.classList.add('motion-visible'));

// Hero typing and per-section reveals remain active alongside Remotion.
applyLanguage('id');
