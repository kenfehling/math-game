import {
  RECEIVE_PROBLEM, ROTATE_BLOCK, MOVE_BLOCK, SWITCH_BLOCK, RECEIVE_PROBLEM_SET
} from '../constants/ActionTypes'
import {fetch} from '../utils/api';
import {IProblemDescription, IProblemSet} from '../model'

export interface IAction {type: string}
export type ReceiveProblem = IAction & IProblemDescription
export type ReceiveProblemSet = IAction & IProblemSet
export type RotateBlock = IAction & {id:number}
export type MoveBlock = IAction & {id:number, toIndex:number}
export type SwitchBlock = IAction & {id:number, used:boolean}

const receiveProblem = (problem:IProblemDescription):ReceiveProblem => ({
  type: RECEIVE_PROBLEM,
  ...problem
})

const receiveProblems = (problemSet:IProblemSet):ReceiveProblemSet => ({
  type: RECEIVE_PROBLEM_SET,
  ...problemSet
})

export const fetchProblem = (id:number) => (dispatch) =>
  fetch(`/problems/${id}`)
    .then(response => response.json())
    .then(json => dispatch(receiveProblem(json)))

export const fetchProblems = () => (dispatch) =>
  fetch('/problems')
    .then(response => response.json())
    .then(json => dispatch(receiveProblems(json)))

export const rotateBlock = (id:number):RotateBlock => ({
  type: ROTATE_BLOCK,
  id
})

export const moveBlock = (id:number, toIndex:number):MoveBlock => ({
  type: MOVE_BLOCK,
  id,
  toIndex
})

export const switchBlock = (id:number, used:boolean) => ({
  type: SWITCH_BLOCK,
  id,
  used
})