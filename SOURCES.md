# Sources and evidence limits

## Reverse engineering · Slides 6–16

- OWASP covers static inspection, runtime analysis, and network traffic analysis for mobile apps. The code and event logs in the slides are examples written for a test app. [OWASP MASTG](https://mas.owasp.org/MASTG/techniques/)
- Oracle documents how javac compiles Java source into class files. AOSP documents DEX execution in Android Runtime and its support for ahead-of-time and just-in-time compilation. [Oracle javac](https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html) · [Android Runtime](https://source.android.com/docs/core/runtime)
- JADX reconstructs Java-like code from Android executables, with limits on what it can recover. Frida supports runtime observation. Inspection of HTTPS content with mitmproxy depends on the test client trusting its certificate. [JADX](https://github.com/skylot/jadx) · [Frida](https://frida.re/docs/home/) · [mitmproxy](https://docs.mitmproxy.org/stable/concepts/certificates/)

## Recommendations · Slides 17–32

- TikTok lists watch time, completion, skips, likes, shares, and information about the content and viewer among its signals. It also describes starting recommendations for viewers who select interests or skip that step. This is the company’s public description. [How TikTok recommends content](https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content)
- Google explains candidate generation, scoring, and reranking. Faiss documents vector search and its speed and accuracy tradeoffs. The demo shows 304 synthetic points in two dimensions. Approximate search checks the two cells with centers closest to the query. Exact search checks every point. Ranking weights and interest scores are illustrative. [Google Recommendation Systems](https://developers.google.com/machine-learning/recommendation/overview/types) · [Faiss](https://faiss.ai/)
- ByteDance’s Monolith paper describes research on real-time recommendations and embedding tables. The paper and the public For You description leave the retrieval algorithm used in any particular production version or setting open. [ByteDance Monolith](https://arxiv.org/abs/2209.07663)

### Claims that remain unverified

- The reference screenshots include field names and claims about **31 models and 58 variables**. We found no reproducible test that confirms the counts or their scope, establishes that motion, brightness, or charging state affects For You ranking, or shows that the named functions predict when a viewer will reopen the app or intervene before an expected exit.
- TikTok’s U.S. privacy policy names battery state and keystroke patterns as technical data and says some user content may be uploaded during creation. What happens to the text of an unsent private message that a viewer deletes, and whether these fields affect ranking, require independent evidence. [TikTok U.S. Privacy Policy](https://t.tiktok.com/legal/page/us/privacy-policy/en)

## Ads and microphone access · Slides 33–36

- An FTC staff report describes linking devices through known signals such as a login or probabilistic signals such as shared IP addresses. The ring story is hypothetical. Its timeline alone cannot establish what caused the ad. [FTC Cross-Device Tracking Staff Report](https://www.ftc.gov/reports/cross-device-tracking-federal-trade-commission-staff-report-january-2017)
- The 2018 Panoptispy study found leaks of images and video in a sample of Android apps. It recorded no audio leaks in its experiments, within the limits of the sample and method. An accurate ad by itself is insufficient evidence of recording. We found no convincing general evidence that major platforms routinely record private conversations to target ads. [Panoptispy](https://petsymposium.org/popets/2018/popets-2018-0030.php)
- In its final 2026 complaint, the FTC said that CMG’s Active Listening service did not collect or use voice data for the service it investigated. [FTC Final Complaint](https://www.ftc.gov/system/files/ftc_gov/pdf/2423029c4838cmgfinalcomplaint.pdf)

## Privacy choices · Slides 37–40

- Android and Apple document sensor permissions and microphone and camera indicators. The controls available to a viewer depend on the operating system version and settings. [Android privacy controls](https://developer.android.com/training/permissions/explaining-access) · [Apple hardware access controls](https://support.apple.com/en-ca/guide/iphone/iph168c4bbd5/27/ios/27)
- LiteRT supports running inference on the device. The slides use local ranking as an architectural example. The privacy benefit depends on what actually leaves the device, including content requests or usage logs if present. [Google LiteRT](https://developers.google.com/edge/litert)
