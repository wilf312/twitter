const https = require('https')
const fs = require('fs')
const dayjs = require('dayjs')


const downloadFile = (url, name) => {
  const outFile = fs.createWriteStream(`./out/image/${name}.jpg`)

  return new Promise((r) => {
    https.get(url, (res) => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)
  
      // ダウンロードした内容をそのまま、ファイル書き出し。
      res.pipe(outFile)
  
      // 終わったらファイルストリームをクローズ。
      res.on('end', function () {
        outFile.close()
        setTimeout(() => {
          console.log('end')
          r()
        }, 500)
      }) 
  
    }).on('error', (e) => {
      console.error(e)
    })
  })
}

const res = require('./out/userTimelinePhoto.json')

const slow = async () => {
  const filtered = res.filter((d, index) => index < 3)
  console.log(filtered)
  for(var a = 0; a < filtered.length; a++) {
    console.log(filtered[a])
    const date = dayjs(new Date(filtered[a].created_at)).format('YYYY_MM_DD HH_mm_ss') 
    for(var b=0; b < filtered[a].photoList.length; b++) {
      await downloadFile(filtered[a].photoList[b], `${date}__${b}`)
    }
  }
}
slow()