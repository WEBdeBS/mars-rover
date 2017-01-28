const PLANET = [
  ['.','.','.','.','.'],
  ['.','.','.','.','.'],
  ['.','.','^','.','.'],
  ['.','^','.','.','.'],
  ['.','.','.','.','.'],
]

const MAX_X = PLANET[0].length
const MAX_Y = PLANET.length

const wrapX = x => Math.abs(x + MAX_X) % MAX_X
const wrapY = y => Math.abs(y + MAX_Y) % MAX_Y

const leftTurns = { N: 'W', S: 'E', W: 'S', E: 'N' }
const rightTurns = { N: 'E', S: 'W', W: 'N', E: 'S' }

const calcPosition = (startX, startY, endX, endY) =>
  (PLANET[endY][endX] === '.') ?
    ({ x: endX, y: endY, s: 'ok' }) :
    ({ x: startX, y: startY, s: 'OBSTACLE_FOUND' })

const forwardMovements = (x, y) => ({
  N: calcPosition(x, y, x, wrapY(y-1)),
  S: calcPosition(x, y, x, wrapY(y+1)),
  W: calcPosition(x, y, wrapX(x-1), y),
  E: calcPosition(x, y, wrapX(x+1), y),
})

const backwardMovements = (x, y) => ({
  N: calcPosition(x, y, x, wrapY(y+1)),
  S: calcPosition(x, y, x, wrapY(y-1)),
  W: calcPosition(x, y, wrapX(x+1), y),
  E: calcPosition(x, y, wrapX(x-1), y),
})

const movements = ({ x, y, d, s }) => ({
  f: Object.assign({ s, d }, forwardMovements(x, y)[d]),
  b: Object.assign({ s, d }, backwardMovements(x, y)[d]),
  l: Object.assign({ s, x, y }, { d: leftTurns[d] }),
  r: Object.assign({ s, x, y }, { d: rightTurns[d] }),
})

const mr = (state, commands) =>
  (commands || []).reduce(
    (state, command) => movements(state)[command],
    Object.assign({}, state, { s: 'ok' })
  )

module.exports = mr
