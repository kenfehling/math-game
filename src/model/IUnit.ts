export enum UnitType {
  time,
  distance,
  volume,
  mass
}

interface IUnit {
  type: UnitType,
  longName: string,
  shortName: string,
  abbreviation: string
}

export default IUnit