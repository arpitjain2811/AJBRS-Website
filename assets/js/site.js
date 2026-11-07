// The phone menu, and external links open in a new tab.
(function () {
  var header = document.querySelector('.site-header');
  var button = header && header.querySelector('.menu');
  if (button) {
    var set = function (open) {
      header.classList.toggle('open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      set(!header.classList.contains('open'));
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) set(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') set(false);
    });
  }
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname !== location.hostname) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
})();
