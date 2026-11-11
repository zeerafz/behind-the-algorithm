(function app() {
  "use strict";

  const { slides, chapters } = window.DeckData;
  const { visual } = window.DeckDiagrams;
  const byId = (id) => document.getElementById(id);
  const presentation = byId("presentation");
  const slideRoot = byId("slide");
  const stage = byId("stage");
  const viewport = byId("viewport");
  const previous = byId("previous");
  const next = byId("next");
  const notes = byId("notes");
  const notesButton = byId("notes-open");
  const overview = byId("overview");
  const overviewList = byId("overview-list");
  const fullscreen = byId("fullscreen");
  const toolbar = presentation.querySelector(".toolbar");
  const sourceTag = "behind-the-algorithm";
  const expectedOrigin = location.protocol === "file:" ? "null" : location.origin;
  const targetOrigin = expectedOrigin === "null" ? "*" : expectedOrigin;
  const chapterStarts = chapters.map((_, index) => slides.findIndex((slide) => slide.chapter === index));
  const photoFiles = { cover: "cover", conversation: "conversation", reflection: "reflection" };
  let active = -1;
  let presenterWindow = null;
  let toolbarTimer;
  let swipe;
  let helpTimer;

  function number(index) {
    return String(index + 1).padStart(2, "0");
  }

  function plainTitle(slide) {
    const template = document.createElement("template");
    template.innerHTML = slide.title.replace(/<br\s*\/?>/g, " ");
    return template.content.textContent;
  }

  function indexFromHash() {
    const match = /^#slide-(\d{1,2})$/i.exec(location.hash);
    if (!match) return 0;
    const index = Number(match[1]) - 1;
    return index >= 0 && index < slides.length ? index : 0;
  }

  function writeHash(slide, replace) {
    const hash = "#" + slide.id;
    if (location.hash === hash) return;
    try {
      if (replace) history.replaceState(null, "", hash);
      else history.pushState(null, "", hash);
    } catch {
      location.hash = hash;
    }
  }

  function syncPresenter() {
    if (presenterWindow && !presenterWindow.closed) {
      presenterWindow.postMessage({ source: sourceTag, command: "show", index: active }, targetOrigin);
    }
  }

  function fit() {
    stage.style.setProperty("--scale", Math.min(viewport.clientWidth / 1600, viewport.clientHeight / 900));
  }

  function mirrorControls() {
    const mirror = byId("mobile-demos");
    const originals = [...slideRoot.querySelectorAll(".demo-button")];
    presentation.classList.toggle("has-demo", originals.length > 0);
    mirror.hidden = originals.length === 0;
    mirror.replaceChildren();
    if (!originals.length) return;
    const sync = () => {
      mirror.querySelectorAll("button").forEach((button, index) => {
        if (originals[index].hasAttribute("aria-pressed")) {
          button.setAttribute("aria-pressed", originals[index].getAttribute("aria-pressed"));
        }
      });
    };
    originals.forEach((button) => {
      const copy = button.cloneNode(true);
      copy.addEventListener("click", () => button.click());
      button.addEventListener("click", () => queueMicrotask(sync));
      mirror.append(copy);
    });
  }

  function draw(slide) {
    const imageFile = photoFiles[slide.visual];
    const isHero = slide.layout === "hero";
    const isEnglishTitle = isHero || slide.layout === "quote";
    const titleTag = isHero ? "h1" : "h2";
    const art = imageFile
      ? `<div class="art" aria-hidden="true"><img src="assets/images/${imageFile}.webp" alt=""></div>`
      : `<div class="visual enter">${visual[slide.visual]()}</div>`;
    const credits = isHero
      ? `<div class="credits"><span>الطالب<bdi lang="en">Abdullah Alzeer</bdi></span><span>المدرّس<bdi lang="en">Mohammed Shambour</bdi></span></div>`
      : "";
    slideRoot.innerHTML = `<section class="slide ${slide.layout}" data-scene="${slide.visual}" aria-labelledby="slide-title">
      ${art}<div class="copy enter"><${titleTag} id="slide-title"${isEnglishTitle ? ' lang="en" dir="ltr"' : ""}>${slide.title}</${titleTag}>
      ${slide.subtitle ? `<p>${slide.subtitle}</p>` : ""}</div>${credits}</section>`;
    const initDemo = window.DeckDemos[slide.visual];
    if (initDemo) initDemo(slideRoot.querySelector(".demo"));
    mirrorControls();
    fit();
  }

  function show(index, { updateHash = true, replace = false } = {}) {
    const bounded = Math.min(slides.length - 1, Math.max(0, index));
    const slide = slides[bounded];
    if (updateHash) writeHash(slide, replace);
    if (bounded === active) return;
    const focusId = document.activeElement?.id;
    active = bounded;
    draw(slide);
    byId("chapter").textContent = chapters[slide.chapter];
    byId("counter").textContent = `${number(active)} / ${slides.length}`;
    byId("progress").value = active + 1;
    byId("notes-copy").textContent = slide.speakerNotes;
    byId("announce").textContent = `شريحة ${active + 1} من ${slides.length}. ${plainTitle(slide)}`;
    previous.disabled = active === 0;
    next.disabled = active === slides.length - 1;
    if (focusId === "next" && next.disabled) previous.focus();
    if (focusId === "previous" && previous.disabled) next.focus();
    [...byId("chapter-progress").children].forEach((button, chapter) => {
      button.setAttribute("aria-current", String(chapter === slide.chapter));
    });
    overviewList.querySelector('[aria-current="true"]')?.removeAttribute("aria-current");
    overviewList.children[active].setAttribute("aria-current", "true");
    syncPresenter();
  }

  function setNotes(open) {
    notes.hidden = !open;
    notesButton.setAttribute("aria-pressed", String(open));
    if (!open && notes.contains(document.activeElement)) notesButton.focus();
  }

  function openPresenter() {
    if (presenterWindow && !presenterWindow.closed) {
      presenterWindow.focus();
      return;
    }
    presenterWindow = window.open(`presenter.html#${slides[active].id}`, "algorithm-presenter", "popup,width=760,height=670");
    if (presenterWindow) {
      setNotes(false);
      presenterWindow.focus();
    } else {
      setNotes(true);
      tip("اسمح بالنوافذ المنبثقة لفتح نافذة المتحدّث.");
    }
  }

  function tip(message) {
    const help = byId("fullscreen-help");
    help.textContent = message;
    help.hidden = false;
    clearTimeout(helpTimer);
    helpTimer = setTimeout(() => { help.hidden = true; }, 4300);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (presentation.requestFullscreen) {
        await presentation.requestFullscreen();
      } else {
        tip("استخدم خيار ملء الشاشة من المتصفّح.");
      }
    } catch {
      tip("استخدم خيار ملء الشاشة من المتصفّح.");
    }
  }

  function openOverview() {
    if (overview.open) {
      overview.close();
      return;
    }
    overview.showModal();
    overviewList.children[active].focus();
  }

  function revealToolbar() {
    toolbar.classList.remove("resting");
    clearTimeout(toolbarTimer);
    if (document.fullscreenElement) toolbarTimer = setTimeout(() => toolbar.classList.add("resting"), 3700);
  }

  function onKey(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (overview.open) {
      if (event.key.toLowerCase() === "o") overview.close();
      return;
    }
    const focusedButton = event.target instanceof Element && event.target.closest("button");
    const key = event.key.toLowerCase();
    if (focusedButton && (key === " " || key === "enter")) return;
    switch (key) {
      case "arrowleft":
      case " ":
      case "enter":
      case "pagedown": show(active + 1); break;
      case "arrowright":
      case "pageup": show(active - 1); break;
      case "home": show(0); break;
      case "end": show(slides.length - 1); break;
      case "f": void toggleFullscreen(); break;
      case "n": setNotes(notes.hidden); break;
      case "o": openOverview(); break;
      case "p": openPresenter(); break;
      case "escape":
        if (!notes.hidden) setNotes(false);
        else return;
        break;
      default: return;
    }
    event.preventDefault();
    revealToolbar();
  }

  function buildNavigation() {
    chapters.forEach((chapter, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chapter-jump";
      button.title = chapter;
      button.setAttribute("aria-label", `انتقل إلى ${chapter}`);
      button.addEventListener("click", () => show(chapterStarts[index]));
      byId("chapter-progress").append(button);
    });
    slides.forEach((slide, index) => {
      const item = document.createElement("button");
      const indexLabel = document.createElement("span");
      const title = document.createElement("span");
      item.type = "button";
      item.className = "overview-item";
      indexLabel.textContent = number(index);
      indexLabel.dir = "ltr";
      title.textContent = plainTitle(slide);
      item.append(indexLabel, title);
      item.addEventListener("click", () => {
        show(index);
        overview.close();
      });
      overviewList.append(item);
    });
  }

  buildNavigation();
  byId("progress").max = slides.length;
  show(indexFromHash(), { replace: true });

  previous.addEventListener("click", () => show(active - 1));
  next.addEventListener("click", () => show(active + 1));
  byId("first").addEventListener("click", () => show(0));
  notesButton.addEventListener("click", () => setNotes(notes.hidden));
  byId("notes-close").addEventListener("click", () => setNotes(false));
  byId("presenter-open").addEventListener("click", openPresenter);
  fullscreen.addEventListener("click", toggleFullscreen);
  byId("overview-open").addEventListener("click", openOverview);
  byId("overview-close").addEventListener("click", () => overview.close());
  overview.addEventListener("click", (event) => { if (event.target === overview) overview.close(); });
  document.addEventListener("keydown", onKey);
  document.addEventListener("fullscreenchange", () => {
    fullscreen.setAttribute("aria-pressed", String(Boolean(document.fullscreenElement)));
    revealToolbar();
    fit();
  });
  presentation.addEventListener("pointermove", revealToolbar);
  presentation.addEventListener("focusin", revealToolbar);
  window.addEventListener("hashchange", () => show(indexFromHash(), { replace: true }));
  window.addEventListener("popstate", () => show(indexFromHash(), { replace: true }));
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (event.source !== presenterWindow || event.origin !== expectedOrigin || data?.source !== sourceTag) return;
    if (data.command === "ready") syncPresenter();
    if (data.command === "move" && [-1, 1].includes(data.step)) show(active + data.step);
  });

  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch" || !event.isPrimary || event.target.closest("button")) return;
    swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointerup", (event) => {
    if (swipe?.id !== event.pointerId) return;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.45) show(active + Math.sign(dx));
    swipe = null;
  });
  stage.addEventListener("pointercancel", () => { swipe = null; });
  new ResizeObserver(fit).observe(viewport);
  Object.values(photoFiles).forEach((file) => {
    const preloader = new Image();
    preloader.src = `assets/images/${file}.webp`;
  });
})();

