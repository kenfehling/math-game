import {IBlock, IBlockDescription, IndexedBlock, IUnit, IValue} from '../model'
import * as Units from '../constants/Units'
import * as R from 'ramda'

const units:IUnit[] = R.values(Units) as IUnit[]
const exists:(x:any) => boolean = x => !!x

export interface UnitCount {
  unit: IUnit,
  count: number
}

const loadUnit = (unit:string):IUnit => {
  const result = units.find(u => u.abbrev === unit)
  if (!result) {
    throw new Error(`Unit '${unit}' not found`)
  }
  return result
}

export const loadBlocks = (blocks:IBlockDescription[]):IBlock[] =>
  blocks.map(({sides}, i:number) =>
    ({id: i + 1, sides: sides.map(({value, unit}) =>
      ({value, unit: loadUnit(unit)}))}))

export const getNumerator = (block:IBlock):IValue =>
  block.rotated ? block.sides[1] : block.sides[0]

export const getDenominator = (block:IBlock):IValue =>
  block.rotated ? block.sides[0] : block.sides[1]

export const countUnits = (vs:IValue[]):UnitCount[] => {
  const counts = R.countBy((v: IValue) => v.unit.abbrev, vs)
  return R.keys(counts).map(key => ({unit: loadUnit(key), count: counts[key]}))
}

export const getUnitCount = (ucs:UnitCount[], unit:IUnit):number => {
  const found:UnitCount|undefined = ucs.find((uc:UnitCount) => uc.unit === unit)
  return found ? found.count : 0
}

export const cancel = (vs1:IValue[], vs2:IValue[]):UnitCount[] => {
  const ucs1:UnitCount[] = countUnits(vs1)
  const ucs2:UnitCount[] = countUnits(vs2)
  return ucs1.reduce((ucs:UnitCount[], uc:UnitCount) => {
    const onOtherSide:number = getUnitCount(ucs2, uc.unit)
    const difference:number = uc.count - onOtherSide
    return difference > 0 ? [...ucs, {...uc, count: difference}] : ucs
  }, [])
}

const multiply = (terms:IValue[]) =>
    terms.reduce((sum:number, v:IValue) => sum * v.value, 1)

const formatUnit = (uc:UnitCount):string => {
  return uc.unit.abbrev + (uc.count > 1 ? '^' + uc.count : '')
}

const multiplyUnits = (terms:UnitCount[]) => {
  const s:string = terms.map(formatUnit).join(' * ')
  return terms.length > 1 ? '(' + s + ')' : s
}

const calculateUnit = (top:IValue[], bottom:IValue[]):string => {
  const numerators:UnitCount[] = cancel(top, bottom)
  const denominators:UnitCount[] = cancel(bottom, top)
  const numeratorUnit = multiplyUnits(numerators)
  const denominatorUnit = multiplyUnits(denominators)
  if (numeratorUnit === '') {
    if (denominatorUnit === '') {
      return ''
    }
    else {
      return denominatorUnit
    }
  }
  else {
    if (denominatorUnit === '') {
      return numeratorUnit
    }
    else {
      return numeratorUnit + ' / ' + denominatorUnit
    }
  }
}

const round = (value:number, places:number=3) => {
  const x:number = parseFloat(value.toFixed(places))
  if (x === 0) {
    if (places > 100) {
      return x
    }
    else {
      return round(value, places + 1)
    }
  }
  else {
    return x
  }
}

export const evaluateBlocks = (blocks:IBlock[]):string => {
  const numerators:IValue[] = blocks.map(getNumerator).filter(exists)
  const denominators:IValue[] = blocks.map(getDenominator).filter(exists)
  const value = multiply(numerators) / multiply(denominators)
  return round(value) + ' ' + calculateUnit(numerators, denominators)
}

export function findBlock<B extends IBlock>(blocks:B[], id:number):B {
  const block = blocks.find(b => b.id === id)
  if (!block) {
    throw new Error(`Block with id = ${id} not found`)
  }
  return block
}

const findBlockIndex = (bs:IBlock[], id:number):number => {
  const index = bs.findIndex(b => b.id === id)
  if (index < 0) {
    throw new Error(`Block with id = ${id} not found`)
  }
  return index
}

const replaceBlockAt = (bs:IBlock[], index:number, block:IBlock):IBlock[] => [
  ...bs.slice(0, index), block, ...bs.slice(index + 1)
]

const replaceBlock = (bs:IBlock[], id:number, fn:(b:IBlock)=>IBlock):IBlock[] => {
  const index = findBlockIndex(bs, id)
  return replaceBlockAt(bs, index, fn(bs[index]))
}

export const insertBlockAt = (bs:IBlock[], index:number, b:IBlock):IBlock[] => [
  ...bs.slice(0, index), b, ...bs.slice(index)
]

const removeBlockAt = (blocks:IBlock[], index:number):IBlock[] => [
  ...blocks.slice(0, index), ...blocks.slice(index + 1)
]

export const removeBlock = (blocks:IBlock[], id:number):IBlock[] =>
  removeBlockAt(blocks, findBlockIndex(blocks, id))

export const moveBlock = (blocks:IBlock[], id:number, toIndex:number):IBlock[] =>
  insertBlockAt(removeBlock(blocks, id), toIndex, findBlock(blocks, id))

export const rotateBlock = (blocks:IBlock[], id:number):IBlock[] =>
  replaceBlock(blocks, id, b => ({...b, rotated: !b.rotated}))

export const switchBlock = (blocks:IBlock[], id:number, used:boolean):IBlock[] =>
  replaceBlock(blocks, id, b => ({...b, used}))

export const indexBlocks = (blocks:IBlock[]):IndexedBlock[] =>
  blocks.map((b, i) => ({...b, index: i}))