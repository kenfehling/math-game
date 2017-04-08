import IValueDescription from './IValueDescription'

interface IBlockDescription {
  id: number,
  sides: [IValueDescription, IValueDescription]
}

export default IBlockDescription