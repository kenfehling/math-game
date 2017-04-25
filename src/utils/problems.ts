import {IProblem} from '../model'
import * as uniq from 'lodash/uniq'
import * as sample from 'lodash/sample'

export const getProblems = (allProbs:IProblem[], {subject, difficulty}:
                            {subject?:string, difficulty?:string}={}):IProblem[] => {
  const inSub = subject ? allProbs.filter(p => p.subject === subject) : allProbs
  return difficulty ? inSub.filter(p => p.difficulty === difficulty) : inSub
}

export const getRandomProblem = (allProbs:IProblem[], {subject, difficulty}:
                        {subject?:string, difficulty?:string}={}):IProblem => {
  const problems = getProblems(allProbs, {subject, difficulty})
  return sample(problems)
}

export const getSubjects = (allProbs:IProblem[]):string[] => {
  return uniq(allProbs.map(p => p.subject))
}

export const getDifficulties = (allProbs:IProblem[], {subject}:
                                {subject?:string}={}):string[] => {
  const inSub = subject ? allProbs.filter(p => p.subject === subject) : allProbs
  return uniq(inSub.map(p => p.difficulty))
}