import {expect} from 'chai'
import * as utils from '../../../src/utils/blocks'
import * as fixtures from '../fixtures'
import {IBlock} from '../../../src/model'
import {centimeters, feet} from '../../../src/constants/Units'
declare const describe:any
declare const it:any

describe('blocks utils', () => {
  const bs = fixtures.blocks
  it('inserts a block at an index', () => {
    const block:IBlock = {
      id: 100,
      sides: [
        {value: 30, unit: centimeters},
        {value: 1, unit: feet}
      ]
    }
    const result = utils.insertBlockAt(bs, 1, block)
    expect(result.length).to.equal(4)
    expect(result[0].id).to.equal(1)
    expect(result[1].id).to.equal(100)
    expect(result[2].id).to.equal(2)
    expect(result[3].id).to.equal(3)
  })

  it('removes a block by id', () => {
    const result = utils.removeBlock(bs, 1)
    expect(result.length).to.equal(2)
    expect(result[0].id).to.equal(2)
    expect(result[1].id).to.equal(3)
  })

  it('moves a block', () => {
    const result = utils.moveBlock(bs, 3, 1)
    expect(result.length).to.equal(3)
    expect(result[0].id).to.equal(1)
    expect(result[1].id).to.equal(3)
    expect(result[2].id).to.equal(2)
  })
})