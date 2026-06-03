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

// 配置 CSP（必须放在其他路由之前）
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // 允许内联脚本（React 需要）
      styleSrc: ["'self'", "'unsafe-inline'"],   // 允许内联样式
      imgSrc: ["'self'", "data:", "https:"],     // 允许图片和 data URI
      connectSrc: ["'self'", "https://api.yookassa.ru"], // 允许你的支付 API
      frameAncestors: ["'none'"],                 // 禁止被嵌入 iframe
      formAction: ["'self'"],
      baseUri: ["'self'"],
    },
  })
);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const YOOKASSA_API = 'https://api.yookassa.ru/v3';
const SHOP_ID = process.env.SHOP_ID;
const SECRET_KEY = process.env.SECRET_KEY;
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