import IBlockDescription from './IBlockDescription'

interface IProblemDescription {
  question: string,
  blocks: IBlockDescription[]
}

export default IProblemDescription