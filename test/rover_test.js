const assert = require('assert')
const mr = require('../app/index')

describe('mars-rover', () => {

  it('should start', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }), { x: 1, y: 1, d: 'E', s: 'ok' })
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
      mr({ x: 1, y: 1, d: 'E' }, ['f']), { x: 2, y: 1, d: 'E', s: 'ok' })
  })

  it('should move forward on y', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'N' }, ['f']), { x: 1, y: 0, d: 'N', s: 'ok' })
  })

  it('should move backward on x', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['b']), { x: 0, y: 1, d: 'E', s: 'ok' })
  })

  it('should move backward on y', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'N' }, ['b']), { x: 1, y: 2, d: 'N', s: 'ok' })
  })

  it('should rotate right', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['r']), { x: 1, y: 1, d: 'S', s: 'ok' })
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'S' }, ['r']), { x: 1, y: 1, d: 'W', s: 'ok' })
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'W' }, ['r']), { x: 1, y: 1, d: 'N', s: 'ok' })
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'N' }, ['r']), { x: 1, y: 1, d: 'E', s: 'ok' })
  })

  it('should rotate left', () => {
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'E' }, ['l']), { x: 1, y: 1, d: 'N', s: 'ok' })
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'N' }, ['l']), { x: 1, y: 1, d: 'W', s: 'ok' })
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'W' }, ['l']), { x: 1, y: 1, d: 'S', s: 'ok' })
    assert.deepEqual(
      mr({ x: 1, y: 1, d: 'S' }, ['l']), { x: 1, y: 1, d: 'E', s: 'ok' })
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

  it('should report obstacles collision moving forward', () => {
    assert.deepEqual(
      mr({ x: 0, y: 2, d: 'E' }, ['f', 'f', 'f', 'f']),
      { x: 1, y: 2, d: 'E', s: 'OBSTACLE_FOUND' }
    )
  })

  it('should report obstacles collision moving backward', () => {
    assert.deepEqual(
      mr({ x: 4, y: 2, d: 'E' }, ['b', 'b', 'b', 'b']),
      { x: 3, y: 2, d: 'E', s: 'OBSTACLE_FOUND' }
    )
  })

  it('should work', () => {
    assert.deepEqual(
      mr({ x: 0, y: 0, d: 'E' },
        ['f','f','r','f','f','l','f','r','f','f','f','f','r','f','f','f']),
      { x: 0, y: 0, d: 'W', s: 'ok' }
    )
  })

  // additional tests

  it('should have moves idempotence', () => {
    assert.deepEqual(
      mr({ x: 0, y: 1, d: 'E' }, ['b']),
      mr({ x: 0, y: 1, d: 'E' }, ['r', 'r', 'f', 'r', 'r'])
    )
  })

})
