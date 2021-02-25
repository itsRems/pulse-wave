import { TimeUnits, toMS, Wave, wave } from '../internal';
import { Data, GenericModelTypes, ModelTypes } from "./data";

export interface ModelPayload {
  [key: string]: [GenericModelTypes, ...Array<ModelTypes>];
}

export interface DefaultsPayload {
  [key: string]: any;
}

export class Collection <DataType = any> {
  public _model: ModelPayload;
  public _defaults: DefaultsPayload;
  public _cache: boolean;
  public _cachettl: number;
  public name: string;
  public instance: () => Wave;

  constructor (name: string) {
    this.name = name;
    this.instance = wave;
  }

  public model (model: {
    [key in keyof DataType]: [GenericModelTypes, ...Array<ModelTypes>];
  }) {
    for (const key in model) {
      const value = model[key];
      console.log(key, value);
    }
    this._model = model;
    return this;
  }

  public defaults (defaults: DefaultsPayload) {
    this._defaults = defaults;
    return this;
  }

  public cache (ttl: number | false = 60, timeUnit: TimeUnits = "seconds") {
    if (ttl) {
      this._cachettl = toMS(ttl, timeUnit);
      this._cache = true;
    } else this._cache = false;
    return this;
  }

  public async findById (id: string): Promise<Data<DataType>> {
    const value = await this.instance().storage.findById(this, id);
    if (value) return new Data(value);
    return undefined;
  }

  public async findByIndex (index: string, value: any) {

  }
}