import {ROTATE_BLOCK, RECEIVE_PROBLEM} from '../constants/ActionTypes'
import {fetch} from '../utils/api';
import IProblemDescription from '../model/IProblemDescription'

export interface IAction {type: string}
export type ReceiveProblem = IAction & IProblemDescription
export type RotateBlock = IAction & {id:number}

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