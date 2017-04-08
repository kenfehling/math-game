import IValue from './IValue'

interface IBlock {
  id: number,
  sides: [IValue, IValue]
  rotated?: boolean
}

export default IBlock