(function review() {
  "use strict";

  const { visual } = window.DeckDiagrams;
  const demos = window.DeckDemos;
  const letters = "ABCD";

  const analysis = [
    ["What can static analysis establish about an API call?",
      ["The app always sends it", "The code contains a possible request", "The server stores its data", "The request travels unencrypted"], 1],
    ["What best confirms the test app sent a playback event?",
      ["A video icon in the APK", "A permission in the manifest", "A captured request after playback", "A filename matching the event"], 2],
    ["Why can approximate search miss a nearby video?",
      ["It checks only part of the index", "It skips the query vector", "It ranks by likes before retrieval", "It requires topic labels"], 0],
    ["What can reorder videos if their predicted probabilities stay fixed?",
      ["Renaming the APK", "Widening the search grid", "Increasing the screen size", "Changing the scoring weights"], 3],
    ["What can a feed use when a new viewer has no history?",
      ["The viewer’s replay counts", "Popular or viewer-chosen topics", "The viewer’s past completion rates", "The viewer’s past skip patterns"], 1]
  ];

  const privacy = [
    ["What can a shared Wi-Fi connection tell an ad system?",
      ["The users discussed a product", "The devices belong to one person", "The network is one possible linking signal", "It identifies the cause of a specific ad"], 2],
    ["Which finding best supports a claim of audio-based ad targeting?",
      ["The app has microphone permission", "The ad followed a conversation", "A replay appears in the log", "Captured audio is traced to ad selection"], 3],
    ["A log shows 30 seconds of playback for a 15-second clip. What does it establish?",
      ["Two clip lengths of playback", "Which object drew attention", "Why the viewer stayed", "That the viewer liked the clip"], 0],
    ["Which input can local ranking keep on the device?",
      ["The platform’s entire catalog", "The viewing history used for ranking", "The server’s request logs", "Every video’s upload record"], 1],
    ["What completes a recommendation feedback loop?",
      ["The app installs an update", "An exact search scans the index", "The viewer reacts to a recommended video", "The app compresses a video"], 2]
  ];

  const references = [
    ["App analysis", [
      ["OWASP", "Mobile Security Testing Guide", "https://mas.owasp.org/MASTG/techniques/"],
      ["Android Open Source Project", "Android Runtime and DEX", "https://source.android.com/docs/core/runtime"],
      ["Oracle", "The javac compiler", "https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html"],
      ["JADX and Frida", "Decompilation and runtime inspection", "https://github.com/skylot/jadx", "https://frida.re/docs/home/"]
    ]],
    ["Recommendations", [
      ["TikTok", "How TikTok recommends content", "https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content"],
      ["Google for Developers", "Recommendation systems", "https://developers.google.com/machine-learning/recommendation/overview/types"],
      ["Faiss", "Similarity search documentation", "https://faiss.ai/"],
      ["ByteDance", "Monolith recommendation system", "https://arxiv.org/abs/2209.07663"]
    ]],
    ["Ads and privacy", [
      ["Federal Trade Commission", "Cross-Device Tracking report", "https://www.ftc.gov/reports/cross-device-tracking-federal-trade-commission-staff-report-january-2017"],
      ["Federal Trade Commission", "CMG Active Listening complaint", "https://www.ftc.gov/system/files/ftc_gov/pdf/2423029c4838cmgfinalcomplaint.pdf"],
      ["Proceedings on Privacy Enhancing Technologies", "Panoptispy study", "https://petsymposium.org/popets/2018/popets-2018-0030.php"],
      ["Android Developers", "Microphone and camera access indicators", "https://developer.android.com/training/permissions/explaining-access"]
    ]]
  ];

  function scene(file, description, caption) {
    return `<figure class="evidence-scene">
      <div class="evidence-image"><img src="assets/images/${file}" alt="${description}"></div>
      <figcaption>${caption}</figcaption>
    </figure>`;
  }

  visual.sharedNetwork = () => scene(
    "scene-device-linking.png",
    "Two phones share a network or location. In this hypothetical example, an ad system infers a link and shows an espresso machine ad.",
    "Hypothetical scenario. Shared Wi-Fi or location can be clues. Linking the devices or explaining the ad would take additional evidence."
  );

  visual.behaviorLog = () => scene(
    "scene-behavior-signals.png",
    "An example table links scrolling, skipping, replays, comments, and pausing to possible behavior signals.",
    "Illustrative measurements. Playback time and comments opened can be logged. Intent and object focus require stronger evidence."
  );

  function addQuiz(name, questions, start) {
    const selected = Array(questions.length).fill(null);

    visual[name] = () => `<div class="quiz-sheet">
      <div class="quiz-list">${questions.map(([question, choices], index) => {
        const number = start + index;
        return `<section class="quiz-question" data-question="${index}" aria-labelledby="quiz-question-${number}">
          <h3 id="quiz-question-${number}"><span>${String(number).padStart(2, "0")}</span>${question}</h3>
          <div class="quiz-options">${choices.map((choice, option) => `<button type="button" data-answer="${option}" aria-pressed="false">
            <span class="quiz-letter">${letters[option]}</span><span>${choice}</span>
          </button>`).join("")}</div>
        </section>`;
      }).join("")}</div>
      <div class="quiz-footer">
        <span class="quiz-score"></span>
        <span class="quiz-feedback" role="status"></span>
        <button class="panel-button quiz-reset" type="button">Reset answers</button>
      </div>
    </div>`;

    demos[name] = (root) => {
      const rows = [...root.querySelectorAll(".quiz-question")];
      const feedback = root.querySelector(".quiz-feedback");

      function renderSelections() {
        let correct = 0;
        rows.forEach((row, index) => {
          const answer = questions[index][2];
          row.querySelectorAll("button").forEach((button, option) => {
            const pressed = selected[index] === option;
            button.setAttribute("aria-pressed", String(pressed));
            if (pressed) {
              button.dataset.result = option === answer ? "correct" : "incorrect";
              if (option === answer) correct++;
            } else {
              delete button.dataset.result;
            }
          });
        });
        root.querySelector(".quiz-score").textContent = `${correct} / ${questions.length} correct`;
      }

      root.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.classList.contains("quiz-reset")) {
          selected.fill(null);
          feedback.textContent = "Answers cleared.";
        } else {
          const index = Number(button.closest(".quiz-question").dataset.question);
          selected[index] = Number(button.dataset.answer);
          feedback.textContent = selected[index] === questions[index][2]
            ? `Question ${start + index} is correct.`
            : `Try another answer for question ${start + index}.`;
        }
        renderSelections();
      });

      renderSelections();
    };
  }

  addQuiz("quizAnalysis", analysis, 1);
  addQuiz("quizPrivacy", privacy, 6);

  visual.references = () => `<div class="reference-grid">${references.map(([heading, items]) =>
    `<section class="reference-group"><h3>${heading}</h3><ul>${items.map(([source, title, url, extra]) =>
      `<li><span>${source}</span><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>${extra
        ? `<a href="${extra}" target="_blank" rel="noopener noreferrer">Frida documentation</a>` : ""}</li>`
    ).join("")}</ul></section>`
  ).join("")}</div>`;
})();
