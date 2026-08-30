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

  // Pre-fill "what would you like to automate" from a ?service= query param
  // (used when arriving from a Solutions page link)
  var automateField = document.getElementById('automate');
  if(automateField){
    var params = new URLSearchParams(window.location.search);
    var service = params.get('service');
    if(service){
      automateField.value = "I'd like to build: " + service + "\n\n";
      var banner = document.getElementById('service-banner');
      if(banner){
        banner.textContent = 'Asking about: ' + service;
        banner.classList.add('visible');
      }
    }
  }

  // Contact form now submits for real via FormSubmit (see action= on the <form> tag) —
  // no JS interception needed. The browser's native required-field validation still runs.
})();
