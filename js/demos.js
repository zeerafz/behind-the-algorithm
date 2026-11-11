(function demos() {
  "use strict";

  const { visual, canvas, frame, label, box, circle, path, arrow, icon, seeded, swatches, red, cyan, ink, muted, line } = window.DeckDiagrams;

  const categories = [
    { title: "AI", short: "AI", x: 219, y: 100, dx: 64, dy: 35, color: swatches[0] },
    { title: "Cooking", short: "Cooking", x: 420, y: 237, dx: 73, dy: 44, color: swatches[1] },
    { title: "Gaming", short: "Gaming", x: 650, y: 113, dx: 69, dy: 33, color: swatches[2] },
    { title: "Sports", short: "Sports", x: 818, y: 250, dx: 65, dy: 38, color: swatches[3] }
  ];
  const plot = { x: 30, y: 30, w: 900, h: 325, columns: 5, rows: 3 };
  const cellWidth = plot.w / plot.columns;
  const cellHeight = plot.h / plot.rows;
  const distance = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  const random = seeded(45019);
  const spread = () => (random() + random() + random() + random() - 2) * 1.7;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const points = categories.flatMap(({ x, y, dx, dy, color }) =>
    Array.from({ length: 76 }, () => ({
      x: clamp(x + dx * spread(), plot.x + 5, plot.x + plot.w - 5),
      y: clamp(y + dy * spread(), plot.y + 5, plot.y + plot.h - 5),
      size: 2 + random() * 2.6,
      color
    }))
  );
  const cells = Array.from({ length: plot.columns * plot.rows }, (_, id) => ({
    id, x: plot.x + (id % plot.columns + .5) * cellWidth,
    y: plot.y + (Math.floor(id / plot.columns) + .5) * cellHeight,
    points: []
  }));
  points.forEach((point) => {
    const column = Math.floor((point.x - plot.x) / cellWidth);
    const row = Math.floor((point.y - plot.y) / cellHeight);
    cells[row * plot.columns + column].points.push(point);
  });

  // A deliberately small grid index demonstrates how a search budget can miss close neighbors.
  function findNeighbors(query, exact) {
    const visited = exact ? cells : [...cells].sort((a, b) => distance(a, query) - distance(b, query)).slice(0, 2);
    const compared = visited.flatMap((cell) => cell.points);
    const neighbors = [...compared].sort((a, b) => distance(a, query) - distance(b, query)).slice(0, 5);
    return { visited, compared, neighbors };
  }

  function field() {
    return points.map(({ x, y, size, color }) =>
      circle(x.toFixed(1), y.toFixed(1), size.toFixed(1), color, "none", 'opacity=".72"')
    ).join("");
  }

  function categoryLabels() {
    const locations = [[185, 56], [354, 314], [694, 64], [828, 318]];
    return categories.map(({ short, color }, i) => {
      const [x, y] = locations[i];
      const w = i === 0 ? 44 : 94;
      return box(x - w / 2, y - 20, w, 30, "#0e1725", `${color}66`, 5) +
        label(short, x, y + 1, { cls: "small", color });
    }).join("");
  }

  function dataGrid() {
    return cells.map((cell) => box(cell.x - cellWidth / 2, cell.y - cellHeight / 2, cellWidth, cellHeight, "none", "#42567180", 0)).join("");
  }

  function plotCanvas(body, sidebar, description) {
    return canvas(1260, 386, frame(1260, 386) + box(plot.x, plot.y, plot.w, plot.h, "#0b1420", "#374c65", 6) +
      dataGrid() + body + path("M957 30V355", "#33485f", 1) + sidebar, description);
  }

  visual.clusters = () => plotCanvas(field() + categoryLabels(),
    label("One dot = one video", 1107, 96, { cls: "node-title" }) +
    categories.map(({ title, color }, i) => circle(1017, 148 + 51 * i, 6, color) +
      label(title, 1041, 155 + 51 * i, { cls: "small", align: "start", color: muted })).join(""),
  "Synthetic video embeddings grouped by similarity");

  visual.approximation = () => {
    const query = { x: 451, y: 192 };
    const { visited, neighbors, compared } = findNeighbors(query, false);
    return plotCanvas(visited.map((cell) => box(cell.x - cellWidth / 2, cell.y - cellHeight / 2, cellWidth, cellHeight,
      "#66e7f224", cyan, 0)).join("") + field() +
      neighbors.map(({x,y}) => circle(x, y, 8, "none", "#fff", 'stroke-width="1.6"')).join("") +
      circle(query.x, query.y, 7, cyan, "#fff", 'stroke-width="1.6"'),
    label("Search two cells", 1107, 101, { cls: "big", color: cyan }) +
    label(String(compared.length), 1107, 192, { cls: "display" }) +
    label("comparisons in this example", 1107, 233, { cls: "small", color: muted }) +
    label(`out of ${points.length} points`, 1107, 291, { cls: "small", color: muted }),
    "Approximate search compares points in two index cells");
  };

  const button = (action, text, pressed) =>
    `<button type="button" class="demo-button" data-action="${action}"${pressed === undefined ? "" : ` aria-pressed="${pressed}"`}>${text}</button>`;

  function interactive(chart, controls) {
    return `<div class="demo"><div class="demo-chart">${chart}</div><div class="demo-controls">${controls}</div><span class="sr-only demo-status" aria-live="polite"></span></div>`;
  }

  function setPressed(root, prefix, action) {
    root.querySelectorAll(`button[data-action^="${prefix}"]`).forEach((item) => {
      item.setAttribute("aria-pressed", String(item.dataset.action === action));
    });
  }

  function announce(root, text) {
    root.querySelector(".demo-status").textContent = text;
  }

  const queryLocations = [
    { x: 245, y: 121 }, { x: 388, y: 237 }, { x: 653, y: 126 }, { x: 801, y: 241 }
  ];

  function renderANN() {
    const chart = plotCanvas(`<g class="ann-cells"></g>${field()}${categoryLabels()}<g class="ann-candidates"></g>
      <g class="query-dot"><path d="M0-12L12 0 0 12-12 0z" fill="${cyan}" stroke="#fff" stroke-width="2"/></g>`,
    label("Candidates", 1107, 71, { cls: "big" }) +
    '<g class="ann-metrics"></g>' +
    circle(1017, 267, 7, "none", "#fff", 'stroke-width="1.7"') +
    label("Nearby video", 1041, 273, { cls: "small", align: "start", color: muted }) +
    `<path d="M1017 297l7 7-7 7-7-7z" fill="${cyan}"/>` +
    label("Query", 1041, 310, { cls: "small", align: "start", color: muted }),
    "Interactive map for approximate and exact search");
    return interactive(chart,
      `<div role="group" aria-label="Viewer interest">${categories.map(({ title }, i) => button(`topic-${i}`, title, i === 0)).join("")}</div>
      <span class="separator" aria-hidden="true"></span><div role="group" aria-label="Search method">
      ${button("mode-ann", "Approximate", true)}${button("mode-exact", "Exact", false)}</div>`);
  }

  function initANN(root) {
    let queryIndex = 0;
    let exact = false;

    function update() {
      const query = queryLocations[queryIndex];
      const { visited, compared, neighbors } = findNeighbors(query, exact);
      const exhaustive = findNeighbors(query, true).neighbors;
      const overlap = neighbors.filter((point) => exhaustive.includes(point)).length;
      root.querySelector(".query-dot").style.transform = `translate(${query.x}px, ${query.y}px)`;
      root.querySelector(".ann-cells").innerHTML = exact ? "" : visited.map((cell) =>
        box(cell.x - cellWidth / 2, cell.y - cellHeight / 2, cellWidth, cellHeight, "#66e7f224", cyan, 0)
      ).join("");
      root.querySelector(".ann-candidates").innerHTML = neighbors.map((point, i) =>
        path(`M${query.x} ${query.y}L${point.x} ${point.y}`, "#eaf9ff99", 1) +
        circle(point.x, point.y, 8, point.color, "#fff", `class="candidate-dot" stroke-width="2" style="animation-delay:${i * 42}ms"`)
      ).join("");
      root.querySelector(".ann-metrics").innerHTML =
        label(`${compared.length} / ${points.length}`, 1107, 136, { cls: "mono big", color: cyan }) +
        label("points compared", 1107, 170, { cls: "small", color: muted }) +
        label(`${overlap} / 5`, 1107, 210, { cls: "mono big" }) +
        label("match the exact top five", 1107, 237, { cls: "tiny", color: muted });
      setPressed(root, "topic-", `topic-${queryIndex}`);
      setPressed(root, "mode-", exact ? "mode-exact" : "mode-ann");
      announce(root, `Compared ${compared.length} points. ${overlap} of five candidates match the exact top five.`);
    }

    root.addEventListener("click", (event) => {
      const choice = event.target.closest("button")?.dataset.action;
      if (!choice) return;
      if (choice.startsWith("topic-")) queryIndex = Number(choice.slice(6));
      else exact = choice === "mode-exact";
      update();
    });
    update();
  }

  const interestTopics = [categories[0], categories[1], categories[2]];
  const baseline = [50, 50, 50];

  function renderLearn() {
    const panel = canvas(1260, 386, frame(1260, 386) +
      label("Estimated interest", 100, 64, { cls: "big", align: "start" }) +
      interestTopics.map(({ title, color }, i) => {
        const y = 104 + 79 * i;
        return label(title, 100, y + 21, { align: "start", cls: "small" }) +
          box(250, y, 715, 30, "#1a2b3d", line, 5) +
          `<rect class="interest-bar" x="250" y="${y}" height="30" width="357.5" rx="5" fill="${color}"/>` +
          `<text class="mono interest-value" x="1008" y="${y + 22}" fill="${color}">50</text>`;
      }).join("") + label("Illustrative scores", 100, 357, { cls: "small", align: "start", color: muted }),
    "Example interest scores for three topics");
    return interactive(panel,
      button("watch-cooking", "Finish cooking video") + button("watch-ai", "Finish AI video") +
      button("skip-gaming", "Skip gaming video") + button("reset", "Reset"));
  }

  function initLearn(root) {
    let scores = [...baseline];
    const changes = { "watch-ai": [0, 14], "watch-cooking": [1, 14], "skip-gaming": [2, -12] };
    root.addEventListener("click", (event) => {
      const choice = event.target.closest("button")?.dataset.action;
      if (!choice) return;
      if (choice === "reset") {
        scores = [...baseline];
      } else {
        const [index, delta] = changes[choice];
        scores[index] = clamp(scores[index] + delta, 0, 100);
      }
      root.querySelectorAll(".interest-bar").forEach((bar, i) => { bar.style.width = `${7.15 * scores[i]}px`; });
      root.querySelectorAll(".interest-value").forEach((value, i) => { value.textContent = scores[i]; });
      announce(root, interestTopics.map(({ title }, i) => `${title} ${scores[i]}`).join(", "));
    });
  }

  const rankingItems = [
    { title: "Quick recipe", p: [.86, .21], color: swatches[1] },
    { title: "Game highlight", p: [.62, .84], color: swatches[3] },
    { title: "AI explainer", p: [.74, .42], color: swatches[0] }
  ];

  function renderRanking() {
    const heading = label("Rank", 136, 60, { cls: "small", color: muted }) +
      label("Video", 245, 60, { cls: "small", align: "start", color: muted }) +
      label("Completion chance", 703, 60, { cls: "small", color: muted }) +
      label("Share chance", 900, 60, { cls: "small", color: muted }) +
      label("Score", 1124, 60, { cls: "small", color: muted });
    const rows = rankingItems.map(({ title, p, color }, i) =>
      `<g class="ranking-row" data-index="${i}">` +
      box(56, 0, 1148, 62, "#152131", line, 7) + icon("play", 208, 31, 24, color) +
      '<text class="mono rank-number" x="136" y="39" text-anchor="middle" fill="#ecf5ff"></text>' +
      label(title, 245, 39, { align: "start" }) +
      label(p[0].toFixed(2), 703, 39, { cls: "mono", color: muted }) +
      label(p[1].toFixed(2), 900, 39, { cls: "mono", color: muted }) +
      '<text class="mono rank-score" x="1124" y="39" text-anchor="middle" fill="#66e7f2"></text></g>'
    ).join("");
    const panel = canvas(1260, 386, frame(1260, 386) + heading + rows +
      '<text class="mono rank-weights" x="630" y="351" text-anchor="middle" direction="ltr" fill="#aab5c4"></text>',
    "Three videos ranked by weighted completion and sharing probabilities");
    return interactive(panel, `<div role="group" aria-label="Ranking priority">
      ${button("rank-complete", "Prioritize completion", true)}${button("rank-share", "Prioritize shares", false)}</div>`);
  }

  function initRanking(root) {
    const rows = [...root.querySelectorAll(".ranking-row")];
    function update(mode) {
      const [a, b] = mode === "rank-complete" ? [.8, .2] : [.2, .8];
      const ranked = rankingItems.map(({ p, title }, i) => ({ i, title, score: p[0] * a + p[1] * b }))
        .sort((left, right) => right.score - left.score);
      ranked.forEach(({ i, score }, rank) => {
        rows[i].style.transform = `translateY(${84 + rank * 74}px)`;
        rows[i].querySelector(".rank-number").textContent = rank + 1;
        rows[i].querySelector(".rank-score").textContent = score.toFixed(2);
      });
      root.querySelector(".rank-weights").textContent = `${a.toFixed(1)} × P(Complete)  +  ${b.toFixed(1)} × P(Share)`;
      setPressed(root, "rank-", mode);
      announce(root, ranked.map(({ title }, i) => `${i + 1} ${title}`).join(", "));
    }
    root.addEventListener("click", (event) => {
      const choice = event.target.closest("button")?.dataset.action;
      if (choice) update(choice);
    });
    update("rank-complete");
  }

  visual.ann = renderANN;
  visual.learn = renderLearn;
  visual.ranking = renderRanking;
  window.DeckDemos = { ann: initANN, learn: initLearn, ranking: initRanking };
})();

