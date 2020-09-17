const {
  userTimeline,
  writeFile
} = require('./twitter')

const getTimeline = async (name, max_id = null) => {
  let res = await userTimeline(name, {max_id, count: 200})

  console.log(res.length)

  if (res.length >= 180) {
    console.log('recursive...')
    const res2 = await getTimeline(name, res[res.length -1].id_str)
    return [...res, ...res2]
  } else {
    console.log('end')
    return res
  }
}

const getAllTweet = async () => {
  const res = await getTimeline(process.env.SCREEN_NAME)
  console.log(res.length, 'fetch successed!')
  writeFile('userTimeline', res)

  formatTweet(res)

}

const formatTweet = async (res) => {
  // const res = require('./out/userTimeline.json')
  console.log(JSON.stringify(res[res.length-1], null, 2))
  // RTの除去 retweeted_statusオブジェクトが存在しないとき 通常Tweet
  const excludeRT = res.filter(d => !d.retweeted_status)
  
  const hasMedia = excludeRT.filter(d => !!d.extended_entities)

  // データの整形
  const photoList = hasMedia.map(d => {
    return {
      id_str: d.id_str,
      text: d.text,
      created_at: d.created_at,
      photoList: d.extended_entities?.media.map(d => `${d.media_url_https}:orig`)
    }
  })

  writeFile('userTimelinePhoto', photoList, {isExpanded: true})
}

getAllTweet()