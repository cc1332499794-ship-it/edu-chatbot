require('dotenv').config();
console.log('=== ENV CHECK ===');
console.log('SHOP_ID exists:', !!process.env.SHOP_ID);
console.log('SECRET_KEY exists:', !!process.env.SECRET_KEY);
console.log('PORT from env:', process.env.PORT);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ЮKassa API 基础地址（测试环境）
const YOOKASSA_API = 'https://api.yookassa.ru/v3';
// 从环境变量读取 shopId 和 secretKey
const SHOP_ID = process.env.SHOP_ID;
const SECRET_KEY = process.env.SECRET_KEY;
// 生成 Basic Auth 头
const authHeader = 'Basic ' + Buffer.from(`${SHOP_ID}:${SECRET_KEY}`).toString('base64');

// 测试用“数据库”（内存存储）
const orders = [];

// 创建支付
app.post('/api/create-payment', async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const idempotenceKey = `${userId}-${Date.now()}-${Math.random()}`;

    const response = await axios.post(
      `${YOOKASSA_API}/payments`,
      {
        amount: {
          value: amount,
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: 'https://edu-chatbot-j7gd.onrender.com/success',
        },
        description: description || 'Оплата услуги',
        metadata: { userId },
      },
      {
        headers: {
          'Authorization': authHeader,
          'Idempotence-Key': idempotenceKey,
          'Content-Type': 'application/json',
        },
      }
    );

    const payment = response.data;

    // 保存订单信息
    orders.push({
      paymentId: payment.id,
      userId,
      amount,
      status: payment.status,
    });

    // 返回支付链接
    res.json({ confirmationUrl: payment.confirmation.confirmation_url });
  } catch (err) {
    console.error('Ошибка создания платежа:', err.response?.data || err.message);
    res.status(500).json({ error: 'Ошибка создания платежа' });
  }
});

// Webhook：接收 ЮKassa 通知
app.post('/api/webhook', express.json(), (req, res) => {
  // ЮKassa 发送的 JSON 在 req.body
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

// 主动查询支付状态（防止 webhook 丢失）
app.get('/api/check-payment/:paymentId', async (req, res) => {
  try {
    const response = await axios.get(
      `${YOOKASSA_API}/payments/${req.params.paymentId}`,
      {
        headers: { 'Authorization': authHeader },
      }
    );
    const payment = response.data;
    // 如果状态变了，更新本地订单
    const order = orders.find(o => o.paymentId === payment.id);
    if (order && order.status !== payment.status) {
      order.status = payment.status;
      if (payment.status === 'succeeded') {
        console.log(`Платеж ${payment.id} подтверждён (проверка вручную)`);
      }
    }
    res.json({ status: payment.status });
  } catch (err) {
    console.error('Ошибка проверки статуса:', err.response?.data || err.message);
    res.status(500).json({ error: 'Ошибка проверки статуса' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});