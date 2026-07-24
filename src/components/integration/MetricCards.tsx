import React from 'react';

export const MetricCards: React.FC = () => {
  const metrics = [
    { label: 'Orders Indexed', val: '10,482+' },
    { label: 'Memories Created', val: '2,431' },
    { label: 'Restaurants Connected', val: '382' },
    { label: 'Search Time', val: '0.18s' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)] space-y-2 transition-all duration-300 hover:-translate-y-1 group"
        >
          <div className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] font-mono-meta group-hover:text-[var(--accent-color)] transition-colors">
            {m.val}
          </div>
          <div className="text-xs font-mono-meta text-[var(--text-secondary)] font-medium uppercase tracking-wider">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
};
