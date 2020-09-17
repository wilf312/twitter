const Twit = require('twit')
const fs = require('fs')

const T = new Twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})

/**
 * 
 * @param {*} name 
 * @param {*} data 
 * @param {*} options stringify option isExpanded 
 */
const writeFile = (name, data, options = {isExpanded: false}) => {
  fs.writeFileSync(`./out/${name}.json`, JSON.stringify(data, null, options.isExpanded ? 2 : 0))
}
exports.writeFile = writeFile

exports.followersIds = (screen_name) => {
  // フォロワー idを保存
  T.get('followers/ids', { screen_name },  function (err, data, response) {
    console.log('followers/ids', '保存終了')
    writeFile('followerIds', data)
  })
}
exports.followerList = (screen_name) => {
  // フォロワー listを保存
  T.get('followers/list', { screen_name },  function (err, data, response) {
    console.log('followers/list', '保存終了')
    writeFile('followerList', data)
  })
}
// フレンド idを保存
exports.friendsIds = (screen_name) => {
  T.get('friends/ids', { screen_name },  function (err, data, response) {
    console.log('friends/ids', '保存終了')
    writeFile('friendsIds', data)
  })
}

// フレンド idを保存
exports.usersLookup = (user_id) => {
  return new Promise((resolve) => {
    T.get('users/lookup', { user_id },  function (err, data, response) {
      // console.log(data)
      resolve(data)
    })
  })
}

// user_timeline
exports.userTimeline = (screen_name, options = {
  count: 200,
  max_id: null
}) => {

  let query = { screen_name, count: options.count, max_id: options.max_id }
  if (!query.max_id) {
    delete query.max_id
  }
  return new Promise((resolve) => {
    T.get('statuses/user_timeline', query,  function (err, data, response) {
      // console.log(data)
      resolve(data)
    })
  })
}

