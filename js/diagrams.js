(function diagrams() {
  "use strict";

  const red = "#ff5368";
  const cyan = "#66e7f2";
  const ink = "#edf3fb";
  const muted = "#aab5c4";
  const line = "#34475f";
  const dark = "#101924";
  const swatches = [cyan, "#ffc37e", "#beabff", "#8be4ab", red];

  const icons = {
    idea: "M9 18h6m-5 3h4M9 15v-2a5 5 0 1 1 6 0v2",
    design: "M3 3h18v18H3zM8 3v18m-5-7h18m-8 0V3",
    app: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5 6-3 3 3 3m4-6 3 3-3 3",
    search: "M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-2 4 6 6",
    check: "M5 12l4 4L19 6",
    shield: "M12 2l8 4v6c0 4-3 7-8 10-5-3-8-6-8-10V6zm-4 10 3 3 5-6",
    layers: "M12 2l10 5-10 5L2 7zm10 10-10 5-10-5m20 5-10 5-10-5",
    file: "M5 2h9l5 5v15H5zm9 0v6h5M8 12h8m-8 4h6",
    lock: "M6 10h12v10H6zm2 0V7a4 4 0 1 1 8 0v3m-4 4v2",
    phone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 17h2M10 5h4",
    server: "M3 3h18v7H3zm0 11h18v7H3zM7 6.5h.01M7 17.5h.01M11 6.5h7M11 17.5h7",
    play: "M9 5l11 7-11 7z",
    timer: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-5v5l4 2",
    heart: "M12 20S3 14.5 3 8.8C3 4.4 9 3 12 7c3-4 9-2.6 9 1.8 0 5.7-9 11.2-9 11.2z",
    share: "M5 19v-5c0-4 3-6 9-6V4l7 7-7 7v-4c-5 0-7 1.5-9 5z",
    replay: "M4 11a8 8 0 1 1 1 5M4 5v6h6",
    skip: "M4 5l11 7-11 7zm15 0v14",
    cpu: "M6 6h12v12H6zm4 4h4v4h-4zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4",
    chart: "M3 3v18h18M7 17v-4m5 4V9m5 8V5",
    target: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-4 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-5 0h.01",
    users: "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2",
    mic: "M9 6a3 3 0 1 1 6 0v6a3 3 0 0 1-6 0zm-3 5v1a6 6 0 0 0 12 0v-1m-6 7v4m-4 0h8",
    ring: "M18 15a6 6 0 1 1-12 0 6 6 0 0 1 12 0zM9 7l1-3h4l1 3-3 3z",
    wifi: "M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0m-4 4h.01",
    cloud: "M6 19a4 4 0 0 1-.5-8 6 6 0 0 1 11.7-1.3A4.7 4.7 0 1 1 18 19z",
    message: "M3 5h18v12H9l-6 4zM7 9h10m-10 4h6",
    filter: "M3 4h18l-7 8v6l-4 3v-9z",
    sliders: "M3 6h5m4 0h9M3 12h10m4 0h4M3 18h3m4 0h11M8 3v6m5 0v6m-7 0v6",
    eye: "M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
    bolt: "M14 2L4 14h7l-1 8 10-12h-7z",
    bug: "M8 10h8v7a4 4 0 1 1-8 0zm1 0V8a3 3 0 0 1 6 0v2M9 5 7 3m8 2 2-2M3 9l5 3m-5 4h5m-4 5 4-3m13-9-5 3m5 4h-5m4 5-4-3",
    fingerprint: "M4 13v-1a8 8 0 0 1 16 0v3m-13 2v-5a5 5 0 0 1 10 0v4c0 2-.5 4-1 5m-6-2v-7a2 2 0 0 1 4 0v3c0 3-.5 5-1.5 7"
  };

  function icon(name, x, y, size, color = ink) {
    return `<svg x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name]}"/></svg>`;
  }

  function label(value, x, y, options = {}) {
    const { cls = "", color = ink, align = "middle", rtl = /[\u0600-\u06ff]/.test(value) } = options;
    return `<text x="${x}" y="${y}" text-anchor="${align}" direction="${rtl ? "rtl" : "ltr"}" class="${cls}" fill="${color}">${value}</text>`;
  }

  function box(x, y, w, h, fill = dark, stroke = line, radius = 10) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
  }

  function circle(x, y, r, fill, stroke = "none", extra = "") {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
  }

  function canvas(w, h, body, accessibleLabel) {
    return `<svg class="diagram" viewBox="0 0 ${w} ${h}" role="img" aria-label="${accessibleLabel}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#6a83a0" stroke-opacity=".16"/></pattern>
        <pattern id="dither" width="17" height="17" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="#7489a5" opacity=".5"/></pattern>
        <radialGradient id="halo"><stop stop-color="#57d9ec" stop-opacity=".21"/><stop offset="1" stop-color="#57d9ec" stop-opacity="0"/></radialGradient>
        <linearGradient id="screen" x2="1" y2="1"><stop stop-color="#2e455c"/><stop offset="1" stop-color="#12212e"/></linearGradient>
        <linearGradient id="heat" x2="1" y2="1"><stop stop-color="#583441"/><stop offset="1" stop-color="#211824"/></linearGradient>
        <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0l8 4-8 4 2-4z" fill="#9aacbf"/></marker>
      </defs>${body}</svg>`;
  }

  function frame(w, h) {
    return box(1, 1, w - 2, h - 2, "#0b121c", line, 17) +
      box(1, 1, w - 2, h - 2, "url(#grid)", "none", 17);
  }

  function path(d, color = line, width = 2, extra = "") {
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  }

  function arrow(d, color = "#768aa2", moving = false, duration = "3.5s", delay = "0s") {
    return path(d, color, 2, 'marker-end="url(#arrow)"') +
      (moving ? `<circle class="motion" r="4.5" fill="${color}"><animateMotion path="${d}" dur="${duration}" begin="${delay}" repeatCount="indefinite"/></circle>` : "");
  }

  function badge(name, x, y, title, color = cyan, radius = 60) {
    return circle(x, y, radius, "#101c2a", color) + circle(x, y, radius - 10, "none", `${color}38`) +
      icon(name, x, y, radius * .85, color) +
      (title ? label(title, x, y + radius + 42, { cls: "big" }) : "");
  }

  function node(x, y, w, h, glyph, title, color = cyan, small = "") {
    return box(x, y, w, h, "#121b28", line, 12) +
      box(x + 1, y + 1, w - 2, 3, color, "none", 2) +
      icon(glyph, x + w / 2, y + h * .36, h * .26, color) +
      label(title, x + w / 2, y + h * .74, { cls: "big" }) +
      (small ? label(small, x + w / 2, y + h * .89, { cls: "tiny mono", color: muted }) : "");
  }

  function sequence(items, accessibleLabel, { w = 1260, h = 440, rtl = true } = {}) {
    const span = (w - 110) / items.length;
    const tileWidth = Math.min(span - 46, 258);
    const ys = h * .25;
    const height = h * .46;
    const positions = items.map((_, i) => 55 + span * (rtl ? items.length - i - .5 : i + .5));
    const connectors = positions.slice(1).map((x, i) => {
      const direction = rtl ? -1 : 1;
      const offset = direction * (tileWidth / 2 + 7);
      return arrow(`M${positions[i] + offset} ${ys + height / 2}H${x - offset}`, i % 2 ? red : cyan, true, `${2.4 + i * .18}s`, `${i * .4}s`);
    }).join("");
    const tiles = items.map(([glyph, title, color, small], i) =>
      node(positions[i] - tileWidth / 2, ys, tileWidth, height, glyph, title, color, small)).join("");
    return canvas(w, h, frame(w, h) + connectors + tiles, accessibleLabel);
  }

  function codePanel(x, y, w, h, header, rows, accent = cyan) {
    return box(x, y, w, h, "#0b1018", "#3a4b63", 13) +
      box(x, y, w, 53, "#192435", "none", 13) +
      circle(x + 24, y + 25, 4, accent) +
      label(header, x + 41, y + 32, { cls: "mono", align: "start", color: muted }) +
      rows.map(([value, active], i) => {
        const rowY = y + 94 + i * 42;
        return (active ? box(x + 13, rowY - 26, w - 26, 38, `${accent}20`, "none", 4) : "") +
          label(String(i + 1).padStart(2, "0"), x + 24, rowY, { cls: "mono tiny", align: "start", color: "#7f8ea5" }) +
          label(value, x + 65, rowY, { cls: "mono", align: "start", color: active ? accent : ink });
      }).join("");
  }

  function phone(x, y, w, h, inner = "", stroke = "#7389a5") {
    return box(x, y, w, h, "#0c121c", stroke, 25) +
      box(x + 10, y + 11, w - 20, h - 22, "#152030", "#202d40", 18) +
      inner + box(x + w / 2 - 23, y + 18, 46, 5, "#738499", "none", 2.5) +
      box(x + w / 2 - 27, y + h - 24, 54, 3, "#738499", "none", 2);
  }

  function orbit(x, y, radius, color) {
    return circle(x, y, radius, "none", color, 'opacity=".35" stroke-dasharray="4 7"');
  }

  function seeded(seed) {
    return () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  const visual = {};

  visual.time = () => canvas(850, 550, frame(850, 550) +
    circle(425, 265, 233, "url(#halo)") +
    orbit(425, 265, 206, cyan) + orbit(425, 265, 190, muted) +
    path("M218 265a207 207 0 1 1 305 181", red, 4, 'class="time-arc" pathLength="100" stroke-dasharray="100"') +
    label("00:10", 425, 201, { cls: "mono big", color: muted }) +
    path("M425 221v40m-8-9 8 9 8-9", cyan) +
    `<g class="time-second">${label("02:00", 425, 369, { cls: "display", color: red })}</g>`,
  "جلسة افتراضية تبدأ بعشر دقائق وتمتد إلى ساعتين");

  visual.agency = () => {
    const edges = [[505, 273, 615, 133], [505, 273, 718, 212], [505, 273, 640, 352],
      [615, 133, 718, 212], [615, 133, 672, 69], [718, 212, 763, 320], [640, 352, 763, 320], [640, 352, 693, 429]];
    return canvas(850, 550, frame(850, 550) + circle(514, 273, 253, "url(#halo)") +
      edges.map(([a, b, c, d]) => path(`M${a} ${b}L${c} ${d}`, "#5c536f", 2) + circle(c, d, 7, red)).join("") +
      arrow("M297 238H469", cyan, true) + arrow("M467 307H297", red, true, "3.1s", ".5s") +
      badge("users", 200, 274, "إنت", cyan, 82) + badge("cpu", 540, 274, "الخوارزمية", red, 69),
    "الشخص يختار كيف يتفاعل والنظام يختار ما يعرض");
  };

  visual.agenda = () => sequence([
    ["layers", "الهندسة العكسية", cyan, "REVERSE ENGINEERING"],
    ["target", "نظام التوصيات", "#c5afff", "RECOMMENDATIONS"],
    ["shield", "الخصوصية الرقمية", red, "DIGITAL PRIVACY"]
  ], "ثلاث محطات في العرض");

  function lane(y, color, heading, items, rtl = true) {
    const xs = rtl ? [1050, 630, 210] : [210, 630, 1050];
    const d = rtl ? -1 : 1;
    return box(38, y - 46, 1184, 159, "#101925", "#2a3d53", 12) +
      label(heading, 1190, y - 11, { align: /[\u0600-\u06ff]/.test(heading) ? "start" : "end", cls: "small", color }) +
      xs.slice(1).map((x, i) => arrow(`M${xs[i] + d * 127} ${y + 43}H${x - d * 127}`, color, true, "3.1s", `${i * .4}s`)).join("") +
      items.map(([glyph, title], i) => box(xs[i] - 113, y + 11, 226, 64, "#142131", "#41566f", 8) +
        icon(glyph, xs[i] - 77, y + 43, 26, color) + label(title, xs[i] + 17, y + 52)).join("");
  }

  visual.engineering = () => canvas(1260, 430, frame(1260, 430) +
    lane(66, cyan, "الهندسة", [["idea", "فكرة"], ["design", "تصميم"], ["app", "تطبيق"]]) +
    lane(275, red, "الهندسة العكسية", [["app", "تطبيق"], ["search", "فحص"], ["idea", "فهم"]], false),
  "في الهندسة ننطلق من الفكرة وفي الهندسة العكسية ننطلق من المنتج");

  visual.reverse = () => {
    const items = [["app", "التطبيق"], ["layers", "ملفات التنفيذ"], ["file", "كود مُعاد بناؤه"], ["search", "التحليل"], ["check", "النتائج"]];
    const xs = [1115, 871, 630, 389, 145];
    return canvas(1260, 435, frame(1260, 435) +
      xs.slice(1).map((x, i) => arrow(`M${xs[i] - 71} 201H${x + 71}`, i < 2 ? cyan : red, true, "3.1s", `${i * .45}s`)).join("") +
      items.map(([glyph, title], i) => `<g class="build-piece" style="--delay:${i * 115}ms;--from-x:${(4 - i) * 13}px">${badge(glyph, xs[i], 201, title, i < 3 ? cyan : red)}</g>`).join(""),
    "مراحل فحص تطبيق من الملف التنفيذي حتى اختبار النتائج");
  };

  visual.contract = () => canvas(850, 550, circle(410, 270, 270, "url(#halo)") +
    `<g transform="rotate(-9 387 279)">` + box(171, 55, 401, 431, "#172331", "#526781", 14) +
    box(198, 84, 349, 372, "#111c2b", "none", 8) +
    label("TERMS", 227, 145, { cls: "mono big", align: "start", color: muted }) +
    [179, 210, 241, 272, 303, 334, 365, 396].map((y, i) => path(`M229 ${y}h${i === 5 ? 246 : 288 - i % 4 * 19}`, i === 5 ? red : "#52647b", i === 5 ? 5 : 3)).join("") +
    `</g>` + circle(507, 315, 113, "#16212bd9", cyan, 'stroke-width="3"') +
    path("M588 399l102 101", cyan, 13) +
    path("M440 310h135m-123 23h111", red, 4),
  "عدسة تكبّر بنداً في عقد");

  visual.findings = () => sequence([
    ["eye", "سلوك مخفي", cyan], ["bug", "ثغرات أمنية", red], ["lock", "الوصول للبيانات", "#c5afff"]
  ], "أهداف فحص التطبيق");

  visual.layers = () => {
    const rows = [
      [52, cyan, "AndroidManifest.xml", "تعريف التطبيق والأذونات"],
      [151, "#c5afff", "classes.dex", "تعليمات DEX"],
      [250, "#ffc37e", "lib/*.so", "مكتبات Native"],
      [349, red, "res/ · assets/", "صور وواجهات وملفات"]
    ];
    return canvas(850, 540, frame(850, 540) + phone(94, 122, 168, 290, icon("app", 178, 265, 65, cyan)) +
      rows.map(([y, color, code, title], i) => path(`M263 265C320 265 320 ${y + 35} 384 ${y + 35}`, color, 2) +
        `<g class="build-piece" style="--delay:${i * 95}ms;--from-x:-75px">` +
        box(384, y, 412, 76, "#132131", line, 10) + box(384, y, 5, 76, color, "none", 2) +
        label(code, 408, y + 31, { cls: "mono", align: "start", color }) +
        label(title, 772, y + 56, { cls: "small", align: "start", rtl: true, color: muted }) + `</g>`).join(""),
    "مثال على الملفات الموجودة داخل APK");
  };

  visual.runtime = () => {
    function row(y, heading, values, color) {
      const xs = [206, 489, 772, 1055];
      return label(heading, 70, y - 14, { align: "start", cls: "mono", color }) +
        xs.slice(1).map((x, i) => arrow(`M${xs[i] + 113} ${y + 47}H${x - 113}`, color, true)).join("") +
        values.map((v, i) => box(xs[i] - 109, y + 10, 218, 75, "#132030", line, 8) +
          label(v, xs[i], y + 55, { cls: "mono" })).join("");
    }
    return canvas(1260, 435, frame(1260, 435) +
      row(67, "JAVA / JVM", ["Source", ".class bytecode", "JVM", "Machine code*"], cyan) +
      row(245, "ANDROID / ART", ["Java / Kotlin", "DEX bytecode", "ART", "Machine code*"], red) +
      label("* التفسير أو الترجمة حسب بيئة التنفيذ", 1190, 401, { color: muted, cls: "small", align: "start" }),
    "مساران مختلفان لكود جافا ولتنفيذ تطبيق أندرويد");
  };

  const exampleCode = [
    ["fun onVideoFinished(id: String) {", false],
    ["  val event = Playback(id, 1.0)", false],
    ["  telemetry.send(event)", true],
    ["}", false]
  ];

  visual.decompile = () => canvas(1260, 440, frame(1260, 440) +
    codePanel(57, 61, 458, 309, "classes.dex · Smali", [
      ["const-string v0, \"playback\"", false], ["const/4 v1, 0x1", false],
      ["invoke-static {v0, v1}", true], ["return-void", false]
    ], cyan) + arrow("M533 219H718", red, true) + label("JADX", 626, 192, { cls: "mono", color: red }) +
    codePanel(737, 61, 465, 309, "Reconstructed.java", [
      ["void record() {", false], ["  boolean complete = true;", false],
      ["  log(\"playback\", complete);", true], ["}", false]
    ], red), "مثال مبسط يربط تعليمات DEX بكود جافا معاد بناؤه");

  visual.static = () => canvas(850, 540, frame(850, 540) +
    codePanel(95, 75, 660, 340, "Playback.kt", exampleCode, cyan) +
    box(548, 438, 207, 45, "#132331", line, 7) +
    label("مسار إرسال محتمل", 651, 468, { cls: "small", color: cyan }),
  "فحص دالة قد ترسل حدث مشاهدة دون تشغيل التطبيق");

  visual.dynamic = () => canvas(850, 540, frame(850, 540) +
    phone(93, 88, 210, 359, box(125, 161, 146, 187, "url(#screen)", line) +
      icon("play", 198, 250, 48, cyan)) + arrow("M317 260H457", red, true, "2.2s") +
    codePanel(475, 142, 323, 247, "Runtime · Lab", [
      ["video.finished", false], ["POST /events", true], ["HTTP 204", false]
    ], red),
  "مراقبة التشغيل وطلب الشبكة على جهاز اختبار");

  visual.comparison = () => canvas(1260, 445, frame(1260, 445) +
    label("Static Analysis", 313, 61, { cls: "mono big", color: cyan }) +
    label("Dynamic Analysis", 947, 61, { cls: "mono big", color: red }) +
    path("M630 44V405", "#3f5169", 1) +
    codePanel(52, 103, 516, 280, "Code inspection", exampleCode, cyan) +
    phone(687, 115, 124, 245, icon("play", 749, 237, 39, red)) +
    arrow("M820 237H885", red, true, "2.2s") +
    codePanel(900, 124, 307, 228, "Network trace", [
      ["POST /events", true], ["type: playback", false], ["HTTP 204", false]
    ], red),
  "الكود يكشف المسار المحتمل ومراقبة التشغيل تظهر الطلب في التجربة");

  visual.api = () => canvas(1260, 440, frame(1260, 440) +
    phone(92, 67, 170, 307, icon("app", 177, 220, 70, cyan)) +
    badge("server", 1080, 219, "السيرفر", red, 78) +
    arrow("M290 166H973", cyan, true, "3.3s") +
    arrow("M973 279H290", red, true, "3.3s", ".7s") +
    label("POST /events", 630, 136, { cls: "mono", color: cyan }) +
    label("HTTP 204", 630, 319, { cls: "mono", color: red }) +
    badge("lock", 630, 223, "", muted, 31),
  "مثال تعليمي لطلب HTTPS من الهاتف ورد من السيرفر");

  function card(x, y, w, h, title, color) {
    return box(x, y, w, h, color === red ? "url(#heat)" : "url(#screen)", "#47627c", 12) +
      circle(x + w * .52, y + h * .37, Math.min(32, h * .2), `${color}29`, color) +
      icon("play", x + w * .52, y + h * .37, Math.min(23, h * .2), color) +
      label(title, x + w / 2, y + h * .79, { cls: "small" });
  }

  visual.feed = () => {
    const cards = [["ذكاء اصطناعي", cyan], ["طبخ", red], ["ألعاب", "#c5afff"], ["ذكاء اصطناعي", cyan], ["طبخ", red]];
    return canvas(850, 550, frame(850, 550) + circle(428, 270, 275, "url(#halo)") +
      orbit(431, 274, 235, cyan) + orbit(431, 274, 181, cyan) +
      path("M194 190H309m231 116h115m-495 88h142m238-260h152", "#46637e", 2) +
      [[194,190],[655,306],[160,394],[692,134]].map(([x,y]) => circle(x,y,5,red)).join("") +
      phone(299, 36, 263, 474, `<defs><clipPath id="feed-window"><rect x="318" y="77" width="225" height="395" rx="8"/></clipPath></defs>
        <g clip-path="url(#feed-window)"><g class="feed-cards">
        ${cards.map(([name, color], i) => card(324, 83 + i * 175, 213, 164, name, color)).join("")}</g></g>`),
    "موجز فيديوهات عمودي متغير");
  };

  visual.signals = () => {
    const sig = [["timer", "وقت المشاهدة"], ["check", "إكمال"], ["skip", "تخطّي"], ["heart", "إعجاب"], ["share", "مشاركة"], ["replay", "إعادة"]];
    return canvas(1260, 440, frame(1260, 440) + sig.map(([glyph, title], i) => {
      const x = 1020 - (i % 3) * 390;
      const y = 85 + Math.floor(i / 3) * 198;
      return circle(x, y, 47, "#18283a", i < 3 ? cyan : "#c5afff") +
        icon(glyph, x, y, 37, i < 3 ? cyan : "#c5afff") + label(title, x, y + 92, { cls: "big" });
    }).join(""), "أمثلة لإشارات المشاهدة والإكمال والتخطي والتفاعل");
  };

  visual.evidence = () => canvas(850, 540, frame(850, 540) +
    codePanel(79, 59, 531, 289, "Example trace · synthetic", [
      ["field: playback_event", false], ["build: demo-1", false], ["test: replay with logging", true], ["result: compare requests", false]
    ], cyan) + circle(588, 308, 94, "#142532eb", red, 'stroke-width="3"') +
    icon("search", 588, 308, 74, red) +
    label("شو بنقدر نعيد ونقيس؟", 425, 451, { cls: "big", color: muted }),
  "لقطة تظهر أسماء حقول وتحتاج تجربة قابلة للتكرار");

  visual.prediction = () => sequence([
    ["play", "تفاعل", cyan], ["sliders", "خصائص", "#a8d1ff"], ["cpu", "نموذج", "#c5afff"], ["target", "توقّع", red]
  ], "أحداث التفاعل تتحول إلى خصائص يستعملها نموذج للتوقع");

  visual.loop = () => {
    const corners = [[972, 111], [972, 331], [288, 331], [288, 111]];
    const geometry = ["M972 159V280", "M916 331H345", "M288 282V161", "M344 111H916"];
    const stages = [["play","بتحضر"],["chart","بتتسجّل إشارة"],["cpu","بتتغيّر التوقعات"],["target","بيطلع فيديو جديد"]];
    return canvas(1260, 445, frame(1260, 445) +
      geometry.map((d, i) => arrow(d, i % 2 ? red : cyan, true, "2.6s", `${i * .31}s`)).join("") +
      corners.map(([x, y], i) => box(x - 56, y - 46, 112, 92, "#162334", i % 2 ? red : cyan, 15) +
        icon(stages[i][0], x, y, 43, i % 2 ? red : cyan) +
        label(stages[i][1], x, y + (i === 1 || i === 2 ? 83 : -64), { cls: "small" })).join("") +
      circle(630, 224, 129, "url(#halo)") + icon("replay", 630, 221, 83, cyan),
    "حلقة متكررة من المشاهدة إلى الإشارة والتوقع وعرض فيديو جديد");
  };

  visual.scale = () => {
    const random = seeded(171);
    const field = Array.from({ length: 920 }, () => {
      const x = 35 + random() * 1190, y = 35 + random() * 364;
      return circle(x.toFixed(1), y.toFixed(1), (.6 + random() * 1.8).toFixed(1), random() > .92 ? red : "#6f8eab", "none", `opacity="${(.25 + random() * .5).toFixed(2)}"`);
    }).join("");
    return canvas(1260, 435, frame(1260, 435) + field +
      circle(654, 215, 173, "url(#halo)") + orbit(654, 215, 86, cyan) + orbit(654, 215, 55, cyan) +
      icon("search", 654, 215, 58, cyan), "تمثيل اصطناعي لمكتبة فيديوهات كبيرة");
  };

  visual.embedding = () => canvas(850, 540, frame(850, 540) +
    card(75, 144, 215, 226, "فيديو", cyan) +
    arrow("M305 259H448", cyan, true) +
    box(465, 152, 305, 214, "#142130", line, 12) +
    label("VECTOR", 618, 208, { cls: "mono", color: cyan }) +
    label("[ .62, −.31, .74, … ]", 618, 270, { cls: "mono" }) +
    label("أرقام بتمثّل الفيديو", 618, 327, { cls: "small", color: muted }),
  "تحويل فيديو إلى متجه أرقام توضيحي");

  visual.cold = () => canvas(1260, 440, frame(1260, 440) +
    badge("users", 978, 216, "مستخدم جديد", cyan, 79) +
    arrow("M890 191C812 191 793 110 670 110", cyan, true) +
    arrow("M890 244C812 244 793 326 670 326", red, true) +
    node(370, 37, 282, 149, "sliders", "اهتمامات مختارة", cyan) +
    node(370, 248, 282, 149, "play", "محتوى رائج", red) +
    arrow("M357 110C263 110 253 211 179 211", cyan) +
    arrow("M357 326C263 326 253 234 179 234", red) +
    badge("phone", 122, 222, "أول توصيات", "#c5afff", 45),
  "التوصيات الأولى قد تبدأ بمواضيع مختارة أو بمحتوى رائج");

  visual.objective = () => canvas(1260, 440, frame(1260, 440) +
    badge("check", 235, 131, "احتمال الإكمال", cyan, 49) +
    badge("share", 630, 131, "احتمال المشاركة", "#c5afff", 49) +
    badge("chart", 1025, 131, "درجة الترتيب", red, 49) +
    path("M235 229V270M630 229V270M1025 229V270", line) +
    box(121, 270, 1018, 104, "#142030", "#47607d", 13) +
    label("Score = w₁ × P(Complete) + w₂ × P(Share)", 630, 332, { cls: "mono big", color: ink }),
  "معادلة اصطناعية تجمع احتمالي الإكمال والمشاركة بأوزان");

  visual.pipeline = () => sequence([
    ["play", "تفاعل", cyan], ["sliders", "خصائص", "#a8d1ff"],
    ["filter", "استرجاع", "#c5afff"], ["chart", "ترتيب", "#ffbc83"], ["phone", "عرض", red]
  ], "التفاعل والخصائص واسترجاع المرشحين وترتيبهم ثم عرضهم");

  visual.rings = () => canvas(1260, 445, frame(1260, 445) +
    phone(956, 69, 205, 306, icon("search", 1058, 196, 53, cyan) +
      label("B", 1058, 270, { cls: "mono", color: cyan })) +
    phone(97, 69, 205, 306, icon("ring", 199, 196, 61, red) +
      label("A", 199, 270, { cls: "mono", color: red })) +
    path("M932 220H736M524 220H326", "#71869f", 2, 'stroke-dasharray="6 8"') +
    label("لاحقاً", 425, 204, { cls: "small", color: muted }) +
    badge("message", 630, 220, "حديث عن خاتم", "#c5afff", 64) +
    label("بحث عن خاتم", 1058, 417, { cls: "small" }) +
    label("ظهر إعلان", 199, 417, { cls: "small" }),
  "تسلسل افتراضي يبدأ ببحث على جهاز وينتهي بإعلان على جهاز آخر");

  visual.adgraph = () => {
    const sources = [["wifi","شبكة مشتركة"],["users","حساب أو معرّف"],["search","سجل التصفّح"],["chart","بيانات المعلن"]];
    return canvas(1260, 445, frame(1260, 445) +
      sources.map(([glyph, title], i) => {
        const y = 62 + i * 106;
        return arrow(`M914 ${y}C805 ${y} 799 223 723 223`, i % 2 ? cyan : "#a69fe9", true, `${2.2 + i * .4}s`) +
          box(928, y - 32, 264, 64, "#142233", line, 7) +
          icon(glyph, 966, y, 26, cyan) + label(title, 1165, y + 8, { align: "start" });
      }).join("") +
      badge("cpu", 630, 223, "استنتاج احتمالي", "#c5afff", 70) +
      arrow("M542 223H301", red, true) + badge("ring", 210, 223, "إعلان محتمل", red, 71),
    "إشارات قد يستعملها نظام إعلاني ليستنتج اهتماماً ويختار إعلاناً");
  };

  visual.mic = () => canvas(850, 540, frame(850, 540) +
    circle(425, 260, 260, "url(#halo)") +
    [92, 127, 169, 215].map((r) => orbit(425, 262, r, cyan)).join("") +
    badge("mic", 425, 262, "", cyan, 79) +
    label("؟", 605, 163, { cls: "display", color: red }) +
    path("M70 299h37l12-19 14 42 16-62 16 39h35m450 0h35l16-39 16 62 14-42 12 19h37", "#587694", 2),
  "سؤال حول الوصول إلى الميكروفون");

  visual.proof = () => canvas(1260, 445, frame(1260, 445) +
    lane(65, cyan, "استنتاج من نشاط", [["search", "نشاط"], ["cpu", "استنتاج"], ["target", "إعلان"]]) +
    lane(277, red, "أدلة على استخدام الصوت", [["mic", "وصول للمايك"], ["file", "التقاط صوت"], ["target", "ربط بالإعلان"]]),
  "مسار الاستنتاج من النشاط ومسار إثبات ربط الصوت بالإعلان");

  visual.footprint = () => {
    const random = seeded(14);
    return canvas(850, 550, frame(850, 550) +
      Array.from({ length: 100 }, () => circle(160 + random() * 530, 58 + random() * 435, 1 + random() * 2, "#6596ab", "none", 'opacity=".32"')).join("") +
      orbit(425, 274, 213, cyan) + orbit(425, 274, 182, cyan) +
      icon("fingerprint", 425, 274, 315, cyan) +
      [[210, 197], [583, 157], [566, 423], [210, 363]].map(([x,y]) => circle(x,y,5,red)).join(""),
    "أثر رقمي مرسوم على شكل بصمة");
  };

  visual.privacy = () => sequence([
    ["lock", "راجع الأذونات", cyan, "MIC · CAMERA · LOCATION"],
    ["sliders", "حدّ التتبّع", "#c5afff", "TRACKING · ADS"],
    ["shield", "حدّث جهازك", red, "SYSTEM · APPS"]
  ], "خطوات لتقليل الوصول والتتبع");

  function system(local) {
    if (!local) return sequence([
      ["phone", "الجهاز", cyan], ["wifi", "إرسال الإشارات", "#a8d1ff"], ["server", "السيرفر", red], ["target", "توصية", "#c5afff"]
    ], "الهاتف يرسل الإشارات ويستقبل توصية محسوبة على السيرفر");
    return canvas(1260, 445, frame(1260, 445) +
      box(163, 56, 934, 338, "#132331", cyan, 22) +
      label("داخل الجهاز", 1055, 102, { align: "start", color: cyan }) +
      box(610, 70, 40, 5, "#587590", "none", 2) +
      arrow("M840 230H710", cyan, true) + arrow("M550 230H420", cyan, true) +
      badge("chart", 908, 230, "إشارات محليّة", cyan, 56) +
      badge("cpu", 630, 230, "نموذج محلي", "#c5afff", 56) +
      badge("target", 352, 230, "توصية", red, 56),
    "التوصية محسوبة داخل الجهاز في هذا التصميم");
  }

  visual.cloud = () => system(false);
  visual.local = () => system(true);
  visual.architecture = () => canvas(1260, 445, frame(1260, 445) +
    lane(65, red, "Cloud Processing", [["phone","الجهاز"],["server","نموذج بعيد"],["target","توصية"]]) +
    lane(276, cyan, "On-Device Processing", [["chart","إشارات محليّة"],["cpu","نموذج محلي"],["target","توصية"]]) +
    box(52, 277, 1156, 88, "none", `${cyan}b0`, 10),
  "في المعالجة السحابية يخرج الطلب من الجهاز وفي المعالجة المحلية يحصل الترتيب داخله");

  visual.thanks = () => canvas(1448, 716, circle(724, 351, 329, "url(#halo)") +
    orbit(724, 351, 272, "#5a7795") + orbit(724, 351, 241, "#5a7795") +
    path("M122 351h247m711 0h247", line) +
    circle(369, 351, 4, red) + circle(1080, 351, 4, red), "دوائر حول رسالة الشكر");

  window.DeckDiagrams = { visual, canvas, frame, label, box, circle, path, arrow, icon, badge, card, seeded, swatches, red, cyan, ink, muted, line };
})();

