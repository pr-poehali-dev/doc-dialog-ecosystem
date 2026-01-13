import { Navigation } from '@/components/Navigation';
import ProfessionalHero from '@/components/professional/ProfessionalHero';
import ProfessionalContent from '@/components/professional/ProfessionalContent';
import ProfessionalAI from '@/components/professional/ProfessionalAI';
import ProfessionalFooter from '@/components/professional/ProfessionalFooter';

export default function MasseurProfessionalLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProfessionalHero />
      <ProfessionalContent />
      <ProfessionalAI />
      <ProfessionalFooter />
    </div>
  );
}
