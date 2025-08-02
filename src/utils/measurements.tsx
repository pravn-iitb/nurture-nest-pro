// Auto-detection of measurement units based on location and age

export interface MeasurementUnit {
  weight: 'kg' | 'lbs';
  height: 'cm' | 'inches';
  temperature: 'celsius' | 'fahrenheit';
}

export interface MeasurementInput {
  weight?: number;
  height?: number;
  headCircumference?: number;
  temperature?: number;
}

export interface AgeMeasurements {
  weight: { required: boolean; label: string; unit: string; placeholder: string };
  height: { required: boolean; label: string; unit: string; placeholder: string };
  headCircumference: { required: boolean; label: string; unit: string; placeholder: string };
  temperature?: { required: boolean; label: string; unit: string; placeholder: string };
}

// Detect measurement system based on locale/region
export function detectMeasurementSystem(): MeasurementUnit {
  const locale = navigator.language || 'en-US';
  const isImperial = locale.includes('US') || locale.includes('LR') || locale.includes('MM');
  
  return {
    weight: isImperial ? 'lbs' : 'kg',
    height: isImperial ? 'inches' : 'cm',
    temperature: isImperial ? 'fahrenheit' : 'celsius'
  };
}

// Get relevant measurements based on child's age
export function getAgeMeasurements(ageInMonths: number): AgeMeasurements {
  const units = detectMeasurementSystem();
  
  const base: AgeMeasurements = {
    weight: {
      required: true,
      label: 'Weight',
      unit: units.weight,
      placeholder: units.weight === 'kg' ? '3.5' : '7.7'
    },
    height: {
      required: true,
      label: ageInMonths < 24 ? 'Length' : 'Height',
      unit: units.height,
      placeholder: units.height === 'cm' ? '50' : '20'
    },
    headCircumference: {
      required: ageInMonths < 36, // Critical for first 3 years
      label: 'Head Circumference',
      unit: units.height, // Same as height unit
      placeholder: units.height === 'cm' ? '35' : '14'
    }
  };

  // Add temperature for very young babies (first 6 months)
  if (ageInMonths < 6) {
    base.temperature = {
      required: false,
      label: 'Temperature',
      unit: units.temperature,
      placeholder: units.temperature === 'celsius' ? '36.5' : '97.7'
    };
  }

  return base;
}

// Growth percentile calculations (simplified)
export function calculatePercentile(value: number, ageInMonths: number, measurementType: 'weight' | 'height'): number {
  // This is a simplified calculation. In real apps, you'd use WHO/CDC growth charts
  // For demo purposes, we'll return a reasonable percentile
  const basePercentile = 50;
  const variation = (Math.random() - 0.5) * 40; // ±20 percentile points
  return Math.max(5, Math.min(95, basePercentile + variation));
}

// Convert between units
export function convertWeight(value: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number {
  if (from === to) return value;
  if (from === 'kg' && to === 'lbs') return value * 2.20462;
  if (from === 'lbs' && to === 'kg') return value / 2.20462;
  return value;
}

export function convertHeight(value: number, from: 'cm' | 'inches', to: 'cm' | 'inches'): number {
  if (from === to) return value;
  if (from === 'cm' && to === 'inches') return value / 2.54;
  if (from === 'inches' && to === 'cm') return value * 2.54;
  return value;
}

export function convertTemperature(value: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number {
  if (from === to) return value;
  if (from === 'celsius' && to === 'fahrenheit') return (value * 9/5) + 32;
  if (from === 'fahrenheit' && to === 'celsius') return (value - 32) * 5/9;
  return value;
}

// Format measurement for display
export function formatMeasurement(value: number, type: 'weight' | 'height' | 'temperature', unit: string): string {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} ${unit}`;
}

// Get measurement recommendations based on age
export function getMeasurementTips(ageInMonths: number): string[] {
  const tips: string[] = [];
  
  if (ageInMonths < 12) {
    tips.push("Measure at the same time each day for consistency");
    tips.push("Use a baby scale and measuring board for accuracy");
    tips.push("Remove diaper and clothes for weight measurements");
  } else if (ageInMonths < 24) {
    tips.push("Measure height while lying down until 2 years old");
    tips.push("Use a growth chart to track progress over time");
    tips.push("Don't worry about day-to-day fluctuations");
  } else {
    tips.push("Measure height while standing against a wall");
    tips.push("Track growth trends rather than single measurements");
    tips.push("Consult your pediatrician if you notice sudden changes");
  }
  
  tips.push("Keep a consistent measurement schedule");
  tips.push("Record measurements in a growth diary");
  
  return tips;
}