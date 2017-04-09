import {createSelector} from 'reselect'
import {IBlock, IndexedBlock, IState} from './model'
import {findBlock, indexBlocks} from './utils/blocks'

const getBlocks = (state:IState) => {
  return state.blocks
}
const getId = (_, props) => props.id

export const getUsedBlocks = createSelector(
  getBlocks,
  (blocks:IBlock[]):IndexedBlock[] => indexBlocks(blocks.filter(b => b.used))
)

export const getUnusedBlocks = createSelector(
  getBlocks,
  (blocks:IBlock[]):IndexedBlock[] => indexBlocks(blocks.filter(b => !b.used))
)

export const getBlock = createSelector(
  getBlocks, getId,
  (blocks:IndexedBlock[], id:number):IndexedBlock =>
      findBlock(indexBlocks(blocks), id)
)