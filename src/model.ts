export enum IUnitType {
  time,
  distance,
  volume,
  mass,
  algebraic
}

export interface IUnit {
  type: IUnitType
  longName: string
  shortName: string
  pluralLongName: string
  pluralShortName: string
  abbrev: string
}

export interface IValue {
  value: number
  unit: IUnit
}

export interface IBlock {
  id: number
  sides: [IValue, IValue]
  used?: boolean
  rotated?: boolean
}

export type IndexedBlock = IBlock & {
  index: number
}

export interface IProblem {
  id: number,
  subject: string
  difficulty: string
  question: string
  blocks: IBlock[]
  answer: any  // TODO: Define answer
}

export interface IState {
  problem: IProblem,
  problemSet: IProblem[]
}


// Describes the data that gets read in from JSON

export interface IValueDescription {
  value: number
  unit: string
}

export interface IBlockDescription {
  sides: [IValueDescription, IValueDescription]
}

export interface IProblemDescription {
  question: string
  blocks: IBlockDescription[]
}