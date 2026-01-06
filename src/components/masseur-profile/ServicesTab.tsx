import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Masseur {
  id: number;
  full_name: string;
  city: string;
  experience_years: number;
  specializations: string[];
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  about: string;
  phone: string;
  certificates?: string[];
  portfolio_images?: string[];
  education?: string;
  languages?: string[];
  verification_badges?: string[];
  is_premium?: boolean;
}

interface ServicesTabProps {
  masseur: Masseur;
}

export default function ServicesTab({ masseur }: ServicesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Специализации</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-3">
          {masseur.specializations.map((spec) => (
            <div key={spec} className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50">
              <Icon name="CheckCircle2" size={20} className="text-primary" />
              <span>{spec}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
