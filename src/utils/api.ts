import * as origFetch from 'isomorphic-fetch'
import {REMOTE_DATA_PATH, LOCAL_DATA_PATH} from '../constants/Settings'
declare const process

const FETCH_PARAMS = {
  mode: 'no-cors',
  credentials: 'same-origin',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }
}

const getBasePath = () => process.env.NODE_ENV === 'production' ?
                          REMOTE_DATA_PATH : LOCAL_DATA_PATH

const getExtension = () => process.env.NODE_ENV === 'production' ? '' : '.json'

export function fetch(path) {
  return origFetch(getBasePath() + path + getExtension(), FETCH_PARAMS)
}