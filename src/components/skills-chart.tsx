'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

const skillData = [
  { skill: 'React', level: 95, fullMark: 100 },
  { skill: 'Next.js', level: 90, fullMark: 100 },
  { skill: 'TypeScript', level: 88, fullMark: 100 },
  { skill: 'Node.js', level: 85, fullMark: 100 },
  { skill: 'MongoDB', level: 80, fullMark: 100 },
  { skill: 'Docker', level: 72, fullMark: 100 },
  { skill: 'AWS', level: 70, fullMark: 100 },
  { skill: 'Python', level: 75, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-black px-4 py-2 rounded-lg border border-white/10 dark:border-black/10 shadow-xl">
        <p className="font-semibold text-sm">{payload[0].payload.skill}</p>
        <p className="text-xs opacity-80">Proficiency: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function SkillsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="w-full"
    >
      <div className="relative">
        {/* Glow effect behind chart */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl blur-xl" />
        
        <div className="relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-800/50 rounded-2xl p-4 sm:p-6">
          <div className="w-full h-[280px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                <PolarGrid
                  stroke="currentColor"
                  className="text-gray-200 dark:text-zinc-700"
                  strokeDasharray="3 3"
                />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{
                    fill: 'currentColor',
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  className="text-gray-600 dark:text-zinc-400"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Skills"
                  dataKey="level"
                  stroke="#3b82f6"
                  fill="url(#skillGradient)"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Skill level legend */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {skillData.slice(0, 4).map((s, i) => (
              <motion.div
                key={s.skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="text-center"
              >
                <div className="relative w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + 0.1 * i, duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-500 mt-1 block truncate">
                  {s.skill}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
