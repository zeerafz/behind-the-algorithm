# Behind the Algorithm

A 47-slide English presentation about reverse engineering, recommendation systems, and digital privacy. It explores Android app analysis, video ranking, ad targeting, and on-device personalization. The final three slides contain two five-question quizzes and a set of clickable references.

[Open the presentation on GitHub Pages](https://zeerafz.github.io/behind-the-algorithm/)

## Run locally

Download or clone the full project, then open `index.html` in a modern browser such as Chrome or Edge. The presentation works offline. You can also run `python -m http.server 8000` in the project folder and open the address shown in the terminal.

| Action | Control |
| --- | --- |
| Next slide | Right Arrow, Space, Enter, or swipe left |
| Previous slide | Left Arrow or swipe right |
| First or last slide | Home or End |
| Fullscreen | F or the fullscreen button. Press Esc to exit. |
| Slide overview | O or the grid button. Select a slide to jump to it. |
| Speaker notes | N or the notes button. This opens notes over the presentation. |
| Separate presenter window | P or **Open presenter window**. Move it to your own screen and share the main presentation window. |
| Share a slide | Copy the address after opening the slide, for example `#slide-26`. |

The toolbar also has buttons for mouse and touch navigation. When a button has focus, Enter and Space activate it. If your browser blocks the presenter window, allow the pop-up or use the notes panel. The diagrams are easiest to read with a phone held in landscape. Demo controls also appear below the slide on a portrait phone.

## Live demos

- **26 · Approximate nearest neighbor search.** Pick a topic and compare approximate and exact search. Cooking shows how scanning only part of the index can miss a nearby match. Both modes use the same 304 synthetic points.
- **28 · Learning from interactions.** Finish or skip a video to see an interest score change. Reset restores the starting scores.
- **30 · Ranking.** Switch priority between completion and sharing to see the same candidates reorder.
- **45–46 · Quizzes.** Choose answers to see immediate feedback. On a phone in portrait, scroll through the questions.

## GitHub Pages

The project publishes from the root of `main`. To deploy a copy, upload the project contents, including `.nojekyll`, to the root of your repository. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and **/(root)**, and save. Use **Visit site** after the deployment finishes. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Speaker notes are hidden in the presentation by default and available in the published source.

## Project files

- `index.html` and `presenter.html` open the presentation and the separate notes window.
- `css/main.css` controls the layout, scaling, and motion.
- `js/slides-data.js` contains the slide titles and notes.
- `js/diagrams.js` contains the SVG artwork. `js/demos.js` implements the three interactive demos.
- `js/app.js` and `js/presenter.js` handle navigation and keep the windows in sync.
- `js/review.js` contains the two listening scenarios, quizzes, and references.
- `assets/images/` contains the three ImageGen illustrations and two user-provided screenshots. [Cover](assets/images/cover.webp) · [Ring ad](assets/images/conversation.webp) · [Closing illustration](assets/images/reflection.webp) · [Device linking](assets/images/scene-device-linking.png) · [Behavior signals](assets/images/scene-behavior-signals.png)
- [Sources and evidence limits](SOURCES.md) lists the references behind the slides and the claims that remain open.
