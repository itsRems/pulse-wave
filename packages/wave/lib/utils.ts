export function identifyAction (action: string): {
  type: 'call';
  extracted: string;
} {
  if (action.startsWith('wave-call-incoming-')) return {
    type: 'call',
    extracted: action.replace('wave-call-incoming-', '')
  };
}

export function makeQueueName (actionName: string): string {
  return `wave-q-${actionName}`;
}

export type TimeUnits = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';

export function toMS (time: number, unit: TimeUnits): number {
  let final = 0;
  let [s, m, h, d, w] = [1000, 60, 60, 24, 7];
  switch (unit) {
    case 'seconds':
      final = time * s;
      break;

    case 'minutes':
      final = time * s * m;
      break;

    case 'hours':
      final = time * s * m * h;
      break;

    case 'days':
      final = time * s * m * h * d;
      break;

    case 'weeks':
      final = time * s * m * h * d * w;
      break;
    
    default:
      final = time;
      break;
  }

  return final;
}

export function mergeTo<T>(target: T, defaults: Partial<T>): T {
  return { ...defaults, ...target };
}

export function deepMerge<T>(...objects: Object[]): T {
  const isObject = obj => obj && typeof obj === 'object';
  // @ts-ignore because of the type (:
  return objects.reduce((previous, current) => {
    for (const key in current) {
      const [pVal, cVal] = [previous[key], current[key]];
      if (Array.isArray(pVal) && Array.isArray(cVal)) {
        previous[key] = pVal.concat(...cVal);
      } else if (isObject(pVal) && isObject(cVal)) {
        previous[key] = deepMerge(pVal, cVal);
      } else {
        previous[key] = cVal;
      }
      return previous;
    };
  });
}