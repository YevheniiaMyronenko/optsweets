document.querySelectorAll('.gallery').forEach((gallery) => {
  const track = gallery.querySelector('.gallery-track');
  const slides = gallery.querySelectorAll('.slide');
  const prev = gallery.querySelector('.prev');
  const next = gallery.querySelector('.next');
  const dots = gallery.querySelector('.dots');
  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Перейти до фото ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  const dotButtons = dots.querySelectorAll('.dot');

  function goTo(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotButtons.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  gallery.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    dragging = true;
  }, {passive: true});

  gallery.addEventListener('touchmove', (e) => {
    if (dragging) currentX = e.touches[0].clientX;
  }, {passive: true});

  gallery.addEventListener('touchend', () => {
    if (!dragging) return;
    const distance = currentX - startX;
    if (Math.abs(distance) > 45) {
      goTo(distance < 0 ? index + 1 : index - 1);
    }
    dragging = false;
  });
});
