/* Prescriptive Fitness · site behaviour: media slots, client stories, logo, mobile nav, get-started form. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* ---------- Config ---------- */
  var CONTACT_EMAIL = "info@prescriptivefitness.com";
  // Optional: paste a Formspree (or similar) endpoint here and the Get Started form
  // submits straight to the inbox instead of opening the visitor's email app.
  var FORM_ENDPOINT = "";

  var MEDIA = window.PF_MEDIA || {};
  var POSTERS = window.PF_POSTERS || {};

  function youtubeId(url) {
    var m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    return m ? m[1] : null;
  }
  function vimeoId(url) {
    var m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
  }
  function isImage(src) { return /\.(jpe?g|png|webp|avif|gif|svg)(\?.*)?$/i.test(src); }

  /* YouTube preview: thumbnail + play button; the real player loads on click. */
  function ytFacade(slot, id, key) {
    var tall = slot.classList.contains("slot--9x16");
    var label = slot.getAttribute("data-label") || "video";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "yt-facade";
    btn.setAttribute("aria-label", "Play video: " + label);
    var img = document.createElement("img");
    var fallback = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    img.alt = ""; img.loading = "lazy"; img.decoding = "async";
    img.onload = function () { if (img.naturalWidth <= 120 && img.src !== fallback) img.src = fallback; };
    img.onerror = function () { if (img.src !== fallback) img.src = fallback; };
    img.src = POSTERS[key] || ("https://i.ytimg.com/vi/" + id + "/" + (tall ? "oar2.jpg" : "maxresdefault.jpg"));
    var play = document.createElement("span");
    play.className = "yt-facade__play";
    play.setAttribute("aria-hidden", "true");
    btn.appendChild(img); btn.appendChild(play);
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.title = label;
      slot.replaceChild(f, btn);
    });
    return btn;
  }

  function placeholder(slot, key) {
    slot.classList.add("slot--empty");
    var cap = document.createElement("span");
    cap.className = "slot__cap";
    cap.textContent = (slot.getAttribute("data-label") || key) + " · " + key;
    slot.appendChild(cap);
  }

  function fillSlot(slot, src, key) {
    src = (src || "").trim();
    var loop = slot.hasAttribute("data-loop");
    if (!src) { placeholder(slot, key); return; }

    var el, yt = youtubeId(src), vm = vimeoId(src);
    var label = slot.getAttribute("data-label") || "Video";
    if (yt && !loop) { slot.appendChild(ytFacade(slot, yt, key)); return; }
    if (yt) {
      el = document.createElement("iframe");
      el.src = "https://www.youtube-nocookie.com/embed/" + yt + "?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&loop=1&controls=0&playlist=" + yt;
      el.allow = "autoplay; encrypted-media";
      el.title = label;
      el.setAttribute("aria-hidden", "true"); el.tabIndex = -1;
    } else if (vm) {
      el = document.createElement("iframe");
      el.src = "https://player.vimeo.com/video/" + vm + (loop ? "?autoplay=1&muted=1&loop=1&background=1" : "?dnt=1");
      el.allow = "autoplay; fullscreen; picture-in-picture";
      el.loading = loop ? "eager" : "lazy";
      el.title = label;
      if (loop) { el.setAttribute("aria-hidden", "true"); el.tabIndex = -1; }
    } else if (isImage(src)) {
      el = document.createElement("img");
      el.src = src;
      el.alt = slot.getAttribute("data-alt") || "";
      el.loading = loop ? "eager" : "lazy";
      el.decoding = "async";
    } else {
      el = document.createElement("video");
      el.src = src;
      el.playsInline = true;
      el.setAttribute("playsinline", "");
      if (loop) {
        el.muted = true; el.defaultMuted = true; el.setAttribute("muted", "");
        el.autoplay = true; el.loop = true; el.preload = "auto";
        el.setAttribute("aria-hidden", "true");
        var kick = function () { var p = el.play(); if (p && p.catch) p.catch(function () {}); };
        el.addEventListener("canplay", kick, { once: true });
        setTimeout(kick, 0);
      } else {
        el.controls = true; el.preload = "metadata";
      }
    }
    slot.appendChild(el);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-media]"), function (slot) {
    var key = slot.getAttribute("data-media");
    fillSlot(slot, MEDIA[key], key);
  });

  /* ---------- Logo: swap the typed wordmark for the real file when one is set ---------- */
  var logoSrc = (MEDIA.logo || "").trim();
  if (logoSrc) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-logo]"), function (holder) {
      var img = new Image();
      img.alt = "Prescriptive Fitness";
      img.onload = function () { holder.innerHTML = ""; holder.appendChild(img); };
      img.src = logoSrc;
    });
  }

  /* ---------- Client stories ---------- */
  var storiesWrap = document.getElementById("stories");
  if (storiesWrap) {
    (window.PF_STORIES || []).slice(0, 3).forEach(function (s, i) {
      s = s || {};
      var hasVideo = !!(s.video || "").trim();
      var hasQuote = !!(s.quote || "").trim();
      var fig = document.createElement("figure");
      fig.className = "testi" + (!hasVideo && hasQuote ? " testi--quote-only" : "");
      fig.style.margin = "0";
      if (hasVideo || !hasQuote) {
        var slot = document.createElement("div");
        slot.className = "slot slot--9x16";
        slot.setAttribute("data-label", "Client story " + (i + 1) + " · 9:16 video");
        fig.appendChild(slot);
        fillSlot(slot, s.video, "PF_STORIES[" + i + "]");
      }
      if (hasQuote) {
        var q = document.createElement("blockquote");
        q.textContent = s.quote.trim();
        fig.appendChild(q);
      }
      if ((s.name || "").trim() || (s.detail || "").trim()) {
        var c = document.createElement("cite");
        if (s.name) { var b = document.createElement("b"); b.textContent = s.name.trim(); c.appendChild(b); }
        if (s.name && s.detail) c.appendChild(document.createTextNode(" · "));
        if (s.detail) c.appendChild(document.createTextNode(s.detail.trim()));
        fig.appendChild(c);
      }
      storiesWrap.appendChild(fig);
    });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Get Started request ---------- */
  var form = document.getElementById("consult-form");
  var note = document.getElementById("consult-note");
  if (form) {
    // Pre-select interest from ?interest=golf etc.
    var pre = (location.search.match(/interest=([\w-]+)/) || [])[1];
    if (pre) {
      var r = form.querySelector('input[name="interest"][value="' + pre + '"]');
      if (r) r.checked = true;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      Array.prototype.forEach.call(form.querySelectorAll("input[required]"), function (input) {
        var v = input.value.trim();
        var bad = !v || (input.type === "email" && !/^\S+@\S+\.\S+$/.test(v));
        input.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) ok = false;
      });
      if (!ok) { note.textContent = "Please fill in the highlighted fields."; return; }

      var interest = form.querySelector('input[name="interest"]:checked');
      var d = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        interest: interest ? interest.parentNode.textContent.trim() : "Not sure yet",
        goals: form.goals.value.trim(),
        times: form.times.value
      };

      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(d)
        }).then(function (res) {
          if (!res.ok) throw new Error();
          form.reset();
          note.textContent = "Thank you. We'll be in touch soon.";
        }).catch(function () {
          note.textContent = "That didn't go through. Please call (980) 209-0410 or email " + CONTACT_EMAIL + ".";
        });
        return;
      }

      var body =
        "Name: " + d.name + "\n" +
        "Email: " + d.email + "\n" +
        "Phone: " + d.phone + "\n" +
        "Interested in: " + d.interest + "\n" +
        "Best time to reach me: " + d.times + "\n" +
        (d.goals ? "\nGoals / history:\n" + d.goals + "\n" : "") +
        "\nI'd like to get started.";
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("New client inquiry · " + d.name) +
        "&body=" + encodeURIComponent(body);
      note.textContent = "Your email app should open with your message filled in. Press send and we'll be in touch.";
    });
  }

  /* ---------- Year ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) { el.textContent = new Date().getFullYear(); });
})();
