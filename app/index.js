const MAX_X = 5
const MAX_Y = 5

const wrapX = x => Math.abs(x + MAX_X) % MAX_X
const wrapY = y => Math.abs(y + MAX_Y) % MAX_Y

const OBSTACLES = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const tryMove = (startX, startY, endX, endY) =>
  !OBSTACLES[endY][endX] ?
    ({ x: endX, y: endY, s: 'ok' }) :
    ({ x: startX, y: startY, s: 'OBSTACLE_FOUND' })

const moveForward = ({ x, y, d, s }) => {
  switch (d) {
    case 'N': return Object.assign(tryMove(x, y, x, wrapY(y-1)), { d })
    case 'S': return Object.assign(tryMove(x, y, x, wrapY(y+1)), { d })
    case 'W': return Object.assign(tryMove(x, y, wrapX(x-1), y), { d })
    case 'E': return Object.assign(tryMove(x, y, wrapX(x+1), y), { d })
    default: return ({ x, y, d, s })
  }
}

const moveBackward = ({ x, y, d, s }) => {
  switch (d) {
    case 'N': return Object.assign(tryMove(x, y, x, wrapY(y+1)), { d })
    case 'S': return Object.assign(tryMove(x, y, x, wrapY(y-1)), { d })
    case 'W': return Object.assign(tryMove(x, y, wrapX(x+1), y), { d })
    case 'E': return Object.assign(tryMove(x, y, wrapX(x-1), y), { d })
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
  (commands || []).reduce(
    (state, command) => move(state, command),
    { x, y, d, s: 'ok' }
  )

module.exports = mr
