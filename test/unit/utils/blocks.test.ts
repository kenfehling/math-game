import {expect} from 'chai'
import * as utils from '../../../src/utils/blocks'
import {UnitCount} from '../../../src/utils/blocks'
import * as fixtures from '../fixtures'
import {IBlock, IValue} from '../../../src/model'
import {
  centimeters, feet, meters,
  millimeters
} from '../../../src/constants/Units'
declare const describe:any
declare const it:any

const blocks:IBlock[] = fixtures.blocks
const values1:IValue[] = fixtures.values1
const values2:IValue[] = fixtures.values2

describe('blocks utils', () => {
  it('inserts a block at an index', () => {
    const block:IBlock = {
      id: 100,
      sides: [
        {value: 30, unit: centimeters},
        {value: 1, unit: feet}
      ]
    }
    const result:IBlock[] = utils.insertBlockAt(blocks, 1, block)
    expect(result.length).to.equal(4)
    expect(result[0].id).to.equal(1)
    expect(result[1].id).to.equal(100)
    expect(result[2].id).to.equal(2)
    expect(result[3].id).to.equal(3)
  })

  it('removes a block by id', () => {
    const result:IBlock[] = utils.removeBlock(blocks, 1)
    expect(result.length).to.equal(2)
    expect(result[0].id).to.equal(2)
    expect(result[1].id).to.equal(3)
  })

  it('moves a block', () => {
    const result:IBlock[] = utils.moveBlock(blocks, 3, 1)
    expect(result.length).to.equal(3)
    expect(result[0].id).to.equal(1)
    expect(result[1].id).to.equal(3)
    expect(result[2].id).to.equal(2)
  })

  it('counts units', () => {
    const counts:UnitCount[] = utils.countUnits(values1)
    expect(counts.length).to.equal(3)
    expect(counts[0].unit).to.equal(centimeters)
    expect(counts[0].count).to.equal(1)
    expect(counts[1].unit).to.equal(millimeters)
    expect(counts[1].count).to.equal(2)
    expect(counts[2].unit).to.equal(meters)
    expect(counts[2].count).to.equal(1)
  })

  it('gets a unit count', () => {
    const counts:UnitCount[] = utils.countUnits(values1)
    expect(utils.getUnitCount(counts, centimeters)).to.equal(1)
    expect(utils.getUnitCount(counts, millimeters)).to.equal(2)
    expect(utils.getUnitCount(counts, meters)).to.equal(1)
  })

  it('cancels units 1', () => {
    const counts:UnitCount[] = utils.cancel(values1, values2)
    expect(counts.length).to.equal(1)
    expect(counts[0].unit).to.equal(millimeters)
    expect(counts[0].count).to.equal(2)
  })

  it('cancels units 2', () => {
    const counts:UnitCount[] = utils.cancel(values2, values1)
    expect(counts.length).to.equal(1)
    expect(counts[0].unit).to.equal(centimeters)
    expect(counts[0].count).to.equal(1)
  })
})