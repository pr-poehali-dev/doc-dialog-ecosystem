import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';

const BALANCE_API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';

interface Transaction {
  id: number;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  created_at: string;
}

export default function BalanceCard() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topUpAmount, setTopUpAmount] = useState('');

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(`${BALANCE_API_URL}?token=${encodeURIComponent(token)}&action=get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.current_balance);
      }
    } catch (error) {
      console.error('Load balance error:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(`${BALANCE_API_URL}?token=${encodeURIComponent(token)}&action=get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Load transactions error:', error);
    }
  };

  const handleTopUp = () => {
    window.location.href = '/dashboard/school-balance-topup';
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit': return 'ArrowDownToLine';
      case 'debit': return 'ArrowUpFromLine';
      default: return 'Circle';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit': return 'text-green-600';
      case 'debit': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="flex items-center gap-2">
          <Icon name="Wallet" size={24} />
          Баланс школы
        </CardTitle>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog open={showHistory} onOpenChange={setShowHistory}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => loadTransactions()} className="flex-1 sm:flex-none">
                <Icon name="History" size={16} className="sm:mr-2" />
                <span className="hidden sm:inline">История</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>История операций</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                {transactions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Операций пока нет</p>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name={getTransactionIcon(t.type)} className={getTransactionColor(t.type)} size={20} />
                          <div>
                            <p className="font-medium">{t.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(t.created_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <span className={`font-bold ${getTransactionColor(t.type)}`}>
                          {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" onClick={handleTopUp} className="flex-1 sm:flex-none">
            <Icon name="Plus" size={16} className="sm:mr-2" />
            <span className="hidden sm:inline">Пополнить</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            {balance.toLocaleString('ru-RU')} ₽
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Используйте баланс для подъёма курсов в топ
          </p>
        </div>
      </CardContent>
    </Card>
  );
}