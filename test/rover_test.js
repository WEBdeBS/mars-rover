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

  it('should wrap on x going forward', () => {
    assert.deepEqual(
      mr({ x: 0, y: 0, d: 'E' }, ['f', 'f', 'f', 'f', 'f', 'f']),
      { x: 1, y: 0, d: 'E', s: 'ok' }
    )
  })

  it('should wrap on x going backward', () => {
    assert.deepEqual(
      mr({ x: 0, y: 0, d: 'E' }, ['b', 'b', 'b', 'b', 'b', 'b']),
      { x: 4, y: 0, d: 'E', s: 'ok' }
    )
  })

  it('should wrap on y going forward', () => {
    assert.deepEqual(
      mr({ x: 0, y: 0, d: 'N' }, ['f', 'f', 'f', 'f', 'f', 'f']),
      { x: 0, y: 4, d: 'N', s: 'ok' }
    )
  })

  it('should wrap on y going backward', () => {
    assert.deepEqual(
      mr({ x: 0, y: 0, d: 'N' }, ['b', 'b', 'b', 'b', 'b', 'b']),
      { x: 0, y: 1, d: 'N', s: 'ok' }
    )
  })

  it('should have moves idempotence', () => {
    assert.deepEqual(
      mr({ x: 0, y: 1, d: 'E' }, ['b']),
      mr({ x: 0, y: 1, d: 'E' }, ['r', 'r', 'f', 'r', 'r'])
    )
  })

  xit('should calculate wrapping', () => {
    const f = x => Math.abs(x + 5) % 5
    assert.equal(f(-7), 2)
    assert.equal(f(-6), 1)
    assert.equal(f(-5), 0)
    assert.equal(f(-4), 1)
    assert.equal(f(-3), 2)
    assert.equal(f(-2), 3)
    assert.equal(f(-1), 4)
    assert.equal(f(0), 0)
    assert.equal(f(1), 1)
    assert.equal(f(2), 2)
    assert.equal(f(3), 3)
    assert.equal(f(4), 4)
    assert.equal(f(5), 0)
    assert.equal(f(6), 1)
  })

})
