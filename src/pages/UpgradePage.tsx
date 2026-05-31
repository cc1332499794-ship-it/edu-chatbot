import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const UpgradePage = () => {
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      // 调用本地后端（开发时）或 Render 上的后端（部署后）
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest',
          amount: '100.00',
          description: 'Премиум подписка на месяц'
        })
      });
      const data = await res.json();
      if (data.confirmationUrl) {
        // 跳转到 YooMoney 支付页面
        window.location.href = data.confirmationUrl;
      } else {
        alert('Ошибка создания платежа');
      }
    } catch (err) {
      console.error(err);
      alert('Сетевая ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>🎓 Премиум подписка</h2>
      <p>Получите безлимитный доступ к учебному чат-боту за 100 ₽/мес.</p>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          padding: '12px 24px',
          background: '#4f6ef6',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontSize: 18,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Создание платежа...' : 'Оплатить 100 ₽'}
      </button>
    </div>
  );
};

export default UpgradePage;