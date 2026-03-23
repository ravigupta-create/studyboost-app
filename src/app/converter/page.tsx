'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

type UnitCategory = { name: string; units: { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] };

const CATEGORIES: UnitCategory[] = [
  { name: 'Length', units: [
    { name: 'Meters', toBase: v => v, fromBase: v => v },
    { name: 'Kilometers', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { name: 'Centimeters', toBase: v => v / 100, fromBase: v => v * 100 },
    { name: 'Millimeters', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { name: 'Miles', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    { name: 'Yards', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
    { name: 'Feet', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { name: 'Inches', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    { name: 'Micrometers', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    { name: 'Nautical Miles', toBase: v => v * 1852, fromBase: v => v / 1852 },
  ]},
  { name: 'Mass', units: [
    { name: 'Kilograms', toBase: v => v, fromBase: v => v },
    { name: 'Grams', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { name: 'Milligrams', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    { name: 'Pounds', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    { name: 'Ounces', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    { name: 'Metric Tons', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { name: 'Stones', toBase: v => v * 6.35029, fromBase: v => v / 6.35029 },
    { name: 'US Tons', toBase: v => v * 907.185, fromBase: v => v / 907.185 },
  ]},
  { name: 'Temperature', units: [
    { name: 'Celsius', toBase: v => v, fromBase: v => v },
    { name: 'Fahrenheit', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
    { name: 'Kelvin', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    { name: 'Rankine', toBase: v => (v - 491.67) * 5 / 9, fromBase: v => v * 9 / 5 + 491.67 },
  ]},
  { name: 'Volume', units: [
    { name: 'Liters', toBase: v => v, fromBase: v => v },
    { name: 'Milliliters', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { name: 'Gallons (US)', toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    { name: 'Quarts', toBase: v => v * 0.946353, fromBase: v => v / 0.946353 },
    { name: 'Pints', toBase: v => v * 0.473176, fromBase: v => v / 0.473176 },
    { name: 'Cups', toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
    { name: 'Fluid Ounces', toBase: v => v * 0.0295735, fromBase: v => v / 0.0295735 },
    { name: 'Tablespoons', toBase: v => v * 0.0147868, fromBase: v => v / 0.0147868 },
    { name: 'Teaspoons', toBase: v => v * 0.00492892, fromBase: v => v / 0.00492892 },
    { name: 'Cubic Meters', toBase: v => v * 1000, fromBase: v => v / 1000 },
  ]},
  { name: 'Speed', units: [
    { name: 'm/s', toBase: v => v, fromBase: v => v },
    { name: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
    { name: 'mph', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
    { name: 'knots', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
    { name: 'ft/s', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { name: 'cm/s', toBase: v => v / 100, fromBase: v => v * 100 },
    { name: 'Mach', toBase: v => v * 343, fromBase: v => v / 343 },
    { name: 'Speed of Light', toBase: v => v * 299792458, fromBase: v => v / 299792458 },
  ]},
  { name: 'Area', units: [
    { name: 'sq meters', toBase: v => v, fromBase: v => v },
    { name: 'sq km', toBase: v => v * 1e6, fromBase: v => v / 1e6 },
    { name: 'sq feet', toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
    { name: 'sq inches', toBase: v => v * 0.00064516, fromBase: v => v / 0.00064516 },
    { name: 'sq yards', toBase: v => v * 0.836127, fromBase: v => v / 0.836127 },
    { name: 'sq miles', toBase: v => v * 2.59e6, fromBase: v => v / 2.59e6 },
    { name: 'Acres', toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
    { name: 'Hectares', toBase: v => v * 10000, fromBase: v => v / 10000 },
  ]},
  { name: 'Energy', units: [
    { name: 'Joules', toBase: v => v, fromBase: v => v },
    { name: 'Kilojoules', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { name: 'Calories', toBase: v => v * 4.184, fromBase: v => v / 4.184 },
    { name: 'Kilocalories', toBase: v => v * 4184, fromBase: v => v / 4184 },
    { name: 'Watt-hours', toBase: v => v * 3600, fromBase: v => v / 3600 },
    { name: 'kWh', toBase: v => v * 3.6e6, fromBase: v => v / 3.6e6 },
    { name: 'BTU', toBase: v => v * 1055.06, fromBase: v => v / 1055.06 },
    { name: 'eV', toBase: v => v * 1.602e-19, fromBase: v => v / 1.602e-19 },
  ]},
  { name: 'Time', units: [
    { name: 'Seconds', toBase: v => v, fromBase: v => v },
    { name: 'Milliseconds', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { name: 'Minutes', toBase: v => v * 60, fromBase: v => v / 60 },
    { name: 'Hours', toBase: v => v * 3600, fromBase: v => v / 3600 },
    { name: 'Days', toBase: v => v * 86400, fromBase: v => v / 86400 },
    { name: 'Weeks', toBase: v => v * 604800, fromBase: v => v / 604800 },
    { name: 'Months (avg)', toBase: v => v * 2629746, fromBase: v => v / 2629746 },
    { name: 'Years', toBase: v => v * 31556952, fromBase: v => v / 31556952 },
    { name: 'Microseconds', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    { name: 'Nanoseconds', toBase: v => v / 1e9, fromBase: v => v * 1e9 },
  ]},
];

export default function ConverterPage() {
  const [catIdx, setCatIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState('1');

  const cat = CATEGORIES[catIdx];
  const numVal = parseFloat(value) || 0;
  const baseVal = cat.units[fromIdx].toBase(numVal);
  const result = cat.units[toIdx].fromBase(baseVal);

  const formatResult = (n: number) => {
    if (Math.abs(n) < 0.000001 && n !== 0) return n.toExponential(6);
    if (Math.abs(n) > 1e12) return n.toExponential(6);
    return parseFloat(n.toPrecision(10)).toString();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128260;" title="Unit Converter" description="Convert between units of length, mass, temperature, volume, speed, area, energy, and time." />
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c, i) => (
          <button key={c.name} onClick={() => { setCatIdx(i); setFromIdx(0); setToIdx(1); }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${i === catIdx ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
            {c.name}
          </button>
        ))}
      </div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <Select value={fromIdx} onChange={e => setFromIdx(Number(e.target.value))} className="mb-3">
              {cat.units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
            </Select>
            <Input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value" className="text-2xl font-bold" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <Select value={toIdx} onChange={e => setToIdx(Number(e.target.value))} className="mb-3">
              {cat.units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
            </Select>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-2xl font-bold text-purple-600 dark:text-purple-400 min-h-[52px]">
              {value ? formatResult(result) : '0'}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); }}
            className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            Swap Units
          </button>
        </div>
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center text-sm text-gray-600 dark:text-gray-400">
          {value || '0'} {cat.units[fromIdx].name} = {formatResult(result)} {cat.units[toIdx].name}
        </div>
      </Card>
    </div>
  );
}
