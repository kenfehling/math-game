import {IBlock, IBlockDescription, IndexedBlock, IUnit} from '../model'
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