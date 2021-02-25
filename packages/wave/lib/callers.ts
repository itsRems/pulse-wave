import { Action, Collection, Wave } from './internal';
import { WaveConfig } from './wave';

export function action <PayloadType = any> (name: string): Action<PayloadType> {
  return wave().Action<PayloadType>(name);
}

export function collection <DataType = any> (name: string): Collection<DataType> {
  return wave().Collection<DataType>(name);
}

export function config (config: WaveConfig) {
  wave().Configure(config);
  return wave();
}

export async function start (): Promise<Wave> {
  return await wave().Start();
}

/**
 * Returns the current wave instance
 * If none is found, creates a new instance and binds it
 */
export function wave (): Wave {
  if (globalThis.__wave__app) return globalThis.__wave__app;
  const wave = new Wave();
  return wave;
}