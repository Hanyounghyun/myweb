// ===== Navigation scroll effect =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Scroll reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== Product modal =====
const products = {
  'opal-ring': {
    tag: 'Ring',
    name: 'Opal Ring',
    desc: '오팔 특유의 컬러 플레이를 극대화하기 위해 베젤 높이와 각도를 정밀하게 설계했습니다. 18K 골드와 내추럴 오팔의 조화로, 손가락 위에서 빛나는 작은 우주 같은 존재입니다.',
    material: '18K Gold, Natural Opal',
    process: 'Rhino 3D CAD → Wax Casting → Hand Finish'
  },
  jem: {
    tag: 'Pendant',
    name: 'JEM',
    desc: '보석의 본질 — 빛을 받아들이고 반사하는 형태에 집중한 미니멀 펜던트. 불필요한 장식을 덜어내고 순수한 기하학적 아름다움을 추구했습니다.',
    material: 'Sterling Silver / 14K Gold',
    process: '3D Print → Cast → Mirror Polish'
  },
  soonjo: {
    tag: 'Earring',
    name: 'SOONJO',
    desc: '물결처럼 순조롭게 이어지는 곡선에서 영감을 받은 이어링 시리즈. 착용 시 얼굴 옆으로 자연스럽게 흐르는 실루엣이 특징입니다.',
    material: '14K Gold Plated Brass',
    process: 'CAD Design → Lost Wax Casting'
  },
  insook: {
    tag: 'Signature Collection',
    name: 'INSOOK Series',
    desc: '디자이너의 이름을 담은 시그니처 컬렉션. 각 피스마다 독창적인 형태 언어를 담아, 착용자만의 이야기를 완성하는 주얼리입니다.',
    material: 'Mixed — Gold, Silver, Gemstones',
    process: 'Full In-house Design & Production'
  }
};

const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

function openModal(id) {
  const product = products[id];
  if (!product) return;

  modalContent.innerHTML = `
    <span class="modal-tag">${product.tag}</span>
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
    <dl class="modal-detail">
      <dt>Material</dt>
      <dd>${product.material}</dd>
      <dt>Process</dt>
      <dd>${product.process}</dd>
    </dl>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.open));
});

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== Smooth active nav highlight =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.style.color = item.getAttribute('href') === `#${current}`
      ? 'var(--gold-dark)'
      : '';
  });
});
