import { Navigation } from '@/components/Navigation';
import PromoCodesList from '@/components/PromoCodesList';

export default function PromoCodes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PromoCodesList />
        </div>
      </div>
    </div>
  );
}
