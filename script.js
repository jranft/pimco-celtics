(function () {
  'use strict';

  var track = document.getElementById('carouselTrack');
  if (!track) return;

  var slides = track.querySelectorAll('.carousel__slide');
  var dots = document.querySelectorAll('.carousel__dot');
  var prevBtn = document.querySelector('.carousel__btn--prev');
  var nextBtn = document.querySelector('.carousel__btn--next');
  var current = 0;
  var total = slides.length;

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function(dot, i) {
      dot.classList.toggle('carousel__dot--active', i === current);
      if (i === current) { dot.setAttribute('aria-current', 'true'); } else { dot.removeAttribute('aria-current'); }
    });
    if (prevBtn) prevBtn.style.opacity = current === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = current === total - 1 ? '0.3' : '1';
  }

  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });
  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { goTo(i); });
  });

  // Touch/swipe support
  var startX = 0;
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  }, { passive: true });

  goTo(0);
})();
