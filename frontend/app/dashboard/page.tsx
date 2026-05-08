export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">Total Players</div>

        <div className="p-4 bg-white rounded-xl shadow">Win Rate Médio</div>

        <div className="p-4 bg-white rounded-xl shadow">Último Sync</div>
      </div>
    </div>
  );
}
