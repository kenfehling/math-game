import {RECEIVE_PROBLEM, ROTATE_BLOCK, MOVE_BLOCK} from '../constants/ActionTypes'
import {fetch} from '../utils/api';
import {IBlock, IProblemDescription} from '../model'

export interface IAction {type: string}
export type ReceiveProblem = IAction & IProblemDescription
export type RotateBlock = IAction & {id:number}
export type MoveBlock = IAction & {newOrder:IBlock[]}

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

export const moveBlock = (newOrder):MoveBlock => ({
  type: MOVE_BLOCK,
  newOrder
})