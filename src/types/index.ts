export interface IState {
  _id?: string;
  name: string;
  capital: string;
  code: string;
  region: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILga {
  _id?: string;
  name: string;
  stateId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILgaPopulated extends Omit<ILga, 'stateId'> {
  stateId: IState;
}

export enum RegionEnum {
  'North-Central' = 'North-Central',
  'North-East' = 'North-East',
  'North-West' = 'North-West',
  'South-East' = 'South-East',
  'South-South' = 'South-South',
  'South-West' = 'South-West',
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IStateWithLgas extends IState {
  lgas: ILga[];
  lgaCount: number;
}

