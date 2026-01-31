import { Navigation } from '@/components/Navigation';
import SpecialistLandingOrder from '@/components/dashboard/masseur-landing/SpecialistLandingOrder';

export default function SpecialistLandingOrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <SpecialistLandingOrder />
      </div>
    </div>
  );
}
