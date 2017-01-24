const assert = require('chai').assert
const Rover = require('../app')

describe('Mars rover', function(){

 it('should set initial position', function(){

   const newPosition = Rover(4, 6, 'N')

   assert.equal(4, newPosition.x)
   assert.equal(6, newPosition.y)
   assert.equal('N', newPosition.facing)

 })

 it('should move forward', function(){

   const newPosition = Rover(4, 6, 'N')(['F'])

   assert.equal(4, newPosition.x)
   assert.equal(7, newPosition.y)
   assert.equal('N', newPosition.facing)

 })
it('should accept many commands', function(){

   const newPosition = Rover(4, 6, 'N')(['F','F'])

   assert.equal(4, newPosition.x)
   assert.equal(8, newPosition.y)
   assert.equal('N', newPosition.facing)

 })

 it('should accept many directions', function(){

   const newPosition = Rover(4, 6, 'N')(['F','B'])

   assert.equal(4, newPosition.x)
   assert.equal(6, newPosition.y)
   assert.equal('N', newPosition.facing)

 })

 it('should accept many directions', function(){

   const newPosition = Rover(4, 6, 'N')(['L'])

   assert.equal(4, newPosition.x)
   assert.equal(6, newPosition.y)
   assert.equal('W', newPosition.facing)

 })

 it('should accept many directions', function(){

   const newPosition = Rover(4, 6, 'N')(['R'])

   assert.equal(4, newPosition.x)
   assert.equal(6, newPosition.y)
   assert.equal('E', newPosition.facing)

 })


 it('should accept many directions', function(){

   const newPosition = Rover(4, 6, 'N')(['R','F','F','R','B','B','L'])

   assert.equal(6, newPosition.x)
   assert.equal(8, newPosition.y)
   assert.equal('E', newPosition.facing)

 })

it('with obstacles should blocking in front of obstacle', function(){

   const newPosition = Rover(4, 6, 'N', [{x:4,y:8}])(['F','F'])

   assert.equal(4, newPosition.x)
   assert.equal(7, newPosition.y)
   assert.equal('N', newPosition.facing)

 })

})