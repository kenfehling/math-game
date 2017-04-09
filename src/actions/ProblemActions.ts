import {
  RECEIVE_PROBLEM, ROTATE_BLOCK, MOVE_BLOCK, SWITCH_BLOCK
} from '../constants/ActionTypes'
import {fetch} from '../utils/api';
import {IBlock, IProblemDescription} from '../model'

export interface IAction {type: string}
export type ReceiveProblem = IAction & IProblemDescription
export type RotateBlock = IAction & {id:number}
export type MoveBlock = IAction & {id:number, index:number}
export type SwitchBlock = IAction & {id:number, used:boolean}

const receiveProblem = (problem:IProblemDescription):ReceiveProblem => ({
  type: RECEIVE_PROBLEM,
  ...problem
})

export const fetchProblem = (id:number) => (dispatch, getState) =>
  fetch(`/problems/${id}`)
    .then(response => response.json())
    .then(json => dispatch(receiveProblem(json)))

export const rotateBlock = (id:number):RotateBlock => ({
  type: ROTATE_BLOCK,
  id
})

export const moveBlock = (id:number, index:number):MoveBlock => ({
  type: MOVE_BLOCK,
  id,
  index
})

export const switchBlock = (id:number, used:boolean) => ({
  type: SWITCH_BLOCK,
  id,
  used
})