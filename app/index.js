const mappaNord = {
  'F': function(x,y, obs){return Rover(x, y+1, 'N', obs)},
  'B': function(x,y, obs){return Rover(x, y-1, 'N', obs)},
  'L': function(x,y, obs){return Rover(x, y, 'W', obs)},
  'R': function(x,y, obs){return Rover(x, y, 'E', obs)}
}
const mappaEast = {
  'F': function(x,y, obs){return Rover(x+1, y, 'E',obs)},
  'B': function(x,y, obs){return Rover(x-1, y, 'E',obs)},
  'L': function(x,y, obs){return Rover(x, y, 'N',obs)},
  'R': function(x,y, obs){return Rover(x, y, 'S',obs)}
}

const mappaWest = {
  'F': function(x,y, obs){return Rover(x-1, y, 'W',obs)},
  'B': function(x,y, obs){return Rover(x+1, y, 'W',obs)},
  'L': function(x,y, obs){return Rover(x, y, 'S',obs)},
  'R': function(x,y, obs){return Rover(x, y, 'N',obs)}
}

const mappaSouth = {
  'F': function(x,y, obs){return Rover(x, y-1, 'S',obs)},
  'B': function(x,y, obs){return Rover(x, y+1, 'S',obs)},
  'L': function(x,y, obs){return Rover(x, y, 'E',obs)},
  'R': function(x,y, obs){return Rover(x, y, 'W',obs)}
}

const mappa = {
  'N': mappaNord,
  'S': mappaSouth,
  'W': mappaWest,
  'E': mappaEast
}

function Rover(x, y, f, obstacles = []) {
  
  var fun = function(commands) {

    if (commands.length === 0){
      return Rover(x,y,f)
    }
    [cmd,...tail] = commands
    const next = mappa[f][cmd](x,y)
    const hit = obstacles.find(o => { return o.x === next.x && o.y === next.y})
    
    if (hit) {
      return Rover(x,y,f)
    }
    return mappa[f][cmd](x,y,obstacles)(tail)
  }
  fun.x = x
  fun.y = y
  fun.facing = f
  return fun
}

module.exports = Rover