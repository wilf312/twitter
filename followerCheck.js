/**
 * フォローしている人のデータを一括で一つのJSONファイルにまとめる
 */
const {
  usersLookup,
  writeFile
} = require('./twitter')

const fs = require('fs')

const to = require('./out/to.json')

// Request分割する
const json = async (to) => {
  let loop = Math.ceil(to.length / 100)
  let data = []

  let promised = []

  for(var i = 0; i < loop; i++) {
    const start = i * 100
    const end = (i + 1) * 100
    // console.log(`${start} - ${end}`)
    // console.log(to.slice(start, end).length)
    const slicedIds = to.slice(start, end).join(',')
    console.log(slicedIds)
    promised.push(usersLookup(slicedIds))
  }

  const res = await Promise.all(promised)
  console.log(res)

  res.forEach(d => data = [...data, ...d])
  
  writeFile('usersLookup', data)
}
json(to)