/* =========================================================
   🎮 KALAMEBAZ — LEVELS.JS
   کلمه‌باز | 1200 مرحله
   نسخه بهینه‌شده برای game.html
========================================================= */

"use strict";

const TOTAL_LEVELS = 1200;

/* =========================================================
   نرمال‌سازی فارسی
========================================================= */

function normalizePersianWord(word) {
    return String(word || "")
        .replace(/ي/g, "ی")
        .replace(/ى/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/ۀ/g, "ه")
        .replace(/ة/g, "ه")
        .replace(/ؤ/g, "و")
        .replace(/إ/g, "ا")
        .replace(/أ/g, "ا")
        .replace(/ٱ/g, "ا")
        .replace(/‌/g, "")
        .replace(/\u200c/g, "")
        .replace(/\u200d/g, "")
        .replace(/\s+/g, "")
        .trim();
}

/* =========================================================
   تعداد کلمات هر مرحله
========================================================= */

function getWordCount(level) {

    if (level <= 100) return 4;
    if (level <= 200) return 5;
    if (level <= 300) return 6;
    if (level <= 400) return 7;

    return 8;
}

/* =========================================================
   سختی
========================================================= */

function getDifficulty(level) {

    if (level <= 100) return "آسان";
    if (level <= 300) return "متوسط";
    if (level <= 500) return "سخت";
    if (level <= 800) return "خیلی سخت";
    if (level <= 1000) return "حرفه‌ای";

    return "افسانه‌ای";
}

/* =========================================================
   حداقل طول کلمات
========================================================= */

function getMinimumLength(level) {

    if (level <= 100) return 2;
    if (level <= 300) return 3;
    if (level <= 500) return 3;
    if (level <= 700) return 4;
    if (level <= 900) return 4;
    if (level <= 1050) return 5;

    return 5;
}

/* =========================================================
   بانک کلمات
========================================================= */

const WORD_BANK = [

    /* طبیعت */
    "آسمان","ابر","باران","برف","رعد","برق","باد","طوفان",
    "خورشید","ماه","ستاره","زمین","دریا","رود","رودخانه",
    "کوه","جنگل","درخت","گل","لاله","باغ","چمن","سنگ",
    "خاک","شن","دشت","صحرا","جزیره","ساحل","موج",
    "آبشار","چشمه","بهار","تابستان","پاییز","زمستان",
    "کوهستان","قله","دره","رنگ","نور","سایه","آتش","یخ",
    "سیاره","کهکشان","فضا","مریخ",

    /* حیوانات */
    "گربه","سگ","اسب","شیر","ببر","پلنگ","گرگ","روباه",
    "خرس","فیل","میمون","زرافه","خرگوش","موش","گوسفند",
    "بز","گاو","گوزن","آهو","کبوتر","عقاب","شاهین","جغد",
    "طوطی","مرغ","خروس","ماهی","نهنگ","کوسه","دلفین",
    "لاکپشت","مار","قورباغه","پروانه","زنبور","مورچه",

    /* خانه */
    "خانه","اتاق","آشپزخانه","حمام","پنجره","در","دیوار",
    "سقف","میز","صندلی","تخت","کمد","فرش","پرده","چراغ",
    "آینه","تلویزیون","رادیو","کتابخانه","بالکن","حیاط",
    "باغچه","آسانسور","پله",

    /* مدرسه */
    "مدرسه","کلاس","معلم","دانش","دانشگاه","کتاب","دفتر",
    "مداد","خودکار","پاک‌کن","تراش","خط‌کش","کیف","تخته",
    "درس","امتحان","سؤال","جواب","نمره","علم","ریاضی",
    "علوم","ادبیات","تاریخ","جغرافیا","هنر","ورزش","فکر",
    "آموزش","پژوهش","پژوهشگر","آزمایش","آزمایشگاه",
    "محاسبه","اطلاعات",

    /* خوراکی */
    "نان","برنج","گوشت","مرغ","ماهی","پنیر","کره","شیر",
    "ماست","تخم‌مرغ","سیب","پرتقال","موز","انگور","هلو",
    "گیلاس","هندوانه","خربزه","انار","لیمو","هویج","خیار",
    "گوجه","سیب‌زمینی","پیاز","سیر","کیک","بستنی","شکلات",
    "شیرینی","بیسکویت","نوشیدنی","آبمیوه",

    /* شهر و مکان */
    "شهر","روستا","خیابان","کوچه","میدان","پارک","بازار",
    "فروشگاه","مغازه","بانک","بیمارستان","رستوران","هتل",
    "فرودگاه","ایستگاه","قلعه","کاخ","برج","پل","مسجد",
    "موزه","سینما","ورزشگاه","جاده","کشور","پایتخت","نقشه",

    /* وسایل */
    "گوشی","تلفن","رایانه","کامپیوتر","لپتاپ","دوربین",
    "ساعت","تقویم","باتری","شارژر","کلید","قفل","چتر",
    "چمدان","کفش","لباس","کلاه","عینک","دوچرخه","ماشین",
    "اتوبوس","قطار","هواپیما","کشتی","موتور","توپ","راکت",
    "کارت","چراغ‌قوه","کوله‌پشتی","میکروفون","بلندگو",
    "هدفون","صفحه‌نمایش",

    /* انسان */
    "مرد","زن","کودک","دوست","خانواده","مادر","پدر",
    "برادر","خواهر","پدربزرگ","مادربزرگ","دکتر","مهندس",
    "پزشک","هنرمند","بازیکن","نویسنده","شاعر","قهرمان",
    "پادشاه","ملکه","شاهزاده","سرباز","انسان","مسافر",
    "نگهبان",

    /* مفاهیم */
    "آزادی","دوستی","محبت","امید","آرامش","قدرت","شجاعت",
    "موفقیت","تلاش","هدف","رویا","زمان","روز","شب","صبح",
    "عصر","آینده","گذشته","زندگی","دنیا","جهان","راز",
    "داستان","خاطره","تصویر","صدا","آواز","موسیقی","احترام",
    "اعتماد","انتخاب","انرژی","ایمان","اتفاق","اقتصاد",
    "اجتماع","ارتباط","برنامه","پروژه","پرسش","پاسخ","پایان",
    "شروع","ساخت","طراحی","تصمیم","تجربه","تغییر","فناوری",
    "خبر","روزنامه","مجله","صفحه","رمان","شعر","نامه","پیام",

    /* بازی */
    "بازی","مرحله","امتیاز","سکه","جایزه","گردونه","راهنما",
    "معما","برد","پیروزی","رقابت","تیم","فوتبال","بسکتبال",
    "والیبال","شطرنج","پازل","تاس",

    /* فناوری */
    "تکنولوژی","نرم‌افزار","برنامه‌نویسی","اینترنت","شبکه",
    "سامانه","داده","هوش","ربات","ماشین","مخابرات",
    "ارتباطات","الکترونیک","نیرو","حرکت","سرعت","مسیر",
    "جهت","صنعت","تجارت","بازرگانی","پزشکی","مهندسی",
    "دانش‌آموز","هوش‌مصنوعی",

    /* ماجراجویی */
    "ماجراجویی","سفر","کمپ","اردو","غار","گنجینه","گنج",
    "صندوق","دروازه","دژ","تالار","راهرو","تونل","قلعه",

    /* فانتزی */
    "جادو","جادوگر","جادویی","طلسم","معجون","افسون","شمشیر",
    "سپر","تاج","اژدها","ققنوس","غول","جن","پری","روح",
    "سرزمین","کریستال","الماس","طلا","نقره","شعله",

    /* کلمات ترکیبی */
    "باغجادویی","جنگلجادویی","برججادویی","قلعهجادویی",
    "درختجادویی","سنگجادویی","آتشجادویی","یخجادویی",
    "بادجادویی","برقجادویی","ستارهجادویی","ماهجادویی",
    "تاججادویی","شمشیرجادویی","سپرجادویی","معجونجادویی",
    "صندوقمخفی","درمخفی","اتاقمخفی","راهمخفی","گنجمخفی",
    "رازمخفی","نقشهمخفی","دروازهمخفی"
];

/* =========================================================
   پاک‌سازی بانک
========================================================= */

const CLEAN_WORD_BANK = [
    ...new Set(
        WORD_BANK
            .map(normalizePersianWord)
            .filter(word => word.length >= 2)
    )
];

/* =========================================================
   اطلاعات حروف
========================================================= */

function getLetters(word) {
    return [...normalizePersianWord(word)];
}

function getLetterSet(words) {

    const set = new Set();

    words.forEach(word => {

        getLetters(word).forEach(letter => {
            set.add(letter);
        });

    });

    return set;
}

/* =========================================================
   تعداد حروف چرخ
========================================================= */

function getLetterCount(words) {

    let count = 0;

    words.forEach(word => {

        const local = {};

        getLetters(word).forEach(letter => {

            local[letter] =
                (local[letter] || 0) + 1;

        });

        Object.values(local).forEach(n => {

            count += n;

        });

    });

    return count;
}

/* =========================================================
   امتیاز مرحله
========================================================= */

function scoreCombination(words, level) {

    const letters = getLetterSet(words);

    const letterCount = letters.size;

    let score = 0;

    /*
       چرخ حروف خیلی شلوغ نباشد.
    */

    if (letterCount <= 12) score += 50;
    else if (letterCount <= 15) score += 40;
    else if (letterCount <= 18) score += 25;
    else if (letterCount <= 21) score += 10;
    else score -= (letterCount - 21) * 12;

    /*
       برای مراحل سخت‌تر،
       تنوع حروف کمی بیشتر شود.
    */

    if (level >= 500) {

        if (letterCount >= 14)
            score += 10;

    }

    if (level >= 1000) {

        if (letterCount >= 16)
            score += 15;

    }

    /*
       کلمات طولانی‌تر امتیاز بیشتری می‌گیرند.
    */

    const averageLength =
        words.reduce(
            (sum, word) => sum + word.length,
            0
        ) / words.length;

    score += averageLength * 3;

    return score;
}

/* =========================================================
   انتخاب مرحله
========================================================= */

const usedStageSignatures = new Set();

function createLevel(level) {

    const count = getWordCount(level);
    const minLength = getMinimumLength(level);

    let candidates =
        CLEAN_WORD_BANK.filter(
            word => word.length >= minLength
        );

    /*
       مراحل بالاتر کلمات طولانی‌تر می‌گیرند.
    */

    if (level >= 600) {

        const longWords =
            candidates.filter(
                word => word.length >= 5
            );

        if (longWords.length >= count)
            candidates = longWords;

    }

    if (level >= 900) {

        const harderWords =
            candidates.filter(
                word => word.length >= 6
            );

        if (harderWords.length >= count)
            candidates = harderWords;

    }

    /*
       چند ترکیب مختلف تولید می‌کنیم
       و بهترین را انتخاب می‌کنیم.
    */

    let best = null;
    let bestScore = -Infinity;

    const attempts = 5;

    for (let attempt = 0; attempt < attempts; attempt++) {

        const selected = [];

        const seed =
            (
                level * 7919 +
                attempt * 104729
            ) % candidates.length;

        for (let i = 0; i < candidates.length; i++) {

            if (selected.length >= count)
                break;

            const index =
                (
                    seed +
                    i * (17 + (level % 13)) +
                    attempt * 7
                ) % candidates.length;

            const word =
                candidates[index];

            if (!selected.includes(word))
                selected.push(word);

        }

        if (selected.length !== count)
            continue;

        const signature =
            [...selected]
                .sort()
                .join("|");

        /*
           ترکیب تکراری نباشد.
        */

        if (usedStageSignatures.has(signature))
            continue;

        const score =
            scoreCombination(
                selected,
                level
            );

        if (score > bestScore) {

            best = selected;
            bestScore = score;

        }

    }

    /*
       اگر ترکیب مناسب پیدا نشد،
       یک ترکیب قطعی می‌سازیم.
    */

    if (!best) {

        const selected = [];

        const start =
            (
                level * 37 +
                level * level
            ) % candidates.length;

        for (
            let i = 0;
            i < candidates.length && selected.length < count;
            i++
        ) {

            const index =
                (
                    start +
                    i * 11
                ) % candidates.length;

            const word =
                candidates[index];

            if (!selected.includes(word))
                selected.push(word);

        }

        best = selected.slice(0,count);

    }

    /*
       مرتب‌سازی مرحله‌های سخت‌تر.
    */

    if (level >= 500) {

        best.sort((a,b) => {

            if (b.length !== a.length)
                return b.length - a.length;

            return a.localeCompare(
                b,
                "fa"
            );

        });

    }

    const finalSignature =
        [...best]
            .sort()
            .join("|");

    usedStageSignatures.add(
        finalSignature
    );

    return best;
}

/* =========================================================
   ساخت ۱۲۰۰ مرحله
========================================================= */

const KALAMEBAZ_LEVELS = {};

for (
    let level = 1;
    level <= TOTAL_LEVELS;
    level++
) {

    KALAMEBAZ_LEVELS[level] =
        createLevel(level);

}

/* =========================================================
   اطلاعات مراحل
========================================================= */

const KALAMEBAZ_LEVEL_INFO = {};

for (
    let level = 1;
    level <= TOTAL_LEVELS;
    level++
) {

    const words =
        KALAMEBAZ_LEVELS[level];

    const letters =
        [
            ...getLetterSet(words)
        ];

    KALAMEBAZ_LEVEL_INFO[level] = {

        level,

        words: words.length,

        difficulty:
            getDifficulty(level),

        minimumLength:
            getMinimumLength(level),

        letters,

        letterCount:
            letters.length

    };

}

/* =========================================================
   اتصال به window
========================================================= */

const levels =
    KALAMEBAZ_LEVELS;

if (typeof window !== "undefined") {

    window.KALAMEBAZ_LEVELS =
        KALAMEBAZ_LEVELS;

    window.KalameBazLevels =
        KALAMEBAZ_LEVELS;

    window.levels =
        KALAMEBAZ_LEVELS;

    window.KALAMEBAZ_LEVEL_INFO =
        KALAMEBAZ_LEVEL_INFO;

    window.KalameBazLevelInfo =
        KALAMEBAZ_LEVEL_INFO;

    window.KALAMEBAZ_TOTAL_LEVELS =
        TOTAL_LEVELS;

}

/* =========================================================
   اعتبارسنجی
========================================================= */

(function validateLevels() {

    const numbers =
        Object.keys(
            KALAMEBAZ_LEVELS
        )
        .map(Number)
        .sort(
            (a,b) => a-b
        );

    if (
        numbers.length !==
        TOTAL_LEVELS
    ) {

        console.error(
            "❌ تعداد مراحل اشتباه:",
            numbers.length
        );

        return;

    }

    for (
        let level = 1;
        level <= TOTAL_LEVELS;
        level++
    ) {

        const words =
            KALAMEBAZ_LEVELS[level];

        const required =
            getWordCount(level);

        if (
            !Array.isArray(words) ||
            words.length !== required
        ) {

            console.error(
                "❌ مرحله نامعتبر:",
                level,
                words
            );

            return;

        }

        const unique =
            new Set(words);

        if (
            unique.size !==
            words.length
        ) {

            console.error(
                "❌ کلمه تکراری در مرحله:",
                level
            );

            return;

        }

    }

    console.log(
        `✅ کلمه‌باز: ${TOTAL_LEVELS} مرحله آماده است.`
    );

    console.log(
        `📚 تعداد کلمات بانک: ${CLEAN_WORD_BANK.length}`
    );

})();

/* =========================================================
   پایان levels.js
========================================================= */
