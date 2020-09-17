/**
 * データログりたいよう
 */
const fs = require('fs')
const userLookup = require('./out/usersLookup.json')

const {
  writeFile
} = require('./twitter')


const list = userLookup
  .filter(d => d.description.indexOf('漫画') !== -1)
  // .map(d => {
  //   return d.description
  // })


console.log(list.length)

writeFile('digg', list)


list.forEach(user => {
  console.log(`
  
  
https://twitter.com/${user.screen_name}`)
  console.log(user.description)
})