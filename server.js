@"
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// صفحة فحص الصحة
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API مؤقت للاختبار
app.get('/api/usage/:sessionId', (req, res) => {
    res.json({
        remainingFree: 30,
        totalUsed: 0,
        createdAt: new Date(),
        lastActivity: new Date()
    });
});

app.post('/api/scrape', (req, res) => {
    const { url, services, sessionId } = req.body;
    
    // محاكاة للاختبار
    const jobId = 'test-' + Date.now();
    
    setTimeout(() => {
        res.json({
            jobId: jobId,
            status: 'started',
            estimatedTime: '2-5 دقائق'
        });
    }, 1000);
});

app.get('/api/job/:jobId', (req, res) => {
    // محاكاة نتائج مكتملة
    res.json({
        jobId: req.params.jobId,
        status: 'completed',
        startTime: new Date(),
        results: {
            basic: {
                texts: ['نص تجريبي من الموقع', 'عنوان رئيسي', 'فقرة مهمة'],
                links: [{ href: 'https://example.com', text: 'رابط تجريبي' }],
                title: 'موقع تجريبي'
            }
        },
        completedAt: new Date()
    });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});

module.exports = app;
"@ | Out-File -FilePath "server.js" -Encoding UTF8