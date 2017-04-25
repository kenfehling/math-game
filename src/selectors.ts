import {createSelector} from 'reselect'
import {IBlock, IndexedBlock, IState} from './model'
import {evaluateBlocks, findBlock, indexBlocks} from './utils/blocks'

const getBlocks = (state:IState) => {
  return state.problem.blocks
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

export const getComputedTotal = createSelector(
  getUsedBlocks,
  (blocks:IBlock[]):string => evaluateBlocks(blocks)
)