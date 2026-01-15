import BalanceCard from '@/components/school/BalanceCard';

export default function DashboardHeader() {
  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Кабинет школы</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Управление курсами, мастермайндами и поиском специалистов</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <BalanceCard />
      </div>
    </>
  );
}