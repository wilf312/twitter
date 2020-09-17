module.diffDay = (dateStr) => {
  const lastUpdate = new Date(dateStr).getTime()
  const now = new Date().getTime()

  // diff mill seconds
  const diff = now - lastUpdate

  // format day
  const dayDiff = Math.floor(diff / 1000 / 60 * 60 * 24)

  return dayDiff
  // // 30日以上ツイートしていない人を抽出
  // console.log(dayDiff)
  // console.log(dayDiff > 30)
  // return dayDiff > 30

}