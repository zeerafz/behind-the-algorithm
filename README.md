# Behind the Algorithm

عرض جامعي تفاعلي من **42 شريحة** بالعربي، مع ملاحظات للمتحدّث باللهجة الأردنية. يبدأ من إعلان الخاتم ومشكلة الوقت مع الفيديوهات القصيرة، ويمرّ بفحص تطبيقات Android وأنظمة التوصيات، وينتهي بالخصوصية والمعالجة على الجهاز.

## التشغيل

فكّ ضغط الحزمة بالكامل وافتح `index.html` في متصفّح حديث مثل Chrome أو Edge. العرض يعمل من الملفات المحلية وبلا اتصال. لعرضه عبر خادم محلي، شغّل `python -m http.server 8000` من مجلّد المشروع وافتح العنوان اللي يظهر في الطرفية.

| الأداة | الاختصار أو طريقة الاستخدام |
| --- | --- |
| الشريحة التالية | ← أو Space أو Enter. على شاشة اللمس اسحب لليمين. |
| الشريحة السابقة | →. على شاشة اللمس اسحب لليسار. |
| البداية والنهاية | Home وEnd |
| ملء الشاشة | F أو زر ملء الشاشة. Esc للخروج. |
| فهرس الشرائح | O أو زر الشبكة. اضغط على شريحة للانتقال إليها. |
| ملاحظات المتحدّث | N أو زر الورقة. تظهر فوق العرض عند فتحها يدوياً. |
| نافذة المتحدّث | P أو الزر داخل الملاحظات. انقل النافذة لشاشتك الخاصة وشارك نافذة العرض الرئيسية فقط. |
| رابط شريحة محدّدة | انسخ العنوان بعد الانتقال إلى الشريحة، مثل `#slide-26`. |

أزرار التنقّل تعمل أيضاً بالماوس. لما يكون التركيز على زر، Enter وSpace يشغّلان الزر نفسه. إذا المتصفّح منع النافذة المنبثقة، اسمح فيها أو استخدم لوحة الملاحظات. على الهاتف، العرض الأفقي يعطي مساحة أكبر للرسم والنص، وأزرار التجارب بتظهر بحجم لمس في الوضع العمودي.

## التجارب الحيّة

- **26 · بحث ANN.** اختَر اهتماماً وبدّل بين البحث التقريبي والكامل. خيار **طبخ** يبيّن كيف ممكن تفوت نتائج قريبة عند فحص جزء من الفهرس. الأرقام محسوبة من 304 نقاط اصطناعية.
- **28 · التعلّم من التفاعل.** إكمال فيديو أو تخطّيه بغيّر تقدير الاهتمام. زر إعادة الضبط بيرجّع البداية.
- **30 · الترتيب.** بدّل الأولوية بين الإكمال والمشاركة لتشوف نفس الفيديوهات بترتيب جديد.

## النشر على GitHub Pages

1. ارفع محتويات مجلّد المشروع إلى جذر مستودع GitHub. تأكّد من وجود `index.html` و`.nojekyll` في الجذر.
2. افتح **Settings → Pages**. تحت **Build and deployment** اختر **Deploy from a branch**.
3. اختر الفرع المطلوب، مثل `main`، والمجلّد **/(root)** ثم اضغط **Save**.
4. بعد نجاح النشر، افتح **Visit site** من إعدادات Pages. [دليل GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

ملاحظات المتحدّث مخفية عن شاشة العرض افتراضياً. الملاحظات جزء من ملفات الموقع المنشور ويمكن قراءة مصدرها.

## الملفات

- `index.html` و`presenter.html` هما مدخلا العرض ونافذة المتحدّث.
- `css/main.css` يضبط مقاس الشرائح والتجاوب والحركة.
- `js/slides-data.js` فيه عناوين الشرائح وملاحظاتها.
- `js/diagrams.js` فيه رسومات SVG الأصلية. `js/demos.js` فيه التجارب الثلاث.
- `js/app.js` و`js/presenter.js` يديران التنقّل ومزامنة نافذة المتحدّث.
- `assets/images/` فيه الصور المحلية، و`assets/fonts/` فيه خط Cairo وترخيصه.
- [المصادر والتحقّق](SOURCES.md) يربط كل مجموعة من الشرائح بمصادرها وحدود الأمثلة.

## الصور والخط

أنشئت الصور الثلاث بأداة ImageGen المدمجة. كل صورة عريضة بنسبة 16:9، بدون كتابة أو شعارات، وبإضاءة سينمائية داكنة تناسب كتابة العرض فوق يمين الصورة.

- [الغلاف](assets/images/cover.webp) · هاتف وإضاءة توحي بموجز فيديو مستمر.
- [لغز الإعلان](assets/images/conversation.webp) · حديث بين شخصين وإعلان خاتم.
- [الخاتمة](assets/images/reflection.webp) · شخص أمام شبكة تتشكّل من نقاط.

<details>
<summary>ImageGen prompts</summary>

**Cover** — Create one 16:9 full-bleed cinematic photographic artwork for a premium university cybersecurity keynote cover about recommendation algorithms. Near-black graphite studio. A single upright graphite smartphone, seen three-quarter view, tilted very slightly, floating on the LEFT third, around x=31%, clearly visible from top to bottom. The phone screen contains dark translucent abstract stacked rectangles and a restrained crimson glow, like an endless video feed dissolving into a few precisely rendered fragments. Subtle icy-cyan reflections in brushed metal, tasteful deep-red rim lighting, sparse red fibers across the left half. The RIGHT half is quiet and almost black for very large white typography to be added separately. Realistic product photography, decisive shapes, sophisticated cinema-grade contrast, high detail, truly dark edges. No words, letters, numerals, logos, watermark, people, or typography. Landscape composition.

**Conversation** — Create a single 16:9 cinematic still for a university keynote about uncanny targeted advertising, near-black graphite and restrained crimson edge lights. Left two thirds in frame: two realistically photographed young adult university friends chatting across a table, seen mostly as expressive silhouettes in profile, on a dim evening, a smartphone resting face up on the foreground table. Phone screen shows a small luminous photograph of a single silver ring on black, no other interface or type. Focus on the phone and ring, keep people softly defocused but visibly conversing. Rightmost third falls into deep black for text to be added in layout. Sophisticated film still, tactile materials, rich shadows, restrained cool reflections. No letters, words, numbers, logos, UI text or watermarks.

**Reflection** — Create a 16:9 cinematic photograph-style still for the penultimate slide of a polished cybersecurity presentation. In the far LEFT half, an anonymous young adult figure in a dark sweater seen from behind, shoulders and head, facing a sparse, enormous constellation of warm crimson and cyan glowing network nodes that extend upward like a faint digital mirror of their outline. Real human silhouette, no facial detail. Dark charcoal environment and controlled light, striking yet quiet, soft film grain. RIGHT half fades to extremely dark and empty, clear of bright features, for Arabic headline to be overlaid. No letters, words, numerical graphics, logos, watermarks. Realistic editorial cinematography.

</details>

خط Cairo مرفق بموجب [SIL Open Font License](assets/fonts/OFL-Cairo.txt).

## الاختبار

فُحصت الشرائح الـ42 في Chrome مع فصل الشبكة، وشمل الفحص تحميل الصور والخط واتجاه النص. جُرّب التنقّل بالفأرة ولوحة المفاتيح واللمس، وروابط الشرائح، وملء الشاشة، ونافذة المتحدّث، والتجارب الثلاث، وإعداد تقليل الحركة. فُحص مقاس 16:9 على أحجام تحاكي بروجكتور 1920×1080 وشاشة لابتوب وهاتفاً بالاتجاهين.

