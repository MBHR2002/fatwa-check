# ⚡ دليل البداية السريعة - 10 دقائق فقط

---

## 🎯 خطوة 1: رفع على GitHub (3 دقائق)

### في Terminal/CMD:

```bash
cd C:\Users\pro tech\Desktop\fatwa-check

git add .
git commit -m "Initial commit: Fatwa Check project"
git push origin main
```

✅ **تم!** الكود على GitHub

---

## ☁️ خطوة 2: نشر Backend على Render (4 دقائق)

1. اذهب لـ [render.com](https://render.com) → Sign Up with GitHub
2. **New** → **Web Service**
3. اختر `fatwa-check`
4. إعدادات:
```
Name: fatwa-check-api
Root Directory: backend
Build Command: npm install
Start Command: npm start
Instance Type: Free
```
5. **Environment Variables:**
```
OPENAI_API_KEY = sk-proj-YOUR-KEY-HERE
```
6. **Create Web Service**

احفظ الرابط: `https://fatwa-check-api-xxxx.onrender.com`

✅ **Backend يشتغل!**

---

## 🌐 خطوة 3: نشر Frontend (3 دقائق)

### أ) عدّل API URL

افتح `frontend/index.html` (السطر حوالي 565):

```javascript
// قبل:
const API_URL = 'http://localhost:3000';

// بعد (ضع رابط Render):
const API_URL = 'https://fatwa-check-api-xxxx.onrender.com';
```

### ب) ارفع التغيير

```bash
git add frontend/index.html
git commit -m "Update API URL for production"
git push
```

### ج) فعّل GitHub Pages

1. GitHub Repository → **Settings** → **Pages**
2. Source: `main` → folder: `/frontend`
3. **Save**

✅ **الموقع أونلاين!** `https://USERNAME.github.io/fatwa-check`

---

## 🧪 اختبار

### اختبر Backend:
افتح: `https://fatwa-check-api-xxxx.onrender.com/api/health`

يجب أن يظهر:
```json
{"status":"ok","message":"Server is running"}
```

### اختبر Frontend:
1. افتح موقعك على GitHub Pages
2. اكتب: "ما حكم الصلاة؟"
3. اضغط "تحقق الآن"

---

## 🔑 مفتاح OpenAI

1. [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Create new secret key**
3. انسخه
4. ضعه في Render Environment Variables

---

## 💡 ملاحظات سريعة

- Render مجاني لكن ينام بعد 15 دقيقة → أول طلب قد يأخذ 30 ثانية
- GitHub Pages يحتاج 2-3 دقائق لأول نشر
- OpenAI: تكلفة تقريبية $0.01 لكل 10 أسئلة

---

## 🆘 مشكلة؟

**CORS Error:** 
```javascript
// في server.js، تأكد من:
app.use(cors());
```

**Frontend لا يتصل:**
- امسح cache: Ctrl + Shift + R
- تحقق من API_URL

**Backend لا يعمل:**
- Render → Logs → شوف الأخطاء

---

## 📞 محتاج مساعدة؟

Email: moh18247@gmail.com

---

**🎉 مبروك! موقعك الآن أونلاين**
