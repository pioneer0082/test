import { useEffect, useRef } from 'react';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  title: string;
  subtitle?: string;
  unit?: string;
  thresholds?: {
    good: number;    // percent (e.g. 85)
    warning: number; // percent (e.g. 70)
    danger: number;  // percent (e.g. 0)
  };
}

export function GaugeChart({
  value,
  maxValue,
  title,
  subtitle,
  unit = '$',
  thresholds = { good: 85, warning: 70, danger: 0 }
}: GaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const labelMax = 20_000; // 20K, must match the labelMax used for labels
  const percentage = Math.min((value / labelMax) * 100, 100);

  // Arc segments: [danger, warning, good]
  const arcSegments = [
    { from: 0, to: thresholds.warning, color: 'hsl(220, 13%, 91%)' }, // light gray
    { from: thresholds.warning, to: thresholds.good, color: 'hsl(38, 92%, 50%)' }, // orange
    { from: thresholds.good, to: 100, color: 'hsl(0, 84%, 60%)' }, // red
  ];

  const formatValue = (val: number) => {
    if (val >= 1_000_000) return `${unit}${(val / 1_000_000).toFixed(2)}M`;
    if (val >= 1_000) return `${unit}${(val / 1_000).toFixed(0)}K`;
    return `${unit}${val.toLocaleString()}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Geometry
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.9;
    const radius = Math.min(centerX, centerY) - 20;
    const arcWidth = 18;

    // Draw arc segments
    arcSegments.forEach(seg => {
      const startAngle = Math.PI + (Math.PI * seg.from / 100);
      const endAngle = Math.PI + (Math.PI * seg.to / 100);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
      ctx.lineWidth = arcWidth;
      ctx.strokeStyle = seg.color;
      ctx.lineCap = 'butt';
      ctx.stroke();
    });

    // Draw ticks
    for (let i = 0; i <= 100; i += 5) {
      const angle = Math.PI + (Math.PI * i / 100);
      const isMajor = i % 25 === 0;
      const tickLen = isMajor ? 18 : 9;
      const tickWidth = isMajor ? 2.5 : 1;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = tickWidth;
      ctx.strokeStyle = 'hsl(220, 13%, 69%)';
      ctx.moveTo(
        centerX + (radius - arcWidth / 2) * Math.cos(angle),
        centerY + (radius - arcWidth / 2) * Math.sin(angle)
      );
      ctx.lineTo(
        centerX + (radius - arcWidth / 2 - tickLen) * Math.cos(angle),
        centerY + (radius - arcWidth / 2 - tickLen) * Math.sin(angle)
      );
      ctx.stroke();
      ctx.restore();
    }

    // Draw value labels at major ticks
    ctx.fillStyle = 'hsl(220, 13%, 69%)';
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labelSteps = [0, 25, 50, 75, 100];
    for (let idx = 0; idx < labelSteps.length; idx++) {
      const i = labelSteps[idx];
      const angle = Math.PI + (Math.PI * i / 100);
      const x = centerX + (radius - arcWidth - 28) * Math.cos(angle);
      const y = centerY + (radius - arcWidth - 28) * Math.sin(angle);
      const labelValue = (i / 100) * labelMax;
      ctx.fillText(formatValue(labelValue), x, y);
    }

    // --- Refined Needle Drawing ---
    // Needle points to the current value on the 20K scale
    const needleValue = value;
    const needlePercentage = Math.min((needleValue / labelMax) * 100, 100);
    const needleAngle = Math.PI + (Math.PI * needlePercentage / 100);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(needleAngle);

    // Draw needle shadow for depth
    ctx.beginPath();
    ctx.moveTo(0, 0); // Start at center
    ctx.lineTo(0, -radius + arcWidth / 2 + 2); // End just before arc
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#2346a0';
    ctx.shadowColor = 'rgba(44,62,80,0.18)';
    ctx.shadowBlur = 8;
    ctx.stroke();

    // Draw needle highlight (white, thinner, on top)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius + arcWidth / 2 + 18);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#fff';
    ctx.shadowBlur = 0;
    ctx.stroke();

    ctx.restore();

    // Draw needle base circle (refined)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#2346a0';
    ctx.shadowColor = 'rgba(44,62,80,0.18)';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 0;
    ctx.fill();
    ctx.restore();

    // Draw value label on arc (at needle tip)
    const valueX = centerX + (radius - arcWidth - 10) * Math.cos(needleAngle);
    const valueY = centerY + (radius - arcWidth - 10) * Math.sin(needleAngle);
    ctx.save();
    ctx.font = 'bold 18px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#2346a0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatValue(needleValue), valueX, valueY - 10);
    ctx.restore();

  }, [labelMax, thresholds, unit]);

  return (
    <div className="flex flex-col items-start p-2 bg-white rounded-lg">
      <div className="mb-1">
        <div className="text-base font-semibold text-[#222] leading-tight">{title}</div>
        <div className="text-3xl font-bold text-[#2346a0] mt-1">{formatValue(value)}</div>
        {subtitle && (
          <div className="text-xs text-[#8a99b3] mt-1">{subtitle}</div>
        )}
      </div>
      <div className="relative w-full flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={260}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}