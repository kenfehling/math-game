import {IBlock, IBlockDescription, IndexedBlock, IUnit, IValue} from '../model'
import * as Units from '../constants/Units'
import * as R from 'ramda'
const units:IUnit[] = R.values(Units) as IUnit[]

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

const cancel = (v1:IValue, v2:IValue) => v1.unit === v2.unit

const multiply = (terms:IValue[]) =>
    terms.reduce((sum:number, v:IValue) => sum * v.value, 1)

const multiplyUnits = (terms:IValue[]) => {
  if (terms.length > 1) {
    return '(' + terms.map(t => t.unit.abbrev).join(' * ') + ')'
  }
  else if (terms.length === 1) {
    return terms[0].unit.abbrev
  }
  else {
    return ''
  }
}

const calculateUnit = (top:IValue[], bottom:IValue[]):string => {
  const numerators = R.differenceWith(cancel, top, bottom)
  const denominators = R.differenceWith(cancel, bottom, top)
  const numeratorUnit = multiplyUnits(numerators)
  const denominatorUnit = multiplyUnits(denominators)
  if (numeratorUnit === '') {
    if (denominatorUnit === '') {
      return ''
    }
    else {
      return ' / ' + denominatorUnit
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
    return round(value, places + 1)
  }
  else {
    return x
  }
}

export const evaluateBlocks = (blocks:IBlock[]):string => {
  const numerators:IValue[] = blocks.map(getNumerator)
  const denominators:IValue[] = blocks.map(getDenominator)
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