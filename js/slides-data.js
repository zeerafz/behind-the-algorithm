(() => {
  "use strict";

  const chapters = [
    "The question", "Reverse engineering", "Recommendation systems", "Ads and privacy", "Design choices"
  ];

  // Each entry supplies the public slide and the presenter notes.
  const slides = [
    [0, "BEHIND THE<br>ALGORITHM", "hero", "cover", "What happens behind the screen?",
      "Think about the last time you opened a short-video app. Today we’ll look at what an app’s behavior can tell us and how recommendation and advertising systems learn from the signals we leave behind."],
    [0, "I talked about it.<br>Then I saw an ad?", "poster", "conversation", "",
      "Have you ever talked about something with your phone nearby, then seen an ad for it? Keep that question in mind. We’ll return to the ring example and ask what evidence would tell us how the ad was selected."],
    [0, "Just ten<br>minutes?", "split", "time", "",
      "You open TikTok, Reels, or Shorts for ten minutes. The next time you check the clock, two hours have passed. Those times are illustrative. Ask yourself what made you stay after the first video ended."],
    [0, "Who picks the<br>next video?", "split", "agency", "",
      "You decide whether to finish or skip a video, and the app decides what to show next. Those choices feed into each other. That raises a question about how the feed is designed and which signals change the order."],
    [0, "What are we investigating?", "wide", "agenda", "",
      "First we’ll examine how to inspect an existing app. Then we’ll look at how a system picks videos from a large library. We’ll end with targeted ads and the privacy choices we can make."],

    [1, "From idea to app<br>and back again", "wide", "engineering", "",
      "Engineering begins with an idea, components, and a design, then builds the product. Reverse engineering begins with the finished product and works toward an explanation of how it behaves. What you can conclude depends on what you can inspect and test."],
    [1, "Reverse Engineering", "wide", "reverse", "Take an app apart to understand its behavior",
      "Start with a copy you’re authorized to inspect. Look at its structure and files, then disassemble or decompile the relevant parts. The reconstructed code helps you form a hypothesis that you can test."],
    [1, "DON’T TRUST.<br><em>VERIFY.</em>", "quote", "contract", "",
      "The fine print of a contract can change what it means. In software, behavior can be hidden behind the interface. Compare claims with evidence. A surprise might turn out to be an undocumented feature, a bug, or a security issue."],
    [1, "What should we look for?", "wide", "findings", "",
      "Look for behavior the interface doesn’t reveal, vulnerabilities or malicious code, and unexpected data access or network activity. Reverse engineering also applies to hardware. Today we’re focusing on software in an authorized test environment. The scope of an inspection depends on the license, local law, and the method."],
    [1, "What’s inside<br>an app?", "split", "layers", "",
      "An APK contains a manifest, DEX files, and potentially native libraries, images, and layout files. Pick the file that matches your question. A permission in the manifest gives you a lead. A runtime test can show whether and when the app uses it."],
    [1, "From code to execution", "wide", "runtime", "",
      "In Java, javac compiles source into class files containing JVM bytecode. The JVM can interpret instructions or compile parts to machine code at runtime. Android’s build tools produce DEX bytecode. ART can interpret or compile it ahead of time or just in time, depending on the device and context."],
    [1, "How do we read bytecode?", "wide", "decompile", "Reconstructed code",
      "A tool such as JADX produces Java-like code from DEX to make it easier to read. Comments and original variable names may be missing. Obfuscation can also make names hard to interpret. Use the output as a clue and check the instructions or runtime behavior to confirm details."],
    [1, "Static Analysis", "split", "static", "Inspect without running the app",
      "Inspect the files with the app closed. Look for SDKs, permissions, or API routes and trace how the code could reach them. Static analysis shows possible behavior. Test the scenario you’re investigating to learn what actually happens."],
    [1, "Dynamic Analysis", "split", "dynamic", "Observe the app at runtime",
      "Run an authorized copy on a test device or emulator. Change one action and watch the result. Frida is an example of a tool for observing calls at runtime. Network traffic, permissions, and logs each answer a different part of the question."],
    [1, "One app, two ways to investigate", "wide", "comparison", "",
      "On the left, we find a function that could send a playback event. On the right, we play a video in a test app and observe a matching request. Record the app version, device, settings, and steps so someone else can reproduce the result."],
    [1, "What does the app send?", "wide", "api", "An HTTPS request and response",
      "An app requests content or sends an event, and the server responds. An API is a normal part of an app. When inspecting traffic, ask about the fields, destination, purpose, permissions, and protections. An ordinary network capture can’t read encrypted HTTPS content. On test devices, mitmproxy can help if the app trusts the test certificate. Some apps also use certificate pinning."],

    [2, "How does the<br>feed pick videos?", "split", "feed", "TikTok’s For You feed",
      "Think about the first video you see when you open the app. TikTok says For You ranking uses interactions, information about videos, and context such as language. Those examples come from the company’s public explanation. They don’t tell us how every model is built or why any individual video appeared."],
    [2, "Every interaction sends a signal", "wide", "signals", "",
      "How long did you watch? Did you finish, skip, like, or share? TikTok lists these signals in its explanation of For You and says interactions generally carry more weight. Replays are a general example for this talk. A long watch might mean interest or simply that the screen was left on. A single signal is noisy."],
    [2, "From screenshot to evidence", "split", "evidence", "Record the version. Reproduce the test.",
      "The reference screenshots list fields for motion, battery, brightness, typing, and predicted opens. TikTok’s U.S. privacy policy names battery state and typing patterns as examples of technical data. Their role in ranking would require a reproducible test of what was sent, when, and why. The claimed model and variable counts, transmission of deleted messages, and alleged exit-prevention function remain unverified."],
    [2, "From interaction to prediction", "wide", "prediction", "",
      "Turn events into measurable features. For example, video length and watch time can give you a completion ratio. A model can use available signals to estimate whether a video will interest you. That estimate changes as new behavior comes in."],
    [2, "The attention loop", "wide", "loop", "Each view can affect what comes next",
      "You watch, the system records a signal, it updates a prediction, and another video appears. What the system shows determines what you can interact with next. That closes the loop. Repetition can make the feed more personal and easier to keep watching. A diagnosis of addiction requires separate clinical evidence."],
    [2, "How do you search a huge video library?", "wide", "scale", "",
      "Comparing every video on every request can be expensive. A fast search narrows the list, so the more expensive scoring stage only has to process a smaller set of candidates."],
    [2, "A video can be<br>a vector", "split", "embedding", "Video embeddings",
      "A model can represent a video’s content or people’s interactions with it as a vector of numbers. What counts as similar depends on how the representation was trained and how distance is measured. Real embeddings often have many more dimensions than this illustration."],
    [2, "Similar videos land near each other", "wide", "clusters", "A simplified two-dimensional view",
      "Each point is a synthetic video about cooking, gaming, sports, or AI. Similar items can land close together, and groups can overlap. Approximate nearest neighbor search works with distance between vectors and doesn’t require these topic labels."],
    [2, "Approximate Nearest Neighbor", "wide", "approximation", "Find nearby vectors with fewer comparisons",
      "ANN describes a family of methods. We look for vectors closest to a query and accept that a cheaper search can miss a nearby item. This example uses a grid index that searches two cells. Libraries such as Faiss offer indexes with different speed and accuracy tradeoffs."],
    [2, "Try finding similar videos", "wide", "ann", "Interactive example with synthetic data",
      "Pick a topic and watch the cyan query and highlighted candidates. Approximate search selects two cells by distance to their centers and compares the points inside them. Exact search compares every point. Try Cooking and compare the two results. This is candidate retrieval. Ranking happens afterward. The map is a teaching example."],
    [2, "What does a new viewer like?", "wide", "cold", "Cold start",
      "At first the system knows little about a new viewer. It might ask for topics or start with popular, varied content. TikTok describes both chosen interests and popular posts as starting points. The system can update its estimate as the viewer interacts."],
    [2, "New interactions change the estimate", "wide", "learn", "Try finishing or skipping a video",
      "Each button changes an illustrative score. Finishing a cooking video raises the estimate of interest in cooking. Skipping a gaming video lowers the gaming estimate. Real models can use more signals and context and account for uncertainty."],
    [2, "Optimization Function", "wide", "objective", "A simplified ranking objective",
      "During training, the objective specifies what the model should improve or what error it should reduce. At ranking time, a system might combine predictions such as the chance a viewer finishes or shares a video. This equation illustrates how weights affect ranking. TikTok’s internal equation is unavailable."],
    [2, "Which video goes first?", "wide", "ranking", "The same candidates with different weights",
      "Switch the priority between completion and sharing. The videos keep their predicted probabilities, but changing the weights can reorder them. A system can also apply constraints for diversity or safety before showing the feed."],
    [2, "From the first signal to the For You feed", "wide", "pipeline", "A general recommendation pipeline",
      "A viewer interacts, and the system turns the event into features. Retrieval narrows the candidate set. Ranking gives each candidate a score. Before display, reranking can account for diversity and policy rules. The viewer’s reaction becomes another signal for the next round."],

    [3, "Why did I see an ad for a ring?", "wide", "rings", "A hypothetical scenario",
      "Device B searched for a ring. Two people talked about it. Later, Device A showed a ring ad. That sequence alone can’t identify the cause. The ad could reflect targeting, context, or a broad campaign that reached multiple people."],
    [3, "How do ads infer what interests you?", "wide", "adgraph", "Possible signals",
      "Some ad systems draw on browsing history, advertiser data, or shared accounts. They may link devices through a known login or infer a link from repeated signals such as a shared IP address, depending on the data, settings, and permissions. Proximity alone can’t establish that identities were linked or exchanged."],
    [3, "Is my phone<br>listening?", "split", "mic", "Check your microphone permission",
      "Microphone access can support a call or a video with sound, and it can also be misused. Recent Android versions let you check the microphone indicator and privacy dashboard. Seeing an ad for something you discussed is insufficient evidence that the microphone was activated."],
    [3, "What evidence would we need?", "wide", "proof", "",
      "Inferring interest from activity and using recorded audio are different claims. To establish audio-based targeting, look for evidence of microphone access, recorded content, and a link to the ad. The Panoptispy study found image and video leaks in its sample. In 2026, the FTC’s complaint about Active Listening said the investigated service did not use voice data. We found no convincing general evidence that major platforms routinely record private conversations to target ads."],
    [3, "Every interaction can leave a trace", "split", "footprint", "",
      "A search, video view, or page visit can be logged, depending on the service and your settings. Ask who records it, why they collect it, who they share it with, and how long they keep it."],

    [4, "How can we protect our privacy?", "wide", "privacy", "",
      "Review microphone, camera, and location permissions. Limit access to when you use the app or turn off access it doesn’t need. Check the app’s privacy controls and limit ad personalization and tracking where available. Keep your system and apps up to date. A trusted tracker blocker can stop some network requests. System permissions and the app’s own data collection require separate attention."],
    [4, "Personalization on the server", "wide", "cloud", "Cloud processing",
      "The device can send usage signals to a server that computes and returns recommendations. Servers can support larger models and fast content updates. What gets sent, how much is collected, and how long it is stored are design decisions."],
    [4, "Personalization on the device", "wide", "local", "On-device processing",
      "Some inference or ranking can move onto the device. For example, an app can download a list of videos and rank it using local history. The app may still need the network for content and model updates. Local processing also uses memory and power."],
    [4, "Where does ranking happen?", "wide", "architecture", "",
      "In the top row, the server ranks videos after receiving signals. In the bottom row, ranking happens on the device. A hybrid design can retrieve candidates on the server and rank them locally. The privacy benefit depends on which data leaves the device."],
    [4, "Algorithms learn<br>from us, too.", "poster", "reflection", "We use them every day.",
      "The next time a recommendation or ad surprises you, ask which signals might have contributed and what evidence would establish their role. Privacy starts with knowing what is collected and having a say in what we share."],
    [4, "Thank you", "closing", "thanks", "Questions?",
      "Ask the audience which permission or privacy setting they would check first. If someone asks about a specific case, identify what is illustrative and what a documented experiment or public statement supports."]
  ].map(([chapter, title, layout, visual, subtitle, speakerNotes], index) => ({
    id: "slide-" + String(index + 1).padStart(2, "0"),
    chapter, title, layout, visual, subtitle, speakerNotes
  }));

  window.DeckData = { chapters, slides };
})();
