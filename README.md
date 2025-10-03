# 📚 Fatwa Check - موقع التحقق من المعلومات الدينية

موقع متخصص للتحقق من صحة المعلومات الدينية بناءً على المصادر الشيعية الموثوقة من الحوزة العلمية في النجف الأشرف.

---

## 🌟 المميزات

- ✅ البحث في قاعدة بيانات شاملة من المصادر الشيعية
- 🤖 البحث الذكي باستخدام OpenAI GPT-4
- 📱 تصميم متجاوب يعمل على جميع الأجهزة
- 🔍 فلترة النتائج حسب الحكم والتصنيف
- 🎨 واجهة عربية جميلة وسهلة الاستخدام

---

## 📂 هيكل المشروع

```
fatwa-check/
├── frontend/
│   └── index.html          # الواجهة الأمامية
├── backend/
│   ├── server.js           # السيرفر الرئيسي
│   ├── package.json        # إعدادات Node.js
│   ├── .env.example        # مثال لملف البيئة
│   └── .gitignore         # ملفات مستثناة
├── database/
│   ├── schema.sql          # بنية قاعدة البيانات
│   └── seed.sql           # بيانات تجريبية
├── .gitignore
└── README.md
```

---

## 🚀 التشغيل المحلي

### المتطلبات

- Node.js v18 أو أحدث
- مفتاح OpenAI API

### الخطوات

#### 1. استنسخ المشروع

```bash
git clone https://github.com/YOUR_USERNAME/fatwa-check.git
cd fatwa-check
```

#### 2. إعداد Backend

```bash
cd backend
npm install
```

#### 3. إنشاء ملف .env

```bash
cp .env.example .env
```

ثم افتح `.env` وأضف مفتاح OpenAI:

```
OPENAI_API_KEY=sk-proj-your-key-here
PORT=3000
```

#### 4. تشغيل Backend

```bash
npm start
```

السيرفر سيعمل على: `http://localhost:3000`

#### 5. فتح Frontend

افتح ملف `frontend/index.html` في المتصفح

---

## ☁️ النشر على الإنترنت

### Backend - Render

1. اذهب إلى [render.com](https://render.com)
2. سجّل دخول بحساب GitHub
3. اضغط **New** → **Web Service**
4. اختر repository الخاص بك
5. إعدادات:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. أضف Environment Variable:
   - `OPENAI_API_KEY` = مفتاحك

### Frontend - GitHub Pages

1. اذهب لإعدادات Repository
2. **Settings** → **Pages**
3. **Source:** `main` branch
4. **Folder:** `/frontend`
5. **Save**

---

## 🔑 الحصول على مفتاح OpenAI

1. اذهب إلى [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. سجّل حساب جديد
3. اضغط **Create new secret key**
4. انسخ المفتاح واستخدمه في `.env`

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### البحث في قاعدة البيانات
```
POST /api/search
Body: { "query": "السؤال" }
```

### البحث بالذكاء الاصطناعي
```
POST /api/ai-search
Body: { "question": "السؤال" }
```

### الحصول على جميع الفتاوى
```
GET /api/fatwas
```

---

## 📖 المصادر المعتمدة

### المصادر الأساسية
- القرآن الكريم
- الكتب الأربعة:
  - الكافي (محمد بن يعقوب الكليني)
  - من لا يحضره الفقيه (الشيخ الصدوق)
  - تهذيب الأحكام (الشيخ الطوسي)
  - الاستبصار (الشيخ الطوسي)

### كتب الفقه
- العروة الوثقى (السيد محمد كاظم اليزدي)
- منهاج الصالحين (السيد علي السيستاني)
- تحرير الوسيلة (الإمام الخميني)
- فقه الصادق (السيد محمد صادق الصدر)

### فتاوى المراجع المعاصرين
- سماحة السيد علي السيستاني (دام ظله)
- سماحة السيد محمد سعيد الحكيم (رحمه الله)
- سماحة السيد محمد باقر الصدر (رحمه الله)

---

## 🔧 التطوير

### إضافة فتوى جديدة

في `backend/server.js`، أضف إلى `mockDatabase`:

```javascript
{
  id: 7,
  question: "السؤال",
  ruling: "الحكم", // حرام، حلال، واجب، مستحب، مكروه
  category: "التصنيف", // فقه العبادات، فقه المعاملات، حديث، عقائد
  reference: "النص أو الدليل",
  source: "المصدر",
  notes: "ملاحظات"
}
```

### تغيير الألوان

في `frontend/index.html`، عدّل المتغيرات في CSS:

```css
.hero {
    background: linear-gradient(135deg, #387478 0%, #629584 100%);
}
```

---

## 🐛 حل المشاكل

### CORS Error
تأكد من وجود `cors()` في `server.js`:
```javascript
app.use(cors());
```

### Backend لا يعمل
- تحقق من logs في Render
- تأكد من وجود `OPENAI_API_KEY`

### Frontend لا يتصل
- تحقق من `API_URL` في `index.html`
- امسح cache المتصفح (Ctrl+Shift+R)

---

## 💰 التكاليف

| الخدمة | السعر |
|--------|-------|
| GitHub Pages | مجاناً |
| Render Free Tier | مجاناً (750 ساعة/شهر) |
| OpenAI GPT-4o | $2.50 / مليون token |

تكلفة تقديرية: ~$0.01 لكل 10 أسئلة

---

## 📞 تواصل

**Email:** moh18247@gmail.com

---

## 📄 الترخيص

MIT License - استخدم وعدّل المشروع بحرية

---

## ⭐ ساهم في المشروع

إذا أعجبك المشروع:
1. اضغط ⭐ على GitHub
2. شارك المشروع مع الآخرين
3. ساهم بإضافة مصادر جديدة

---

**تم بحمد الله** 🎉
