/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * Calculate sub-index from PM2.5 concentration (European AQI breakpoints)
 */
const calculatePM25SubIndex = (pm25) => {
  if (pm25 <= 10) return (pm25 / 10) * 20;
  if (pm25 <= 20) return 20 + ((pm25 - 10) / 10) * 20;
  if (pm25 <= 25) return 40 + ((pm25 - 20) / 5) * 20;
  if (pm25 <= 50) return 60 + ((pm25 - 25) / 25) * 20;
  if (pm25 <= 75) return 80 + ((pm25 - 50) / 25) * 20;
  return 100 + ((pm25 - 75) / 25) * 50;
};

/**
 * Calculate sub-index from PM10 concentration (European AQI breakpoints)
 */
const calculatePM10SubIndex = (pm10) => {
  if (pm10 <= 20) return (pm10 / 20) * 20;
  if (pm10 <= 40) return 20 + ((pm10 - 20) / 20) * 20;
  if (pm10 <= 50) return 40 + ((pm10 - 40) / 10) * 20;
  if (pm10 <= 100) return 60 + ((pm10 - 50) / 50) * 20;
  if (pm10 <= 150) return 80 + ((pm10 - 100) / 50) * 20;
  return 100 + ((pm10 - 150) / 50) * 50;
};

/**
 * Premium European AQI Gauge with glassmorphism design
 * European AQI Scale: 0-20 Good, 20-40 Fair, 40-60 Moderate, 60-80 Poor, 80-100 Very Poor, 100+ Extremely Poor
 */
const AQIGauge = ({ 
  aqi = 0, 
  aqiCategory, 
  pollutantBreakdown,
  size = 360,
  showBreakdown = true 
}) => {
  const maxAqi = 150;
  
  // European AQI ranges with enhanced colors
  const segments = [
    { min: 0, max: 20, color: '#10b981', gradient: ['#10b981', '#34d399'], label: 'Good', emoji: '😊' },
    { min: 20, max: 40, color: '#84cc16', gradient: ['#84cc16', '#a3e635'], label: 'Fair', emoji: '🙂' },
    { min: 40, max: 60, color: '#eab308', gradient: ['#eab308', '#facc15'], label: 'Moderate', emoji: '😐' },
    { min: 60, max: 80, color: '#f97316', gradient: ['#f97316', '#fb923c'], label: 'Poor', emoji: '😷' },
    { min: 80, max: 100, color: '#ef4444', gradient: ['#ef4444', '#f87171'], label: 'Very Poor', emoji: '🤢' },
    { min: 100, max: 150, color: '#991b1b', gradient: ['#7f1d1d', '#991b1b'], label: 'Hazardous', emoji: '☠️' },
  ];

  const currentSegment = useMemo(() => {
    return segments.find(s => aqi >= s.min && aqi < s.max) || segments[segments.length - 1];
  }, [aqi]);

  const subIndices = useMemo(() => {
    if (!pollutantBreakdown) return null;
    const pm25Index = Math.round(calculatePM25SubIndex(pollutantBreakdown.pm25 || 0));
    const pm10Index = Math.round(calculatePM10SubIndex(pollutantBreakdown.pm10 || 0));
    const dominant = pm25Index >= pm10Index ? 'PM2.5' : 'PM10';
    return { pm25Index, pm10Index, dominant };
  }, [pollutantBreakdown]);

  // Gauge dimensions - center at bottom for proper semi-circle
  const centerX = size / 2;
  const centerY = size * 0.5;  // Position center for semi-circle arc
  const radius = size * 0.42;
  const strokeWidth = size * 0.07;

  const needleAngle = useMemo(() => {
    const clampedAqi = Math.min(Math.max(aqi, 0), maxAqi);
    return 180 + (clampedAqi / maxAqi) * 180;
  }, [aqi]);

  const needleLength = radius - 15;
  const needleAngleRad = (needleAngle * Math.PI) / 180;
  const needleTipX = centerX + needleLength * Math.cos(needleAngleRad);
  const needleTipY = centerY + needleLength * Math.sin(needleAngleRad);

  const createArcPath = (startAngle, endAngle, r) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = centerX + r * Math.cos(startRad);
    const y1 = centerY + r * Math.sin(startRad);
    const x2 = centerX + r * Math.cos(endRad);
    const y2 = centerY + r * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6">
      {/* Main Gauge Card */}
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* SVG Gauge */}
        <div className="relative">
          {/* Decorative background ring */}
          <div 
            className="absolute inset-0 rounded-full opacity-20 blur-xl pointer-events-none"
            style={{ 
              background: `radial-gradient(circle, ${currentSegment.color}40 0%, transparent 70%)`,
              transform: 'scale(1.2)'
            }}
          />
          
          <svg 
            width={size} 
            height={size * 0.58} 
            viewBox={`0 0 ${size} ${size * 0.58}`}
            className="overflow-visible drop-shadow-lg"
          >
          <defs>
            {/* Glow filter for needle */}
            <filter id="gaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Needle gradient - metallic look */}
            <linearGradient id="needleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569"/>
              <stop offset="30%" stopColor="#1e293b"/>
              <stop offset="50%" stopColor="#0f172a"/>
              <stop offset="70%" stopColor="#1e293b"/>
              <stop offset="100%" stopColor="#334155"/>
            </linearGradient>
            
            {/* Red accent gradient for tip */}
            <radialGradient id="tipGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Background arc track */}
          <path
            d={createArcPath(180, 360, radius)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            opacity={0.5}
          />

          {/* Gauge segments with solid colors - render as continuous arc */}
          {segments.map((segment, index) => {
            const startAngle = 180 + (segment.min / maxAqi) * 180;
            const endAngle = 180 + (segment.max / maxAqi) * 180;
            const isFirst = index === 0;
            const isLast = index === segments.length - 1;
            
            return (
              <motion.path
                key={index}
                d={createArcPath(startAngle, endAngle, radius)}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeLinecap={isFirst || isLast ? "round" : "butt"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            );
          })}

          {/* Tick marks with labels - positioned INSIDE the arc */}
          {[0, 20, 40, 60, 80, 100, 150].map((tick, i) => {
            const angle = 180 + (tick / maxAqi) * 180;
            const rad = (angle * Math.PI) / 180;
            // Ticks on the inner edge of the arc
            const tickOuterR = radius - strokeWidth / 2 - 2;
            const tickInnerR = radius - strokeWidth / 2 - 10;
            // Labels inside the ticks
            const labelR = radius - strokeWidth / 2 - 22;
            const isMajor = tick === 0 || tick === 100 || tick === 150;
            
            return (
              <g key={i}>
                <motion.line
                  x1={centerX + tickInnerR * Math.cos(rad)}
                  y1={centerY + tickInnerR * Math.sin(rad)}
                  x2={centerX + tickOuterR * Math.cos(rad)}
                  y2={centerY + tickOuterR * Math.sin(rad)}
                  stroke={isMajor ? "#475569" : "#94a3b8"}
                  strokeWidth={isMajor ? 2 : 1.5}
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                />
                <motion.text
                  x={centerX + labelR * Math.cos(rad)}
                  y={centerY + labelR * Math.sin(rad)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-semibold ${isMajor ? 'fill-slate-600 text-[10px]' : 'fill-slate-400 text-[9px]'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  {tick}
                </motion.text>
              </g>
            );
          })}

          {/* Premium Tapered Needle */}
          {(() => {
            // Calculate perpendicular direction for needle width
            const perpX = -(needleTipY - centerY) / needleLength;
            const perpY = (needleTipX - centerX) / needleLength;
            
            // Needle dimensions
            const baseHalfWidth = 8;
            const tipOffset = 5; // Small offset from tip for taper
            
            // Points for tapered needle shape
            // Base left
            const baseLeftX = centerX + perpX * baseHalfWidth;
            const baseLeftY = centerY + perpY * baseHalfWidth;
            // Base right  
            const baseRightX = centerX - perpX * baseHalfWidth;
            const baseRightY = centerY - perpY * baseHalfWidth;
            // Near tip left (tapered)
            const nearTipLeftX = needleTipX - (needleTipX - centerX) * 0.15 + perpX * 2;
            const nearTipLeftY = needleTipY - (needleTipY - centerY) * 0.15 + perpY * 2;
            // Near tip right (tapered)
            const nearTipRightX = needleTipX - (needleTipX - centerX) * 0.15 - perpX * 2;
            const nearTipRightY = needleTipY - (needleTipY - centerY) * 0.15 - perpY * 2;
            
            // Initial positions (pointing left at 180°)
            const initPerpX = 0;
            const initPerpY = -1;
            const initTipX = centerX - needleLength;
            const initTipY = centerY;
            
            const initBaseLeftX = centerX + initPerpX * baseHalfWidth;
            const initBaseLeftY = centerY + initPerpY * baseHalfWidth;
            const initBaseRightX = centerX - initPerpX * baseHalfWidth;
            const initBaseRightY = centerY - initPerpY * baseHalfWidth;
            const initNearTipLeftX = initTipX + needleLength * 0.15 + initPerpX * 2;
            const initNearTipLeftY = initTipY + initPerpY * 2;
            const initNearTipRightX = initTipX + needleLength * 0.15 - initPerpX * 2;
            const initNearTipRightY = initTipY - initPerpY * 2;
            
            return (
              <g filter="url(#gaugeGlow)">
                {/* Needle shadow */}
                <motion.path
                  initial={{
                    d: `M ${initTipX} ${initTipY} 
                        L ${initNearTipLeftX} ${initNearTipLeftY} 
                        L ${initBaseLeftX} ${initBaseLeftY} 
                        L ${initBaseRightX} ${initBaseRightY} 
                        L ${initNearTipRightX} ${initNearTipRightY} Z`
                  }}
                  animate={{
                    d: `M ${needleTipX} ${needleTipY} 
                        L ${nearTipLeftX} ${nearTipLeftY} 
                        L ${baseLeftX} ${baseLeftY} 
                        L ${baseRightX} ${baseRightY} 
                        L ${nearTipRightX} ${nearTipRightY} Z`
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.6 }}
                  fill="rgba(0,0,0,0.2)"
                  transform="translate(2, 2)"
                />
                
                {/* Needle body - tapered polygon */}
                <motion.path
                  initial={{
                    d: `M ${initTipX} ${initTipY} 
                        L ${initNearTipLeftX} ${initNearTipLeftY} 
                        L ${initBaseLeftX} ${initBaseLeftY} 
                        L ${initBaseRightX} ${initBaseRightY} 
                        L ${initNearTipRightX} ${initNearTipRightY} Z`
                  }}
                  animate={{
                    d: `M ${needleTipX} ${needleTipY} 
                        L ${nearTipLeftX} ${nearTipLeftY} 
                        L ${baseLeftX} ${baseLeftY} 
                        L ${baseRightX} ${baseRightY} 
                        L ${nearTipRightX} ${nearTipRightY} Z`
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.6 }}
                  fill="url(#needleGrad)"
                />
                
                {/* Needle highlight stripe */}
                <motion.line
                  x1={centerX}
                  y1={centerY}
                  initial={{ x2: initTipX + needleLength * 0.3, y2: initTipY }}
                  animate={{ 
                    x2: centerX + (needleTipX - centerX) * 0.7, 
                    y2: centerY + (needleTipY - centerY) * 0.7 
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.6 }}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                
                {/* Needle tip glow */}
                <motion.circle
                  initial={{ cx: initTipX, cy: initTipY }}
                  animate={{ cx: needleTipX, cy: needleTipY }}
                  transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.6 }}
                  r={4}
                  fill={currentSegment.color}
                />
              </g>
            );
          })()}
          
          {/* Center cap - premium design */}
          <circle cx={centerX} cy={centerY} r={20} fill="#1e293b" />
          <circle cx={centerX} cy={centerY} r={16} fill="#334155" />
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={10}
            fill={currentSegment.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          />
          <circle cx={centerX} cy={centerY} r={4} fill="white" opacity={0.6} />
        </svg>
        </div>

        {/* AQI Value Display - Below Gauge */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <div className="backdrop-blur-md bg-white/90 rounded-2xl px-8 py-4 shadow-lg border border-slate-200">
            <div className="flex items-center justify-center gap-3">
              <motion.span 
                className="text-5xl font-black tracking-tight"
                style={{ color: currentSegment.color }}
                key={aqi}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {Math.round(aqi)}
              </motion.span>
              <div className="flex flex-col items-start">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">EAQI</span>
                <span className="text-xl">{currentSegment.emoji}</span>
              </div>
            </div>
            
            <motion.div 
              className="mt-2 px-5 py-1.5 rounded-full text-sm font-bold text-white shadow-sm"
              style={{ 
                background: `linear-gradient(135deg, ${currentSegment.gradient[0]}, ${currentSegment.gradient[1]})` 
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, type: "spring" }}
            >
              {aqiCategory?.label || currentSegment.label}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Panel - Pollutant Breakdown */}
      {showBreakdown && pollutantBreakdown && (
        <motion.div 
          className="flex flex-col gap-3 min-w-[180px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          {/* Header */}
          <div className="backdrop-blur-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl px-4 py-3 shadow-lg border border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-bold">Pollutant Analysis</div>
                <div className="text-slate-400 text-[10px]">Sub-index breakdown</div>
              </div>
            </div>
            {subIndices && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400">Dominant:</span>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                  {subIndices.dominant}
                </span>
              </div>
            )}
          </div>

          {/* PM2.5 Card */}
          {pollutantBreakdown.pm25 !== undefined && (
            <motion.div 
              className={`relative overflow-hidden rounded-xl px-4 py-3 shadow-lg border transition-all duration-300 ${
                subIndices?.dominant === 'PM2.5' 
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 ring-2 ring-amber-200' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {subIndices?.dominant === 'PM2.5' && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full" />
              )}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">PM2.5</span>
                    {subIndices?.dominant === 'PM2.5' && (
                      <span className="text-[8px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                        MAX
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-slate-800 mt-1">
                    {pollutantBreakdown.pm25.toFixed(1)}
                    <span className="text-xs text-slate-400 ml-1 font-normal">µg/m³</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                  <span className="text-lg">🔬</span>
                </div>
              </div>
              {subIndices && (
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-500">Sub-index</span>
                    <span className="font-bold text-slate-700">{subIndices.pm25Index}</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(subIndices.pm25Index, 100)}%` }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* PM10 Card */}
          {pollutantBreakdown.pm10 !== undefined && (
            <motion.div 
              className={`relative overflow-hidden rounded-xl px-4 py-3 shadow-lg border transition-all duration-300 ${
                subIndices?.dominant === 'PM10' 
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 ring-2 ring-amber-200' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {subIndices?.dominant === 'PM10' && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full" />
              )}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">PM10</span>
                    {subIndices?.dominant === 'PM10' && (
                      <span className="text-[8px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                        MAX
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-slate-800 mt-1">
                    {pollutantBreakdown.pm10.toFixed(1)}
                    <span className="text-xs text-slate-400 ml-1 font-normal">µg/m³</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                  <span className="text-lg">🌫️</span>
                </div>
              </div>
              {subIndices && (
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-500">Sub-index</span>
                    <span className="font-bold text-slate-700">{subIndices.pm10Index}</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(subIndices.pm10Index, 100)}%` }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Data Source Footer */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Live data from Open-Meteo API</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

AQIGauge.propTypes = {
  aqi: PropTypes.number,
  aqiCategory: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
  }),
  pollutantBreakdown: PropTypes.shape({
    pm25: PropTypes.number,
    pm10: PropTypes.number,
  }),
  size: PropTypes.number,
  showBreakdown: PropTypes.bool,
};

export default React.memo(AQIGauge);
