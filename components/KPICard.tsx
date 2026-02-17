interface KPICardProps {
  title: string;
  value: string | number;
  icon?: string;
}

export default function KPICard({ title, value, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  );
}
