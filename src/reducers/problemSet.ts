import {IAction, ReceiveProblemSet} from '../actions/ProblemActions'
import {RECEIVE_PROBLEM_SET} from '../constants/ActionTypes'
import {IProblem} from '../model'

const initialState:IProblem[] = []

export default (state:IProblem[]=initialState, action:IAction):IProblem[] => {
  switch (action.type) {
    case RECEIVE_PROBLEM_SET: {
      return (action as ReceiveProblemSet).problemSet
    }
    default:
      return state
  }
}