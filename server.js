import helmet from 'helmet';
import 'dotenv/config';
import { Buffer } from 'node:buffer';
import express from 'express';
import path from 'path';
import cors from 'cors';
import axios from 'axios';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// 获取 __dirname（ES 模块中默认没有）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------- 安全头配置 -------------------
// 禁用 helmet 默认的 CSP、frameguard 和 X-Powered-By（我们将手动设置）
app.use(helmet({
  contentSecurityPolicy: false,
  frameguard: false,
  xPoweredBy: false
}));

// 明确禁止点击劫持
app.use(helmet.frameguard({ action: 'deny' }));

// 隐藏 Express 标识
app.use(helmet.hidePoweredBy());

// 手动设置完整 CSP
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://mc.yandex.ru; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https://mc.yandex.ru; " +
    "font-src 'self'; " +
    "connect-src 'self' https://api.yookassa.ru https://open.bigmodel.cn https://mc.yandex.ru wss://mc.yandex.ru; " +
    "frame-ancestors 'none'; " +
    "form-action 'self'; " +
    "base-uri 'self'"
  );
  next();
});

// ------------------- 环境变量 & 支付 API -------------------
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const YOOKASSA_API = 'https://api.yookassa.ru/v3';
const SHOP_ID = process.env.SHOP_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY;
const shopId = SHOP_ID?.trim();
const secretKey = SECRET_KEY?.trim();
console.log('SHOP_ID:', shopId, 'SECRET_KEY начинается с:', secretKey?.substring(0, 8));
const authHeader = 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64');

const orders = [];

// 创建支付
app.post('/api/create-payment', async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const idempotenceKey = `${userId}-${Date.now()}-${Math.random()}`;

    const response = await axios.post(
      `${YOOKASSA_API}/payments`,
      {
        amount: { value: amount, currency: 'RUB' },
        confirmation: {
          type: 'redirect',
          return_url: `${BASE_URL}/success`
        },
        description: description || 'Оплата услуги',
        metadata: { userId }
      },
      {
        headers: {
          'Authorization': authHeader,
          'Idempotence-Key': idempotenceKey,
          'Content-Type': 'application/json'
        }
      }
    );

    const payment = response.data;
    orders.push({
      paymentId: payment.id,
      userId,
      amount,
      status: payment.status
    });

    res.json({ confirmationUrl: payment.confirmation.confirmation_url });
  } catch (err) {
    console.error('Ошибка создания платежа:', err.response?.data || err.message);
    res.status(500).json({ error: 'Ошибка создания платежа' });
  }
});

// Webhook
app.post('/api/webhook', express.json(), (req, res) => {
  const event = req.body;
  if (event.event === 'payment.succeeded') {
    const payment = event.object;
    const order = orders.find(o => o.paymentId === payment.id);
    if (order) {
      order.status = 'succeeded';
      console.log(`Платеж ${payment.id} для пользователя ${order.userId} успешен`);
    }
  }
  res.sendStatus(200);
});

// 主动查询支付状态
app.get('/api/check-payment/:paymentId', async (req, res) => {
  try {
    const response = await axios.get(
      `${YOOKASSA_API}/payments/${req.params.paymentId}`,
      { headers: { 'Authorization': authHeader } }
    );
    const payment = response.data;
    const order = orders.find(o => o.paymentId === payment.id);
    if (order && order.status !== payment.status) {
      order.status = payment.status;
    }
    res.json({ status: payment.status });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка проверки статуса' });
  }
});

// ---- 智谱AI (GLM-4-Flash) 对话 ----
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, subject } = req.body;

    // 系统提示词（限制在教育领域）
    const systemMessage = {
      role: "system",
      content: `Ты — образовательный ассистент для студентов. Ты помогаешь изучать математику, физику, историю и программирование. Отвечай кратко и по делу. Если вопрос не по учебной теме, вежливо отказывайся отвечать. Текущий предмет: ${subject || 'общий'}.`
    };

    // 确保消息角色符合智谱API规范（'user' / 'assistant' / 'system'）
    const fullMessages = [systemMessage, ...messages.map(m => ({
      role: m.role === 'bot' ? 'assistant' : m.role,
      content: m.content
    }))];

    const response = await axios.post(
      'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      {
        model: 'glm-4-flash',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${ZHIPU_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Ошибка ZhipuAI:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка получения ответа от AI' });
  }
});

// 提供前端静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});