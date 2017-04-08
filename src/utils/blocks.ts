import IBlockDescription from '../model/IBlockDescription'
import IBlock from '../model/IBlock'
import IUnit from '../model/IUnit'
import * as Units from '../constants/Units'

const units:IUnit[] = Object.values(Units)

const loadUnit = (unit:string):IUnit => {
  const result = units.find(u => u.abbreviation === unit)
  if (!result) {
    throw new Error(`Unit '${unit}' not found`)
  }
  return result
}

export const loadBlocks = (blocks:IBlockDescription[]):IBlock[] =>
    blocks.map(({id, sides}) =>
      ({id, sides: sides.map(({amount, unit}) =>
        ({amount, unit: loadUnit(unit)}))}))