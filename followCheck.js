/**
 * フォローしている人のデータを一括で一つのJSONファイルにまとめる
 */
const {
  usersLookup,
  writeFile
} = require('./twitter')

const fs = require('fs')

const friendsIds = require('./out/friendsIds.json').ids

// Request分割する
const json = async (friendsIds) => {
  let loop = Math.ceil(friendsIds.length / 100)
  let data = []

  let promised = []

  for(var i = 0; i < loop; i++) {
    const start = i * 100
    const end = (i + 1) * 100
    // console.log(`${start} - ${end}`)
    // console.log(friendsIds.slice(start, end).length)
    const slicedIds = friendsIds.slice(start, end).join(',')
    console.log(slicedIds)
    promised.push(usersLookup(slicedIds))
  }

  const res = await Promise.all(promised)
  console.log(res)

  res.forEach(d => data = [...data, ...d])
  
  writeFile('friends', data)
}
json(friendsIds)