import {IProblemSet} from '../model'
import {IAction, ReceiveProblemSet} from '../actions/ProblemActions'
import {RECEIVE_PROBLEM_SET} from '../constants/ActionTypes'

const initialState:IProblemSet = {
  name: '',
  problems: []
}

export default (state:IProblemSet=initialState, action:IAction):IProblemSet => {
  switch (action.type) {
    case RECEIVE_PROBLEM_SET: {
      const {type, ...problemSet} = action as ReceiveProblemSet
      return {...problemSet}
    }
    default:
      return state
  }
}