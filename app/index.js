const MAX_X = 5
const MAX_Y = 5

const wrapX = x => Math.abs(x + MAX_X) % MAX_X
const wrapY = x => Math.abs(x + MAX_Y) % MAX_Y

const moveForward = ({ x, y, d, s }) => {
  switch (d) {
    case 'N': return ({ x, y: wrapY(--y), d, s })
    case 'S': return ({ x, y: wrapY(++y), d, s })
    case 'W': return ({ x: wrapX(--x), y, d, s })
    case 'E': return ({ x: wrapX(++x), y, d, s })
    default: return ({ x, y, d, s })
  }
}

const moveBackward = ({ x, y, d, s}) => {
  switch (d) {
    case 'N': return ({ x, y: wrapY(++y), d, s })
    case 'S': return ({ x, y: wrapY(--y), d, s })
    case 'W': return ({ x: wrapX(++x), y, d, s })
    case 'E': return ({ x: wrapX(--x), y, d, s })
    default: return ({ x, y, d, s })
  }
}

const turnLeft = ({ x, y, d, s}) => {
  switch (d) {
    case 'N': return ({ x, y, d: 'W', s })
    case 'S': return ({ x, y, d: 'E', s })
    case 'W': return ({ x, y, d: 'S', s })
    case 'E': return ({ x, y, d: 'N', s })
    default: return d
  }
}

const turnRight = ({ x, y, d, s}) => {
  switch (d) {
    case 'N': return ({ x, y, d: 'E', s})
    case 'S': return ({ x, y, d: 'W', s})
    case 'W': return ({ x, y, d: 'N', s})
    case 'E': return ({ x, y, d: 'S', s})
    default: return d
  }
}

const move = (state, command) => {
  switch (command) {
    case 'f': return moveForward(state)
    case 'b': return moveBackward(state)
    case 'l': return turnLeft(state)
    case 'r': return turnRight(state)
    default: return state
  }
}

const mr = ({ x, y, d, s }, commands) =>
  !commands ? ({ x, y, d, s: 'ok' }) :
    commands.reduce(
      (state, command) => move(state, command),
      { x, y, d, s: 'ok' }
    )

module.exports = mr
