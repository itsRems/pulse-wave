import { mergeTo } from "../utils";
import { Collection } from "./collection";

export type GenericModelTypes = String | Array<any> | Object;

export const ModelTypes = {
  PrimaryKey: 'PrimaryKey',
  Required: 'Required',
  Secret: 'Secret',
  Index: 'Index',
  Unique: 'Unique'
} as const;

export type ModelTypes = typeof ModelTypes[keyof typeof ModelTypes];

export class Data <DataType = any> {
  public _value: DataType;
  public _secrets: string[] = [];

  constructor (public collection: () => Collection<DataType>, data: DataType) {
    this._value = data;
    this.refreshSecrets();
  }

  public get value () {
    return this._value;
  }

  /**
   * Used to return a "safe" version of the data by removing any key that includes "Secret" in the model
   */
  public public () {
    const copy = { ...this._value };
    Object.keys(copy).forEach((key) => (this._secrets.includes(key) && delete copy[key]));
    return copy;
  }

  public async update (payload: Partial<DataType>, options?: {
    nested?: boolean;
  }) {
    options = mergeTo(options, {
      nested: true
    });
    await this.collection().update(this._value[this.collection().primaryKey], payload);
    this.refreshSecrets();
  }

  private refreshSecrets () {
    this._secrets = [];
    const model = this.collection()._model;
    for (const key in model) {
      const types = model[key];
      if (types.includes('Secret') && !this._secrets.includes(key)) this._secrets.push(key);
    }
  }
}