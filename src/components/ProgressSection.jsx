import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const ProgressSection = () => {
  const [progress, setProgress] = useState(65);

  return (
    <motion.div 
      className="flex flex-col items-center mb-8 bg-white rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">报到进度</h2>
      <div className="relative w-48 h-48 flex items-center justify-center mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* 背景圆环 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* 进度圆环 */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            transform="rotate(-90 50 50)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">{progress}%</span>
          <span className="text-gray-500">完成</span>
        </div>
      </div>
      <p className="text-gray-600 text-center">您已完成大部分报到流程</p>
      <div className="mt-4 w-full max-w-xs">
        <Progress value={progress} className="h-3" />
      </div>
    </motion.div>
  );
};

export default ProgressSection;
