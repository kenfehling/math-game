import {RECEIVE_PROBLEM, ROTATE_BLOCK} from '../constants/ActionTypes'
import {ReceiveProblem, RotateBlock, IAction} from '../actions/ProblemActions'
import IState from '../model/IState'
import {loadBlocks} from '../utils/blocks'

export const initialState:IState = {
  question: '',
  blocks: []
}

export default (state:IState=initialState, action:IAction):IState => {
  switch (action.type) {
    case RECEIVE_PROBLEM:
      const {question, blocks} = action as ReceiveProblem
      return {...state, question, blocks: loadBlocks(blocks)}
    case ROTATE_BLOCK:
      return state
    default:
      return state
  }
}