import {createSelector} from 'reselect'
import {IBlock, IndexedBlock, IProblem, IState} from './model'
import {evaluateBlocks, findBlock, indexBlocks} from './utils/blocks'
import * as problemUtils from './utils/problems'

const getBlocks = (state:IState) => {
  return state.problem.blocks
}

export const getProblemSet = (state:IState) => {
  return state.problemSet
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

export const getSubjects = createSelector(
  getProblemSet,
  (problemSet:IProblem[]):string[] => problemUtils.getSubjects(problemSet)
)

export const getDifficulties = createSelector(
  getProblemSet,
  (problemSet:IProblem[]):string[] => problemUtils.getDifficulties(problemSet)
)