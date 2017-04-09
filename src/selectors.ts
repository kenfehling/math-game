import {createSelector} from 'reselect'
import {IBlock, IState} from './model'

const getBlocks = (state:IState) => state.blocks

export const getUsedBlocks = createSelector(
  getBlocks,
  (blocks:IBlock[]) => blocks.filter(b => b.used)
)

export const getUnusedBlocks = createSelector(
  getBlocks,
  (blocks:IBlock[]) => blocks.filter(b => !b.used)
)