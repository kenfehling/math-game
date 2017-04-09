import {
  MOVE_BLOCK, RECEIVE_PROBLEM, ROTATE_BLOCK, SWITCH_BLOCK
} from '../constants/ActionTypes'
import {
  ReceiveProblem, RotateBlock, IAction,
  SwitchBlock, MoveBlock
} from '../actions/ProblemActions'
import {loadBlocks, rotateBlock, switchBlock} from '../utils/blocks'
import {IState} from '../model'

export const initialState:IState = {
  question: '',
  blocks: []
}

export default (state:IState=initialState, action:IAction):IState => {
  switch (action.type) {
    case RECEIVE_PROBLEM: {
      const {question, blocks} = action as ReceiveProblem
      return {...state, question, blocks: loadBlocks(blocks)}
    }
    case ROTATE_BLOCK: {
      const {id} = action as RotateBlock
      return {...state, blocks: rotateBlock(state.blocks, id)}
    }
    case MOVE_BLOCK: {
      const {id, index} = action as MoveBlock
      return state
    }
    case SWITCH_BLOCK: {
      const {id, used} = action as SwitchBlock
      return {...state, blocks: switchBlock(state.blocks, id, used)}
    }
    default:
      return state
  }
}