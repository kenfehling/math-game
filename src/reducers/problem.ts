import {
  MOVE_BLOCK, RECEIVE_PROBLEM, ROTATE_BLOCK, SWITCH_BLOCK
} from '../constants/ActionTypes'
import {
  ReceiveProblem, RotateBlock, IAction,
  SwitchBlock, MoveBlock
} from '../actions/ProblemActions'
import {loadBlocks, rotateBlock, moveBlock, switchBlock} from '../utils/blocks'
import {IProblem, IState} from '../model'

const initialState:IProblem = {
  id: 0,
  question: '',
  subject: '',
  difficulty: '',
  blocks: [],
  answer: undefined
}

export default (state:IProblem=initialState, action:IAction):IProblem => {
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
      const {id, toIndex} = action as MoveBlock
      return {...state, blocks: moveBlock(state.blocks, id, toIndex)}
    }
    case SWITCH_BLOCK: {
      const {id, used} = action as SwitchBlock
      return {...state, blocks: switchBlock(state.blocks, id, used)}
    }
    default:
      return state
  }
}