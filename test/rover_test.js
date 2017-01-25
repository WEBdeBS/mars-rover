const assert = require('assert')
const mr = require('../app/index')

describe('mars-rover', () => {

  it('should start', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }),
      { x: 1, y: 1, d: 'E', s: 'ok' }
    )
  })

  it('should accept one command', () => {
    const out = mr({ x: 1, y: 1, d: 'E' }, ['f'])
    assert.deepEqual(out.s, 'ok')
  })

  it('should accept commands', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['f', 'f', 'r', 'f']),
      { x: 3, y: 2, d: 'S', s: 'ok' }
    )
  })

  it('should move forward on x', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['f']),
      { x: 2, y: 1, d: 'E', s: 'ok' }
    )
  })

  it('should move forward on y', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'N' }, ['f']),
      { x: 1, y: 0, d: 'N', s: 'ok' }
    )
  })

  it('should move backward on x', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['b']),
      { x: 0, y: 1, d: 'E', s: 'ok' }
    )
  })

  it('should move backward on y', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'N' }, ['b']),
      { x: 1, y: 2, d: 'N', s: 'ok' }
    )
  })

  it('should rotate right', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['r']),
      { x: 1, y: 1, d: 'S', s: 'ok' }
    )
  })

  it('should rotate left', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['l']),
      { x: 1, y: 1, d: 'N', s: 'ok' }
    )
  })

})
