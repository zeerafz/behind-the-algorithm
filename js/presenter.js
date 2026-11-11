(function presenter() {
  "use strict";
  const { slides } = window.DeckData;
  const counter = document.getElementById("presenter-counter");
  const title = document.getElementById("presenter-title");
  const notes = document.getElementById("presenter-notes");
  const previous = document.getElementById("presenter-prev");
  const next = document.getElementById("presenter-next");
  const source = "behind-the-algorithm";
  const expectedOrigin = location.protocol === "file:" ? "null" : location.origin;
  const targetOrigin = expectedOrigin === "null" ? "*" : expectedOrigin;
  let current = 0;

  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    const slide = slides[current];
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${slides.length}`;
    title.innerHTML = slide.title;
    notes.textContent = slide.speakerNotes;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    try {
      history.replaceState(null, "", `#${slide.id}`);
    } catch {
      location.hash = slide.id;
    }
  }

  function move(step) {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ source, command: "move", step }, targetOrigin);
    } else {
      show(current + step);
    }
  }

  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") move(1);
    else if (event.key === "ArrowLeft" || event.key === "PageUp") move(-1);
    else return;
    event.preventDefault();
  });
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (event.source !== window.opener || event.origin !== expectedOrigin || data?.source !== source) return;
    if (data.command === "show" && Number.isInteger(data.index)) show(data.index);
  });

  show(Math.max(0, slides.findIndex((slide) => `#${slide.id}` === location.hash)));
  window.opener?.postMessage({ source, command: "ready" }, targetOrigin);
})();

