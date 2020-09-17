/**
 * フィルターしたユーザーの中からツイートする
 * 生成したURLをchromeにはりつけて2回実行する
 * 一度目は URLバーに windowの制約を聞かれるので一律許可するを押す
 */
const user = require('./out/filterd.json')


let str = ''


user.forEach(user => {
  str += `'https://twitter.com/${user.screen_name}',
`
})


console.log(`
[
${str}
].forEach((url, index) => {
  setTimeout(() => {
    window.open(url, 'blank' + index)
  }, index * 1 * 1000)
})

`)