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
  NORTH_CENTRAL = 'North-Central',
  NORTH_EAST = 'North-East',
  NORTH_WEST = 'North-West',
  SOUTH_EAST = 'South-East',
  SOUTH_SOUTH = 'South-South',
  SOUTH_WEST = 'South-West',
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

