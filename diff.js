/**
 * フォロワー、フォロイーから 思い、思われのユーザーIdsを保存する
 */

const friendsIds = require('./out/friendsIds.json').ids  // フォローしている人
const followerIds = require('./out/followerIds.json').ids // フォローしてくれている人

const writeFile = (json, fileName) => {

  console.log(json.length)

  require('fs').writeFileSync(`./out/${fileName}.json`, JSON.stringify(json))
}


// console.log(friendsIds)
// console.log(followerIds)

const checkBoth = (friendsIds, followerIds) => {
  // 両思い 
  return friendsIds.filter(friend => {
    return followerIds.includes(friend)
  })
}
writeFile(checkBoth(friendsIds, followerIds), 'both')


const checkTo = (friendsIds, followerIds) => {
  // 片想い フォローしているけど、フォローされてない
  return friendsIds.filter(friend => {
    return !followerIds.includes(friend)
  })
}
writeFile(checkTo(friendsIds, followerIds), 'to')


const checkFrom = (friendsIds, followerIds) => {
  // 片想われ フォローしてないけど、フォローされてる
  return followerIds.filter(friend => {
    return !friendsIds.includes(friend)
  })
}
writeFile(checkFrom(friendsIds, followerIds), 'from')



// 思われ中
// 両思い