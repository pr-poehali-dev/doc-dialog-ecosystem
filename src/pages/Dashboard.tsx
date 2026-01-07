import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import MasseurDashboard from '@/components/dashboard/MasseurDashboard';
import SchoolDashboard from '@/components/dashboard/SchoolDashboard';
import SalonDashboard from '@/components/dashboard/SalonDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

interface User {
  id: number;
  email: string;
  role: 'masseur' | 'school' | 'salon' | 'admin' | 'moderator' | 'client';
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const getRoleTitle = () => {
    switch (user.role) {
      case 'client':
        return 'Клиент';
      case 'masseur':
        return 'Специалист по телу';
      case 'school':
        return 'Школа массажа';
      case 'salon':
        return 'Салон телесных практик';
      case 'admin':
        return 'Администратор';
      case 'moderator':
        return 'Модератор';
      default:
        return '';
    }
  };

  const isAdminOrModerator = user.role === 'admin' || user.role === 'moderator';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
              <p className="text-gray-600">{user.email} • {getRoleTitle()}</p>
            </div>
            <div className="flex gap-2">
              {isAdminOrModerator && (
                <Link to="/admin">
                  <Button variant="secondary">
                    <Icon name="Shield" size={18} className="mr-2" />
                    Админ-панель
                  </Button>
                </Link>
              )}
              <Button onClick={handleLogout} variant="outline">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>

          {user.role === 'client' && <ClientDashboard />}
          {user.role === 'masseur' && <MasseurDashboard />}
          {user.role === 'school' && <SchoolDashboard />}
          {user.role === 'salon' && <SalonDashboard />}
          {isAdminOrModerator && <AdminDashboard />}
        </div>
      </div>
    </div>
  );
}
