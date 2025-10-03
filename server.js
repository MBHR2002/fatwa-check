import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Mock Database - يمكن استبداله بقاعدة بيانات حقيقية لاحقاً
const mockDatabase = [
  {
    id: 1,
    question: "ما حكم شرب الخمر؟",
    ruling: "حرام",
    category: "فقه المعاملات",
    reference: "عن أبي عبد الله (ع) قال: إن الله حرم الخمر بعينها، وحرم كل مسكر بعينها",
    source: "الكافي للكليني - كتاب الأشربة",
    notes: "الخمر محرم بالنص القطعي وإجماع الأمة"
  },
  {
    id: 2,
    question: "ما حكم صلاة الجمعة في زمن الغيبة؟",
    ruling: "واجب",
    category: "فقه العبادات",
    reference: "صلاة الجمعة واجبة تخييرية في زمن الغيبة مع توفر الشرائط",
    source: "منهاج الصالحين - السيد السيستاني",
    notes: "واجب تخييري بين صلاة الجمعة وصلاة الظهر"
  },
  {
    id: 3,
    question: "ما حكم التعامل بالربا؟",
    ruling: "حرام",
    category: "فقه المعاملات",
    reference: "الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ الَّذِي يَتَخَبَّطُهُ الشَّيْطَانُ مِنَ الْمَسِّ",
    source: "القرآن الكريم - سورة البقرة: 275",
    notes: "الربا من الكبائر المحرمة بنص القرآن"
  },
  {
    id: 4,
    question: "ما حكم صلاة الليل؟",
    ruling: "مستحب",
    category: "فقه العبادات",
    reference: "صلاة الليل من أفضل النوافل وأكثرها ثواباً",
    source: "العروة الوثقى - السيد اليزدي",
    notes: "يستحب التأكيد عليها وهي إحدى عشرة ركعة"
  },
  {
    id: 5,
    question: "ما حكم أكل لحم الأرنب؟",
    ruling: "مكروه",
    category: "فقه المعاملات",
    reference: "يكره أكل لحم الأرنب على المشهور",
    source: "تحرير الوسيلة - الإمام الخميني",
    notes: "مكروه وليس محرماً عند أغلب الفقهاء"
  },
  {
    id: 6,
    question: "ما حكم زيارة الإمام الحسين (ع)؟",
    ruling: "مستحب",
    category: "فقه العبادات",
    reference: "من زار الحسين عارفاً بحقه كتب الله له ألف حجة وألف عمرة",
    source: "كامل الزيارات - ابن قولويه",
    notes: "من أفضل المستحبات وأعظمها أجراً"
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Search endpoint - البحث في قاعدة البيانات
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === '') {
      return res.status(400).json({ 
        error: 'Query is required',
        message: 'الرجاء إدخال سؤال للبحث'
      });
    }

    // البحث في قاعدة البيانات المحلية
    const results = mockDatabase.filter(item => 
      item.question.toLowerCase().includes(query.toLowerCase()) || 
      item.reference.toLowerCase().includes(query.toLowerCase()) ||
      item.category.includes(query) ||
      item.ruling.includes(query)
    );

    res.json({
      success: true,
      results: results,
      found: results.length > 0
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
});

// AI Search endpoint - البحث بالذكاء الاصطناعي
app.post('/api/ai-search', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === '') {
      return res.status(400).json({ 
        error: 'Question is required',
        message: 'الرجاء إدخال سؤال'
      });
    }

    // التحقق من وجود API Key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'مفتاح OpenAI غير موجود في إعدادات السيرفر'
      });
    }

    const prompt = `أنت خبير في الفقه الشيعي والمصادر الإسلامية من الحوزة العلمية في النجف الأشرف.

المصادر المعتمدة:
- القرآن الكريم
- الكتب الأربعة: الكافي، من لا يحضره الفقيه، تهذيب الأحكام، الاستبصار
- العروة الوثقى، منهاج الصالحين، تحرير الوسيلة
- فتاوى السيد السيستاني، السيد محمد سعيد الحكيم، السيد محمد باقر الصدر

السؤال: ${question}

المطلوب: أجب على السؤال بشكل دقيق وموثق، مع ذكر:
1. الحكم الشرعي (حرام، حلال، واجب، مستحب، مكروه)
2. النص أو الدليل
3. المصدر بالتحديد
4. ملاحظات إضافية إن وجدت

الرجاء الإجابة بصيغة واضحة ومختصرة بالعربية.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "أنت خبير في الفقه الشيعي والمصادر الإسلامية من الحوزة العلمية في النجف الأشرف. تجيب بدقة وموثوقية استناداً للمصادر المعتمدة."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      success: true,
      response: aiResponse,
      tokens_used: completion.usage.total_tokens
    });

  } catch (error) {
    console.error('AI Search error:', error);
    res.status(500).json({ 
      error: 'AI search failed',
      message: error.message 
    });
  }
});

// Get all fatwas
app.get('/api/fatwas', (req, res) => {
  res.json({
    success: true,
    data: mockDatabase
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: 'Endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/search`);
  console.log(`   - POST /api/ai-search`);
  console.log(`   - GET  /api/fatwas`);
});
