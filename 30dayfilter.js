/**
 * フォローしている人の中から 30日以上ツイートしていない人を抽出
 */
const fs = require('fs')
const {writeFile} = require('./twitter')
const userLookup = require('./out/usersLookup.json')

// 30日以上ツイートしていない人を抽出
const timeFiltered = (userLookup, timeFormat) => {
  const now = new Date().getTime()
  return userLookup.filter(data =>  {
    // console.log(data)
    const createdAt = data?.status?.created_at
    if (!createdAt) {
      console.warn('1ツイートもないユーザーを含めない')
      return false
    }
    const lastUpdate = new Date(data.status.created_at).getTime()

    // diff mill seconds
    const diff = now - lastUpdate

    // format day
    const dayDiff = Math.floor(diff / 1000 / timeFormat)

    // 30日以上ツイートしていない人を抽出
    console.log(dayDiff)
    console.log(dayDiff > 30)
    return dayDiff > 30
  })
}

// 1日以上 ツイートがないユーザーを抽出
const filterd = timeFiltered(userLookup, 60 * 60 * 24)
writeFile('filterd', filterd)
