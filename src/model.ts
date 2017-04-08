export enum IUnitType {
  time,
  distance,
  volume,
  mass
}

export interface IUnit {
  type: IUnitType,
  longName: string,
  shortName: string,
  abbreviation: string
}

export interface IValue {
  amount: number,
  unit: IUnit
}

export interface IBlock {
  id: number,
  sides: [IValue, IValue]
  rotated?: boolean
}

export interface IProblem {
  question: string,
  blocks: IBlock[]
}

export type IState = IProblem  // Eventually may have score, etc.


// Describes the data that gets read in from JSON

export interface IValueDescription {
  amount: number,
  unit: string
}

export interface IBlockDescription {
  sides: [IValueDescription, IValueDescription]
}

export interface IProblemDescription {
  question: string,
  blocks: IBlockDescription[]
}