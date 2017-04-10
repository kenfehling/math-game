import * as origFetch from 'isomorphic-fetch'
import {
  REMOTE_DATA_PATH, LOCAL_DATA_PATH,
  REMOTE_DATA_EXTENSION, LOCAL_DATA_EXTENSION
} from '../constants/Settings'
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

const getExtension = () => process.env.NODE_ENV === 'production' ?
                          REMOTE_DATA_EXTENSION : LOCAL_DATA_EXTENSION

export function fetch(path) {
  return origFetch(getBasePath() + path + getExtension(), FETCH_PARAMS)
}