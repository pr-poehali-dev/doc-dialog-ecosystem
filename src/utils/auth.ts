/**
 * Утилита для работы с авторизацией
 */

/**
 * Получает userId из localStorage с fallback на JWT токен
 * @returns userId или пустую строку если не найден
 */
export function getUserId(): string {
  // Попытка 1: Получить из объекта user в localStorage
  const userStr = localStorage.getItem('user');
  if (userStr && userStr !== 'null') {
    try {
      const user = JSON.parse(userStr);
      if (user?.id) {
        return user.id.toString();
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
  }

  // Попытка 2: Извлечь из JWT токена
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.user_id) {
        return payload.user_id.toString();
      }
    } catch (e) {
      console.error('Failed to parse JWT token:', e);
    }
  }

  return '';
}

/**
 * Проверяет, авторизован ли пользователь
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

/**
 * Получает роль пользователя
 */
export function getUserRole(): string | null {
  return localStorage.getItem('userRole');
}

/**
 * Проверяет, является ли пользователь администратором
 */
export function isAdmin(): boolean {
  const userStr = localStorage.getItem('user');
  if (userStr && userStr !== 'null') {
    try {
      const user = JSON.parse(userStr);
      return user?.role === 'admin' || user?.is_admin === true;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
  }
  return false;
}

/**
 * Получает email пользователя
 */
export function getUserEmail(): string {
  const userStr = localStorage.getItem('user');
  if (userStr && userStr !== 'null') {
    try {
      const user = JSON.parse(userStr);
      return user?.email || '';
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
  }
  return '';
}