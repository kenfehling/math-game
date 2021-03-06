import {IBlock, IValue} from '../../src/model'
import {centimeters, meters, millimeters} from '../../src/constants/Units'

export const blocks:IBlock[] = [{
  id: 1,
  sides: [
    {value: 1, unit: centimeters},
    {value: 10, unit: millimeters}
  ]
}, {
  id: 2,
  sides: [
    {value: 1000, unit: millimeters},
    {value: 1, unit: meters}
  ],
}, {
  id: 3,
  sides: [
    {value: 100, unit: centimeters},
    {value: 1, unit: meters}
  ]
}]

export const values1:IValue[] = [
  {value: 1, unit: centimeters},
  {value: 10, unit: millimeters},
  {value: 1000, unit: millimeters},
  {value: 1, unit: meters}
]

export const values2:IValue[] = [
  {value: 1, unit: centimeters},
  {value: 100, unit: centimeters},
  {value: 10, unit: meters}
]