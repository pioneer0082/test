import { GaugeChart } from './GaugeChart';

interface SalesTargetGaugeProps {
  currentSales: number;
  targetSales: number;
  period?: string;
}

export function SalesTargetGauge({ 
  currentSales, 
  targetSales, 
  period = "This Quarter" 
}: SalesTargetGaugeProps) {
  return (
    <div className="w-full">
      <GaugeChart
        value={currentSales}
        maxValue={targetSales}
        title="Sales Performance"
        subtitle={`${period} Progress`}
        unit="$"
        thresholds={{
          good: 80,
          warning: 60,
          danger: 40
        }}
      />
    </div>
  );
}