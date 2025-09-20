import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

// Simple Line Chart Component (using CSS for visualization)
export const LineChart = ({ title, data, color = '#2196f3', height = 200 }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', height: height, mt: 2 }}>
        <svg width='100%' height='100%' viewBox='0 0 300 200'>
          <defs>
            <linearGradient
              id={`gradient-${title.replace(/\s/g, '')}`}
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor={color} stopOpacity='0.3' />
              <stop offset='100%' stopColor={color} stopOpacity='0.1' />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1='0'
              y1={i * 40}
              x2='300'
              y2={i * 40}
              stroke='#e0e0e0'
              strokeWidth='1'
            />
          ))}

          {/* Data line */}
          <polyline
            fill='none'
            stroke={color}
            strokeWidth='3'
            points={data
              .map((d, i) => {
                const x = (i / (data.length - 1)) * 300;
                const y = 200 - ((d.value - minValue) / range) * 180;
                return `${x},${y}`;
              })
              .join(' ')}
          />

          {/* Area fill */}
          <polygon
            fill={`url(#gradient-${title.replace(/\s/g, '')})`}
            points={[
              ...data.map((d, i) => {
                const x = (i / (data.length - 1)) * 300;
                const y = 200 - ((d.value - minValue) / range) * 180;
                return `${x},${y}`;
              }),
              '300,200',
              '0,200',
            ].join(' ')}
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 300;
            const y = 200 - ((d.value - minValue) / range) * 180;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r='4'
                fill={color}
                stroke='#fff'
                strokeWidth='2'
              />
            );
          })}
        </svg>

        {/* Labels */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          {data.map((d, i) => (
            <Typography key={i} variant='caption' color='text.secondary'>
              {d.label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

// Simple Bar Chart Component
export const BarChart = ({ title, data, color = '#4caf50' }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant='body2'>{item.label}</Typography>
              <Typography variant='body2' fontWeight='medium'>
                {item.value}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                height: 8,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${(item.value / maxValue) * 100}%`,
                  height: '100%',
                  backgroundColor: color,
                  borderRadius: 4,
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

// Simple Donut Chart Component
export const DonutChart = ({ title, data, centerLabel }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const colors = [
    '#2196f3',
    '#4caf50',
    '#ff9800',
    '#f44336',
    '#9c27b0',
    '#00bcd4',
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Box sx={{ position: 'relative', mr: 3 }}>
          <svg width='120' height='120' viewBox='0 0 120 120'>
            <circle
              cx='60'
              cy='60'
              r='50'
              fill='none'
              stroke='#e0e0e0'
              strokeWidth='20'
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;

              const startAngleRad = (startAngle - 90) * (Math.PI / 180);
              const endAngleRad = (currentAngle - 90) * (Math.PI / 180);

              const largeArcFlag = angle > 180 ? 1 : 0;

              const x1 = 60 + 50 * Math.cos(startAngleRad);
              const y1 = 60 + 50 * Math.sin(startAngleRad);
              const x2 = 60 + 50 * Math.cos(endAngleRad);
              const y2 = 60 + 50 * Math.sin(endAngleRad);

              const pathData = [
                `M 60 60`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`,
              ].join(' ');

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                />
              );
            })}
            <circle cx='60' cy='60' r='25' fill='#fff' />
          </svg>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant='h6' fontWeight='bold'>
              {centerLabel}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: colors[index % colors.length],
                  borderRadius: '50%',
                  mr: 1,
                }}
              />
              <Typography variant='body2' sx={{ flex: 1 }}>
                {item.label}
              </Typography>
              <Typography variant='body2' fontWeight='medium'>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
