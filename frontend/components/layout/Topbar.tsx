export default function Topbar() {
  return (
    <header className="w-full border-b px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-lg">Brawl Tracker</div>

      <nav className="flex gap-6 text-sm text-gray-600">
        <a href="/dashboard">Dashboard</a>
        <a href="/players">Players</a>
      </nav>

      <div className="text-sm">Davi Emanuel</div>
    </header>
  );
}
