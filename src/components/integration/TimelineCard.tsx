import React from 'react';
import { motion } from 'framer-motion';

export const TimelineCard: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'User Authentication',
      desc: 'Phone number verification using secure OTP.'
    },
    {
      num: '2',
      title: 'Consent Based Access',
      desc: 'Orders are imported only after explicit user approval.'
    },
    {
      num: '3',
      title: 'Encrypted Storage',
      desc: 'Commerce history remains encrypted in the backend.'
    },
    {
      num: '4',
      title: 'AI Memory Processing',
      desc: 'Orders are transformed into contextual memories.'
    },
    {
      num: '5',
      title: 'User Controlled Data',
      desc: 'Users can export or permanently delete their archive anytime.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="p-8 rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 space-y-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <div className="space-y-2 border-b border-[var(--border-color)] pb-4">
        <h3 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Platform & Security
        </h3>
        <p className="text-xs font-mono-meta text-[var(--text-secondary)]">
          Zero-trust data security & user privacy workflow
        </p>
      </div>

      <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-[1px] before:bg-[var(--border-color)]">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 group"
          >
            {/* Step Number Circle */}
            <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] group-hover:border-[var(--accent-color)] group-hover:bg-[var(--accent-color)] text-[var(--accent-color)] group-hover:text-white flex items-center justify-center font-mono-meta font-extrabold text-sm transition-all duration-300 z-10 shadow-sm flex-shrink-0">
              {step.num}
            </div>

            <div className="space-y-1 pt-1">
              <h4 className="text-sm font-extrabold text-[var(--text-primary)] tracking-tight">
                {step.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-2 text-xs font-mono-meta text-[var(--text-secondary)] flex items-center gap-2">
        <span>🔒 End-to-End Privacy Guaranteed</span>
      </div>

    </motion.div>
  );
};
