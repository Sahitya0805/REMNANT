import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const isDecimal = value.includes('.');
  const isPlus = value.includes('+');
  const numericTarget = parseFloat(value.replace(/[^0-9.]/g, ''));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = numericTarget / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCurrent(numericTarget);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericTarget]);

  let displayStr = '';
  if (isDecimal) {
    displayStr = current.toFixed(2) + 's';
  } else {
    displayStr = Math.floor(current).toLocaleString() + (isPlus ? '+' : '');
  }

  return <span>{displayStr}</span>;
};

export const MetricCards: React.FC = () => {
  const metrics = [
    { label: 'Orders Indexed', val: '10,482+' },
    { label: 'Memories Created', val: '2,431' },
    { label: 'Restaurants Connected', val: '382' },
    { label: 'Search Time', val: '0.18s' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {metrics.map((m, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="p-6 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)] space-y-2 transition-all duration-300 shadow-sm hover:shadow-xl group"
        >
          <div className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] font-mono-meta group-hover:text-[var(--accent-color)] transition-colors">
            <AnimatedCounter value={m.val} />
          </div>
          <div className="text-xs font-mono-meta text-[var(--text-secondary)] font-medium uppercase tracking-wider">
            {m.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
