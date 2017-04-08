import {IBlock, IBlockDescription, IUnit} from '../model'
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
    blocks.map(({sides}, i:number) =>
      ({id: i + 1, sides: sides.map(({amount, unit}) =>
        ({amount, unit: loadUnit(unit)}))}))

export const findBlock = (blocks:IBlock[], id:number):IBlock => {
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

const replaceBlockAt = (bs:IBlock[], i:number, block:IBlock):IBlock[] => [
  ...bs.slice(0, i),
  block,
  ...bs.slice(i + 1)
]

const replaceBlock = (bs:IBlock[], id:number, fn:(b:IBlock)=>IBlock):IBlock[] => {
  const index = findBlockIndex(bs, id)
  return replaceBlockAt(bs, index, fn(bs[index]))
}

export const rotateBlock = (blocks:IBlock[], id:number):IBlock[] =>
  replaceBlock(blocks, id, b => ({...b, rotated: !b.rotated}))