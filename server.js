const {
  followersIds,
  followerList,
  friendsIds
} = require('./twitter')

const screenName = 'wilf_genya'
followersIds(screenName)
followerList(screenName)
friendsIds(screenName)
