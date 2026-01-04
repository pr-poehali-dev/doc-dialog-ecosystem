import BalanceCard from '@/components/school/BalanceCard';

export default function DashboardHeader() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Кабинет школы</h1>
        <p className="text-muted-foreground">Управление курсами, мастермайндами и поиском специалистов</p>
      </div>

      <div className="mb-8">
        <BalanceCard />
      </div>
    </>
  );
}
