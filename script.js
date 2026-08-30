// RINGBACK — shared interactivity

(function(){
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  if(toggle && panel){
    toggle.addEventListener('click', function(){
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('open', !open);
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
      });
    });
  }

  // Scroll reveal + signal diagram trigger
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal, .signal-diagram');

  if(reduced || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    targets.forEach(function(el){ io.observe(el); });
  }

  // Contact form (static demo — no backend wired up)
  var form = document.querySelector('.audit-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if(status){
        status.textContent = 'Thanks — this is a demonstration form and isn\u2019t connected yet. Email ringback.co@gmail.com directly to reach us.';
        status.classList.add('visible');
      }
    });
  }
})();
