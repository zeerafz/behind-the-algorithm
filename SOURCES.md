# المصادر والتحقّق

## الهندسة العكسية · الشرائح 6–16

- يغطي دليل OWASP طرق فحص بنية تطبيقات الموبايل والكود والسلوك وقت التشغيل والشبكة. سجلات الأحداث والكود في العرض أمثلة مكتوبة لتطبيق تجريبي. [OWASP MASTG](https://mas.owasp.org/MASTG/techniques/)
- يشرح Oracle تحويل ملفات Java إلى ملفات class. توثّق AOSP تنفيذ DEX عبر ART ودعم الترجمة المسبقة والترجمة أثناء التشغيل. [Oracle javac](https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html) · [Android Runtime](https://source.android.com/docs/core/runtime)
- يعيد JADX بناء كود شبيه بجافا من ملفات Android التنفيذية، مع حدود في الاسترجاع. يتيح Frida مراقبة سلوك وقت التشغيل. يعتمد فحص HTTPS عبر mitmproxy على ثقة التطبيق أو عميل الاختبار بالشهادة. [JADX](https://github.com/skylot/jadx) · [Frida](https://frida.re/docs/home/) · [mitmproxy](https://docs.mitmproxy.org/stable/concepts/certificates/)

## التوصيات · الشرائح 17–31

- يذكر TikTok وقت المشاهدة والإكمال والتخطّي والإعجاب والمشاركة، ومعلومات عن الفيديو والمستخدم. ويشرح بداية التوصيات عند اختيار اهتمامات أو تجاوز الاختيار. هذا وصف معلن من الشركة. [How TikTok recommends content](https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content)
- توضح مصادر Google المراحل العامة للاسترجاع والتقييم وإعادة الترتيب. يوثّق Faiss البحث عن متجهات قريبة ومقايضة سرعة البحث ودقته. يرسم العرض 304 نقاط اصطناعية في بُعدين. البحث التقريبي يفحص أقرب خليّتين بحسب مركزيهما، والبحث الكامل يقارن كل النقاط. أوزان الترتيب ودرجات الاهتمام بيانات تعليمية. [Google Recommendation Systems](https://developers.google.com/machine-learning/recommendation/overview/types) · [Faiss](https://faiss.ai/)
- تعرض ورقة Monolith بحثاً هندسياً من ByteDance في التوصيات الفورية وجداول Embedding. وصف For You العام وهذه الورقة لا يحددان خوارزمية الاسترجاع لكل إصدار أو إعداد إنتاجي من TikTok. [ByteDance Monolith](https://arxiv.org/abs/2209.07663)

### حدود ما أمكن التحقّق منه

- تتضمّن الصور المرجعية أسماء حقول وادّعاءات عن **31 نموذجاً و58 متغيّراً**. لم تتوفّر تجربة قابلة للإعادة تثبت العدّ أو نطاقه، أو تثبت أن الحركة أو السطوع أو الشحن تغيّر ترتيب For You، أو أن وظائف مسمّاة تتنبأ بإعادة الفتح أو تتدخّل عند توقّع الخروج.
- سياسة TikTok الأمريكية تذكر حالة البطارية وإيقاع الضغط على المفاتيح ضمن أمثلة البيانات التقنية، وإمكانية رفع بعض محتوى المستخدم أثناء الإنشاء. هذه صياغة تخص سياسة الخدمة في الولايات المتحدة. مصير نص رسالة خاصة حُذف قبل الإرسال ودور هذه الحقول في الترتيب يظلّان بحاجة إلى دليل مستقل. [TikTok US Privacy Policy](https://t.tiktok.com/legal/page/us/privacy-policy/en)

## الإعلان والميكروفون · الشرائح 32–36

- يصف تقرير موظفي FTC تقنيات ربط الأجهزة بمعلومات مؤكدة مثل تسجيل الدخول أو باستدلال احتمالي من إشارات مثل عناوين IP المشتركة. قصة الخاتم افتراضية، وتسلسل الأحداث وحده لا يكشف سبب عرض الإعلان. [FTC Cross-Device Tracking Staff Report](https://www.ftc.gov/reports/cross-device-tracking-federal-trade-commission-staff-report-january-2017)
- دراسة Panoptispy عام 2018 رصدت تسريبات وسائط ضمن عيّنة تطبيقات Android، من ضمنها صور وفيديو. لم تسجّل التجارب تسريب صوت. النتيجة محدودة بعيّنة ومنهجية الدراسة. دقة إعلان بحد ذاتها لا تثبت استخدام تسجيل صوتي، ولم نجد دليلاً عاماً مقنعاً على تسجيل المحادثات الخاصة بشكل روتيني لهذا الغرض. [Panoptispy](https://petsymposium.org/popets/2018/popets-2018-0030.php)
- في شكواها النهائية لعام 2026، قالت FTC إن خدمة Active Listening التابعة لـ CMG لم تجمع أو تستخدم بيانات صوتية في الخدمة محل التحقيق. [FTC Final Complaint](https://www.ftc.gov/system/files/ftc_gov/pdf/2423029c4838cmgfinalcomplaint.pdf)

## خيارات الخصوصية · الشرائح 37–40

- تشرح Android وApple أذونات الحساسات ومؤشرات الكاميرا والميكروفون وخيارات المراجعة. الخيارات الفعلية تعتمد على إصدار النظام وإعداداته. [Android privacy controls](https://developer.android.com/training/permissions/explaining-access) · [Apple hardware access controls](https://support.apple.com/en-ca/guide/iphone/iph168c4bbd5/27/ios/27)
- يدعم LiteRT تشغيل الاستدلال على الجهاز. رسم ترتيب التوصيات المحلي مثال معماري. أثر الخصوصية يتبع ما يخرج فعلياً من الجهاز، بما فيه طلبات المحتوى أو سجلات الاستخدام إذا وجدت. [Google LiteRT](https://developers.google.com/edge/litert)

