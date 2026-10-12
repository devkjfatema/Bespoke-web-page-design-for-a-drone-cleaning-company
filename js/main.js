/* Asset Cleaning page — plain JavaScript (converted from the React components) */
(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /* ---------------------------------------------------------------
   * SiteHeader — mobile navigation
   * ------------------------------------------------------------- */
  (function initMobileNav() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('mobile-nav');
    var iconMenu = document.getElementById('icon-menu');
    var iconClose = document.getElementById('icon-close');
    if (!toggle || !nav) return;

    var open = false;
    var running = null;

    function setOpen(next) {
      open = next;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      iconMenu.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);

      if (running) running.cancel();

      if (open) {
        nav.classList.remove('hidden');
        running = nav.animate(
          [
            { opacity: 0, transform: 'translateY(-8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 200, easing: EASE }
        );
        running.onfinish = function () { running = null; };
      } else {
        var anim = nav.animate(
          [
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-8px)' },
          ],
          { duration: 200, easing: EASE }
        );
        running = anim;
        anim.onfinish = function () {
          nav.classList.add('hidden');
          running = null;
        };
      }
    }

    toggle.addEventListener('click', function () { setOpen(!open); });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { if (open) setOpen(false); });
    });
  })();

  /* ---------------------------------------------------------------
   * HeroVideo — play / pause button, respects reduced motion
   * ------------------------------------------------------------- */
  (function initHeroVideo() {
    var video = document.getElementById('hero-video');
    var btn = document.getElementById('video-toggle');
    var iconPause = document.getElementById('icon-pause');
    var iconPlay = document.getElementById('icon-play');
    if (!video || !btn) return;

    function setPlaying(playing) {
      btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
      iconPause.classList.toggle('hidden', !playing);
      iconPlay.classList.toggle('hidden', playing);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      setPlaying(false);
    }

    btn.addEventListener('click', function () {
      if (video.paused) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    });
  })();

  /* ---------------------------------------------------------------
   * EnquirySection + useEnquiryForm — validation, sending, sent states
   * ------------------------------------------------------------- */
  (function initEnquiryForm() {
    var form = document.getElementById('enquiry-form');
    var sent = document.getElementById('enquiry-sent');
    var resetBtn = document.getElementById('enquiry-reset');
    var submitBtn = document.getElementById('enquiry-submit');
    var arrow = document.getElementById('submit-arrow');
    var spinner = document.getElementById('submit-spinner');
    if (!form || !sent || !submitBtn) return;

    var fieldIds = ['name', 'company', 'email', 'telephone', 'sites'];
    var ERROR_COLOR = 'border-[#B42318]';
    var NORMAL_COLOR = 'border-line';

    function getValue(id) {
      return document.getElementById(id).value;
    }

    function validate() {
      var errors = {};
      if (!getValue('name').trim()) errors.name = 'Please enter your name.';
      if (!getValue('email').trim()) errors.email = 'Please enter your email address.';
      else if (!/^\S+@\S+\.\S+$/.test(getValue('email'))) errors.email = 'Please enter a valid email address.';
      if (!getValue('sites').trim()) errors.sites = 'Please describe the sites or work involved.';
      return errors;
    }

    function clearError(id) {
      var input = document.getElementById(id);
      var msg = document.getElementById(id + '-error');
      if (msg) msg.remove();
      input.setAttribute('aria-invalid', 'false');
      input.removeAttribute('aria-describedby');
      input.classList.remove(ERROR_COLOR);
      input.classList.add(NORMAL_COLOR);
    }

    function showError(id, text) {
      clearError(id);
      var input = document.getElementById(id);
      var msg = document.createElement('p');
      msg.id = id + '-error';
      msg.className = 'mt-2 text-sm text-[#B42318]';
      msg.textContent = text;
      input.insertAdjacentElement('afterend', msg);
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', id + '-error');
      input.classList.remove(NORMAL_COLOR);
      input.classList.add(ERROR_COLOR);
    }

    // Clear a field's error as soon as the user edits it
    fieldIds.forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () {
        if (document.getElementById(id + '-error')) clearError(id);
      });
    });

    function setSending(sending) {
      submitBtn.disabled = sending;
      arrow.classList.toggle('hidden', sending);
      spinner.classList.toggle('hidden', !sending);
    }

    function showSent() {
      var out = form.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150 });
      out.onfinish = function () {
        form.classList.add('hidden');
        sent.classList.remove('hidden');
        sent.animate(
          [
            { opacity: 0, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 220, easing: EASE }
        );
      };
    }

    function showForm() {
      var out = sent.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
      out.onfinish = function () {
        sent.classList.add('hidden');
        form.classList.remove('hidden');
        form.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
      };
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = validate();
      fieldIds.forEach(function (id) {
        if (errors[id]) showError(id, errors[id]);
        else clearError(id);
      });
      if (Object.keys(errors).length) return;

      setSending(true);
      window.setTimeout(function () {
        setSending(false);
        showSent();
      }, 900);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        fieldIds.forEach(clearError);
        showForm();
      });
    }
  })();
})();
