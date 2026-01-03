import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { SchoolEditorBasicInfo } from '@/components/school-editor/SchoolEditorBasicInfo';
import { SchoolEditorContent } from '@/components/school-editor/SchoolEditorContent';
import { SchoolEditorTeachers } from '@/components/school-editor/SchoolEditorTeachers';
import { SchoolEditorMeta } from '@/components/school-editor/SchoolEditorMeta';

const SCHOOLS_API_URL = 'https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86';

interface SchoolFormData {
  name: string;
  short_description: string;
  description: string;
  slug: string;
  logo_url: string;
  cover_url: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
  telegram: string;
  vk: string;
  instagram: string;
  license_number: string;
  is_author_school: boolean;
  founded_year: number | null;
  students_count: number | null;
  teachers_count: number | null;
  mission: string;
  about_school: string;
  why_choose_us: string;
  cta_button_text: string;
  cta_button_url: string;
  seo_title: string;
  seo_description: string;
  achievements: Array<{ id?: number; title: string; description: string; icon_name: string; sort_order: number }>;
  teachers: Array<{ id?: number; name: string; position: string; bio: string; photo_url: string; experience_years: number | null; specialization: string; sort_order: number }>;
  gallery: Array<{ id?: number; image_url: string; caption: string; sort_order: number }>;
}

const INITIAL_FORM: SchoolFormData = {
  name: '',
  short_description: '',
  description: '',
  slug: '',
  logo_url: '',
  cover_url: '',
  city: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  whatsapp: '',
  telegram: '',
  vk: '',
  instagram: '',
  license_number: '',
  is_author_school: false,
  founded_year: null,
  students_count: null,
  teachers_count: null,
  mission: '',
  about_school: '',
  why_choose_us: '',
  cta_button_text: 'Оставить заявку',
  cta_button_url: '',
  seo_title: '',
  seo_description: '',
  achievements: [],
  teachers: [],
  gallery: []
};

export default function SchoolLandingEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SchoolFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'teachers' | 'meta'>('basic');

  useEffect(() => {
    if (id) {
      fetchSchoolData();
    }
  }, [id]);

  const fetchSchoolData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId') || '1';
      const response = await fetch(`${SCHOOLS_API_URL}/${id}`, {
        headers: { 'X-User-Id': userId }
      });
      
      if (!response.ok) throw new Error('Школа не найдена');
      
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Ошибка загрузки школы:', error);
      alert('Ошибка загрузки данных школы');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Валидация
      if (!formData.name) {
        alert('Укажите название школы');
        return;
      }
      if (!formData.slug) {
        alert('Укажите slug для URL');
        return;
      }
      
      const userId = localStorage.getItem('userId') || '1';
      const response = await fetch(`${SCHOOLS_API_URL}/${id || 'new'}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Ошибка сохранения');
      
      alert('Лендинг школы успешно сохранен!');
      
      if (!id) {
        const data = await response.json();
        if (data.school_id) {
          navigate(`/school/landing/edit/${data.school_id}`);
        }
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения лендинга школы');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (formData.slug) {
      window.open(`/school/${formData.slug}`, '_blank');
    } else {
      alert('Сначала укажите slug для предварительного просмотра');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? 'Редактирование лендинга школы' : 'Создание лендинга школы'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {formData.name || 'Заполните основную информацию'}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={handlePreview} variant="outline">
              <Icon name="Eye" size={18} className="mr-2" />
              Предпросмотр
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Сохранение...
                </>
              ) : (
                <>
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'basic'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="School" size={18} className="inline mr-2" />
                Основная информация
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'content'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="FileText" size={18} className="inline mr-2" />
                Контент и достижения
              </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'teachers'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="Users" size={18} className="inline mr-2" />
                Преподаватели и галерея
              </button>
              <button
                onClick={() => setActiveTab('meta')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'meta'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="Settings" size={18} className="inline mr-2" />
                SEO и контакты
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'basic' && (
              <SchoolEditorBasicInfo formData={formData} setFormData={setFormData} />
            )}
            {activeTab === 'content' && (
              <SchoolEditorContent formData={formData} setFormData={setFormData} />
            )}
            {activeTab === 'teachers' && (
              <SchoolEditorTeachers formData={formData} setFormData={setFormData} />
            )}
            {activeTab === 'meta' && (
              <SchoolEditorMeta formData={formData} setFormData={setFormData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
